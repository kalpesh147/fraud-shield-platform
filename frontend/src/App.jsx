import { useState } from 'react'
import Home from './pages/Home'
import CounterfeitDetector from './pages/CounterfeitDetector'
import FraudShieldChat from './pages/FraudShieldChat'
import './App.css'

const NAV_ITEMS = [
  { id: 'home', label: '🏠 Home', },
  { id: 'counterfeit', label: '💵 Counterfeit Detector' },
  { id: 'fraud-chat', label: '🛡️ Fraud Shield Chat' },
]

function App() {
  const [activePage, setActivePage] = useState('home')

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home />
      case 'counterfeit': return <CounterfeitDetector />
      case 'fraud-chat': return <FraudShieldChat />
      default: return <Home />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0e1a', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: '#0d1224', borderRight: '1px solid #1e2a45', display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
        <div style={{ padding: '0 20px 32px', borderBottom: '1px solid #1e2a45' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#4f8ef7' }}>🛡️ FraudShield</div>
          <div style={{ fontSize: '11px', color: '#5a6a8a', marginTop: '4px' }}>AI Public Safety Platform</div>
        </div>
        <nav style={{ marginTop: '16px', flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                background: activePage === item.id ? '#1a2540' : 'transparent',
                borderLeft: activePage === item.id ? '3px solid #4f8ef7' : '3px solid transparent',
                color: activePage === item.id ? '#4f8ef7' : '#8a9bb5',
                fontSize: '14px',
                fontWeight: activePage === item.id ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e2a45', fontSize: '11px', color: '#3a4a6a' }}>
          ET AI Hackathon 2.0 · PS#6
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderPage()}
      </div>
    </div>
  )
}

export default App