const stats = [
  { label: 'Cybercrime Complaints (2023)', value: '11.4L+', color: '#ef4444' },
  { label: 'Lost to Digital Arrest Scams', value: '₹1,776 Cr', color: '#f97316' },
  { label: 'Fake Notes Seized (2024)', value: '2.1L+', color: '#eab308' },
  { label: 'Model Accuracy', value: '98.6%', color: '#22c55e' },
]

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Digital Public Safety Intelligence
      </h1>
      <p style={{ color: '#5a6a8a', marginBottom: '40px', fontSize: '14px' }}>
        AI-powered platform to detect counterfeit currency, fraud scams, and cybercrime networks across India.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#5a6a8a', marginTop: '8px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#8a9bb5' }}>PLATFORM MODULES</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {[
          { icon: '💵', title: 'Counterfeit Currency Detector', desc: 'Computer vision AI that identifies fake Indian currency notes across all denominations with 98.6% accuracy.', status: 'LIVE' },
          { icon: '🛡️', title: 'Fraud Shield Chat', desc: 'Conversational AI that analyzes suspicious calls, messages and situations for digital arrest scams and KYC fraud.', status: 'LIVE' },
          { icon: '🕸️', title: 'Fraud Network Graph', desc: 'Graph AI that maps connections between scammer accounts, mule networks and victims into actionable intelligence.', status: 'LIVE' },
          { icon: '🗺️', title: 'Crime Heatmap', desc: 'Geospatial intelligence layer showing fraud hotspots, counterfeit seizure points and cybercrime concentration zones.', status: 'COMING SOON' },
        ].map(f => (
          <div key={f.title} style={{ background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px' }}>{f.icon}</span>
              <span style={{
                fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px',
                background: f.status === 'LIVE' ? '#14532d' : '#1e2a45',
                color: f.status === 'LIVE' ? '#22c55e' : '#5a6a8a'
              }}>{f.status}</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</div>
            <div style={{ fontSize: '13px', color: '#5a6a8a', lineHeight: '1.6' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}