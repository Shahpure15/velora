import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Countdown ────────────────────────────────────────────────────────────────

const TARGET = new Date('2026-03-28T09:00:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days:  Math.floor(diff / 86400000),
    hrs:   Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000)  / 60000),
    secs:  Math.floor((diff % 60000)    / 1000),
  }
}

// Single flip digit box
function FlipDigit({ value, label }) {
  const display = String(value).padStart(2, '0')

  return (
    <div style={{
      border: '2px solid #000',
      background: '#0A0A0A',
      boxShadow: '4px 4px 0 #FF2D55',
      padding: '0.8rem 1.2rem',
      minWidth: '80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', height: '3rem' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={display}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '2.5rem',
              color: '#FFE600',
              lineHeight: '3rem',
              position: 'absolute',
              inset: 0,
            }}
          >
            {display}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#888',
        marginTop: '0.25rem',
      }}>
        {label}
      </div>
    </div>
  )
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const sep = (
    <span style={{
      fontFamily: "'Bangers', cursive",
      fontSize: '2rem',
      color: '#FF2D55',
      alignSelf: 'center',
      marginBottom: '1.5rem',
      lineHeight: 1,
    }}>:</span>
  )

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
      <FlipDigit value={time.days} label="DAYS" />
      {sep}
      <FlipDigit value={time.hrs}  label="HRS"  />
      {sep}
      <FlipDigit value={time.mins} label="MINS" />
      {sep}
      <FlipDigit value={time.secs} label="SECS" />
    </div>
  )
}

// ─── Web SVG lines ─────────────────────────────────────────────────────────────

const WEB_LINES = [
  { x2: 400, y2: 0   },
  { x2: 350, y2: 50  },
  { x2: 280, y2: 10  },
  { x2: 400, y2: 150 },
  { x2: 200, y2: 0   },
  { x2: 400, y2: 280 },
]

function WebLines() {
  return (
    <svg
      width="400" height="400"
      style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', opacity: 0.3 }}
    >
      <style>{`
        @keyframes web-draw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
      {WEB_LINES.map((l, i) => {
        const len = Math.hypot(l.x2, l.y2 - 400)
        return (
          <line
            key={i}
            x1={0} y1={400}
            x2={l.x2} y2={l.y2}
            stroke="#FF2D55"
            strokeWidth={0.5}
            strokeDasharray={len}
            strokeDashoffset={len}
            style={{
              animation: `web-draw 0.8s ease forwards`,
              animationDelay: `${0.2 + i * 0.2}s`,
            }}
          />
        )
      })}
    </svg>
  )
}

// ─── Floating particles ────────────────────────────────────────────────────────

const PARTICLE_COLORS = ['#FF2D55', '#00D4FF', '#FFE600']

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top:      `${5 + Math.random() * 90}%`,
      left:     `${5 + Math.random() * 90}%`,
      size:     2 + Math.random() * 2,
      color:    PARTICLE_COLORS[i % 3],
      opacity:  0.3 + Math.random() * 0.4,
      floatY:   -(30 + Math.random() * 30),
      duration: 3 + Math.random() * 5,
      delay:    Math.random() * 3,
    })), []
  )

  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: p.opacity,
            zIndex: 1,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, p.floatY, 0], opacity: [p.opacity, 0, p.opacity] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

// ─── Scroll indicator ──────────────────────────────────────────────────────────

function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY < 100) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF2D55' }} />
        <div style={{ width: 2, height: 40, background: '#FF2D55', marginTop: 2 }} />
      </motion.div>
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.6rem',
        letterSpacing: '0.3em',
        color: '#888',
        textTransform: 'uppercase',
      }}>
        SCROLL
      </span>
    </motion.div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

const fadeUp   = (delay) => ({ initial: { opacity: 0, y: 20 },  animate: { opacity: 1, y: 0  }, transition: { duration: 0.6, delay } })
const fadeLeft = (delay) => ({ initial: { opacity: 0, x: 20 },  animate: { opacity: 1, x: 0  }, transition: { duration: 0.6, delay } })
const fadeScale = (delay) => ({ initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.7, delay } })

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

      {/* LAYER 1 — Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, #1A1A2E 0%, #1A1A2E 30%, #0D0D1A 60%, #0A0A0A 100%)`,
        zIndex: 0,
      }} />

      {/* LAYER 2 — Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* LAYER 3 — SVG web lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <WebLines />
      </div>

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Particles />
      </div>

      {/* LAYER 4 — Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '12vh',
        textAlign: 'center',
      }}>

        {/* a) CIPHER PRESENTS caption */}
        <motion.div {...fadeUp(0.2)}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 700,
            fontVariant: 'small-caps',
            letterSpacing: '0.15em',
            border: '2px solid #FFE600',
            background: '#FFE600',
            color: '#0A0A0A',
            padding: '0.2rem 0.8rem',
            display: 'inline-block',
          }}>
            CIPHER PRESENTS
          </span>
        </motion.div>

        {/* b) VELORA */}
        <motion.div {...fadeScale(0.4)} style={{ position: 'relative', marginTop: '0.5rem' }}>
          <span
            className="velora-hero-title"
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: 'clamp(5rem, 12vw, 11rem)',
              color: '#FF2D55',
              lineHeight: 0.9,
              display: 'block',
              textShadow: '3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5)',
            }}
          >
            VELORA
          </span>
        </motion.div>

        {/* c) 1.0 */}
        <motion.span {...fadeLeft(0.6)} style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: '#00D4FF',
          display: 'block',
          marginTop: '-1rem',
          letterSpacing: '0.3em',
          alignSelf: 'center',
          paddingLeft: '2rem',
        }}>
          1.0
        </motion.span>

        {/* d) DARE TO COMPETE */}
        <motion.span {...fadeUp(0.7)} style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
          color: '#F5F5F5',
          letterSpacing: '0.2em',
          marginTop: '0.5rem',
          display: 'block',
        }}>
          DARE TO COMPETE
        </motion.span>

        {/* e) Event info */}
        <motion.div {...fadeUp(0.9)} style={{
          border: '2px solid #444',
          background: 'rgba(255,255,255,0.05)',
          color: '#F5F5F5',
          padding: '0.4rem 1.2rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.85rem',
          marginTop: '1.5rem',
          letterSpacing: '0.03em',
        }}>
          24-Hour Hackathon &nbsp;·&nbsp; MITAOE, Alandi &nbsp;·&nbsp; Late March 2026
        </motion.div>

        {/* f) Countdown */}
        <motion.div {...fadeUp(1.0)} style={{ marginTop: '1.5rem' }}>
          <Countdown />
        </motion.div>

        {/* g) CTA */}
        <motion.button
          {...fadeUp(1.2)}
          whileHover={{ y: -2, boxShadow: '7px 7px 0 #000', backgroundColor: '#FF0040' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.lenis?.scrollTo('#about', { duration: 1.5 })}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1.3rem',
            letterSpacing: '0.15em',
            background: '#FF2D55',
            color: '#F5F5F5',
            border: '3px solid #000',
            boxShadow: '5px 5px 0 #000',
            padding: '0.8rem 2.5rem',
            borderRadius: 0,
            cursor: 'pointer',
            marginTop: '2rem',
            transition: 'background-color 0.15s',
          }}
        >
          ENTER THE VERSE →
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* LAYER 5 — Glitch overlay */}
      <div
        className="glitch-overlay"
        style={{
          position: 'absolute', inset: 0,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* Hero-specific styles */}
      <style>{`
        @keyframes hero-velora-idle-glitch {
          0%, 92%  { transform: translate(0,0);      text-shadow: 3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); }
          93%      { transform: translate(-3px, 1px); text-shadow: 5px 3px 0 #00D4FF, -4px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); clip-path: inset(10% 0 80% 0); }
          94%      { transform: translate(3px, -1px); text-shadow: 1px 3px 0 #FF2D55, -2px -4px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); clip-path: inset(60% 0 20% 0); }
          95%      { transform: translate(-2px, 2px); text-shadow: 3px 5px 0 #00D4FF, -2px  0   0 #FF2D55, 6px 6px 0 rgba(0,0,0,0.5); clip-path: inset(30% 0 50% 0); }
          96%      { transform: translate(0,0);       text-shadow: 3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); clip-path: none; }
          100%     { transform: translate(0,0);       text-shadow: 3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); }
        }
        .velora-hero-title {
          animation: hero-velora-idle-glitch 6s steps(1, end) infinite;
        }
      `}</style>
    </section>
  )
}
