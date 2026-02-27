import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Timeline from './components/Timeline'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <div
        id="prizes"
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ opacity: 0.2, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#F5F5F5' }}>
          Prizes section — coming soon
        </p>
      </div>
    </>
  )
}

export default App
