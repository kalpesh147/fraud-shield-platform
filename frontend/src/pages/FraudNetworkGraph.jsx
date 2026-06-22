import { useEffect, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const GRAPH_DATA = {
  nodes: [
    // Scammer nodes
    { id: 'S1', label: 'Scammer #1', type: 'scammer', details: 'Digital Arrest Gang · Mumbai' },
    { id: 'S2', label: 'Scammer #2', type: 'scammer', details: 'Digital Arrest Gang · Delhi' },
    { id: 'S3', label: 'Scammer #3', type: 'scammer', details: 'KYC Fraud Ring · Ahmedabad' },
    // Mule accounts
    { id: 'M1', label: 'Mule Acc #1', type: 'mule', details: 'SBI Account · Frozen · ₹4.2L received' },
    { id: 'M2', label: 'Mule Acc #2', type: 'mule', details: 'HDFC Account · Frozen · ₹2.8L received' },
    { id: 'M3', label: 'Mule Acc #3', type: 'mule', details: 'Paytm Wallet · ₹1.1L received' },
    { id: 'M4', label: 'Mule Acc #4', type: 'mule', details: 'Axis Bank · ₹3.5L received' },
    // Victims
    { id: 'V1', label: 'Victim #1', type: 'victim', details: 'Lost ₹2.1L · Pune · Digital Arrest' },
    { id: 'V2', label: 'Victim #2', type: 'victim', details: 'Lost ₹1.8L · Bangalore · Digital Arrest' },
    { id: 'V3', label: 'Victim #3', type: 'victim', details: 'Lost ₹90K · Chennai · KYC Fraud' },
    { id: 'V4', label: 'Victim #4', type: 'victim', details: 'Lost ₹3.2L · Hyderabad · Digital Arrest' },
    { id: 'V5', label: 'Victim #5', type: 'victim', details: 'Lost ₹45K · Jaipur · KYC Fraud' },
    // Infrastructure
    { id: 'I1', label: 'Spoofed Number', type: 'infra', details: '+91-11-XXXX · Spoofed MHA number' },
    { id: 'I2', label: 'Fake Portal', type: 'infra', details: 'mha-gov-india[.]net · Phishing site' },
    { id: 'I3', label: 'VoIP Server', type: 'infra', details: 'Routed via Myanmar · Traced via IMEI' },
  ],
  links: [
    { source: 'S1', target: 'M1', label: 'transfers to' },
    { source: 'S1', target: 'M2', label: 'transfers to' },
    { source: 'S2', target: 'M2', label: 'transfers to' },
    { source: 'S2', target: 'M4', label: 'transfers to' },
    { source: 'S3', target: 'M3', label: 'transfers to' },
    { source: 'V1', target: 'M1', label: 'victimized via' },
    { source: 'V2', target: 'M2', label: 'victimized via' },
    { source: 'V4', target: 'M4', label: 'victimized via' },
    { source: 'V3', target: 'M3', label: 'victimized via' },
    { source: 'V5', target: 'M3', label: 'victimized via' },
    { source: 'S1', target: 'I1', label: 'uses' },
    { source: 'S2', target: 'I1', label: 'uses' },
    { source: 'S1', target: 'I2', label: 'operates' },
    { source: 'S1', target: 'I3', label: 'routes via' },
    { source: 'S2', target: 'I3', label: 'routes via' },
  ]
}

const NODE_COLORS = {
  scammer: '#ef4444',
  mule: '#f97316',
  victim: '#3b82f6',
  infra: '#a855f7',
}

const NODE_ICONS = {
  scammer: '👤',
  mule: '🏦',
  victim: '🧑',
  infra: '🖥️',
}

const LEGEND = [
  { type: 'scammer', label: 'Scammer / Fraudster', color: '#ef4444' },
  { type: 'mule', label: 'Money Mule Account', color: '#f97316' },
  { type: 'victim', label: 'Victim', color: '#3b82f6' },
  { type: 'infra', label: 'Fraud Infrastructure', color: '#a855f7' },
]

const STATS = [
  { label: 'Scammers Identified', value: '3', color: '#ef4444' },
  { label: 'Mule Accounts', value: '4', color: '#f97316' },
  { label: 'Victims Linked', value: '5', color: '#3b82f6' },
  { label: 'Total Fraud Amount', value: '₹8.15L', color: '#22c55e' },
]

export default function FraudNetworkGraph() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })
  const containerRef = useRef()

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>🕸️ Fraud Network Graph</h1>
      <p style={{ color: '#5a6a8a', fontSize: '14px', marginBottom: '20px' }}>
        Graph AI mapping connections between scammer accounts, money mules, victims and fraud infrastructure.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '22px', fontWeight: '700', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#5a6a8a', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0 }}>
        {/* Graph */}
        <div ref={containerRef} style={{ flex: 1, background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
          <ForceGraph2D
            width={dimensions.width}
            height={dimensions.height}
            graphData={GRAPH_DATA}
            backgroundColor="#0d1224"
            nodeLabel={node => `${node.label}: ${node.details}`}
            nodeColor={node => NODE_COLORS[node.type]}
            nodeRelSize={7}
            linkColor={() => '#2a3a5a'}
            linkWidth={1.5}
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
            linkDirectionalParticleColor={() => '#4f8ef7'}
            onNodeClick={node => setSelectedNode(node)}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.label
              const fontSize = 11 / globalScale
              ctx.font = `${fontSize}px Sans-Serif`
              const r = 7

              // Node circle
              ctx.beginPath()
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI)
              ctx.fillStyle = NODE_COLORS[node.type]
              ctx.fill()

              // Border if selected
              if (selectedNode?.id === node.id) {
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 2
                ctx.stroke()
              }

              // Label below
              ctx.fillStyle = '#c0cce0'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'top'
              ctx.fillText(label, node.x, node.y + r + 2)
            }}
          />

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(13,18,36,0.9)', border: '1px solid #1e2a45', borderRadius: '8px', padding: '12px' }}>
            {LEGEND.map(l => (
              <div key={l.type} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '12px', color: '#8a9bb5' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ width: '260px', background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '12px', padding: '20px', flexShrink: 0 }}>
          {selectedNode ? (
            <>
              <div style={{ fontSize: '11px', color: '#5a6a8a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Selected Node</div>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{NODE_ICONS[selectedNode.type]}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>{selectedNode.label}</div>
              <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', marginBottom: '12px', background: NODE_COLORS[selectedNode.type] + '33', color: NODE_COLORS[selectedNode.type] }}>
                {selectedNode.type.toUpperCase()}
              </div>
              <div style={{ fontSize: '13px', color: '#8a9bb5', lineHeight: '1.6' }}>{selectedNode.details}</div>
              <div style={{ marginTop: '16px', padding: '12px', background: '#0a0e1a', borderRadius: '8px', fontSize: '12px', color: '#5a6a8a' }}>
                Click any node to inspect it. Arrows show fund flow direction.
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '13px', color: '#5a6a8a', marginBottom: '16px' }}>Click any node to inspect details</div>
              <div style={{ fontSize: '12px', color: '#3a4a6a', lineHeight: '1.8' }}>
                {GRAPH_DATA.nodes.map(n => (
                  <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: NODE_COLORS[n.type], flexShrink: 0 }} />
                    {n.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}