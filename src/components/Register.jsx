import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Countdown (days + hrs only) ──────────────────────────────────────────────

const TARGET = new Date('2026-03-28T09:00:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hrs:  Math.floor((diff % 86400000) / 3600000),
  }
}

function MiniFlip({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.2rem',
    }}>
      <div style={{
        border: '2px solid #222',
        background: '#0D0D0D',
        boxShadow: '3px 3px 0 #FF2D55',
        padding: '0.4rem 0.8rem',
        minWidth: '54px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', height: '1.8rem' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={display}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '1.5rem',
                color: '#FFE600',
                lineHeight: '1.8rem',
                position: 'absolute',
                inset: 0,
              }}
            >
              {display}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.55rem',
        letterSpacing: '0.1em',
        color: '#555',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

function MiniCountdown() {
  const [time, setTime] = useState(getTimeLeft)
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', justifyContent: 'center' }}>
      <MiniFlip value={time.days} label="Days" />
      <span style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '1.4rem',
        color: '#FF2D55',
        lineHeight: 1,
        marginTop: '0.3rem',
      }}>:</span>
      <MiniFlip value={time.hrs} label="Hrs" />
    </div>
  )
}

// ─── SVG Web Lines (top-right) ────────────────────────────────────────────────

function WebLines() {
  const lines = [
    { x2: '60%',  y2: '100%', delay: 0 },
    { x2: '20%',  y2: '100%', delay: 0.15 },
    { x2: '0%',   y2: '80%',  delay: 0.3 },
    { x2: '0%',   y2: '40%',  delay: 0.45 },
    { x2: '40%',  y2: '100%', delay: 0.6 },
    { x2: '100%', y2: '60%',  delay: 0.75 },
  ]
  return (
    <svg
      style={{
        position: 'absolute', top: 0, right: 0,
        width: '55%', height: '55%',
        pointerEvents: 'none', zIndex: 1,
        overflow: 'visible',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {lines.map((l, i) => (
        <motion.line
          key={i}
          x1="100%" y1="0%"
          x2={l.x2} y2={l.y2}
          stroke="#00D4FF"
          strokeWidth="0.5"
          opacity="0.25"
          strokeDasharray="1"
          strokeDashoffset="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: l.delay, ease: 'easeOut' }}
        />
      ))}
    </svg>
  )
}

// ─── Floating Particles ───────────────────────────────────────────────────────

const PARTICLE_COLORS = ['#FF2D55', '#00D4FF', '#FFE600']

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: PARTICLE_COLORS[i % 3],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }))
  , [])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            opacity: 0,
          }}
          animate={{ y: [-20, -60], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Subtext with colored separators ─────────────────────────────────────────

function Subtext() {
  const parts = 'Open to all college students · Teams of 2 to 5 · Free to participate · 24 hours to change everything.'.split(' · ')
  return (
    <p style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '1rem',
      color: '#888',
      lineHeight: 1.8,
      marginTop: '1.5rem',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{ color: '#FF2D55' }}> · </span>
          )}
        </span>
      ))}
    </p>
  )
}

// ─── Register ─────────────────────────────────────────────────────────────────

const PILLS = [
  { icon: '🗓', text: 'Late March 2026' },
  { icon: '📍', text: 'MITAOE, Alandi' },
  { icon: '⚡', text: '24 Hours' },
]

export default function Register() {
  const sectionRef  = useRef(null)
  const leftPanelRef  = useRef(null)
  const rightPanelRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftPanelRef.current, {
        x: -80, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(rightPanelRef.current, {
        x: 80, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="register"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem',
      }}
    >
      {/* Layer 1 — Radial gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #1A1A2E 0%, #0D0D1A 40%, #0A0A0A 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Layer 2 — Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.04,
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Layer 3 — SVG web lines (top-right) */}
      <WebLines />

      {/* Layer 4 — Floating particles */}
      <Particles />

      {/* Layer 5 — Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Bangers', cursive",
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        color: '#ffffff',
        opacity: 0.02,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: '0.1em',
        zIndex: 1,
      }}>
        DARE TO COMPETE
      </div>

      {/* Decorative side panels */}
      <div
        ref={leftPanelRef}
        style={{
          position: 'absolute',
          left: '-40px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-8deg)',
          width: '120px',
          height: '180px',
          border: '3px solid #1A1A1A',
          background: '#0D0D0D',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={rightPanelRef}
        style={{
          position: 'absolute',
          right: '-40px',
          top: '50%',
          transform: 'translateY(-50%) rotate(8deg)',
          width: '120px',
          height: '180px',
          border: '3px solid #1A1A1A',
          background: '#0D0D0D',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '700px',
        width: '100%',
      }}>

        {/* a) Caption box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'inline-block',
            background: '#00D4FF',
            color: '#0A0A0A',
            border: '2px solid #00D4FF',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: '0.3rem 1rem',
            marginBottom: '1.5rem',
          }}
        >
          FINAL TRANSMISSION
        </motion.div>

        {/* b) Heading */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              color: '#F5F5F5',
              display: 'block',
              lineHeight: 1,
            }}
          >
            Your Universe
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              color: '#FF2D55',
              display: 'block',
              lineHeight: 1,
            }}
          >
            Needs You.
          </motion.span>
        </div>

        {/* c) Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Subtext />
        </motion.div>

        {/* d) Info pills */}
        <div style={{
          display: 'flex',
          gap: '0.8rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '2rem',
        }}>
          {PILLS.map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              style={{
                border: '1px solid #333',
                background: '#111',
                padding: '0.4rem 1rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.75rem',
                color: '#888',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>{pill.icon}</span>
              <span>{pill.text}</span>
            </motion.div>
          ))}
        </div>

        {/* e) CTA button */}
        <div style={{ marginTop: '2.5rem' }}>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.preventDefault()}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            whileHover={{ y: -3, boxShadow: '9px 9px 0 #000', backgroundColor: '#FFF000' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              background: '#FFE600',
              color: '#0A0A0A',
              fontFamily: "'Bangers', cursive",
              fontSize: '1.4rem',
              letterSpacing: '0.15em',
              border: '3px solid #000',
              boxShadow: '6px 6px 0 #000',
              padding: '1rem 3rem',
              borderRadius: 0,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            REGISTER ON UNSTOP →
          </motion.a>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.75rem',
              color: '#555',
              marginTop: '0.8rem',
            }}
          >
            Free to register · No experience required
          </motion.p>
        </div>

        {/* f) Countdown reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          style={{
            marginTop: '2.5rem',
            border: '2px solid #333',
            background: '#111',
            padding: '1rem 2rem',
            display: 'inline-block',
          }}
        >
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#555',
            display: 'block',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}>
            REGISTRATIONS CLOSING IN
          </span>
          <MiniCountdown />
        </motion.div>

      </div>
    </section>
  )
}
