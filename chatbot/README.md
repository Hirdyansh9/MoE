# MoE Chatbot

A Text Summarizer using a Mixture of Experts (MoE) model.

## Features

- 🎨 Clean and modern UI/UX matching PrivLens design
- 📝 Markdown support for formatted responses
- 🤖 Backend powered by MoE mT5-small (easily swappable)
- ⚡ Built with React, Vite, Flask, and PyTorch
- 🎯 Responsive design with Tailwind CSS

## Architecture

```
moe-chatbot/
├── frontend/          # React + Vite application
│   ├── MoEChatbot.jsx
│   ├── index.html
│   └── ...
└── backend/           # Flask + PyTorch API
    ├── app.py
    ├── requirements.txt
    └── ...
```

## Quick Start

### Prerequisites

- **Frontend**: Node.js (v16 or higher)
- **Backend**: Python 3.8 or higher
- **Recommended**: 4GB+ RAM for model inference

### 1. Start the Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

The backend will start on `http://localhost:5000` and download the mT5-small model on first run (~1.2GB).

### 2. Start the Frontend

In a new terminal:

```bash
# From the root directory
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`
