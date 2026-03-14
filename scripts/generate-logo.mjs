import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import { Resvg } from '@resvg/resvg-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const publicDir = path.join(rootDir, 'public')
const outSvg = path.join(publicDir, 'favicon.svg')
const outPng = path.join(publicDir, 'velora-logo.png')
const outFaviconPng = path.join(publicDir, 'favicon.png')

const fontPath = path.join(
  rootDir,
  'node_modules',
  '@fontsource',
  'bangers',
  'files',
  'bangers-latin-400-normal.woff'
)

const WIDTH = 512
const HEIGHT = 512
const FONT_SIZE = 440
const TEXT = 'V'

const fontBuffer = fs.readFileSync(fontPath)
const font = opentype.parse(fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength))
const glyphPath = font.getPath(TEXT, 0, 0, FONT_SIZE, { kerning: true })
const bbox = glyphPath.getBoundingBox()
const pathData = glyphPath.toPathData(2)

const w = bbox.x2 - bbox.x1
const h = bbox.y2 - bbox.y1
const offsetX = -bbox.x1
const offsetY = -bbox.y1

// Re-center
const baseX = Math.round((WIDTH - w) / 2 + offsetX)
const baseY = Math.round((HEIGHT - h) / 2 + offsetY + 24)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <clipPath id="slice-1">
      <polygon points="0,0 ${WIDTH},0 ${WIDTH},${HEIGHT/2} 0,${HEIGHT/2.3}" />
    </clipPath>
    <clipPath id="slice-2">
      <polygon points="0,${HEIGHT/2.3} ${WIDTH},${HEIGHT/2} ${WIDTH},${HEIGHT} 0,${HEIGHT}" />
    </clipPath>

    <pattern id="halftone" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="transparent"/>
      <circle cx="3" cy="3" r="2.5" fill="rgba(255,255,255,0.15)"/>
      <circle cx="11" cy="11" r="2.5" fill="rgba(255,255,255,0.15)"/>
    </pattern>

    <filter id="comic-shade" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="12" dy="12" stdDeviation="0" flood-color="#000" flood-opacity="1" />
    </filter>
  </defs>

  <style>
    .v-glitch-1 { transform: translate(0, 0); animation: v-pulse-1 4s steps(1, end) infinite; }
    .v-glitch-2 { transform: translate(0, 0); animation: v-pulse-2 4s steps(1, end) infinite; }
    
    @keyframes v-pulse-1 {
      0%, 92% { transform: translate(0, 0); }
      93% { transform: translate(-8px, 4px); filter: hue-rotate(90deg); }
      95% { transform: translate(4px, -4px); filter: hue-rotate(-90deg); }
      97% { transform: translate(0, 0); }
      100% { transform: translate(0, 0); }
    }
    @keyframes v-pulse-2 {
      0%, 93% { transform: translate(0, 0); }
      94% { transform: translate(6px, -4px); filter: hue-rotate(180deg); }
      96% { transform: translate(-4px, 4px); filter: hue-rotate(-45deg); }
      98% { transform: translate(0, 0); }
      100% { transform: translate(0, 0); }
    }
  </style>

  <!-- Cyan & Yellow Chromatic Aberration -->
  <path d="${pathData}" transform="translate(${baseX - 10}, ${baseY + 6})" fill="#00D4FF" />
  <path d="${pathData}" transform="translate(${baseX + 14}, ${baseY - 8})" fill="#FFE600" />

  <!-- Base Black Shadow (Drop shadow handles the actual offset via filter but we do a thick black border behind) -->
  <path d="${pathData}" transform="translate(${baseX}, ${baseY})" fill="none" stroke="#000" stroke-width="20" stroke-linejoin="round" />

  <!-- Sliced Red "V" Layers with Halftone -->
  <g class="v-glitch-1" clip-path="url(#slice-1)">
    <path d="${pathData}" transform="translate(${baseX}, ${baseY})" fill="#FF2D55" stroke="#000" stroke-width="8" stroke-linejoin="round" />
    <path d="${pathData}" transform="translate(${baseX}, ${baseY})" fill="url(#halftone)" />
  </g>

  <g class="v-glitch-2" clip-path="url(#slice-2)">
    <path d="${pathData}" transform="translate(${baseX}, ${baseY})" fill="#FF2D55" stroke="#000" stroke-width="8" stroke-linejoin="round" />
    <path d="${pathData}" transform="translate(${baseX}, ${baseY})" fill="url(#halftone)" />
  </g>
</svg>`

fs.writeFileSync(outSvg, svg)

const resvg = new Resvg(svg, { fitTo: { mode: 'original' } })
fs.writeFileSync(outPng, resvg.render().asPng())

const resvgFav = new Resvg(svg, { fitTo: { mode: 'width', value: 128 } })
fs.writeFileSync(outFaviconPng, resvgFav.render().asPng())

console.log('Logo files generated!')
