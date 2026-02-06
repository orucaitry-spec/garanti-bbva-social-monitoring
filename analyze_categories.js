#!/usr/bin/env node
/**
 * Kategori Analiz Scripti
 * Tüm yorumları kategorilere göre gruplar, sayar ve sıralar
 */

const fs = require('fs');
const path = require('path');

// Kategorileri yükle
const categoriesData = JSON.parse(
  fs.readFileSync('data/categories.json', 'utf-8')
);
const CATEGORIES = {};
categoriesData.categories.forEach(cat => {
  CATEGORIES[cat.id] = cat;
});

// Kategori sayaçları
const categoryCounts = {};

// Tüm JSON dosyalarını bul
const dataDir = 'data';
const jsonFiles = fs.readdirSync(dataDir)
  .filter(file => file.endsWith('-full.json'))
  .sort();

console.log('\n' + '='.repeat(80));
console.log('KATEGORİ ANALİZ RAPORU');
console.log('='.repeat(80) + '\n');
console.log(`Taranan dosya sayısı: ${jsonFiles.length}\n`);

let totalComments = 0;

// Her dosyayı işle
jsonFiles.forEach(filename => {
  const filepath = path.join(dataDir, filename);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  
  // Issues içindeki yorumları say
  if (data.issues) {
    data.issues.forEach(issue => {
      if (issue.comments) {
        issue.comments.forEach(comment => {
          const category = comment.category || 'other';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
          totalComments++;
        });
      }
    });
  }
});

// Kategorileri sayıya göre sırala (en çoktan en aza)
const sortedCategories = Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1]);

// Sonuçları yazdır
console.log(`Toplam yorum sayısı: ${totalComments}\n`);
console.log('='.repeat(80));
console.log(
  'SIRA'.padEnd(6) + 
  'KATEGORİ ID'.padEnd(25) + 
  'KATEGORİ ADI'.padEnd(30) + 
  'YORUM SAYISI'.padEnd(15) + 
  'YÜZDE'
);
console.log('='.repeat(80));

const results = [];
sortedCategories.forEach(([catId, count], index) => {
  const rank = index + 1;
  const catName = CATEGORIES[catId]?.name || catId;
  const percentage = totalComments > 0 ? (count / totalComments * 100) : 0;
  
  console.log(
    String(rank).padEnd(6) +
    catId.padEnd(25) +
    catName.padEnd(30) +
    String(count).padEnd(15) +
    percentage.toFixed(2).padStart(6) + '%'
  );
  
  results.push({
    rank: rank,
    category_id: catId,
    category_name: catName,
    count: count,
    percentage: Math.round(percentage * 100) / 100
  });
});

console.log('='.repeat(80) + '\n');

// Sonuçları JSON'a kaydet
const outputData = {
  generated_at: new Date().toISOString(),
  total_comments: totalComments,
  total_files_analyzed: jsonFiles.length,
  categories: results
};

const reportsDir = 'reports';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const outputFile = path.join(reportsDir, 'category_analysis.json');
fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`✅ Analiz sonuçları kaydedildi: ${outputFile}\n`);

// Export for use in other scripts
module.exports = { results, totalComments };
