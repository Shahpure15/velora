import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',    id: 'about' },
  { label: 'Tracks',   id: 'tracks' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Prizes',   id: 'prizes' },
  { label: 'FAQ',      id: 'faq' },
]

const GLITCH_CHARS = '!@#$%^&*<>?/|\\~'

// Effect 2 — Typewriter glitch hook
function useGlitchText(original) {
  const [display, setDisplay] = useState(original)
  const intervalRef = useRef(null)
  const timeoutRef  = useRef(null)

  function startGlitch() {
    let elapsed = 0
    intervalRef.current = setInterval(() => {
      elapsed += 40
      if (elapsed >= 300) {
        // Resolve character by character
        clearInterval(intervalRef.current)
        let i = 0
        function resolveNext() {
          setDisplay(original.slice(0, i + 1) +
            Array.from(original.slice(i + 1)).map(() =>
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            ).join(''))
          i++
          if (i < original.length) timeoutRef.current = setTimeout(resolveNext, 35)
          else setDisplay(original)
        }
        resolveNext()
      } else {
        setDisplay(
          Array.from(original).map(() =>
            GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          ).join('')
        )
      }
    }, 40)
  }

  function stopGlitch() {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    setDisplay(original)
  }

  useEffect(() => () => { clearInterval(intervalRef.current); clearTimeout(timeoutRef.current) }, [])

  return { display, startGlitch, stopGlitch }
}

// Effect 4 — color frames for Register button dimension shift
const DIM_FRAMES = [
  { bg: '#FFE600', color: '#0A0A0A' },
  { bg: '#ffffff', color: '#000000' },
  { bg: '#00D4FF', color: '#0A0A0A' },
  { bg: '#FF2D55', color: '#ffffff' },
  { bg: '#FFE600', color: '#0A0A0A' },
]

// Nav link with glitch effect
function GlitchNavLink({ label, id, onClick }) {
  const { display, startGlitch, stopGlitch } = useGlitchText(label)
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); startGlitch() }}
      onMouseLeave={() => { setHovered(false); stopGlitch() }}
      style={{
        background: 'none',
        border: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: hovered ? '#FFE600' : '#F5F5F5',
        cursor: 'pointer',
        padding: '0.25rem 0',
        transition: 'color 0.2s',
        minWidth: `${label.length}ch`,
      }}
    >
      {display}
    </button>
  )
}

function scrollTo(id) {
  if (window.lenis) {
    window.lenis.scrollTo(`#${id}`)
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  // Effect 3 — wordmark glitch
  const [isGlitching, setIsGlitching] = useState(false)
  // Effect 4 — register button dimension shift
  const [dimFrame,    setDimFrame]    = useState(0)
  const dimIntervalRef = useRef(null)

  // Scroll listener
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(id) {
    setMenuOpen(false)
    setTimeout(() => scrollTo(id), 150)
  }

  // Effect 3 — wordmark glitch trigger
  function handleWordmarkClick() {
    scrollTo('top')
    if (isGlitching) return
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 400)
  }

  // Effect 4 — dimension shift handlers
  function startDimShift() {
    let frame = 0
    dimIntervalRef.current = setInterval(() => {
      frame++
      setDimFrame(frame)
      if (frame >= DIM_FRAMES.length - 1) clearInterval(dimIntervalRef.current)
    }, 80)
  }
  function stopDimShift() {
    clearInterval(dimIntervalRef.current)
    setDimFrame(0)
  }

  const btnStyle = DIM_FRAMES[dimFrame]

  return (
    <>
      {/* Effect 1 — Web Swing Entrance */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.8 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: '64px',
        }}
      >
        {/* Animated background layer (separate so spring and bg transitions don't conflict) */}
        <motion.div
          aria-hidden
          style={{ position: 'absolute', inset: 0, zIndex: -1 }}
          animate={{
            backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0)',
            backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        {/* Left — VELORA wordmark (Effect 3) */}
        <span
          className={isGlitching ? 'velora-glitch' : ''}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '2rem',
            color: '#FF2D55',
            letterSpacing: '0.05em',
            textShadow: '2px 2px 0 #00D4FF, -1px -1px 0 #FFE600',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={handleWordmarkClick}
        >
          VELORA
        </span>

        {/* Center — desktop nav links (Effect 2) */}
        <ul
          className="nav-links-desktop"
          style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <GlitchNavLink label={label} id={id} onClick={() => handleNavClick(id)} />
            </li>
          ))}
        </ul>

        {/* Right — Register Now CTA (Effect 4) */}
        <a
          href="#"
          className="register-btn-desktop"
          onMouseEnter={startDimShift}
          onMouseLeave={stopDimShift}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            background: btnStyle.bg,
            color: btnStyle.color,
            border: '2px solid #000',
            boxShadow: '3px 3px 0 #000',
            padding: '0.5rem 1.2rem',
            borderRadius: 0,
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'inline-block',
            transition: 'box-shadow 0.1s, transform 0.1s',
          }}
          onMouseDown={e => {
            e.currentTarget.style.boxShadow = '1px 1px 0 #000'
            e.currentTarget.style.transform = 'translate(2px, 2px)'
          }}
          onMouseUp={e => {
            e.currentTarget.style.boxShadow = '3px 3px 0 #000'
            e.currentTarget.style.transform = 'translate(0, 0)'
          }}
        >
          Register Now
        </a>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#F5F5F5', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#F5F5F5', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#F5F5F5', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(10,10,10,0.98)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Bangers', cursive",
                  fontSize: '3rem',
                  letterSpacing: '0.08em',
                  color: '#F5F5F5',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFE600')}
                onMouseLeave={e => (e.currentTarget.style.color = '#F5F5F5')}
              >
                {label}
              </button>
            ))}
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                background: '#FFE600',
                color: '#0A0A0A',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                padding: '0.75rem 2rem',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                marginTop: '1rem',
              }}
            >
              Register Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .register-btn-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }

        @keyframes velora-glitch-anim {
          0%   { transform: translate(0, 0);     opacity: 1;    text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; }
          10%  { transform: translate(-4px, 2px); opacity: 0.7;  text-shadow: 4px 0 0 #00D4FF, -4px 0 0 #FF2D55; }
          20%  { transform: translate(4px, -2px); opacity: 1;    text-shadow: -4px 2px 0 #FFE600, 4px -2px 0 #00D4FF; }
          30%  { transform: translate(-2px, 4px); opacity: 0.5;  text-shadow: 6px 0 0 #FF2D55, -6px 0 0 #00D4FF; }
          40%  { transform: translate(4px, -4px); opacity: 0.9;  text-shadow: -2px -2px 0 #FFE600, 2px 2px 0 #FF2D55; }
          50%  { transform: translate(-4px, 2px); opacity: 0.6;  text-shadow: 4px 4px 0 #00D4FF, -4px -4px 0 #FFE600; }
          60%  { transform: translate(2px, -2px); opacity: 1;    text-shadow: 2px 2px 0 #FF2D55, -2px -2px 0 #00D4FF; }
          70%  { transform: translate(-2px, 4px); opacity: 0.7;  text-shadow: -4px 0 0 #FFE600, 4px 0 0 #FF2D55; }
          80%  { transform: translate(4px, -2px); opacity: 0.9;  text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; }
          90%  { transform: translate(-2px, 2px); opacity: 0.8;  text-shadow: -2px 2px 0 #FF2D55, 2px -2px 0 #FFE600; }
          100% { transform: translate(0, 0);      opacity: 1;    text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; }
        }

        .velora-glitch {
          animation: velora-glitch-anim 0.4s steps(1, end) forwards;
        }
      `}</style>
    </>
  )
}
