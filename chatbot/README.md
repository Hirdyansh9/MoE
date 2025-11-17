# MoE Chatbot

A beautiful, full-stack chatbot application using Mixture of Experts (MoE) models with a modern UI inspired by PrivLens.

## Features

- 🎨 Clean and modern UI/UX matching PrivLens design
- 💬 Real-time chat interface with conversation history
- 📝 Markdown support for formatted responses
- 🤖 Backend powered by mT5-small (easily swappable)
- ⚡ Built with React, Vite, Flask, and PyTorch
- 🎯 Responsive design with Tailwind CSS
- 🚀 Production-ready architecture

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

### 3. Open Your Browser

Navigate to `http://localhost:3000` and start chatting!

## Using a Different Model

The backend currently uses `google/mt5-small` for quick setup. To change the model:

1. Open `backend/app.py`
2. Change the `model_name` variable (line 28):

```python
model_name = "google/mt5-small"  # Change to your preferred model
```

### Recommended Models:

- **Fast & Light**: `google/flan-t5-small` (80M params)
- **Balanced**: `google/flan-t5-base` (250M params)
- **High Quality**: `google/flan-t5-large` (780M params)
- **Best Performance**: `google/flan-t5-xl` (3B params, requires GPU)

Any Hugging Face Seq2Seq model should work!

## API Endpoints

### POST /api/moe/chat

Main chat endpoint for conversation.

### GET /api/health

Check server and model status.

### GET /api/model/info

Get current model information.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

### Frontend Styling

- Uses Tailwind CSS - modify `index.css` or component styles
- Edit `WelcomeCard` in `MoEChatbot.jsx` for welcome screen
- Icons from `lucide-react` - easily replaceable

### Backend Model

- Swap models by changing `model_name` in `backend/app.py`
- Adjust generation parameters (temperature, max_length, top_p)
- Add custom preprocessing/postprocessing logic

## Performance Tips

- **GPU**: Significantly faster inference. Install PyTorch with CUDA support
- **CPU**: Works fine for small models (mT5-small, T5-small)
- **Memory**: Larger models need more RAM/VRAM
- **Context Length**: Adjust conversation history length for better performance

## Production Deployment

### Frontend

```bash
npm run build
# Deploy the `dist` folder to any static host
```

### Backend

Use production WSGI server:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Troubleshooting

**Backend won't start**: Check Python version (3.8+) and install dependencies
**Model download fails**: Check internet connection and disk space (~2GB needed)
**Out of memory**: Use a smaller model or reduce `max_length`
**Frontend can't connect**: Verify backend is running on port 5000

## License

MIT
