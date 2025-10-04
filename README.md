cari.AI - Detektif Digital Multimodal
Selamat datang di cari.AI, sebuah chatbot cerdas yang dirancang dengan persona seorang detektif digital. Aplikasi ini tidak hanya menjawab pertanyaan, tetapi juga mampu menganalisis "bukti" dalam berbagai format, melakukan "investigasi" di internet secara real-time, dan bahkan membuat "sketsa visual" berdasarkan deskripsi Anda.

✨ Fitur Utama
Kecerdasan Kontekstual & Humanis: Dibekali kemampuan untuk memahami percakapan sehari-hari, mendeteksi emosi, dan memberikan umpan balik agar interaksi terasa lebih hidup.

Kemampuan Multimodal:

Analisis Gambar: Unggah file gambar (.jpg, .png, dll.) dan ajukan pertanyaan tentang isinya.

Analisis Dokumen: Unggah file teks (.txt, .md) untuk diringkas atau dianalisis.

Generasi Gambar (Text-to-Image): Buat gambar unik langsung dari obrolan dengan perintah seperti "buatkan gambar...".

RAG (Retrieval-Augmented Generation): Terintegrasi dengan Exa API dan LangChain untuk mencari informasi terbaru di internet, memastikan jawaban selalu relevan dan faktual.

Antarmuka Adaptif & Tematik:

Dua Pilihan Tema: Beralih antara mode "Ceria" (terang) dan "Misterius" (gelap).

Desain Responsif: Tampilan yang optimal di perangkat desktop, tablet, maupun mobile.

UI Detektif: Dihiasi dengan elemen visual bertema investigasi untuk pengalaman yang lebih imersif.

🛠️ Tumpukan Teknologi (Tech Stack)
Frontend: HTML5, CSS3, Vanilla JavaScript

Backend: Node.js, Express.js

AI & API:

Model Bahasa Inti: Google Gemini 2.5 Flash

Generasi Gambar: Google Imagen 3

Pencarian Web: Exa API

Orkestrasi RAG: LangChain.js

🚀 Memulai (Getting Started)
Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal Anda.

Prasyarat
Node.js: Pastikan Anda memiliki Node.js versi 18 atau lebih baru.

Git: Diperlukan untuk mengkloning repository.

API Keys: Anda memerlukan kunci API dari:

Google AI Studio (untuk Gemini & Imagen)

Exa API

Instalasi
Buat File .env: Di direktori utama proyek, buat file bernama .env dan isi dengan kunci API Anda seperti contoh di bawah:

GEMINI_API_KEY=Kunci_API_Google_Anda
EXA_API_KEY=Kunci_API_Exa_Anda

Instal Dependensi: Buka terminal di folder proyek dan jalankan perintah:

npm install

Jika Anda mengalami error ERESOLVE, gunakan perintah berikut:

npm install --legacy-peer-deps

Jalankan Server: Setelah instalasi selesai, jalankan server dengan:

node index.js

Buka Aplikasi: Buka browser Anda dan kunjungi alamat http://localhost:3000.

📂 Struktur Proyek
/
├── public/                 # Semua file frontend (tampilan)
│   ├── index.html          # Struktur utama halaman
│   ├── style.css           # Styling dan tema
│   └── script.js           # Logika interaktif pengguna
├── node_modules/           # Folder dependensi (dibuat otomatis)
├── .env                    # File untuk menyimpan kunci API (rahasia)
├── .gitignore              # Daftar file yang diabaikan oleh Git
├── index.js                # Logika utama server dan AI
├── package.json            # Konfigurasi proyek dan daftar dependensi
└── README.md               # Dokumentasi ini

🚢 Publikasi ke GitHub
Untuk panduan cara mengunggah proyek ini ke repository GitHub Anda, silakan merujuk ke file README-DEPLOYMENT.md.
