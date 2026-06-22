import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const CRIME_DATA = [
  { city: 'Delhi', lat: 28.6139, lng: 77.2090, complaints: 32000, type: 'Digital Arrest', amount: '₹420 Cr' },
  { city: 'Mumbai', lat: 19.0760, lng: 72.8777, complaints: 18500, type: 'KYC Fraud', amount: '₹280 Cr' },
  { city: 'Hyderabad', lat: 17.3850, lng: 78.4867, complaints: 14200, type: 'Investment Scam', amount: '₹195 Cr' },
  { city: 'Bengaluru', lat: 12.9716, lng: 77.5946, complaints: 13800, type: 'Digital Arrest', amount: '₹178 Cr' },
  { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, complaints: 9400, type: 'Counterfeit Currency', amount: '₹112 Cr' },
  { city: 'Chennai', lat: 13.0827, lng: 80.2707, complaints: 8700, type: 'KYC Fraud', amount: '₹98 Cr' },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639, complaints: 11200, type: 'Lottery Fraud', amount: '₹134 Cr' },
  { city: 'Pune', lat: 18.5204, lng: 73.8567, complaints: 7600, type: 'Investment Scam', amount: '₹89 Cr' },
  { city: 'Jaipur', lat: 26.9124, lng: 75.7873, complaints: 6200, type: 'Counterfeit Currency', amount: '₹74 Cr' },
  { city: 'Lucknow', lat: 26.8467, lng: 80.9462, complaints: 8100, type: 'Digital Arrest', amount: '₹96 Cr' },
  { city: 'Patna', lat: 25.5941, lng: 85.1376, complaints: 5400, type: 'Counterfeit Currency', amount: '₹62 Cr' },
  { city: 'Bhopal', lat: 23.2599, lng: 77.4126, complaints: 4800, type: 'KYC Fraud', amount: '₹55 Cr' },
  { city: 'Indore', lat: 22.7196, lng: 75.8577, complaints: 5100, type: 'Investment Scam', amount: '₹61 Cr' },
  { city: 'Surat', lat: 21.1702, lng: 72.8311, complaints: 6800, type: 'Counterfeit Currency', amount: '₹81 Cr' },
  { city: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, complaints: 3900, type: 'Digital Arrest', amount: '₹46 Cr' },
  { city: 'Nagpur', lat: 21.1458, lng: 79.0882, complaints: 4200, type: 'KYC Fraud', amount: '₹49 Cr' },
  { city: 'Chandigarh', lat: 30.7333, lng: 76.7794, complaints: 3600, type: 'Digital Arrest', amount: '₹43 Cr' },
  { city: 'Kochi', lat: 9.9312, lng: 76.2673, complaints: 4100, type: 'Investment Scam', amount: '₹48 Cr' },
  { city: 'Guwahati', lat: 26.1445, lng: 91.7362, complaints: 2800, type: 'Lottery Fraud', amount: '₹33 Cr' },
  { city: 'Ranchi', lat: 23.3441, lng: 85.3096, complaints: 3100, type: 'Counterfeit Currency', amount: '₹37 Cr' },
]

const TYPE_COLORS = {
  'Digital Arrest': '#ef4444',
  'KYC Fraud': '#f97316',
  'Investment Scam': '#a855f7',
  'Lottery Fraud': '#eab308',
  'Counterfeit Currency': '#3b82f6',
}

const STATS = [
  { label: 'Total Complaints (2023)', value: '11.4L+', color: '#ef4444' },
  { label: 'Cities Mapped', value: '20', color: '#4f8ef7' },
  { label: 'Highest Risk City', value: 'Delhi', color: '#f97316' },
  { label: 'Total Fraud Amount', value: '₹2,891 Cr', color: '#22c55e' },
]

const FILTERS = ['All', 'Digital Arrest', 'KYC Fraud', 'Investment Scam', 'Lottery Fraud', 'Counterfeit Currency']

function getRadius(complaints) {
  if (complaints > 20000) return 36
  if (complaints > 10000) return 28
  if (complaints > 6000) return 22
  if (complaints > 3000) return 16
  return 12
}

export default function CrimeHeatmap() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedCity, setSelectedCity] = useState(null)

  const filtered = activeFilter === 'All'
    ? CRIME_DATA
    : CRIME_DATA.filter(d => d.type === activeFilter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '32px 32px 0', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>🗺️ Crime Heatmap</h1>
      <p style={{ color: '#5a6a8a', fontSize: '14px', marginBottom: '20px' }}>
        Geospatial intelligence showing fraud hotspots, cybercrime concentration zones and counterfeit seizure points across India.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '10px', padding: '14px 18px' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#5a6a8a', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {FILTERS.map(f => (
          <div key={f} onClick={() => setActiveFilter(f)} style={{
            padding: '5px 14px', borderRadius: '99px', fontSize: '12px', cursor: 'pointer',
            fontWeight: activeFilter === f ? '700' : '400',
            background: activeFilter === f ? (TYPE_COLORS[f] || '#4f8ef7') : '#0d1224',
            border: `1px solid ${activeFilter === f ? (TYPE_COLORS[f] || '#4f8ef7') : '#1e2a45'}`,
            color: activeFilter === f ? '#fff' : '#8a9bb5',
            transition: 'all 0.2s'
          }}>{f}</div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0, paddingBottom: '24px' }}>
        {/* Map */}
        <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e2a45' }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <ZoomControl position="topright" />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {filtered.map((point) => (
              <CircleMarker
                key={point.city}
                center={[point.lat, point.lng]}
                radius={getRadius(point.complaints)}
                pathOptions={{
                  color: TYPE_COLORS[point.type],
                  fillColor: TYPE_COLORS[point.type],
                  fillOpacity: 0.55,
                  weight: 2,
                }}
                eventHandlers={{ click: () => setSelectedCity(point) }}
              >
                <Popup>
                  <div style={{ minWidth: '160px' }}>
                    <strong>{point.city}</strong><br />
                    Type: {point.type}<br />
                    Complaints: {point.complaints.toLocaleString()}<br />
                    Amount Lost: {point.amount}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Side Panel */}
        <div style={{ width: '240px', background: '#0d1224', border: '1px solid #1e2a45', borderRadius: '12px', padding: '20px', flexShrink: 0, overflowY: 'auto' }}>
          {selectedCity ? (
            <>
              <div style={{ fontSize: '11px', color: '#5a6a8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Selected City</div>
              <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{selectedCity.city}</div>
              <div style={{
                display: 'inline-block', fontSize: '10px', fontWeight: '700', padding: '3px 8px',
                borderRadius: '4px', marginBottom: '14px',
                background: TYPE_COLORS[selectedCity.type] + '33',
                color: TYPE_COLORS[selectedCity.type]
              }}>{selectedCity.type}</div>
              <div style={{ fontSize: '13px', color: '#8a9bb5', lineHeight: '2' }}>
                <div>📋 Complaints: <strong style={{ color: '#fff' }}>{selectedCity.complaints.toLocaleString()}</strong></div>
                <div>💸 Amount Lost: <strong style={{ color: '#ef4444' }}>{selectedCity.amount}</strong></div>
                <div>📍 Coordinates: <strong style={{ color: '#fff' }}>{selectedCity.lat}°N, {selectedCity.lng}°E</strong></div>
              </div>
              <div style={{ marginTop: '16px', padding: '10px', background: '#0a0e1a', borderRadius: '8px', fontSize: '11px', color: '#5a6a8a' }}>
                Click any circle on the map to inspect city details.
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '12px', color: '#5a6a8a', marginBottom: '14px' }}>Click any circle to inspect city details</div>
              <div style={{ fontSize: '11px', color: '#3a4a6a', lineHeight: '2.2' }}>
                {/* Legend */}
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ color: '#8a9bb5' }}>{type}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', fontSize: '11px', color: '#3a4a6a', lineHeight: '1.8' }}>
                <div>⭕ Larger circle = more complaints</div>
                <div>🔴 Red = Digital Arrest hotspot</div>
                <div>🔵 Blue = Counterfeit currency zone</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}