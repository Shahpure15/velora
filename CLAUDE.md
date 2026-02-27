# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Velora 1.0** — A hackathon event website for Cipher, the coding club of MITAOE (MIT Academy of Engineering, Alandi, Pune). Comic book / Spider-Verse aesthetic. Single-page React app.

---

## Commands

> To be filled once the project is scaffolded. Expected stack: Vite + React.

```bash
npm install        # install dependencies
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview production build
```

---

## Tech Stack

- **React** (Vite)
- **GSAP + ScrollTrigger** — scroll-driven animations on About, Tracks, Timeline, Prizes sections
- **Framer Motion** — mount animations, hover effects, Navbar transitions, FAQ accordion (AnimatePresence)
- **Lenis** — smooth scroll; used for `lenis.scrollTo('#about')` from Hero CTA
- **Bangers** (Google Font) — display/heading font throughout
- **CSS custom properties** — theming, including `[data-theme="noir"]` for Noir Mode easter egg

---

## Architecture

Single-page app. All sections are components rendered in sequence in `App.jsx`. `EasterEggs.jsx` is mounted globally in `App.jsx` as an invisible UI layer.

```
src/
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Tracks.jsx
    Timeline.jsx
    Prizes.jsx
    Judges.jsx
    Sponsors.jsx
    FAQ.jsx
    Register.jsx
    Footer.jsx
    EasterEggs.jsx
  data/
    tracks.js
    timeline.js
    judges.js
    faqs.js
    sponsors.js
```

### Data files drive dynamic content

All event-specific content lives in `src/data/`. Components read from these files — update data files to update the UI (e.g. set a timeline phase `status: 'completed'` and the component renders the completed visual automatically).

**Data schemas:**

`tracks.js` — `{ id, universeLabel, name, tagline, primaryColor, accentColor, problemStatement, prizes }`

`timeline.js` — `{ phase, title, date, description, status ('upcoming'|'active'|'completed'), actionWord }`

`judges.js` — `{ id, name, title, institution, superpower, photo, isClassified }`

`faqs.js` — `{ id, question, answer }`

`sponsors.js` — `{ id, name, tier ('title'|'gold'|'silver'), logo, website }`

---

## Component Notes

### Navbar.jsx
- Transparent on load → dark + `backdrop-blur` on scroll (useEffect + scroll listener toggling a CSS class)
- Left: VELORA wordmark (Bangers, chromatic aberration text-shadow); Center: nav links; Right: "Register Now" CTA (yellow bg, black border, black box-shadow offset)
- Mobile: hamburger → fullscreen overlay nav
- Framer Motion for background transition and mobile menu open/close. No GSAP.

### Hero.jsx
- Full viewport height. Layered (all `position: absolute`):
  1. Dark bg with radial gradient (purple/blue from center)
  2. Halftone dot overlay (CSS)
  3. Animated SVG web lines from a corner
  4. Main content: VELORA heading (Bangers, `clamp(5rem, 12rem)`), chromatic aberration, "DARE TO COMPETE" subtitle, event date/venue in comic caption box, countdown timer (each unit in its own comic-panel bordered box), "ENTER THE VERSE →" CTA
  5. Glitch overlay div — CSS glitch animation, 4s loop, low opacity
- Countdown timer: `setInterval` React component, target date from data file
- CTA click: `lenis.scrollTo('#about')`
- No scroll animations — CSS + Framer Motion on mount only

### About.jsx
- Three comic panels (side by side desktop, stacked mobile)
  - Panel 1: "What is Velora?" — Panel 2: "Who is Cipher?" — Panel 3: "Velora 1.0 — The Beginning"
- Each panel: thick black border, panel number top-left
- Static copy kept in a `constants` object at top of file (not in data/)
- GSAP ScrollTrigger: staggered in from `opacity:0, y:60, rotation:-2`, 0.2s stagger

### Tracks.jsx
- 2-col desktop, 1-col mobile grid; mobile uses horizontal scroll snap
- Each card: "Universe-616" label, track name (Bangers), tagline, problem statement, "Enter Universe →" button
- Per-card color palette from `tracks.js` (`primaryColor`, `accentColor`)
- Framer Motion `whileHover`: scale 1.05, intensified box-shadow, color wash sweep
- GSAP ScrollTrigger: stagger in from below

### Timeline.jsx
- Horizontal scroll desktop, vertical mobile; phases connected by dotted lines (web thread aesthetic)
- Status drives visual: `completed` → checkmark stamp overlay; `active` → glowing border + pulse; `upcoming` → muted standard style
- Each panel: phase number, title, date, description, status badge, action word in starburst
- GSAP ScrollTrigger: sequential entry, action words pop with elastic ease

### Prizes.jsx
- On scroll: background shifts to yellow, prize cards animate in dramatically
- Layout: Grand Prize (center, biggest) → per-track winners → participation tier
- GSAP ScrollTrigger: background color tween, then prize cards stagger

### Judges.jsx
- Trading card layout; each card: thick border, diagonal color band, duotone photo (CSS filter), name (Bangers), title, institution, "superpower" badge
- Unconfirmed judges: "CLASSIFIED" card — redacted aesthetic
- Data from `judges.js` (`isClassified: true` renders the classified card)
- Framer Motion: flip/scale in on scroll, hover float

### Sponsors.jsx
- Three-tier grid: title (full-width), gold (half-width), silver (smaller)
- Logos: grayscale → full color on hover (CSS filter transition)
- Placeholder: "Allies Assembling..." with Cipher branding until sponsors confirmed

### FAQ.jsx
- Accordion; question = left speech bubble (CSS clip-path/`::after` triangle), answer expands below in response bubble style
- Framer Motion `AnimatePresence` for expand/collapse

### Register.jsx
- Full viewport CTA — mirrors Hero aesthetic (dimensional rift background)
- Large text: "Your Universe Needs You." + subtext (team size 2–5, all college students welcome)
- Single CTA: **"Register on Unstop →"** opens Unstop link in new tab (use `href="#"` until URL is provided)
- No form, no Tally embed. Registration is entirely external via Unstop.
- A Round 2 offline form is a MAYBE for later — do NOT build any form infrastructure until explicitly instructed.

### Footer.jsx
- Static, no animations
- VELORA wordmark + Cipher attribution, social icons (Instagram, LinkedIn, Twitter/X), contact email, Code of Conduct link (placeholder)
- Teaser: "Velora 2.0 — The Verse Expands. 2026."

### EasterEggs.jsx
Mounted globally in `App.jsx`. Four easter eggs:

1. **Konami Code** (`↑↑↓↓←→←→BA`) — fullscreen glitch storm, comic panels fly across, reveals secret message / priority registration link
2. **Idle Detection** — after 30s of no scroll/click, speech bubble from bottom corner: "Hey. The multiverse won't save itself." Auto-dismisses after 5s or on interaction.
3. **Logo Click Streak** — click VELORA navbar logo 5× rapidly → "Origin Story" panel slides up (Cipher founding story in comic form)
4. **Noir Mode** — press `N` (when not in an input) → toggles `document.documentElement.setAttribute('data-theme', 'noir')` + CSS variables scoped to `[data-theme="noir"]`, rain effect overlay

---

## Visual / Style Conventions

- **Chromatic aberration** on VELORA wordmark: CSS `text-shadow` with offset red/blue/cyan layers
- **Comic panel** bordered boxes: thick black border, white/near-white bg (or dark variant), panel number top-left
- **CTA button style**: yellow bg (`#FFE600`), black border, black box-shadow offset (no border-radius or minimal)
- **Fonts**: Bangers for all display/headings; body font TBD
- **Glitch animation**: CSS keyframes, triggered on interval or scroll

---

## Component Build Status

- Project Setup ✅
- Navbar ✅ | Hero ✅ | About ⬜ | Tracks ⬜ | Timeline ⬜
- Prizes ⬜ | Judges ⬜ | Sponsors ⬜ | FAQ ⬜ | Register ⬜
- Footer ⬜ | Easter Eggs ⬜

---

## Known Issues

*(log problems here — component name, what's broken, what was tried)*

---

## Session Notes

27-Feb-2026 — Project scaffolded. Vite + React + Tailwind + GSAP + Lenis + Framer Motion all installed. Data files created. globals.css written. Dev server running at localhost:5174. Next: build Navbar and Hero components.
27-Feb-2026 — Navbar and Hero complete. Next: About section.
