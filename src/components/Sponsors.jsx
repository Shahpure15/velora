import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sponsors } from '../data/sponsors'
import nueva2099Svg from '../assets/landscape/spiderverse_nueva_york_2099.svg'
import sponsorBrochure from '../assets/docs/Velora Sponsorship Brochure.pdf'

gsap.registerPlugin(ScrollTrigger)

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  title: {
    label: 'TITLE SPONSOR',
    colSpan: 'span 2',
    minHeight: '160px',
    logoSize: '180px',
    placeholderSize: '2.5rem',
    borderColor: '#FFE600',
    shadowColor: '#FFE600',
    accentColor: '#FFE600',
  },
  gold: {
    label: 'GOLD SPONSOR',
    colSpan: 'span 1',
    minHeight: '130px',
    logoSize: '140px',
    placeholderSize: '1.8rem',
    borderColor: '#FF9500',
    shadowColor: '#FF9500',
    accentColor: '#FF9500',
  },
  silver: {
    label: 'SILVER SPONSOR',
    colSpan: 'span 1',
    minHeight: '110px',
    logoSize: '110px',
    placeholderSize: '1.4rem',
    borderColor: '#888',
    shadowColor: '#888',
    accentColor: '#888',
  },
}

// ─── Sponsor Card ─────────────────────────────────────────────────────────────

function SponsorCard({ sponsor }) {
  const cfg = TIER_CONFIG[sponsor.tier]

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`sponsor-card sponsor-card--${sponsor.tier}`}
      style={{
        gridColumn: cfg.colSpan,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        minHeight: cfg.minHeight,
        background: '#111',
        border: `2px solid #222`,
        boxShadow: '4px 4px 0 #1A1A1A',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: sponsor.website === '#' ? 'default' : 'pointer',
      }}
    >
      {/* Tier badge */}
      <div style={{
        position: 'absolute',
        top: '0.6rem',
        left: '0.8rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        color: cfg.accentColor,
        textTransform: 'uppercase',
        opacity: 0.7,
      }}>
        {cfg.label}
      </div>

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: cfg.accentColor,
        opacity: 0.6,
      }} />

      {/* Logo or placeholder */}
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          style={{
            maxWidth: cfg.logoSize,
            maxHeight: '80px',
            objectFit: 'contain',
            filter: 'grayscale(100%) brightness(0.8)',
            transition: 'filter 0.4s ease',
          }}
          className="sponsor-logo"
        />
      ) : (
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: cfg.placeholderSize,
          color: '#2A2A2A',
          letterSpacing: '0.05em',
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          {sponsor.name === 'TBA' ? '?' : sponsor.name}
        </div>
      )}

      {/* Name (shown when real) */}
      {sponsor.name !== 'TBA' && (
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.7rem',
          color: '#444',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          transition: 'color 0.3s ease',
        }}
          className="sponsor-name"
        >
          {sponsor.name}
        </div>
      )}

      <style>{`
        .sponsor-card:hover .sponsor-logo { filter: grayscale(0%) brightness(1) !important; }
        .sponsor-card:hover .sponsor-name { color: #888 !important; }
        .sponsor-card--title:hover { border-color: #FFE600 !important; box-shadow: 6px 6px 0 #FFE60033 !important; }
        .sponsor-card--gold:hover   { border-color: #FF9500 !important; box-shadow: 6px 6px 0 #FF950033 !important; }
        .sponsor-card--silver:hover { border-color: #888    !important; box-shadow: 6px 6px 0 #88888833 !important; }
      `}</style>
    </a>
  )
}

// ─── Assembling Placeholder ───────────────────────────────────────────────────

function AssemblingPlaceholder() {
  return (
    <div
      className="sponsor-assembling"
      style={{
        gridColumn: 'span 2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        minHeight: '200px',
        background: '#0D0D0D',
        border: '2px dashed #222',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated diagonal stripes bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, #141414 0px, #141414 10px, #111 10px, #111 20px)',
        opacity: 0.5,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#2A2A2A',
          letterSpacing: '0.1em',
          lineHeight: 1,
        }}>
          ALLIES ASSEMBLING
        </div>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          color: '#333',
          letterSpacing: '0.2em',
          marginTop: '0.5rem',
          textTransform: 'uppercase',
        }}>
          Sponsors dropping soon · Cipher × IEEE · Velora 1.0
        </div>

        {/* Cipher badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '1.2rem',
          border: '1px solid #222',
          padding: '0.3rem 0.8rem',
        }}>
          <div style={{
            width: '6px', height: '6px',
            background: '#FF2D55',
            transform: 'rotate(45deg)',
          }} />
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.6rem',
            color: '#333',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Presented by Cipher × IEEE · MITAOE
          </span>
          <div style={{
            width: '6px', height: '6px',
            background: '#00D4FF',
            transform: 'rotate(45deg)',
          }} />
        </div>
      </div>
    </div>
  )
}

// ─── Sponsors ─────────────────────────────────────────────────────────────────

// Check if we have real (non-TBA) sponsors to show
const hasRealSponsors = sponsors.some(s => s.name !== 'TBA')

export default function Sponsors() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const gridRef    = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      const cards = gridRef.current.querySelectorAll('.sponsor-card, .sponsor-assembling')
      gsap.from(cards, {
        y: 40, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid #111',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Nueva York 2099 cyberpunk background */}
      <img
        src={nueva2099Svg}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          minHeight: '60%',
          objectFit: 'cover',
          objectPosition: 'bottom center',
          opacity: 0.13,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* Content — sits above landscape bg */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* Section label */}
      <div ref={labelRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
          ISSUE #05
        </div>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1rem',
          color: '#444',
          letterSpacing: '0.2em',
        }}>
          THE ALLIANCE
        </div>
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.9rem',
        color: '#555',
        textAlign: 'center',
        marginBottom: '3rem',
      }}>
        The forces backing the mission.
      </p>

      {/* Sponsor grid */}
      <div
        ref={gridRef}
        className="sponsors-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {hasRealSponsors
          ? sponsors.map(sponsor => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))
          : <AssemblingPlaceholder />
        }
      </div>

      {/* ─── CALL FOR SPONSORS ─────────────────────────────────────────────── */}
      <div
        className="cfs-panel"
        style={{
          marginTop: '5rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          border: '3px solid #FF2D55',
          background: '#0D0D0D',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #FF2D55, #FFE600, #00D4FF)',
        }} />

        {/* Corner label */}
        <div style={{
          position: 'absolute',
          top: '4px',
          left: 0,
          background: '#FF2D55',
          color: '#0A0A0A',
          fontFamily: "'Bangers', cursive",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          padding: '0.2rem 0.8rem',
        }}>
          OPEN CALL
        </div>

        {/* Diagonal accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '180px',
          height: '180px',
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          background: '#FF2D55',
          opacity: 0.06,
          pointerEvents: 'none',
        }} />

        {/* Halftone overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #FF2D55 0.5px, transparent 0.5px)',
          backgroundSize: '12px 12px',
          opacity: 0.04,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          padding: '3.5rem 2.5rem 3rem',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}>
          {/* Heading */}
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#F5F5F5',
            lineHeight: 1,
            letterSpacing: '0.05em',
          }}>
            WANT TO <span style={{ color: '#FF2D55' }}>BACK</span> THE MISSION?
          </div>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.95rem',
            color: '#777',
            lineHeight: 1.8,
            marginTop: '1.2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Velora 1.0 is looking for allies. Partner with Cipher × IEEE MITAOE and put your brand 
            in front of 500+ builders, hackers, and future tech leaders.
          </p>

          {/* Perks row */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}>
            {[
              { icon: '◆', text: 'Brand Exposure', color: '#FFE600' },
              { icon: '◆', text: 'Talent Pipeline', color: '#00D4FF' },
              { icon: '◆', text: 'Community Impact', color: '#FF2D55' },
            ].map((perk, i) => (
              <div key={i} style={{
                border: `1px solid ${perk.color}33`,
                background: `${perk.color}0a`,
                padding: '0.4rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: perk.color, fontSize: '0.6rem' }}>{perk.icon}</span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.75rem',
                  color: '#888',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {perk.text}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            borderTop: '1px solid #222',
            margin: '2rem auto',
            maxWidth: '300px',
          }} />

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Download Brochure */}
            <motion.a
              href={sponsorBrochure}
              download="Velora Sponsorship Brochure.pdf"
              whileHover={{ y: -3, boxShadow: '7px 7px 0 #FFE60033' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                background: '#FFE600',
                color: '#0A0A0A',
                fontFamily: "'Bangers', cursive",
                fontSize: '1.1rem',
                letterSpacing: '0.12em',
                border: '3px solid #000',
                boxShadow: '4px 4px 0 #000',
                padding: '1rem 2rem',
                borderRadius: 0,
                textDecoration: 'none',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              {/* Download Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>DOWNLOAD BROCHURE</span>
            </motion.a>

            {/* Reach Out */}
            <motion.a
              href="mailto:cipherit.mitaoe@gmail.com?subject=Velora%201.0%20Sponsorship%20Inquiry"
              whileHover={{ y: -3, boxShadow: '7px 7px 0 #FF2D5533' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                background: 'transparent',
                color: '#FF2D55',
                fontFamily: "'Bangers', cursive",
                fontSize: '1.1rem',
                letterSpacing: '0.12em',
                border: '3px solid #FF2D55',
                boxShadow: '4px 4px 0 #1A1A1A',
                padding: '1rem 2rem',
                borderRadius: 0,
                textDecoration: 'none',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              {/* Mail Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>REACH OUT TO US</span>
            </motion.a>
          </div>

          {/* Contact hint */}
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.7rem',
            color: '#444',
            marginTop: '1.2rem',
            letterSpacing: '0.05em',
          }}>
            cipherit.mitaoe@gmail.com · We'd love to have you on board.
          </p>
        </div>

        {/* Bottom transmission strip */}
        <div style={{
          background: '#FF2D551a',
          borderTop: '1px solid #FF2D554d',
          color: '#FF2D55',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textAlign: 'center',
          padding: '0.4rem',
          textTransform: 'uppercase',
        }}>
          ◈ SPONSORSHIP SLOTS ARE LIMITED ◈
        </div>
      </div>

      </div>{/* end content wrapper */}

      <style>{`
        @media (max-width: 639px) {
          .sponsors-grid { grid-template-columns: 1fr !important; }
          .sponsor-card  { grid-column: span 1 !important; }
          .sponsor-assembling { grid-column: span 1 !important; }
          .cfs-panel { margin-left: 0 !important; margin-right: 0 !important; }
        }
      `}</style>
    </section>
  )
}
