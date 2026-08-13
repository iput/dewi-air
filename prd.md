# Product Requirements Document (PRD)
**Project Name:** HydraStretch - Browser Extension
**Version:** 1.0.0 (MVP)
**Target Platform:** Google Chrome (Manifest V3)
**Tech Stack:** HTML, CSS, Vanilla JavaScript (Tanpa Framework tambahan agar ringan)

## 1. Project Overview
HydraStretch adalah ekstensi browser yang ramah pengguna, dirancang khusus untuk pekerja WFH (terutama non-IT) agar tidak lupa minum air dan meregangkan badan. Aplikasi ini menggunakan antarmuka yang sangat sederhana dengan maskot karakter bernama "Dewi" (Tetesan air yang ceria) untuk memberikan notifikasi yang bersahabat, bukan seperti peringatan sistem yang kaku.

## 2. Core Features (MVP)
*   **Popup Settings UI:** Jendela kecil saat ikon ekstensi diklik, berisi pengaturan interval waktu.
*   **Toggles:** Tombol On/Off terpisah untuk pengingat "Minum" (Water) dan "Peregangan" (Stretch).
*   **Interval Selector:** Dropdown untuk memilih jeda waktu (misal: 30 menit, 45 menit, 1 jam, 2 jam).
*   **Background Alarms:** Timer yang berjalan di latar belakang (tidak memakan memori/CPU saat idle).
*   **Rich Desktop Notifications:** Notifikasi sistem (Windows/Mac) dengan ikon karakter "Dewi" dan pesan yang lucu/ramah.
*   **Persistent Storage:** Mengingat pengaturan pengguna meskipun browser ditutup dan dibuka kembali.

## 3. Design System & UI/UX Guidelines
*   **Vibe:** Ramah, menenangkan, bersih, dan mudah digunakan (Zero learning curve).
*   **Color Palette:**
    *   Primary (Water): Soft Sky Blue (`#7DD3FC`)
    *   Secondary (Stretch): Mint Green (`#86EFAC`)
    *   Background: White/Off-white (`#F8FAFC`)
    *   Text: Dark Slate (`#334155`)
*   **Typography:** System default sans-serif (Inter, Segoe UI, San Francisco).
*   **Mascot (Dewi):** Gunakan emoji atau SVG placeholder sederhana terlebih dahulu (seperti 💧 untuk minum dan 🧘 untuk peregangan) sebagai representasi maskot di versi MVP.

## 4. Technical Architecture (Manifest V3)
Aplikasi harus menggunakan standar Chrome Extension Manifest V3 dengan struktur API berikut:
1.  `chrome.storage.sync` atau `chrome.storage.local`: Menyimpan *state* toggle (on/off) dan value interval waktu.
2.  `chrome.alarms`: Membuat alarm di background (Service Worker) berdasarkan interval yang dipilih pengguna.
3.  `chrome.notifications`: Menampilkan pop-up notifikasi OS saat alarm *trigger*.
4.  `Service Worker (background.js)`: Menangani *event listener* dari alarms dan klik notifikasi.

## 5. File Structure
AI Assistant, tolong buatkan struktur file berikut dan isi kodenya:
```text
hydrastretch-extension/
├── manifest.json
├── background.js          (Service worker: handle alarms & notifications)
├── popup.html             (UI ekstensi)
├── popup.css              (Styling UI dengan tema warna pastel)
├── popup.js               (Logika UI: read/write storage, update alarms)
└── assets/
    ├── icon-16.png        (Bisa diganti dengan placeholder warna/emoji)
    ├── icon-48.png
    ├── icon-128.png
    ├── water-dewi.png     (Ikon notifikasi minum)
    └── stretch-dewi.png   (Ikon notifikasi peregangan)
