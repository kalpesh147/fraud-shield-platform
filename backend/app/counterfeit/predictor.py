import numpy as np
import tensorflow as tf
from PIL import Image
import io

# Load model once at startup
model = tf.keras.models.load_model('app/counterfeit/counterfeit_model.h5')

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    arr = np.array(img) / 255.0
    return np.expand_dims(arr, axis=0)

def predict_currency(image_bytes: bytes) -> dict:
    processed = preprocess_image(image_bytes)
    prediction = model.predict(processed)[0][0]
    
    is_real = prediction > 0.5
    confidence = float(prediction) if is_real else float(1 - prediction)
    
    return {
        "verdict": "REAL" if is_real else "FAKE",
        "confidence": round(confidence * 100, 2),
        "raw_score": float(prediction)
    }