import { useState, useRef, useEffect } from 'react'

const SESSION_ID = 'user_' + Math.random().toString(36).slice(2)

const SUGGESTIONS = [
  "I got a call from someone claiming to be a CBI officer",
  "Someone asked me to share my Aadhaar OTP",
  "I received a message saying I won a lottery of ₹50 lakhs",
  "A customs officer called saying my parcel has drugs",
]

export default function FraudShieldChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '🛡️ Hello! I am FraudShield AI. Describe any suspicious call, message, or situation and I will analyze it for fraud risk instantly.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setMessages(m => [...m, { role: 'user', text: msg }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/fraud-shield/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: SESSION_ID, message: msg })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', text: data.response, risk: data.risk_level }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: 'Error connecting to backend.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '40px 40px 0' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>🛡️ Fraud Shield Chat</h1>
      <p style={{ color: '#5a6a8a', fontSize: '14px', marginBottom: '20px' }}>
        Describe a suspicious situation. AI will assess fraud risk and guide you.
      </p>

      {/* Suggestions */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {SUGGESTIONS.map(s => (
          <div key={s} onClick={() => send(s)} style={{
            padding: '6px 12px', borderRadius: '99px', background: '#0d1224',
            border: '1px solid #1e2a45', fontSize: '12px', color: '#4f8ef7',
            cursor: 'pointer'
          }}>{s.slice(0, 40)}...</div>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '16px', display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%', padding: '14px 18px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.7',
              background: m.role === 'user' ? '#1a3a6a' : '#0d1224',
              border: m.role === 'user' ? 'none' : '1px solid #1e2a45',
              whiteSpace: 'pre-wrap'
            }}>
              {m.risk && (m.risk === 'HIGH' || m.risk === 'MEDIUM') && (
                <div style={{
                  marginBottom: '8px', fontSize: '11px', fontWeight: '700', padding: '3px 8px',
                  borderRadius: '4px', display: 'inline-block',
                  background: m.risk === 'HIGH' ? '#7f1d1d' : '#78350f',
                  color: m.risk === 'HIGH' ? '#fca5a5' : '#fcd34d'
                }}>⚠️ {m.risk} RISK</div>
              )}
              {m.text.split('\n').map((line, i) => (
                <div key={i} style={{
                  fontWeight: line.startsWith('###') ? '700' : '400',
                  color: line.startsWith('###') ? '#4f8ef7' : '#fff',
                  marginTop: line.startsWith('###') ? '12px' : '0',
                  fontSize: line.startsWith('###') ? '13px' : '14px',
                }}>
                  {line.replace(/^###\s*/, '')}
                </div>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: '#4f8ef7', fontSize: '13px', padding: '8px' }}>🔍 Analyzing...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '12px', padding: '16px 0 24px', borderTop: '1px solid #1e2a45' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Describe the suspicious call or message..."
          style={{
            flex: 1, padding: '14px 18px', borderRadius: '10px', border: '1px solid #1e2a45',
            background: '#0d1224', color: '#fff', fontSize: '14px', outline: 'none'
          }}
        />
        <button onClick={() => send()} style={{
          padding: '14px 24px', borderRadius: '10px', background: '#4f8ef7',
          border: 'none', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px'
        }}>Send</button>
      </div>
    </div>
  )
}