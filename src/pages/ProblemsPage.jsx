import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { tracks } from '../data/tracks';

export default function ProblemsPage() {
  const location = useLocation();
  const hasScrolled = useRef(false);

  // Smooth-scroll to hash target after page renders
  useEffect(() => {
    if (hasScrolled.current) return;
    const hash = location.hash;
    if (!hash) return;

    const targetId = hash.replace('#', '');
    
    // Try scrolling with a slight delay to let the DOM render
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        hasScrolled.current = true;
        // Disable Lenis temporarily so native scrollIntoView works
        if (window.lenis) window.lenis.stop();
        
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Re-enable Lenis after scroll finishes
          setTimeout(() => {
            if (window.lenis) window.lenis.start();
          }, 1000);
        }, 100);
      }
    };

    // Try immediately, then with delays as fallback
    const timer1 = setTimeout(tryScroll, 200);
    const timer2 = setTimeout(tryScroll, 500);
    const timer3 = setTimeout(tryScroll, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.hash]);

  // Scroll to top on mount if no hash
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      paddingTop: '8rem',
      paddingBottom: '5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Back button */}
        <Link 
          to="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#FFE600',
            fontFamily: "'Bangers', cursive",
            letterSpacing: '0.1em',
            fontSize: '1.4rem',
            marginBottom: '3rem',
            textDecoration: 'none',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowLeft size={22} />
          BACK TO THE MAIN SERVER
        </Link>
        
        {/* Page title */}
        <h1 style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          lineHeight: 1.1,
          textShadow: '2px 2px 0 #FF2D55, -2px -2px 0 #00D4FF',
        }}>
          Classified Intel: Problem Statements
        </h1>

        <p style={{
          color: '#666',
          fontSize: '1rem',
          lineHeight: 1.7,
          maxWidth: '600px',
          marginBottom: '2rem',
        }}>
          All domain challenges in one place. Expand any problem to see the mission brief and required deliverables.
        </p>

        {/* IMPORTANT FLEXIBILITY NOTE */}
        <div style={{
          background: 'rgba(255, 230, 0, 0.1)',
          border: '2px dashed #FFE600',
          padding: '1.5rem',
          marginBottom: '4rem',
          position: 'relative',
          boxShadow: '4px 4px 0 rgba(255, 230, 0, 0.2)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '16px',
            background: '#000',
            padding: '0 8px',
            color: '#FFE600',
            fontFamily: "'Bangers', cursive",
            fontSize: '1.3rem',
            letterSpacing: '0.05em'
          }}>
            SYSTEM OVERRIDE: TECH STACK FLEXIBILITY
          </div>
          <p style={{ color: '#eee', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            The tech stacks and specific technical requirements mentioned in the problem statements are <strong>just suggestions, not rules</strong>. 
            You are entirely free to change the tech stack to better suit your solution! For example, if a statement suggests React Native, you can build a React PWA, a Flutter app, or a native Android app instead. Adding your own creative features is also highly encouraged. Choose the weapons you know best.
          </p>
        </div>

        {/* Domain sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {tracks.map((track) => (
            <DomainSection key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainSection({ track }) {
  const IconComponent = track.icon;
  const hasProblemStatements = track.problemStatements && track.problemStatements.length > 0;

  return (
    <div 
      id={track.id} 
      style={{ scrollMarginTop: '6rem' }}
    >
      {/* Domain header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: `3px solid ${track.primaryColor}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          {/* Icon badge */}
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: track.primaryColor,
            color: track.primaryColor === '#FFFFFF' ? '#000' : '#000',
            flexShrink: 0,
          }}>
            {IconComponent && <IconComponent size={28} />}
          </div>

          <div>
            {/* Universe label */}
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: track.primaryColor,
              textTransform: 'uppercase',
              opacity: 0.7,
              marginBottom: '0.2rem',
            }}>
              {track.universeLabel}
            </div>

            {/* Domain name */}
            <h2 style={{
              fontFamily: "'Bangers', cursive",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: track.primaryColor,
              margin: 0,
              lineHeight: 1,
            }}>
              {track.name}
            </h2>
          </div>
        </div>

        <p style={{
          color: '#777',
          fontStyle: 'italic',
          fontSize: '0.9rem',
          margin: 0,
        }}>
          {track.tagline}
        </p>
      </div>

      {/* Problem statements */}
      {!hasProblemStatements ? (
        <div style={{
          background: '#111',
          border: '2px dashed #333',
          padding: '2.5rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1.5rem',
            letterSpacing: '0.15em',
            color: '#444',
            margin: '0 0 0.5rem',
          }}>
            CLASSIFIED // CONTENT REDACTED
          </p>
          <p style={{
            color: '#555',
            fontSize: '0.85rem',
            margin: 0,
          }}>
            The architects are still rendering these challenges. Await transmission.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {track.problemStatements.map((problem) => (
            <ProblemAccordion key={problem.id} problem={problem} trackColor={track.primaryColor} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemAccordion({ problem, trackColor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      border: '2px solid rgba(255,255,255,0.08)',
      background: '#0a0a0a',
      overflow: 'hidden',
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background 0.2s',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1.3rem',
            padding: '0.2rem 0.6rem',
            background: 'rgba(255,255,255,0.06)',
            color: trackColor,
            flexShrink: 0,
          }}>
            {problem.id}
          </span>
          <span style={{
            fontWeight: 700,
            fontSize: '1.05rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {problem.title}
          </span>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.2 }}
          style={{ color: '#666', flexShrink: 0, marginLeft: '1rem' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{
              padding: '1.5rem',
              background: '#111',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {/* Mission Brief */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontWeight: 700,
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: 0,
                  marginBottom: '0.6rem',
                  fontFamily: "'Bangers', cursive",
                  fontSize: '0.85rem',
                }}>
                  Mission Brief
                </h4>
                <p style={{
                  color: '#ccc',
                  lineHeight: 1.7,
                  fontSize: '0.9rem',
                  margin: 0,
                }}>
                  {problem.description}
                </p>
              </div>
              
              {/* Deliverables */}
              <div>
                <h4 style={{
                  fontWeight: 700,
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  fontFamily: "'Bangers', cursive",
                  fontSize: '0.85rem',
                }}>
                  Required Deliverables
                </h4>
                <ul style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '0.6rem',
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}>
                  {problem.deliverables.map((deliverable, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      color: '#bbb',
                      background: '#000',
                      padding: '0.7rem 0.9rem',
                      border: '1px solid rgba(255,255,255,0.04)',
                      fontSize: '0.85rem',
                      lineHeight: 1.4,
                    }}>
                      <span style={{ color: trackColor, flexShrink: 0, fontWeight: 700 }}>◆</span>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
