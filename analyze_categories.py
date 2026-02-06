#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Kategori Analiz Scripti
Tüm yorumları kategorilere göre gruplar, sayar ve sıralar
"""

import json
from pathlib import Path
from collections import defaultdict
from datetime import datetime

def analyze_categories():
    """Tüm dosyalardaki yorumları kategorilere göre analiz et"""
    
    # Kategorileri yükle
    with open('data/categories.json', 'r', encoding='utf-8') as f:
        categories_data = json.load(f)
        CATEGORIES = {cat['id']: cat for cat in categories_data['categories']}
    
    # Kategori sayaçları
    category_counts = defaultdict(int)
    total_comments = 0
    
    # Tüm JSON dosyalarını tara
    data_dir = Path('data')
    json_files = sorted(data_dir.glob('*-full.json'))
    
    print(f"\n{'='*80}")
    print("KATEGORİ ANALİZ RAPORU")
    print(f"{'='*80}\n")
    print(f"Taranan dosya sayısı: {len(json_files)}\n")
    
    # Her dosyayı işle
    for json_file in json_files:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Issues içindeki yorumları say
        if 'issues' in data:
            for issue in data['issues']:
                if 'comments' in issue:
                    for comment in issue['comments']:
                        category = comment.get('category', 'other')
                        category_counts[category] += 1
                        total_comments += 1
    
    # Kategorileri sayıya göre sırala (en çoktan en aza)
    sorted_categories = sorted(category_counts.items(), key=lambda x: x[1], reverse=True)
    
    # Sonuçları yazdır
    print(f"Toplam yorum sayısı: {total_comments}\n")
    print(f"{'='*80}")
    print(f"{'SIRA':<6} {'KATEGORİ ID':<25} {'KATEGORİ ADI':<30} {'YORUM SAYISI':<15} {'YÜZDE':<10}")
    print(f"{'='*80}")
    
    results = []
    for rank, (cat_id, count) in enumerate(sorted_categories, 1):
        cat_name = CATEGORIES.get(cat_id, {}).get('name', cat_id)
        percentage = (count / total_comments * 100) if total_comments > 0 else 0
        
        print(f"{rank:<6} {cat_id:<25} {cat_name:<30} {count:<15} {percentage:>6.2f}%")
        
        results.append({
            'rank': rank,
            'category_id': cat_id,
            'category_name': cat_name,
            'count': count,
            'percentage': round(percentage, 2)
        })
    
    print(f"{'='*80}\n")
    
    # Sonuçları JSON'a kaydet
    output_data = {
        'generated_at': datetime.now().isoformat(),
        'total_comments': total_comments,
        'total_files_analyzed': len(json_files),
        'categories': results
    }
    
    output_file = Path('reports/category_analysis.json')
    output_file.parent.mkdir(exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Analiz sonuçları kaydedildi: {output_file}\n")
    
    return results, total_comments

if __name__ == "__main__":
    analyze_categories()
