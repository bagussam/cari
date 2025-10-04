cari.AI - Multimodal Digital Detective
Welcome to cari.AI, an intelligent chatbot designed with the persona of a digital detective. This application not only answers questions but is also capable of analyzing "evidence" in various formats, conducting real-time "investigations" on the internet, and even creating "visual sketches" based on your descriptions.

✨ Key Features
Contextual & Humanistic Intelligence: Equipped with the ability to understand daily conversations, detect emotions, and provide feedback to make interactions feel more alive.

Multimodal Capabilities:

Image Analysis: Upload image files (.jpg, .png, etc.) and ask questions about their content.

Document Analysis: Upload text files (.txt, .md) to be summarized or analyzed.

Image Generation (Text-to-Image): Create unique images directly from the chat with commands like "create a picture of...".

RAG (Retrieval-Augmented Generation): Integrated with the Exa API and LangChain to search for the latest information on the internet, ensuring answers are always relevant and factual.

Adaptive & Thematic Interface:

Dual Theme Options: Switch between "Cheerful" (light) and "Mysterious" (dark) modes.

Responsive Design: Optimal display on desktop, tablet, and mobile devices.

Detective UI: Adorned with visual elements themed around investigation for a more immersive experience.

🛠️ Tech Stack
Frontend: HTML5, CSS3, Vanilla JavaScript

Backend: Node.js, Express.js

AI & APIs:

Core Language Model: Google Gemini 2.5 Flash

Image Generation: Google Imagen 3

Web Search: Exa API

RAG Orchestration: LangChain.js

🚀 Getting Started
Follow these steps to run the project on your local machine.

Prerequisites
Node.js: Ensure you have Node.js version 18 or newer installed.

Git: Required for cloning the repository.

API Keys: You will need API keys from:

Google AI Studio (for Gemini & Imagen)

Exa API

Installation
Create .env File: In the project's root directory, create a file named .env and fill it with your API keys as shown in the example below:

GEMINI_API_KEY=Your_Google_API_Key
EXA_API_KEY=Your_Exa_API_Key

Install Dependencies: Open a terminal in the project folder and run the command:

npm install

If you encounter an ERESOLVE error, use the following command instead:

npm install --legacy-peer-deps

Run the Server: Once the installation is complete, run the server with:

node index.js

Open the Application: Open your browser and navigate to http://localhost:3000.

📂 Project Structure
/
├── public/                 # All frontend files (view)
│   ├── index.html          # Main page structure
│   ├── style.css           # Styling and themes
│   └── script.js           # User interaction logic
├── node_modules/           # Dependency folder (auto-generated)
├── .env                    # File for storing secret API keys
├── .gitignore              # List of files ignored by Git
├── index.js                # Main server and AI logic
├── package.json            # Project configuration and dependency list
└── README.md               # This documentation


🚢 Publishing to GitHub
For a guide on how to upload this project to your GitHub repository, please refer to the README-DEPLOYMENT.md file.
