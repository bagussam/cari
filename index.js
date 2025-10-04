import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { body, validationResult } from 'express-validator';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch'; // Diperlukan untuk panggilan API Imagen

// LangChain & Exa Imports (Tetap ada untuk RAG)
import Exa from 'exa-js';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


// Muat variabel lingkungan
dotenv.config();

// Inisialisasi Express & Keamanan
const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Naikkan limit untuk file
app.use(hpp());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit',
});

// Sajikan file frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Inisialisasi Klien API
const exa = new Exa(process.env.EXA_API_KEY);
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-preview-05-20",
    apiKey: process.env.GEMINI_API_KEY,
});
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY
});

// Aturan validasi input
const chatValidationRules = [
    body('message').trim().escape(),
    body('history').isArray(),
];

// Endpoint API Chat (Multimodal)
app.post('/api/chat', limiter, chatValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { message, history, file } = req.body;
        const historyString = history.map(turn => `${turn.role}: ${turn.content}`).join('\n');

        // 1. Logika untuk Analisis File (Gambar/Dokumen Teks)
        if (file && file.data) {
            const prompt = `Anda adalah "cari.AI", seorang detektif AI. Analisis file terlampir dan jawab pertanyaan berikut: "${message}". Berikan analisis mendalam Anda dalam format Markdown.`;
            const filePart = { inlineData: { data: file.data, mimeType: file.type } };
            const result = await model.invoke([prompt, filePart]);
            return res.json({ reply: result.content });
        }

        // 3. Alur RAG & Standar (hanya teks)
        const standardPromptTemplate = `Anda adalah "cari.AI", detektif AI multibahasa yang cerdas dan humanis. Anda memiliki riwayat percakapan sebelumnya. Jawab pertanyaan pengguna saat ini.
        ATURAN UTAMA:
        1. Jawab selalu dalam bahasa yang sama dengan pertanyaan terakhir pengguna.
        2. Gunakan format Markdown (**bold**, *italic*, daftar berpoin/bernomor) untuk membuat jawaban terstruktur dan mudah dibaca.
        3. Untuk sapaan atau pertanyaan keseharian (contoh: "apa kabar?", "terima kasih"), berikan jawaban yang singkat, ramah, dan ajukan pertanyaan balasan untuk menjaga percakapan tetap hidup.
        4. Analisis riwayat percakapan untuk meniru gaya bahasa pengguna dan menambah kosakata baru.
        5. Jika pengguna mengirim beberapa pesan berturut-turut yang berkaitan, anggap itu sebagai satu pemikiran utuh dan berikan satu jawaban komprehensif.

        Riwayat Percakapan (untuk konteks):
        {history}
        
        Pertanyaan Saat Ini: "{question}"

        Deduksi Final Anda:`;
        
        const prompt = await PromptTemplate.fromTemplate(standardPromptTemplate).format({
            history: historyString,
            question: message,
        });
        
        const result = await model.invoke(prompt);
        return res.json({ reply: result.content });


    } catch (error) {
        console.error('Error saat memproses chat:', error);
        res.status(500).json({ error: 'Terjadi kesalahan internal.' });
    }
});

// Endpoint baru khusus untuk Text-to-Image
app.post('/api/generate-image', limiter, async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: 'Prompt tidak boleh kosong.' });

        const apiKey = process.env.GEMINI_API_KEY;
        // Menggunakan model Imagen 3 untuk kualitas terbaik
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
        const payload = { instances: [{ prompt }], parameters: { "sampleCount": 1 } };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            throw new Error(`API Error: ${apiResponse.statusText} - ${errorBody}`);
        }

        const result = await apiResponse.json();
        const base64Data = result.predictions?.[0]?.bytesBase64Encoded;

        if (base64Data) {
            res.json({ imageUrl: `data:image/png;base64,${base64Data}` });
        } else {
            throw new Error("Gagal mendapatkan data gambar dari respons API.");
        }
    } catch (error) {
        console.error('Error saat menghasilkan gambar:', error);
        res.status(500).json({ error: 'Gagal menghasilkan gambar.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server RAG berjalan di http://localhost:${PORT}`);
});

