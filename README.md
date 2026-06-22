# 🛡️ FraudShield AI — Digital Public Safety Intelligence Platform

> Built for **ET AI Hackathon 2.0 (2026)** — Problem Statement #6: *AI for Digital Public Safety: Defeating Counterfeiting, Fraud & Digital Arrest Scams*

FraudShield AI is an integrated intelligence platform that helps citizens and law enforcement detect, understand, and respond to India's fastest-growing digital threats — counterfeit currency, digital arrest scams, KYC fraud, and organised fraud networks — by fusing computer vision, conversational AI, and geospatial intelligence into a single unified dashboard.

---

## 🚨 The Problem

- **₹1,776+ crore** lost to "digital arrest" scams in just the first 9 months of 2024 (Ministry of Home Affairs)
- **1.14 million** cybercrime complaints registered in India in 2023 alone — up 60% year-on-year
- Record seizures of high-quality counterfeit ₹500 notes capable of defeating manual bank-teller checks
- Law enforcement has evidence *after* the crime — not intelligence *before* mass victimisation

FraudShield AI shifts the response from **reactive investigation** to **proactive detection and prevention**.

---

## ✨ Features

### 💵 Counterfeit Currency Detector
A computer-vision model that classifies uploaded currency note images as **REAL** or **FAKE** with a confidence score.
- Built on a CNN (transfer learning) trained on the *Indian Currency Real vs Fake Notes Dataset*
- Covers ₹10 to ₹2000 denominations
- Returns an instant verdict + confidence percentage — usable by bank tellers, retailers, or citizens via a simple photo upload

### 🛡️ Fraud Shield Chat
A conversational AI assistant that helps citizens assess whether a call, message, or situation is a scam in real time.
- Powered by an LLM (Llama 3.3 70B via Groq) with a system prompt specialised in Indian scam patterns
- Pre-screens messages against a curated list of known digital-arrest / KYC-fraud / lottery-scam keywords before escalating to the LLM for deeper analysis
- Returns risk level (HIGH / MEDIUM / LOW), scam type, red flags, and immediate action steps in plain language

### 🕸️ Fraud Network Graph
An interactive graph visualisation showing how scammers, money mule accounts, victims, and fraud infrastructure (spoofed numbers, phishing portals, VoIP relays) connect to one another.
- Built with `react-force-graph-2d`
- Click any node to inspect details (amounts, locations, scam type)
- Demonstrates how isolated complaints can be linked into actionable, court-admissible intelligence packages

### 🗺️ Crime Heatmap
A geospatial dashboard plotting fraud complaint density, dominant scam type, and financial impact across major Indian cities.
- Built with `react-leaflet`
- Helps visualise where enforcement and awareness resources would have the highest impact

> **Note:** The Network Graph and Crime Heatmap currently run on representative sample data to demonstrate the intelligence layer's capability. In a production deployment, these would be fed by live NCRB/cybercrime portal complaint data and bank/transaction reporting APIs.

---

## 🏗️ Architecture

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/dea93515-e2a3-4af1-9471-555526d81c1e" />


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, react-force-graph-2d, react-leaflet |
| Backend | FastAPI, Python 3.12 |
| Counterfeit Detection | TensorFlow / Keras (CNN, transfer learning) |
| Fraud Chat | Groq API (Llama 3.3 70B Versatile) |
| Dataset | [Indian Currency Real vs Fake Notes Dataset](https://www.kaggle.com/datasets/preetrank/indian-currency-real-vs-fake-notes-dataset) (Kaggle) |

---

## 📂 Project Structure

fraud-shield-platform/

├── backend/

│   ├── main.py                          # FastAPI app & routes

│   ├── requirements.txt

│   └── app/

│       ├── counterfeit/

│       │   └── predictor.py             # CNN inference logic

│       └── fraud_shield/

│           └── classifier.py            # LLM-based scam analysis

└── frontend/

└── src/

├── App.jsx                      # Sidebar navigation + routing

└── pages/

├── Home.jsx

├── CounterfeitDetector.jsx

├── FraudShieldChat.jsx

├── FraudNetworkGraph.jsx

└── CrimeHeatmap.jsx

---

## ⚙️ Setup & Installation

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```
Create a `.env` file inside `backend/` with:
GROQ_API_KEY=groq_api_key

Run the server:
```bash
uvicorn main:app --reload
```
Backend runs at `http://127.0.0.1:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/counterfeit/predict` | Upload a currency note image → returns REAL/FAKE verdict + confidence |
| POST | `/fraud-shield/chat` | Send a message → returns risk analysis & guidance |
| DELETE | `/fraud-shield/chat/{session_id}` | Clear a chat session |

---

## 🎥 Demo Video

https://drive.google.com/drive/folders/1OjGg1oYRjdwTqFgA6Frf64bLlcnuJ4eU?usp=sharing <!-- 🔴 REPLACE THIS LINK WITH YOUR ACTUAL DEMO VIDEO URL -->

---

## 🏆 Hackathon

Built for **ET AI Hackathon 2.0** - **Problem Statement #6: AI for Digital Public Safety**.
**Team Name:**Pav Bhaji
**Team Leader:**Aarya Deshpnade
**Teammate:**Kalpesh Devere
