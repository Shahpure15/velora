import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/timeline'
import nuevaYorkImg from '../assets/landscape/spiderverse_nueva_york_2099.png'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // To draw the line from top to bottom
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.timeline-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Spider-Verse 2099 landscape background */}
      <img
        src={nuevaYorkImg}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          minHeight: '65%',
          objectFit: 'cover',
          objectPosition: 'bottom center',
          opacity: 0.12,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: '#FF2D55',
          textTransform: 'uppercase',
          fontWeight: 700,
          borderBottom: '2px solid #FF2D55',
          display: 'inline-block',
          paddingBottom: '0.2rem',
          marginBottom: '0.4rem',
        }}>
          ISSUE #04
        </div>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1rem',
          color: '#444',
          letterSpacing: '0.2em',
        }}>
          THE SCHEME OF THINGS
        </div>
        <h2 style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          color: '#F5F5F5',
          lineHeight: 1.1,
          marginTop: '1rem'
        }}>
          Event Schedule
        </h2>
      </div>

      <div 
        ref={containerRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          padding: '2rem 0'
        }}
      >
        {/* Background Track Line */}
        <div style={{
          position: 'absolute',
          left: '24px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: '#222',
          zIndex: 0
        }} className="timeline-line-bg" />

        {/* Animated Progress Line */}
        <motion.div style={{
          position: 'absolute',
          left: '24px',
          top: 0,
          width: '2px',
          background: '#00D4FF',
          height: lineHeight,
          zIndex: 1,
          boxShadow: '0 0 10px #00D4FF'
        }} className="timeline-line-progress" />

        {/* Timeline Items */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {timeline.map((item, index) => {
            const isHighlight = item.highlight
            const isCompleted = item.status === 'completed'
            const isActive = item.status === 'active'

            let nodeColor = '#333'
            if (isCompleted) nodeColor = '#00D4FF' // blue
            if (isActive) nodeColor = '#FFE600'    // yellow
            
            let borderColor = '#222'
            if (isActive || isHighlight) borderColor = '#FFE600'
            if (isCompleted) borderColor = '#00D4FF'

            return (
              <div 
                key={index}
                className="timeline-card"
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: index === timeline.length - 1 ? 0 : '3rem',
                  position: 'relative'
                }}
              >
                {/* Node */}
                <div style={{
                  width: '50px',
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#0a0a0a',
                    border: `4px solid ${nodeColor}`,
                    marginTop: '0.2rem',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: (isActive || isHighlight) ? `0 0 15px ${nodeColor}` : 'none' 
                  }} />
                </div>

                {/* Content */}
                <div style={{
                  flexGrow: 1,
                  background: isHighlight ? '#1a1a0f' : '#111',
                  border: `2px solid ${borderColor}`,
                  boxShadow: (isActive || isHighlight) ? `4px 4px 0 ${borderColor}` : '4px 4px 0 #000',
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Status indicator map */}
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    color: nodeColor,
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: nodeColor, display: 'inline-block', animation: 'pulse 1.5s infinite' }} />}
                    {isCompleted ? 'COMPLETED' : isActive ? 'LIVE NOW' : 'UPCOMING'}
                  </div>

                  <h3 style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                    color: isHighlight ? '#FFE600' : '#F5F5F5',
                    margin: '0 0 0.2rem 0',
                    lineHeight: 1.1,
                    letterSpacing: '0.03em'
                  }}>
                    {item.title}
                  </h3>

                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: isHighlight ? '#fff' : '#888',
                    fontWeight: isHighlight ? 700 : 400,
                    marginBottom: '1rem',
                  }}>
                    {item.date}
                  </div>

                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: '#AAA',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {item.description}
                  </p>

                  {/* Corner Accent */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-1rem',
                    right: '-1rem',
                    fontFamily: "'Bangers', cursive",
                    fontSize: '5rem',
                    color: borderColor,
                    opacity: 0.1,
                    lineHeight: 1,
                    pointerEvents: 'none'
                  }}>
                    {item.phase}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 230, 0, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(255, 230, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 230, 0, 0); }
        }

        @media (max-width: 768px) {
          .timeline-line-bg, .timeline-line-progress {
            left: 16px !important;
          }
          .timeline-card {
            gap: 1rem !important;
          }
          .timeline-card > div:first-child {
            width: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
