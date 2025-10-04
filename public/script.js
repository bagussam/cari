// Tunggu hingga seluruh dokumen HTML dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Ambil referensi ke semua elemen HTML ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const attachButton = document.getElementById('attach-button');
    const fileOptions = document.getElementById('file-options');
    const imageUploadInput = document.getElementById('image-upload');
    const docUploadInput = document.getElementById('doc-upload');

    let chatHistory = [];
    let attachedFile = null;

    // --- Pemeriksaan Elemen ---
    if (!chatForm || !chatInput || !chatBox || !themeToggle || !body || !attachButton || !fileOptions || !imageUploadInput || !docUploadInput) {
        console.error("Satu atau lebih elemen HTML penting tidak ditemukan.");
        return; 
    }

    // --- Logika Tombol Tema ---
    function applyTheme(theme) {
        body.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    applyTheme(localStorage.getItem('theme') || 'light');

    // --- Logika Tombol Lampirkan ---
    attachButton.addEventListener('click', () => {
        fileOptions.classList.toggle('show');
    });

    // --- Fungsi Utama untuk Mengirim Pesan ---
    const handleSendMessage = async () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage && !attachedFile) return;

        // Cek apakah ini perintah untuk membuat gambar
        const isImageGenerationCommand = /^(buat|buatkan|generate|ciptakan)\s+(gambar|foto|lukisan|ilustrasi)/i.test(userMessage);

        if (isImageGenerationCommand) {
            handleGenerateImage(userMessage);
            return;
        }

        if (userMessage) appendMessage(userMessage, 'user');
        chatHistory.push({ role: 'user', content: userMessage });
        
        const payload = { 
            message: userMessage, 
            history: chatHistory,
            file: attachedFile 
        };
        
        chatInput.value = '';
        attachedFile = null; 
        
        const thinkingMessage = appendMessage('...', 'bot', true);
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            updateMessage(thinkingMessage, data.reply);
            chatHistory.push({ role: 'bot', content: data.reply });

        } catch (error) {
            console.error('Error:', error);
            updateMessage(thinkingMessage, 'Maaf, terjadi kesalahan koneksi.');
        }
    };

    // --- Fungsi untuk Menghasilkan Gambar ---
    const handleGenerateImage = async (prompt) => {
        appendMessage(prompt, 'user');
        chatInput.value = '';
        const thinkingMessage = appendMessage('Sedang melukis...', 'bot', true);

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            const imageUrl = data.imageUrl;
            const imageMarkdown = `![${prompt}](${imageUrl})`;
            updateMessage(thinkingMessage, `Berikut adalah hasil investigasi visual Anda:\n${imageMarkdown}`);

        } catch (error) {
            console.error('Error:', error);
            updateMessage(thinkingMessage, 'Maaf, saya gagal menghasilkan gambar.');
        }
    };

    // --- Fungsi untuk Menangani Unggahan File ---
    const handleFileUpload = (file) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            appendMessage('Ukuran file terlalu besar (maks 5MB).', 'bot');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            attachedFile = {
                name: file.name,
                type: file.type,
                data: e.target.result.split(',')[1]
            };
            appendMessage(`Dokumen terlampir: **${file.name}**. Silakan ajukan pertanyaan tentang dokumen ini.`, 'bot');
            fileOptions.classList.remove('show');
        };
        reader.onerror = () => appendMessage('Gagal membaca file.', 'bot');
        reader.readAsDataURL(file);
    };


    // --- Atur Pendengar Aksi (Event Listeners) ---
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSendMessage();
    });
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    document.getElementById('image-upload-label').addEventListener('click', () => imageUploadInput.click());
    document.getElementById('doc-upload-label').addEventListener('click', () => docUploadInput.click());
    imageUploadInput.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));
    docUploadInput.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));

    // Sembunyikan menu jika diklik di luar
    document.addEventListener('click', (e) => {
        if (!attachButton.contains(e.target) && !fileOptions.contains(e.target)) {
            fileOptions.classList.remove('show');
        }
    });


    // --- Fungsi Bantuan untuk Memperbarui Tampilan Chat ---
    function appendMessage(text, sender, isThinking = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        
        if (sender === 'user') {
            messageElement.textContent = text;
        } else {
            if (typeof marked !== 'undefined') {
                messageElement.innerHTML = marked.parse(text, { breaks: true, gfm: true });
            } else {
                messageElement.textContent = text;
            }
        }

        if (isThinking) messageElement.classList.add('thinking');
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageElement;
    }

    function updateMessage(element, newText) {
        element.classList.remove('thinking');
        if (typeof marked !== 'undefined') {
            element.innerHTML = marked.parse(newText, { breaks: true, gfm: true });
        } else {
            element.textContent = newText;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

