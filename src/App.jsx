import './styles/globals.css'
import './utils/audioManager' // Initialize audio global listener
import EasterEggs from './components/EasterEggs'
import CursorWeb from './components/CursorWeb'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Prizes from './components/Prizes'
import Judges from './components/Judges'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import Register from './components/Register'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <EasterEggs />
      <CursorWeb />
      <div style={{ position: 'relative' }}>
        <Navbar />
        <Hero />
        <About />
        <Sponsors />
        <Tracks />
        <Prizes />
        <Judges />
        <FAQ />
        <Register />
        <Footer />
      </div>
    </>
  )
}

export default App
