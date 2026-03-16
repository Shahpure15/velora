import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, LayoutTemplate, Crosshair } from 'lucide-react'
import newYorkClassicImg from '../assets/landscape/spiderverse_new_york_classic.png'

export default function Resources() {
  return (
    <section id="resources" style={{
      position: 'relative',
      padding: '6rem 0',
      background: '#050505',
      color: '#fff',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Background Grid Pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent)',
        opacity: 0.5,
      }} />

      {/* NYC Classic landscape background */}
      <img
        src={newYorkClassicImg}
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
          opacity: 0.15,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: '#FFE600',
            textTransform: 'uppercase',
            fontWeight: 700,
            borderBottom: '2px solid #FFE600',
            display: 'inline-block',
            paddingBottom: '0.2rem',
            marginBottom: '0.4rem',
          }}>
            ISSUE #06
          </div>
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1rem',
            color: '#444',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>
            DOWNLOAD CENTER
          </div>
          <h2 style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0,
            color: '#F5F5F5',
            lineHeight: 1.1,
            textShadow: '4px 4px 0px #A200FF',
            textAlign: 'center'
          }}>
            Mission Assets
          </h2>
        </div>

        {/* Resources Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <ResourceCard
            title="Official Rulebook"
            description="The sacred texts. Everything you need to know about the hackathon guidelines, evaluation criteria, and restrictions."
            icon={FileText}
            actionText="Download PDF"
            color="#FFE600"
            downloadLink="/rulebook.pdf"
            delay={0.1}
          />
          <ResourceCard
            title="Presentation Template"
            description="The standard format for your final pitch. Ensure your prototype aligns with these submission blueprints."
            icon={LayoutTemplate}
            actionText="Download PPTX"
            color="#00D4FF"
            downloadLink="/velora_template.pptx"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

function ResourceCard({ title, description, icon: Icon, actionText, color, downloadLink, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={downloadLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        display: 'block',
        position: 'relative',
        background: '#0A0A0A',
        border: `2px solid ${color}40`,
        boxShadow: isHovered ? `8px 8px 0px ${color}` : `4px 4px 0px ${color}80`,
        padding: '2.5rem 2rem',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'translate(-4px, -4px)' : 'translate(0, 0)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner brackets */}
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '0.5rem', color: `${color}80` }}>
        <Crosshair size={16} />
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem', borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}`, width: '20px', height: '20px' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '0.5rem', borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}`, width: '20px', height: '20px' }} />

      {/* Hover background slice */}
      <motion.div
        animate={{
          x: isHovered ? '0%' : '-101%',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, width: '100%',
          background: `linear-gradient(90deg, transparent, ${color}15)`,
          transformOrigin: 'left',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
        {/* Icon container */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            color: isHovered ? '#0A0A0A' : color,
            backgroundColor: isHovered ? color : `${color}15`,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            border: `1px solid ${color}50`,
          }}
        >
          <Icon size={32} />
        </motion.div>

        <h3 style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '2rem',
          letterSpacing: '0.05em',
          color: '#FFF',
          margin: '0 0 1rem 0',
        }}>
          {title}
        </h3>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: '#AAA',
          margin: '0 0 2rem 0',
        }}>
          {description}
        </p>

        {/* Action button */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: isHovered ? color : 'transparent',
            color: isHovered ? '#0A0A0A' : color,
            border: `1px solid ${color}`,
            padding: '0.75rem 1.5rem',
            fontFamily: "'Bangers', cursive",
            fontSize: '1.2rem',
            letterSpacing: '0.1em',
            width: '100%',
            transition: 'all 0.3s ease',
          }}>
            <Download size={20} strokeWidth={isHovered ? 3 : 2} />
            {actionText}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
