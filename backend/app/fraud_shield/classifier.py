import os
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

SCAM_KEYWORDS = [
    "digital arrest", "cyber crime", "cbi officer", "ed officer", "customs officer",
    "money laundering", "your account blocked", "your number suspended",
    "send money immediately", "pay fine now", "arrest warrant", "court order",
    "verify your aadhaar", "otp share", "remote access", "anydesk", "teamviewer",
    "keep this call secret", "don't tell anyone", "stay on video call",
    "your package seized", "drugs found", "illegal parcel"
]

SYSTEM_PROMPT = """You are FraudShield AI, an expert in detecting digital fraud, scams, and cybercrime in India.

Your job is to analyze suspicious calls, messages, or situations described by citizens and:
1. Assess the fraud risk level (HIGH / MEDIUM / LOW)
2. Identify specific scam type (Digital Arrest, KYC Fraud, Investment Scam, Lottery Scam, etc.)
3. Explain red flags clearly in simple language
4. Give immediate action steps
5. Provide relevant helpline numbers

Key Indian scam patterns you know well:
- Digital Arrest Scams: Fake CBI/ED/Customs officers threatening arrest over video call
- KYC/Bank Fraud: Fake bank officials asking for OTP or account details
- Investment Scams: Too-good-to-be-true returns on apps or Telegram groups
- Lottery/Prize Fraud: Winning prizes requiring upfront payment
- Parcel/Drug Scams: Fake customs officials claiming illegal items in a package

Always respond in a calm, clear, helpful tone.
Format your response with clear sections: RISK LEVEL, SCAM TYPE, RED FLAGS, WHAT TO DO NOW, HELPLINES."""


def quick_scan(text: str) -> dict:
    text_lower = text.lower()
    matched = [kw for kw in SCAM_KEYWORDS if kw in text_lower]
    return {
        "matched_keywords": matched,
        "preliminary_risk": "HIGH" if len(matched) >= 2 else "MEDIUM" if len(matched) == 1 else "LOW"
    }


def analyze_fraud(conversation_history: list, user_message: str):
    scan = quick_scan(user_message)
    
    enhanced_message = user_message
    if scan["matched_keywords"]:
        enhanced_message += f"\n\n[Detected keywords: {', '.join(scan['matched_keywords'])}. Preliminary risk: {scan['preliminary_risk']}]"
    
    conversation_history.append({
        "role": "user",
        "content": enhanced_message
    })
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "system", "content": SYSTEM_PROMPT}] + conversation_history,
        max_tokens=1000
    )
    
    assistant_message = response.choices[0].message.content
    
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })
    
    return assistant_message, scan["preliminary_risk"]