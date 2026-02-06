#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tek tek içerik kategorize etme scripti
Her bir içeriği ayrı ayrı analiz edip kategorize eder
"""

import json
import re
from pathlib import Path

# Kategoriler ve keyword'leri yükle
with open('data/categories.json', 'r', encoding='utf-8') as f:
    categories_data = json.load(f)
    CATEGORIES = {cat['id']: cat for cat in categories_data['categories']}

def normalize_text(text):
    """Türkçe karakterleri normalize et ve küçük harfe çevir"""
    if not text:
        return ""
    text = text.lower()
    # Türkçe karakterleri değiştir
    replacements = {
        'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
        'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
    }
    for tr_char, en_char in replacements.items():
        text = text.replace(tr_char, en_char)
    return text

def categorize_single_content(text):
    """
    Tek bir içeriği kategorize et
    Keyword matching kullanarak en uygun kategoriyi bul
    """
    if not text:
        return "other"
    
    normalized_text = normalize_text(text)
    
    # Her kategori için puan hesapla
    scores = {}
    for cat_id, cat_data in CATEGORIES.items():
        if cat_id == "other":  # other'ı son seçenek olarak bırak
            continue
        
        score = 0
        keywords = cat_data.get('keywords', [])
        
        for keyword in keywords:
            normalized_keyword = normalize_text(keyword)
            # Keyword bulunursa puan ver
            if normalized_keyword in normalized_text:
                # Uzun keyword'ler daha fazla puan alsın
                score += len(normalized_keyword.split())
        
        if score > 0:
            scores[cat_id] = score
    
    # En yüksek puanlı kategoriyi döndür
    if scores:
        best_category = max(scores.items(), key=lambda x: x[1])[0]
        return best_category
    
    return "other"

def process_file(filepath):
    """Bir JSON dosyasındaki tüm içerikleri tek tek kategorize et"""
    print(f"\n{'='*80}")
    print(f"Dosya işleniyor: {filepath.name}")
    print(f"{'='*80}\n")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    changed_count = 0
    total_count = 0
    
    # Issues içindeki her bir içeriği işle
    if 'issues' in data:
        for issue in data['issues']:
            if 'comments' not in issue:
                continue
            
            for comment in issue['comments']:
                total_count += 1
                text = comment.get('text', '')
                old_category = comment.get('category', 'other')
                
                # Tek tek kategorize et
                new_category = categorize_single_content(text)
                
                if old_category != new_category:
                    changed_count += 1
                    print(f"[{changed_count}] İçerik #{total_count} kategorisi değişti:")
                    print(f"  Eski: {old_category}")
                    print(f"  Yeni: {new_category}")
                    print(f"  Metin: {text[:100]}...")
                    print()
                
                # Yeni kategoriyi kaydet
                comment['category'] = new_category
    
    # Dosyayı kaydet
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\n{filepath.name} tamamlandı!")
    print(f"  Toplam içerik: {total_count}")
    print(f"  Değiştirilen: {changed_count}")
    print(f"  Değişmeyen: {total_count - changed_count}\n")
    
    return changed_count, total_count

def main():
    """Ana fonksiyon - tüm dosyaları işle"""
    data_dir = Path('data')
    json_files = sorted(data_dir.glob('*-full.json'))
    
    total_changed = 0
    total_content = 0
    
    print("\n" + "="*80)
    print("GARANTI BBVA - TEK TEK İÇERİK KATEGORİZASYON")
    print("="*80)
    print(f"\nToplam {len(json_files)} dosya bulundu\n")
    
    for json_file in json_files:
        changed, total = process_file(json_file)
        total_changed += changed
        total_content += total
    
    print("\n" + "="*80)
    print("ÖZET RAPOR")
    print("="*80)
    print(f"Toplam içerik sayısı: {total_content}")
    print(f"Kategorisi değiştirilen: {total_changed}")
    print(f"Değişiklik oranı: {(total_changed/total_content*100):.1f}%")
    print("="*80 + "\n")

if __name__ == "__main__":
    main()
