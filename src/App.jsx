import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import './utils/audioManager' // Initialize audio global listener
import EasterEggs from './components/EasterEggs'
import CursorWeb from './components/CursorWeb'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProblemsPage from './pages/ProblemsPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <EasterEggs />
      <CursorWeb />
      <div style={{ position: 'relative' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<ProblemsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
