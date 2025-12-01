# Margaz BTS - Modernizasyon Yol Haritası

Bu belge, Margaz Bayi Takip Sistemi'nin (BTS) modern teknolojilerle sıfırdan yeniden inşa edilmesi için izlenecek adımları içerir.

## Vizyon
Modern, hızlı, mobil uyumlu ve "premium" hissettiren bir arayüz ile bayilerin tank seviyelerini ve lisans durumlarını tek bir yerden takip etmek.

## Faz 1: Temel Kurulum ve Tasarım Sistemi (Hafta 1)
**Hedef:** Projenin iskeletini oluşturmak ve görsel dili belirlemek.
- [ ] **Frontend Kurulumu:**
    - React (Vite) + TypeScript
    - Tailwind CSS (Stil motoru)
    - Framer Motion (Animasyonlar)
    - Shadcn/UI veya Radix UI (Modern bileşen seti)
- [ ] **Backend Kurulumu:**
    - Node.js + Express (veya NestJS)
    - PostgreSQL (Veritabanı)
    - Prisma (ORM)
- [ ] **Tasarım Dili:**
    - Renk Paleti: Kurumsal ve modern (Canlı turuncu/yeşil tonları, Glassmorphism detaylar).
    - Tipografi: Inter veya Outfit.
    - Dark/Light Mode desteği.

## Faz 2: EPDK Veri Entegrasyonu (Hafta 1-2)
**Hedef:** Bayi lisans verilerinin EPDK'dan çekilmesi.
- [ ] **Veri Çekme Stratejisi:**
    - EPDK web sitesi analizi (Captcha/Bot koruması kontrolü).
    - Otomasyon scripti (Puppeteer/Playwright) veya Excel import modülü.
- [ ] **Veritabanı Modellemesi:**
    - `Dealer` (Bayi), `License` (Lisans), `Address` tabloları.
- [ ] **Entegrasyon:**
    - Lisans numarası ile otomatik sorgulama ve veri güncelleme.

## Faz 3: Dashboard ve Harita (Hafta 2-3)
**Hedef:** Verilerin görselleştirilmesi.
- [ ] **Ana Dashboard:**
    - Kritik seviyedeki bayilerin kart görünümü.
    - Toplam doluluk özetleri.
- [ ] **Harita Modülü:**
    - Leaflet veya Google Maps entegrasyonu.
    - Bayilerin harita üzerinde doluluk oranına göre renkli pinlerle gösterimi.
- [ ] **Bayi Detay Sayfası:**
    - Geçmiş dolum verileri grafiği.
    - Lisans geçerlilik durumu.

## Faz 4: IoT ve Telemetri (Hafta 3-4)
**Hedef:** Sahadaki tanklardan canlı veri akışı.
- [ ] **Cihaz Entegrasyonu:**
    - Arduino/GPRS cihazlarından gelen verilerin TCP/UDP veya HTTP ile karşılanması.
    - `TankLevel` verilerinin anlık işlenmesi.
- [ ] **Alarm Sistemi:**
    - Kritik seviye (%20 altı) veya ani düşüşlerde (kaçak riski) bildirim gönderimi.

## Faz 5: Test ve Yayına Alma
- [ ] Uçtan uca testler.
- [ ] Mobil uyumluluk testleri.
- [ ] Docker ile deploy süreçleri.
