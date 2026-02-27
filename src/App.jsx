import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Timeline from './components/Timeline'
import Prizes from './components/Prizes'
import Judges from './components/Judges'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Judges />
      <Sponsors />
      <FAQ />
    </>
  )
}

export default App
