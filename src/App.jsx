import './styles/globals.css'
import EasterEggs from './components/EasterEggs'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Timeline from './components/Timeline'
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
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Judges />
      <Sponsors />
      <FAQ />
      <Register />
      <Footer />
    </>
  )
}

export default App
