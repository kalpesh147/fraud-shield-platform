import { useState, useRef } from 'react'

export default function CounterfeitDetector() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()

  const handleFile = async (file) => {
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('http://127.0.0.1:8000/counterfeit/predict', { method: 'POST', body: form })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Failed to connect to backend' })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>💵 Counterfeit Currency Detector</h1>
      <p style={{ color: '#5a6a8a', marginBottom: '32px', fontSize: '14px' }}>
        Upload an image of any Indian currency note. Our AI will detect if it's genuine or counterfeit.
      </p>

      {/* Upload area */}
      <div
        onClick={() => fileRef.current.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
        style={{
          border: '2px dashed #1e2a45', borderRadius: '12px', padding: '48px',
          textAlign: 'center', cursor: 'pointer', background: '#0d1224',
          transition: 'border-color 0.2s'
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📷</div>
        <div style={{ color: '#4f8ef7', fontWeight: '600', marginBottom: '4px' }}>Click to upload or drag & drop</div>
        <div style={{ color: '#5a6a8a', fontSize: '13px' }}>Supports JPG, PNG, WEBP</div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* Preview */}
      {preview && (
        <div style={{ marginTop: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e2a45' }}>
          <img src={preview} alt="uploaded" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', background: '#0d1224' }} />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ marginTop: '24px', padding: '24px', background: '#0d1224', borderRadius: '12px', textAlign: 'center', color: '#4f8ef7' }}>
          🔍 Analyzing note...
        </div>
      )}

      {/* Result */}
      {result && !result.error && (
        <div style={{
          marginTop: '24px', padding: '28px', borderRadius: '12px',
          background: result.verdict === 'FAKE' ? '#2d0a0a' : '#0a2d1a',
          border: `1px solid ${result.verdict === 'FAKE' ? '#7f1d1d' : '#14532d'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '40px' }}>{result.verdict === 'FAKE' ? '🚨' : '✅'}</span>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: result.verdict === 'FAKE' ? '#ef4444' : '#22c55e' }}>
                {result.verdict}
              </div>
              <div style={{ fontSize: '13px', color: '#8a9bb5' }}>AI Verdict</div>
            </div>
          </div>
          {/* Confidence bar */}
          <div style={{ marginBottom: '8px', fontSize: '13px', color: '#8a9bb5' }}>
            Confidence: <strong style={{ color: '#fff' }}>{result.confidence}%</strong>
          </div>
          <div style={{ background: '#1e2a45', borderRadius: '99px', height: '8px' }}>
            <div style={{
              width: `${result.confidence}%`, height: '100%', borderRadius: '99px',
              background: result.verdict === 'FAKE' ? '#ef4444' : '#22c55e',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{ marginTop: '16px', fontSize: '13px', color: '#8a9bb5' }}>
            {result.verdict === 'FAKE'
              ? '⚠️ This note shows characteristics of counterfeit currency. Do not accept. Report to nearest police station or bank.'
              : '✓ This note appears to be genuine Indian currency based on visual analysis.'}
          </div>
        </div>
      )}
    </div>
  )
}