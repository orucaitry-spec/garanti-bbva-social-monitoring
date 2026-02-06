#!/usr/bin/env node
/**
 * Dashboard'a kategori ranking ekleyen script
 */

const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

// renderSimilarGroups fonksiyonundan sonra loadCategoryRanking fonksiyonunu ekle
const categoryRankingFunctions = `
        async function loadCategoryRanking() {
            try {
                const response = await fetch('reports/category_analysis.json');
                const data = await response.json();
                renderCategoryRanking(data);
            } catch (error) {
                console.error('Kategori analizi yuklenemedi:', error);
            }
        }

        function renderCategoryRanking(data) {
            const tbody = document.getElementById('categoryRankingTable');
            const maxCount = data.categories[0]?.count || 1;
            
            tbody.innerHTML = data.categories.map(cat => {
                const barWidth = (cat.count / maxCount * 100);
                let rankClass = 'low';
                if (cat.rank <= 3) rankClass = 'top';
                else if (cat.rank <= 10) rankClass = 'middle';
                
                return \`
                    <tr>
                        <td>
                            <span class="rank-badge \${rankClass}">\${cat.rank}</span>
                        </td>
                        <td class="category-name-cell">\${cat.category_name}</td>
                        <td>
                            <div class="count-bar">
                                <div class="bar" style="width: \${barWidth}%; max-width: 300px;"></div>
                                <span class="count-number">\${cat.count}</span>
                            </div>
                        </td>
                        <td>
                            <span class="percentage">\${cat.percentage}%</span>
                        </td>
                    </tr>
                \`;
            }).join('');
        }
`;

// openGroupDetails fonksiyonundan önce ekle
const insertPoint = 'function openGroupDetails(category, group) {';
const updatedHtml = html.replace(insertPoint, categoryRankingFunctions + '\n        ' + insertPoint);

// loadData fonksiyonunda loadCategoryRanking çağrısını ekle
const loadDataMarker = 'renderSimilarGroups(currentReport.similarGroups || {});';
const finalHtml = updatedHtml.replace(
    loadDataMarker, 
    loadDataMarker + '\n                loadCategoryRanking();'
);

fs.writeFileSync('index.html', finalHtml, 'utf-8');

console.log('✅ Dashboard güncellendi! Kategori ranking eklendi.');
