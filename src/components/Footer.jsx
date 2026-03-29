import { useState, useEffect } from 'react'
import cipherIcon from '../assets/Cipher.png'

// ─── Nav sections for footer links ────────────────────────────────────────────

const NAV_SECTIONS = [
  { label: 'About',    id: 'about' },
  { label: 'Tracks',   id: 'tracks' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Prizes',   id: 'prizes' },
  { label: 'Judges',   id: 'judges' },
  { label: 'Sponsors', id: 'sponsors' },
  { label: 'FAQ',      id: 'faq' },
]

const SOCIALS = [
  { label: '↗ Instagram (Velora)', href: 'https://www.instagram.com/veloramitaoe/' },
  { label: '↗ Instagram (Cipher)', href: 'https://www.instagram.com/ciphermitaoe/' },
  { label: '↗ LinkedIn (Velora)',  href: 'https://linkedin.com/in/velora' },
  { label: '↗ WhatsApp Community', href: 'https://chat.whatsapp.com/Lm6iQCUw79n5kmA5YUYEyt' },
]

// ─── Footer Link (hover state handled inline) ─────────────────────────────────

function FooterLink({ children, onClick, href }) {
  const [hovered, setHovered] = useState(false)
  const style = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.8rem',
    color: hovered ? '#FF2D55' : '#555',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    display: 'block',
    marginBottom: '0.5rem',
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const [isGlitching, setIsGlitching] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  useEffect(() => {
    if (isLocationOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLocationOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function handleWordmarkClick() {
    if (isGlitching) return
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 400)
  }

  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '3px solid #111',
        padding: '4rem 2rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark "V" */}
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        right: '-1rem',
        fontFamily: "'Bangers', cursive",
        fontSize: '20rem',
        color: '#ffffff',
        opacity: 0.015,
        pointerEvents: 'none',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        V
      </div>

      {/* Top row */}
      <div
        className="footer-top-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Left block — wordmark + attribution */}
        <div className="footer-left-block">
          <div
            onClick={handleWordmarkClick}
            className={isGlitching ? 'footer-velora-glitch' : ''}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '3rem',
              color: '#FF2D55',
              textShadow: '2px 2px 0 #00D4FF, -1px -1px 0 #FFE600',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'inline-block',
              userSelect: 'none',
            }}
          >
            VELORA
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#444',
            letterSpacing: '0.15em',
            marginTop: '0.2rem',
          }}>
            1.0 — DARE TO COMPETE
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.8rem',
            color: '#555',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            An annual hackathon by
            <img src={cipherIcon} alt="Cipher" style={{ height: '16px', objectFit: 'contain', opacity: 0.6 }} />
            Cipher × IEEE
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#444',
            marginTop: '0.2rem',
          }}>
            MIT Academy of Engineering, Alandi
          </div>
        </div>

        {/* Center block — nav links (hidden mobile) */}
        <div className="footer-center-block">
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            NAVIGATE
          </div>
          {NAV_SECTIONS.map(({ label, id }) => (
            <FooterLink
              key={id}
              onClick={() => window.lenis?.scrollTo(`#${id}`, { duration: 1.2 })}
            >
              {label}
            </FooterLink>
          ))}
        </div>

        {/* Right block — socials + contact + venue */}
        <div className="footer-right-block">
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            VENUE & CONNECT
          </div>
          {/* Small map directly on footer */}
          <div 
            onClick={() => setIsLocationOpen(true)}
            style={{ 
              width: '200px', 
              height: '100px', 
              marginBottom: '1rem', 
              border: '1px solid #333', 
              borderRadius: '4px', 
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'rgba(0,0,0,0.1)' }}></div>
            <iframe
              title="MITAOE Small Map"
              src="https://maps.google.com/maps?q=MIT+Academy+of+Engineering,+Alandi,+Pune&t=m&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'none' }}
              loading="lazy"
            ></iframe>
          </div>

          <FooterLink onClick={() => setIsLocationOpen(true)}>
            📍 Guide: How to reach MITAOE?
          </FooterLink>
          <div style={{ margin: '1rem 0' }} />
          {SOCIALS.map(({ label, href }) => (
            <FooterLink key={label} href={href}>
              {label}
            </FooterLink>
          ))}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.75rem',
              color: '#444',
              marginBottom: '0.3rem',
            }}>
              Questions?
            </div>
            <FooterLink href="mailto:velora.cipher@gmail.com">
              velora.cipher@gmail.com
            </FooterLink>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #111', margin: '2rem 0' }} />

      {/* Bottom row */}
      <div
        className="footer-bottom-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          color: '#333',
        }}>
          © 2026 Cipher × IEEE — MIT Academy of Engineering
        </div>

        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '0.9rem',
          color: '#222',
          letterSpacing: '0.15em',
        }}>
          VELORA 2.0 — THE VERSE EXPANDS · 2027
        </div>

        <FooterLink href="#">
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#333',
          }}>
            Code of Conduct
          </span>
        </FooterLink>
      </div>

      {/* Location Modal */}
      {isLocationOpen && (
        <div
          onClick={() => setIsLocationOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(5,5,5,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            style={{
              background: '#0d0d0d',
              border: '2px solid #222',
              borderRadius: '8px',
              maxWidth: '800px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              boxShadow: '0 0 30px rgba(0,212,255,0.1)',
            }}
          >
            <button
              onClick={() => setIsLocationOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#FF2D55',
                fontSize: '1.5rem',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 'bold',
              }}
            >
              ×
            </button>

            <h2 style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '2.5rem',
              color: '#00D4FF',
              textShadow: '2px 2px 0 #FF2D55',
              marginBottom: '1rem',
              textAlign: 'center',
            }}>
              HOW TO REACH VELORA
            </h2>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.9rem',
              color: '#aaa',
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              MIT Academy of Engineering, Alandi, Pune
            </div>

            {/* Google Map Embed */}
            <div style={{ width: '100%', height: '300px', marginBottom: '2rem', border: '1px solid #333' }}>
              <iframe
                title="MITAOE Location"
                src="https://maps.google.com/maps?q=MIT+Academy+of+Engineering,+Alandi,+Pune&t=m&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Routes Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {/* Route 1 */}
              <div style={{ background: '#111', padding: '1.5rem', borderLeft: '3px solid #FF2D55' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>🚂 From Pune Station</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  Direct PMPML buses are frequently available from Pune Station directly to Alandi. There is no need to take a train to another station.
                </p>
              </div>

               {/* Route 2 */}
              <div style={{ background: '#111', padding: '1.5rem', borderLeft: '3px solid #FFE600' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>✈️ From Airport</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  The quickest way is to book an Ola/Uber cab or auto-rickshaw through Dighi and Charholi directly to Alandi (approx. ~15km).
                </p>
              </div>

              {/* Route 3 */}
              <div style={{ background: '#111', padding: '1.5rem', borderLeft: '3px solid #00D4FF' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>🚌 From Bhosari</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  Very close to the campus. You can easily find shared autos heading towards Alandi via Dighi Road, taking about 15-20 minutes.
                </p>
              </div>
              
              {/* Route 4 */}
              <div style={{ background: '#111', padding: '1.5rem', borderLeft: '3px solid #00ff88' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>📍 From Chikhali/Moshi</h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  Head towards Dehu Phata junction. Direct autos and buses frequent the road linking Dehu and Alandi directly to MITAOE gates.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=MIT+Academy+of+Engineering,+Alandi,+Pune" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#FF2D55',
                  color: '#fff',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(255, 45, 85, 0.4)'
                }}
              >
                OPEN IN GOOGLE MAPS ↗
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-velora-glitch {
          animation: footer-glitch-burst 0.4s steps(1, end);
        }
        @keyframes footer-glitch-burst {
          0%   { text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; transform: translate(0, 0); }
          10%  { text-shadow: -4px 2px 0 #00D4FF, 3px -2px 0 #FFE600; transform: translate(3px, -2px); }
          20%  { text-shadow: 4px -2px 0 #FF2D55, -3px 3px 0 #00D4FF; transform: translate(-3px, 1px); }
          30%  { text-shadow: -2px 4px 0 #FFE600, 4px -3px 0 #FF2D55; transform: translate(2px, 3px); }
          40%  { text-shadow: 3px -3px 0 #00D4FF, -4px 2px 0 #FFE600; transform: translate(-2px, -3px); }
          50%  { text-shadow: -3px 3px 0 #FF2D55, 2px -4px 0 #00D4FF; transform: translate(4px, 2px); }
          60%  { text-shadow: 4px 2px 0 #FFE600, -2px -3px 0 #FF2D55; transform: translate(-1px, -2px); }
          70%  { text-shadow: -4px -2px 0 #00D4FF, 3px 4px 0 #FFE600; transform: translate(3px, 1px); }
          80%  { text-shadow: 2px -4px 0 #FF2D55, -3px 2px 0 #00D4FF; transform: translate(-3px, -1px); }
          90%  { text-shadow: -2px 3px 0 #FFE600, 4px -2px 0 #FF2D55; transform: translate(1px, 3px); }
          100% { text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; transform: translate(0, 0); }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .footer-top-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-left-block { display: flex; flex-direction: column; align-items: center; }
          .footer-center-block { display: none !important; }
          .footer-right-block { display: flex; flex-direction: column; align-items: center; }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
