import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div
        id="about"
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ opacity: 0.2, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#F5F5F5' }}>
          About section — coming soon
        </p>
      </div>
    </>
  )
}

export default App
