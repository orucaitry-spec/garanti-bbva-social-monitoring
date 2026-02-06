# Kategori Analiz ve Sıralama Raporu
**Tarih:** 6 Şubat 2026  
**Proje:** Garanti BBVA Sosyal Medya İzleme

---

## 📊 Özet

Garanti BBVA sosyal medya izleme projesindeki **toplam 319 yorum** analiz edildi ve kategorilere göre gruplandı. Kategoriler EN ÇOK YORUM içerenden EN AZA doğru sıralandı.

---

## 🎯 Analiz Sonuçları

### Kategori Sıralaması (En Çok Yorum İçeren → En Az)

| Sıra | Kategori | Kategori Adı | Yorum Sayısı | Yüzde |
|------|----------|--------------|--------------|-------|
| 🥇 1 | general_app | Uygulama Genel | **62** | 19.44% |
| 🥈 2 | customer_service | Müşteri Hizmetleri | **30** | 9.40% |
| 🥉 3 | ui_ux | Kullanıcı Deneyimi | **29** | 9.09% |
| 4 | app_update | Güncelleme Sorunu | **27** | 8.46% |
| 5 | connection | Bağlantı Sorunları | **26** | 8.15% |
| 6 | card | Kart İşlemleri | **18** | 5.64% |
| 7 | complaint | Şikayet Genel | **18** | 5.64% |
| 8 | login | Şifre & Kimlik | **17** | 5.33% |
| 9 | payment | Fatura & Ödeme | **15** | 4.70% |
| 10 | fee | İşlem Ücreti | **14** | 4.39% |
| 11 | atm | ATM & Para Çekme | **12** | 3.76% |
| 12 | branch_staff | Şube & Personel | **9** | 2.82% |
| 13 | feature | Özellik Talebi | **8** | 2.51% |
| 14 | app_security | Uygulama Güvenliği | **8** | 2.51% |
| 15 | loan | Kredi & Limit | **8** | 2.51% |
| 16 | other | Diğer | **4** | 1.25% |
| 17 | account | Hesap İşlemleri | **4** | 1.25% |
| 18 | performance | Performans & Hız | **3** | 0.94% |
| 19 | investment | Yatırım & Borsa | **3** | 0.94% |
| 20 | notification | Bildirim & SMS | **2** | 0.63% |
| 21 | insurance | Sigorta | **1** | 0.31% |
| 22 | battery | Pil Tüketimi | **1** | 0.31% |

---

## 🔝 En Çok Yorum Alan Kategoriler (Top 5)

1. **Uygulama Genel** - 62 yorum (19.44%)
   - Mobil uygulama hakkında genel geri bildirimler
   - En büyük kategori - kullanıcıların %19'u bu kategoride

2. **Müşteri Hizmetleri** - 30 yorum (9.40%)
   - Destek ve iletişim konuları
   - İkinci en büyük sorun alanı

3. **Kullanıcı Deneyimi (UI/UX)** - 29 yorum (9.09%)
   - Arayüz tasarımı ve kullanılabilirlik
   - Tasarım iyileştirme fırsatları

4. **Güncelleme Sorunu** - 27 yorum (8.46%)
   - Yeni sürüm problemleri
   - Güncelleme sonrası hatalar

5. **Bağlantı Sorunları** - 26 yorum (8.15%)
   - Ağ ve sunucu erişim problemleri
   - Kritik teknik sorun

---

## 📉 En Az Yorum Alan Kategoriler (Bottom 5)

18. **Performans & Hız** - 3 yorum (0.94%)
19. **Yatırım & Borsa** - 3 yorum (0.94%)
20. **Bildirim & SMS** - 2 yorum (0.63%)
21. **Sigorta** - 1 yorum (0.31%)
22. **Pil Tüketimi** - 1 yorum (0.31%)

---

## 💡 Önemli Bulgular

### 📊 Dağılım Analizi
- **İlk 5 kategori** toplam yorumların **%54.54**'ünü oluşturuyor
- **İlk 10 kategori** toplam yorumların **%78.68**'ini kapsıyor
- **Son 5 kategori** sadece **%4.07** pay alıyor

### 🎯 Odaklanılması Gereken Alanlar
1. **Uygulama Genel** (62 yorum) - En yüksek hacim
2. **Müşteri Hizmetleri** (30 yorum) - Destek kalitesi
3. **UI/UX** (29 yorum) - Kullanıcı deneyimi iyileştirme
4. **Güncelleme Sorunları** (27 yorum) - QA ve test süreçleri
5. **Bağlantı Sorunları** (26 yorum) - Teknik altyapı

### ⚠️ Kritik Noktalar
- **Müşteri hizmetleri** ve **şikayet** kategorileri toplamda 48 yorum (%15) - müşteri memnuniyeti sorunu
- **Güncelleme** ve **performans** sorunları birleşince 30 yorum (%9.4) - kalite kontrol gereksinimi
- **Bağlantı** sorunları 26 yorum (%8.15) - altyapı güvenilirliği sorgulanıyor

---

## 🚀 Gerçekleştirilen İşlemler

### ✅ 1. Kategori Analiz Scripti Oluşturuldu
- **Dosya:** `analyze_categories.js` (Node.js versiyonu)
- **Dosya:** `analyze_categories.py` (Python versiyonu)
- **Fonksiyon:** Tüm JSON dosyalarını tarar, yorumları kategorilere göre gruplar ve sayar

### ✅ 2. Analiz Sonuçları Kaydedildi
- **Dosya:** `reports/category_analysis.json`
- **İçerik:** Kategori sıralaması, yorum sayıları, yüzde hesaplamaları
- **Format:** JSON (programatik erişim için)

### ✅ 3. Dashboard Güncellendi
- **Yeni Section:** "📊 Kategori Sıralaması - En Çok Yorum İçeren Kategoriler"
- **Görselleştirme:** 
  - Sıralama tablosu
  - Renkli rank badge'leri (1-3: altın, 4-10: mavi, 11+: gri)
  - Yorum sayısı bar chartları
  - Yüzde göstergeleri
- **Yerleşim:** "Tüm Yorumlar" ile "Benzer Yorumlar" arasında

### ✅ 4. GitHub'a Push Edildi
- **Commit:** `feat: Kategori analizi ve sıralama eklendi`
- **Branch:** `main`
- **Dosyalar:**
  - `index.html` (güncellendi)
  - `analyze_categories.js` (yeni)
  - `analyze_categories.py` (yeni)
  - `reports/category_analysis.json` (yeni)
  - `update_dashboard.js` (yeni - dashboard güncelleme helper)

---

## 📈 Sıralama Değişiklikleri

**İlk Analiz** olduğu için önceki sıralama yok. Ancak ileride:
- Bu rapor baseline olarak kullanılacak
- Her yeni analiz bu sıralama ile karşılaştırılacak
- Trend değişiklikleri izlenecek (hangi kategoriler yükseliyor/düşüyor)

---

## 🔄 Gelecek Adımlar

### 1. **Düzenli Takip**
- Her gün `analyze_categories.js` çalıştırılabilir
- Trend değişiklikleri izlenebilir
- Sıralama değişimleri raporlanabilir

### 2. **Aksiyon Planları**
- **Top 3 kategori** için çözüm ekipleri oluşturulmalı
- **Müşteri hizmetleri** için SLA hedefleri belirlenebilir
- **UI/UX** için kullanıcı araştırması yapılabilir

### 3. **Otomasyon**
- GitHub Actions ile otomatik analiz
- Haftalık trend raporları
- E-posta bildirimleri

---

## 📋 Teknik Detaylar

### Analiz Kapsamı
- **Taranan Dosya:** 7 JSON dosyası (2026-01-28 → 2026-02-03)
- **Toplam Yorum:** 319
- **Kategori Sayısı:** 22 aktif kategori
- **Veri Kaynağı:** iOS Store, Android Store, Twitter, LinkedIn

### Kullanılan Teknolojiler
- **Analiz:** Node.js / Python
- **Görselleştirme:** HTML5, CSS3, JavaScript
- **Veri Formatı:** JSON
- **Version Control:** Git/GitHub

---

## 📞 İletişim

**Sorumlu:** Oruç (orucc)  
**Proje:** garanti-bbva-social-monitoring  
**Dashboard:** https://orucaitry-spec.github.io/garanti-bbva-social-monitoring/

---

**Rapor Tarihi:** 6 Şubat 2026, 17:40  
**Rapor Versiyonu:** 1.0  
**Analiz Metodu:** Keyword-based categorization + Manual review
