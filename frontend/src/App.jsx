import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/health')
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.message)
      })
      .catch((error) => {
        setBackendStatus('Error connecting to backend: ' + error.message)
      })
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Fraud Shield Platform</h1>
      <p>Backend connection status: <strong>{backendStatus}</strong></p>
    </div>
  )
}

export default App