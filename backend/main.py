from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

from app.fraud_shield.classifier import analyze_fraud
from app.counterfeit.predictor import predict_currency

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conversation_store = {}

class ChatMessage(BaseModel):
    session_id: str
    message: str

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@app.post("/counterfeit/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = predict_currency(image_bytes)
    return result

@app.post("/fraud-shield/chat")
def chat(body: ChatMessage):
    if body.session_id not in conversation_store:
        conversation_store[body.session_id] = []
    history = conversation_store[body.session_id]
    response, risk_level = analyze_fraud(history, body.message)
    return {
        "response": response,
        "risk_level": risk_level,
        "session_id": body.session_id
    }

@app.delete("/fraud-shield/chat/{session_id}")
def clear_chat(session_id: str):
    if session_id in conversation_store:
        del conversation_store[session_id]
    return {"message": "Conversation cleared"}