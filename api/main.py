from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import os

app = FastAPI()

# Allow CORS for all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Debug: Print current working directory and check model path
print("Current Working Directory:", os.getcwd())
model_path = "../saved_models/1.keras"
print("Model Path Exists:", os.path.exists(model_path))

# Load model
try:
    MODEL = tf.keras.models.load_model(model_path)
except Exception as e:
    print(f"Error loading model: {e}")
    raise e

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


def read_file_as_image(data) -> np.ndarray:
    return np.array(Image.open(BytesIO(data)))


@app.get("/ping")
async def ping():
    return "Hello i am working now "


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))

    return {
        'class': predicted_class,
        'confidence': confidence
    }


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
