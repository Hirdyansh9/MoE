# MoE Chatbot Backend

Backend server for the MoE Chatbot using mT5-small model from Hugging Face.

## Features

- 🤖 Uses Google's mT5-small model for text generation
- 🚀 Flask REST API
- 🔄 Conversation history context
- 🎯 CORS enabled for frontend integration
- 📊 Health check and model info endpoints

## Setup

### Prerequisites

- Python 3.8 or higher
- pip

### Installation

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

```bash
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Running the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

**Note:** The first time you run the server, it will download the mT5-small model (~1.2GB). This may take a few minutes depending on your internet connection.

## API Endpoints

### POST /api/moe/chat

Chat with the model.

**Request:**

```json
{
  "message": "Your message here",
  "history": [
    { "text": "Previous message", "user": true },
    { "text": "Previous response", "user": false }
  ]
}
```

**Response:**

```json
{
  "response": "Model's response"
}
```

### GET /api/health

Check if the server is running and model is loaded.

**Response:**

```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cuda"
}
```

### GET /api/model/info

Get information about the current model.

**Response:**

```json
{
  "model_name": "google/mt5-small",
  "model_type": "Sequence-to-Sequence",
  "description": "mT5 (multilingual T5) small model for text generation",
  "parameters": "~300M",
  "device": "cuda",
  "loaded": true
}
```

## Changing the Model

To use a different model, modify the `model_name` variable in `app.py`:

```python
model_name = "google/mt5-small"  # Change this to your preferred model
```

Supported model types:

- T5 models: `t5-small`, `t5-base`, `t5-large`
- mT5 models: `mt5-small`, `mt5-base`, `mt5-large`
- FLAN-T5: `google/flan-t5-small`, `google/flan-t5-base`, `google/flan-t5-large`
- Or any other Seq2Seq model from Hugging Face

## Performance Notes

- **mT5-small** (~300M parameters): Fast inference, moderate quality
- **mT5-base** (~580M parameters): Balanced speed and quality
- **mT5-large** (~1.2B parameters): Higher quality, slower inference
- **GPU recommended** for better performance

## Troubleshooting

### Model loading issues

If you encounter model loading errors, try:

```bash
pip install --upgrade transformers torch
```

### CUDA/GPU issues

If you have a GPU but it's not being detected:

```bash
pip install torch --upgrade --index-url https://download.pytorch.org/whl/cu118
```

### Memory errors

If you run out of memory, try:

- Using a smaller model (e.g., `t5-small`)
- Reducing `max_length` in the `generate_response` function
- Using CPU instead of GPU for smaller models

## License

MIT
