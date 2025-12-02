# 🚀 Margaz Projesi - Sunum ve Demo Kurulum Rehberi

Bu rehber, projeyi **başka bir bilgisayarda (Bilgisayar B)**, internet veya AWS zorunluluğu olmadan, tamamen **yerel (local)** olarak çalıştırmak için hazırlanmıştır.

## 📋 Ön Hazırlık (Bilgisayar B'de Yapılacaklar)

Sunum yapacağın bilgisayarda şunların kurulu olması gerekir:
1.  **Node.js:** [Buradan indirip kur](https://nodejs.org/en/download/). (LTS sürümü önerilir).
2.  **Git:** (Opsiyonel ama önerilir) [Buradan indir](https://git-scm.com/downloads).
3.  **Arduino IDE:** (Arduino'yu test etmek istersen).

---

## 💾 Adım 1: Dosyaları Taşıma

1.  **Bilgisayar A**'daki `margaz-kontrol` klasörünü bir USB belleğe kopyala.
2.  **Bilgisayar B**'de Masaüstüne yapıştır.
    *   *Not: `node_modules` klasörlerini kopyalamana gerek yok, çok yer kaplar. Onları yeni bilgisayarda tekrar yükleyeceğiz.*

---

## ⚙️ Adım 2: Kurulum (Bilgisayar B'de)

Bilgisayar B'de bir terminal (PowerShell veya CMD) aç ve sırasıyla şunları yap:

### 1. Backend Kurulumu
```bash
cd Desktop/margaz-kontrol/backend
npm install
```

### 2. Frontend Kurulumu
```bash
cd ../frontend
npm install
```

---

## 🔌 Adım 3: Donanım Bağlantısı

1.  **Arduino'yu** Bilgisayar B'nin USB portuna tak.
2.  Bilgisayarın Arduino'yu tanıdığından emin ol (Aygıt Yöneticisi'nden bakabilirsin, genelde COM3, COM4 gibi bir port alır).
3.  Bizim kodumuz Arduino'yu otomatik bulmaya çalışır ama bulamazsa `backend/src/services/serial.service.ts` dosyasında `COM` portunu güncellemen gerekebilir.

---

## ▶️ Adım 4: Başlatma (Sunum Anı)

Sunum sırasında iki ayrı terminal penceresi açman gerekecek.

### Terminal 1: Backend (Beyin)
Bu terminal Arduino ile konuşacak ve verileri işleyecek.
```bash
cd Desktop/margaz-kontrol/backend
npm run dev
```
*Ekranda "Serial port opened" veya "Connected" yazısını görmelisin.*

### Terminal 2: Frontend (Yüz)
Bu terminal web sitesini açacak.
```bash
cd Desktop/margaz-kontrol/frontend
npm run dev
```
*Bu komut sana `http://localhost:5173` gibi bir adres verecek. O adrese tıkla.*

---

## 🎯 Sonuç

Artık tarayıcıda açılan site:
1.  **AWS'ye gitmez**, direkt senin bilgisayarındaki Backend'e bağlanır.
2.  **İnternet gerekmez**, her şey kablo üzerinden akar.
3.  Arduino'daki potansiyometreyi çevirdiğinde ekrandaki barın dolduğunu görürsün.

**Önemli Not:**
Netlify adresini (`margaz.netlify.app`) **KULLANMA**. O adres internete çıkmaya çalışır. Sen `localhost:5173` adresini kullanacaksın.
