import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Tracks from '../components/Tracks'
import Timeline from '../components/Timeline'
import Prizes from '../components/Prizes'
import Sponsors from '../components/Sponsors'
import FAQ from '../components/FAQ'
import Resources from '../components/Resources'
import Register from '../components/Register'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash && window.lenis) {
      setTimeout(() => {
        window.lenis.scrollTo(location.hash)
      }, 500)
    }
  }, [location])

  return (
    <main>
      <Hero />
      <About />
      <Sponsors />
      <Tracks />
      <Timeline />
      <Prizes />
      <Resources />
      <FAQ />
      <Register />
    </main>
  )
}

