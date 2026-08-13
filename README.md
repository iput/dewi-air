# 💧 🧘‍♀️ HydraStretch - Browser Extension

**HydraStretch** adalah ekstensi Google Chrome ringan dan ramah pengguna yang dirancang untuk membantu pekerja *Work From Home (WFH)*, pengembang web, dan siapapun yang bekerja lama di depan layar komputer agar tetap terhidrasi dan aktif melakukan peregangan otot secara berkala.

Didampingi oleh **Dewi** — karakter maskot pengingat yang ramah, HydraStretch akan memberikan notifikasi lembut beserta efek suara agar kesehatan fisikmu tetap terjaga di sela-sela kesibukan.

---

## ✨ Fitur Utama

- 💧 **Pengingat Minum Air**: Mengingatkanmu untuk minum air putih agar terhindar dari dehidrasi dan menjaga konsentrasi.
- 🧘 **Pengingat Peregangan**: Mengajakmu meregangkan badan dan melembutkan otot-otot yang kaku akibat duduk terlalu lama.
- 🧩 **Smart Merged Notification**: Jika pengingat minum dan peregangan jatuh pada waktu yang sama, notifikasi akan otomatis digabung menjadi satu pesan tunggal yang rapi agar tidak menumpuk atau mengganggu layar kerja.
- ⏱️ **Pilihan Jeda Waktu Fleksibel**: Bebas mengatur interval pengingat mulai dari 10 menit, 30 menit, 45 menit, 1 jam, hingga 2 jam.
- 🔔 **Uji Notifikasi Instan**: Dilengkapi tombol *Uji Notifikasi* di popup untuk mencoba notifikasi dan suara kapan saja secara langsung.
- 🔊 **Efek Suara Notifikasi**: Memutar suara pengingat yang menyenangkan menggunakan *Chrome Offscreen API*.
- 🎨 **Antarmuka Modern**: Desain UI modern dengan tema warna pastel, kartu interaktif, *typography* Plus Jakarta Sans, dan indikator status *live*.

---

## 🛠️ Teknologi yang Digunakan

- **Manifest Version**: Chrome Extension Manifest V3
- **Frontend**: HTML5, Modern CSS3 (Vanilla CSS with CSS Variables & Flexbox/Grid), Vanilla JavaScript (ES6+)
- **Font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
- **Chrome APIs**:
  - `chrome.alarms` — Manajemen timer di background service worker.
  - `chrome.notifications` — Menampilkan pop-up notifikasi desktop OS.
  - `chrome.storage.local` — Menyimpan preferensi dan pengaturan pengguna secara lokal.
  - `chrome.offscreen` — Memutar efek audio notifikasi di background tanpa mengganggu performa.

---

## 🚀 Cara Instalasi (Developer Mode)

Untuk mencoba atau menggunakan ekstensi ini di browser Google Chrome / Brave / Edge:

1. **Unduh / Clone Repository Ini**:
   ```bash
   git clone https://github.com/username/HydraStretch.git
   ```
   *Atau unduh sebagai file `.zip` lalu ekstrak folder proyek.*

2. **Buka Ekstensi Browser**:
   Buka Google Chrome dan ketik URL berikut di address bar:
   ```text
   chrome://extensions/
   ```

3. **Aktifkan Developer Mode**:
   Geser sakelar **Developer mode** (Mode Pengembang) di pojok kanan atas layar ke posisi **ON**.

4. **Muat Ekstensi**:
   - Klik tombol **Load unpacked** (*Muat yang dibuka kemasnya*) di pojok kiri atas.
   - Pilih folder proyek `HydraStretch`.

5. **Selesai!** 🎉
   Ikon **HydraStretch** akan muncul di bilah ekstensi browser Anda. Klik ikon tersebut untuk mengatur jeda waktu dan mengaktifkan pengingat.

---

## 📁 Struktur Proyek

```text
HydraStretch/
├── manifest.json        # Konfigurasi ekstensi Chrome (Manifest V3)
├── background.js        # Service Worker (Manajemen alarm & notifikasi)
├── popup.html           # Struktur antarmuka (UI Popup)
├── popup.css            # Styling antarmuka (Modern CSS)
├── popup.js             # Logika interaksi UI & enkapsulasi storage
├── offscreen.html       # Dokumen tersembunyi untuk audio playback
├── offscreen.js         # Script pemutar suara notifikasi
├── prd.md               # Spesifikasi awal kebutuhan produk
├── read.txt             # Draf postingan sosial media (LinkedIn)
├── README.md            # Dokumentasi utama proyek
└── assets/              # Asset ikon dan maskot Dewi
    ├── icon-16.svg
    ├── icon-48.svg
    ├── icon-128.svg
    ├── water-dewi.svg   # Maskot Dewi Minum
    └── stretch-dewi.svg # Maskot Dewi Peregangan
```

---

## 🔒 Privasi & Keamanan

HydraStretch sepenuhnya menghormati privasi Anda:
- **Tanpa Pengumpulan Data**: Seluruh pengaturan disimpan secara lokal di browser Anda (`chrome.storage.local`).
- **Tanpa Server Eksternal**: Tidak ada data yang dikirim ke server pihak ketiga.
- **Ringan & Hemat Resource**: Berjalan menggunakan Service Worker yang efisien tanpa membebani RAM/CPU saat idle.

---

## 📄 Lisensi

Proyek ini dibuat untuk mendukung kesehatan dan produktivitas kerja harian. Bebas digunakan dan dikembangkan lebih lanjut.
