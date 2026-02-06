#!/usr/bin/env node
/**
 * Tek tek içerik kategorize etme scripti
 * Her bir içeriği ayrı ayrı analiz edip kategorize eder
 */

const fs = require('fs');
const path = require('path');

// Kategoriler ve keyword'leri yükle
const categoriesData = JSON.parse(fs.readFileSync('data/categories.json', 'utf-8'));
const CATEGORIES = {};
categoriesData.categories.forEach(cat => {
    CATEGORIES[cat.id] = cat;
});

function normalizeText(text) {
    /**Türkçe karakterleri normalize et ve küçük harfe çevir*/
    if (!text) return "";
    text = text.toLowerCase();
    // Türkçe karakterleri değiştir
    const replacements = {
        'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
        'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
    };
    for (const [trChar, enChar] of Object.entries(replacements)) {
        text = text.replace(new RegExp(trChar, 'g'), enChar);
    }
    return text;
}

function categorizeSingleContent(text) {
    /**
     * Tek bir içeriği kategorize et
     * Keyword matching kullanarak en uygun kategoriyi bul
     */
    if (!text) return "other";
    
    const normalizedText = normalizeText(text);
    
    // Her kategori için puan hesapla
    const scores = {};
    for (const [catId, catData] of Object.entries(CATEGORIES)) {
        if (catId === "other") continue; // other'ı son seçenek olarak bırak
        
        let score = 0;
        const keywords = catData.keywords || [];
        
        for (const keyword of keywords) {
            const normalizedKeyword = normalizeText(keyword);
            // Keyword bulunursa puan ver
            if (normalizedText.includes(normalizedKeyword)) {
                // Uzun keyword'ler daha fazla puan alsın
                score += normalizedKeyword.split(' ').length;
            }
        }
        
        if (score > 0) {
            scores[catId] = score;
        }
    }
    
    // En yüksek puanlı kategoriyi döndür
    if (Object.keys(scores).length > 0) {
        const bestCategory = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        return bestCategory;
    }
    
    return "other";
}

function processFile(filepath) {
    /**Bir JSON dosyasındaki tüm içerikleri tek tek kategorize et*/
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Dosya işleniyor: ${path.basename(filepath)}`);
    console.log(`${'='.repeat(80)}\n`);
    
    const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    
    let changedCount = 0;
    let totalCount = 0;
    
    // Issues içindeki her bir içeriği işle
    if (data.issues) {
        for (const issue of data.issues) {
            if (!issue.comments) continue;
            
            for (const comment of issue.comments) {
                totalCount++;
                const text = comment.text || '';
                const oldCategory = comment.category || 'other';
                
                // Tek tek kategorize et
                const newCategory = categorizeSingleContent(text);
                
                if (oldCategory !== newCategory) {
                    changedCount++;
                    console.log(`[${changedCount}] İçerik #${totalCount} kategorisi değişti:`);
                    console.log(`  Eski: ${oldCategory}`);
                    console.log(`  Yeni: ${newCategory}`);
                    console.log(`  Metin: ${text.substring(0, 100)}...`);
                    console.log();
                }
                
                // Yeni kategoriyi kaydet
                comment.category = newCategory;
            }
        }
    }
    
    // Dosyayı kaydet
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log(`\n${path.basename(filepath)} tamamlandı!`);
    console.log(`  Toplam içerik: ${totalCount}`);
    console.log(`  Değiştirilen: ${changedCount}`);
    console.log(`  Değişmeyen: ${totalCount - changedCount}\n`);
    
    return { changed: changedCount, total: totalCount };
}

function main() {
    /**Ana fonksiyon - tüm dosyaları işle*/
    const dataDir = 'data';
    const jsonFiles = fs.readdirSync(dataDir)
        .filter(f => f.endsWith('-full.json'))
        .sort()
        .map(f => path.join(dataDir, f));
    
    let totalChanged = 0;
    let totalContent = 0;
    
    console.log("\n" + "=".repeat(80));
    console.log("GARANTI BBVA - TEK TEK İÇERİK KATEGORİZASYON");
    console.log("=".repeat(80));
    console.log(`\nToplam ${jsonFiles.length} dosya bulundu\n`);
    
    for (const jsonFile of jsonFiles) {
        const { changed, total } = processFile(jsonFile);
        totalChanged += changed;
        totalContent += total;
    }
    
    console.log("\n" + "=".repeat(80));
    console.log("ÖZET RAPOR");
    console.log("=".repeat(80));
    console.log(`Toplam içerik sayısı: ${totalContent}`);
    console.log(`Kategorisi değiştirilen: ${totalChanged}`);
    console.log(`Değişiklik oranı: ${(totalChanged/totalContent*100).toFixed(1)}%`);
    console.log("=".repeat(80) + "\n");
}

main();
