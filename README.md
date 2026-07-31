# 🕵️‍♂️ cari.AI – Multimodal Digital Detective & RAG Chatbot

> **cari.AI** is an AI-powered multimodal chatbot that acts as a digital detective, capable of conducting real-time web investigations, retrieving trusted information, and generating context-aware responses through Retrieval-Augmented Generation (RAG). Built with **Node.js**, **Express.js**, **LangChain.js**, and **Google Gemini 2.5 Flash**, the application combines modern AI orchestration with enterprise-grade backend security.

---

## ✨ Features

### 🧠 Intelligent Conversational AI
- Powered by **Google Gemini 2.5 Flash**
- Natural, context-aware conversations
- Supports multimodal reasoning and document understanding

### 🔍 Real-Time Retrieval-Augmented Generation (RAG)
- Live web search using **Exa AI**
- Automatically retrieves and analyzes relevant online sources
- Context grounding through LangChain pipelines
- Web scraping support using **Cheerio**

### 📚 Vector Memory
- Memory-based document retrieval
- Semantic search with **Memory Vector Store**
- Context preservation across conversations

### 🛡️ Enterprise-Level Security
- HTTP security headers via **Helmet**
- API rate limiting with **Express Rate Limit**
- Request validation using **Express Validator**
- HTTP Parameter Pollution protection (**HPP**)
- Environment variable management with **dotenv**

### ⚡ High Performance Backend
- Express.js REST API
- ES Modules architecture
- Modular and scalable codebase
- Easy integration with frontend applications

---

# 🏗️ Tech Stack

## Backend
- Node.js
- Express.js
- ES Modules

## Artificial Intelligence
- Google Gemini 2.5 Flash
- LangChain.js
- LangChain Community
- LangChain Google GenAI

## Search & Retrieval
- Exa AI API
- Cheerio
- Memory Vector Store

## Security
- Helmet
- Express Rate Limit
- Express Validator
- HPP
- dotenv

---

# 📦 Dependencies

### Core Dependencies

| Package | Description |
|---------|-------------|
| express | Web framework |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment variables |
| langchain | LLM orchestration |
| @langchain/community | LangChain community integrations |
| @langchain/google-genai | Google Gemini integration |
| @google/generative-ai | Gemini SDK |
| exa-js | Exa Search API |
| cheerio | HTML parser |
| memory-vector-store | Vector memory storage |
| helmet | HTTP security headers |
| express-rate-limit | Rate limiting |
| express-validator | Input validation |
| hpp | HTTP Parameter Pollution protection |

---

# 🚀 Getting Started

## Prerequisites

Before running this project, make sure you have:

- Node.js **v18+**
- npm
- Google Gemini API Key
- Exa API Key

---

## Installation

### Clone the repository

```bash
git clone https://github.com/bagussam/cari.AI.git
```

```bash
cd cari.AI
```

---

### Install dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_google_gemini_api_key
EXA_API_KEY=your_exa_api_key
PORT=3000
```

---

### Start the development server

```bash
npm start
```

or

```bash
node index.js
```

The server will be running at

```
http://localhost:3000
```

---

# 📁 Project Structure

```
cari.AI/
│
├── public/                    # Frontend assets
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── node_modules/
│
├── .env
├── .gitignore
├── index.js                   # Express server & LangChain RAG pipeline
├── package.json
├── package-lock.json
└── README.md
```

---

# 🔄 System Workflow

```text
                    User Query
                         │
                         ▼
               Express.js API Server
                         │
                         ▼
              LangChain Orchestrator
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
 Google Gemini 2.5 Flash           Exa Search API
        │                                 │
        ▼                                 ▼
  Context Understanding         Retrieve Web Documents
        │                                 │
        └──────────────┬──────────────────┘
                       ▼
             Memory Vector Store
                       │
                       ▼
             Contextual Response
                       │
                       ▼
                    Frontend
```

---

# 🔒 Security Features

This project follows several backend security best practices:

- ✅ Secure HTTP Headers (Helmet)
- ✅ API Rate Limiting
- ✅ Input Validation
- ✅ HTTP Parameter Pollution Protection
- ✅ Environment Variable Isolation
- ✅ CORS Configuration

---

# 🎯 Use Cases

- AI Research Assistant
- Digital Investigation
- Real-Time Knowledge Retrieval
- Retrieval-Augmented Chatbot
- Educational Assistant
- Technical Documentation Search
- Internal Knowledge Base
- Customer Support AI

---

# 📈 Future Improvements

- Conversation History Database
- Authentication & Authorization
- File Upload (PDF, DOCX)
- Vector Database Integration (Pinecone, Chroma, Weaviate)
- Voice-to-Text Support
- Image Understanding
- Multi-Agent Workflow
- Streaming Responses
- Docker Deployment
- CI/CD Pipeline
- Redis Caching
- Kubernetes Deployment

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork this repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to GitHub.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **ISC License**.

---

# 👨‍💻 Author

**Bagus Samudro Aji Luhur**

- GitHub: https://github.com/bagussam
- LinkedIn: https://linkedin.com/in/bagus-samudro-aji-luhur/

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

Your support helps improve and maintain future AI-powered open-source projects.
