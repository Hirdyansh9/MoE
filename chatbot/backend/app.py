import logging
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for model and tokenizer
model = None
tokenizer = None
device = None

MODEL_NAME = "google/mt5-small"


def load_model():
    """Load the local mT5 model and tokenizer into memory."""
    global model, tokenizer, device
    try:
        logger.info("Loading mT5-small model...")
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"Using device: {device}")
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
        model.to(device)
        model.eval()
        logger.info("Model loaded successfully!")
        return True
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        return False


def generate_summary(text, max_length=128, num_beams=4):
    """Generate an abstractive summary for `text` using mT5."""
    if model is None or tokenizer is None:
        raise RuntimeError("Model not loaded")
    prompt = f"summarize: {text}"
    inputs = tokenizer(prompt, return_tensors="pt",
                       truncation=True, padding=True, max_length=512)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_length=max_length,
            num_beams=num_beams,
            early_stopping=True,
            no_repeat_ngram_size=3
        )
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summary


def generate_chat_reply(prompt_text, max_length=256):
    """Generate a simple chat reply using mT5 (same model used for summarization)."""
    if model is None or tokenizer is None:
        raise RuntimeError("Model not loaded")
    inputs = tokenizer(prompt_text, return_tensors="pt",
                       truncation=True, padding=True, max_length=1024)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_length=max_length,
            num_beams=4,
            early_stopping=True,
            no_repeat_ngram_size=3
        )
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return reply


if __name__ == '__main__':
    logger.info("Loading local mT5 model (no API endpoints configured)...")
    ok = load_model()
    if ok:
        logger.info(
            "Model loaded. You can import this module and call `generate_summary` or `generate_chat_reply`.")
    else:
        logger.error("Model failed to load.")
