import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import { Resvg } from '@resvg/resvg-js'
import { PNG } from 'pngjs'
import gifencPkg from 'gifenc'

const { GIFEncoder, quantize, applyPalette } = gifencPkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const outDir = path.join(rootDir, 'public', 'exports')
const pngOutPath = path.join(outDir, 'velora-wordmark.png')
const gifOutPath = path.join(outDir, 'velora-wordmark-glitch.gif')
const fontPath = path.join(
  rootDir,
  'node_modules',
  '@fontsource',
  'bangers',
  'files',
  'bangers-latin-400-normal.woff'
)

const WIDTH = 1600
const HEIGHT = 600
const FONT_SIZE = 370
const TEXT = 'VELORA'

let cachedPathData = null

function getWordmarkPathData() {
  if (cachedPathData) {
    return cachedPathData
  }

  const fontBuffer = fs.readFileSync(fontPath)
  const font = opentype.parse(fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength))
  const glyphPath = font.getPath(TEXT, 0, 0, FONT_SIZE, { kerning: true })
  const bbox = glyphPath.getBoundingBox()
  const pathData = glyphPath.toPathData(2)

  cachedPathData = {
    pathData,
    width: bbox.x2 - bbox.x1,
    height: bbox.y2 - bbox.y1,
    offsetX: -bbox.x1,
    offsetY: -bbox.y1,
  }

  return cachedPathData
}

function getGlitchState(percent) {
  const scale = 2.2 // Dialed back from 4
  const base = {
    tx: 0,
    ty: 0,
    sh1: { x: 3 * scale, y: 3 * scale, color: '#00D4FF' },
    sh2: { x: -2 * scale, y: -2 * scale, color: '#FFE600' },
    blackSh: { x: 4 * scale, y: 4 * scale },
    clipBand: null,
  }

  if (percent >= 93 && percent < 94) {
    return {
      tx: -3 * scale,
      ty: 1 * scale,
      sh1: { x: 5 * scale, y: 3 * scale, color: '#00D4FF' },
      sh2: { x: -4 * scale, y: -2 * scale, color: '#FFE600' },
      blackSh: { x: 4 * scale, y: 4 * scale },
      clipBand: { topPct: 10, bottomPct: 80 },
    }
  }

  if (percent >= 94 && percent < 95) {
    return {
      tx: 3 * scale,
      ty: -1 * scale,
      sh1: { x: 1 * scale, y: 3 * scale, color: '#FF2D55' },
      sh2: { x: -2 * scale, y: -4 * scale, color: '#FFE600' },
      blackSh: { x: 4 * scale, y: 4 * scale },
      clipBand: { topPct: 60, bottomPct: 20 },
    }
  }

  if (percent >= 95 && percent < 96) {
    return {
      tx: -2 * scale,
      ty: 2 * scale,
      sh1: { x: 3 * scale, y: 5 * scale, color: '#00D4FF' },
      sh2: { x: -2 * scale, y: 0 * scale, color: '#FF2D55' },
      blackSh: { x: 4 * scale, y: 4 * scale },
      clipBand: { topPct: 30, bottomPct: 50 },
    }
  }

  return base
}

function buildSvg(state) {
  const wordmark = getWordmarkPathData()
  const baseX = Math.round((WIDTH - wordmark.width) / 2 + wordmark.offsetX)
  const baseY = Math.round((HEIGHT - wordmark.height) / 2 + wordmark.offsetY)

  const groupStart = `<g transform="translate(${state.tx}, ${state.ty})">`
  const groupEnd = '</g>'

  let clipDefs = ''
  let clipAttr = ''

  if (state.clipBand) {
    const top = (state.clipBand.topPct / 100) * HEIGHT
    const bottom = (state.clipBand.bottomPct / 100) * HEIGHT
    const h = Math.max(0, HEIGHT - top - bottom)

    clipDefs = `
      <defs>
        <clipPath id="glitch-band">
          <rect x="0" y="${top}" width="${WIDTH}" height="${h}" />
        </clipPath>
      </defs>
    `
    clipAttr = ' clip-path="url(#glitch-band)"'
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      ${clipDefs}
      <g${clipAttr}>
        ${groupStart}
          <path d="${wordmark.pathData}" transform="translate(${baseX + state.blackSh.x}, ${baseY + state.blackSh.y})" fill="rgba(0,0,0,0.5)" />
          <path d="${wordmark.pathData}" transform="translate(${baseX + state.sh1.x}, ${baseY + state.sh1.y})" fill="${state.sh1.color}" stroke="${state.sh1.color}" stroke-width="3" stroke-linejoin="round" />
          <path d="${wordmark.pathData}" transform="translate(${baseX + state.sh2.x}, ${baseY + state.sh2.y})" fill="${state.sh2.color}" stroke="${state.sh2.color}" stroke-width="3" stroke-linejoin="round" />
          <path d="${wordmark.pathData}" transform="translate(${baseX}, ${baseY})" fill="#FF2D55" stroke="#FF2D55" stroke-width="1.5" stroke-linejoin="round" />
        ${groupEnd}
      </g>
    </svg>
  `
}

function renderPngBuffer(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'original' },
  })

  return resvg.render().asPng()
}

function ensureOutputDirectory() {
  fs.mkdirSync(outDir, { recursive: true })
}

function writeStaticPng() {
  const state = getGlitchState(0)
  const png = renderPngBuffer(buildSvg(state))
  fs.writeFileSync(pngOutPath, png)
}

function writeGlitchGif() {
  const durationMs = 6000
  const fps = 12
  const frameCount = Math.round((durationMs / 1000) * fps)
  const frameDelay = Math.round(1000 / fps)

  const gif = GIFEncoder()

  for (let i = 0; i < frameCount; i += 1) {
    const percent = (i / frameCount) * 100
    const state = getGlitchState(percent)
    const pngBuffer = renderPngBuffer(buildSvg(state))
    const parsed = PNG.sync.read(Buffer.from(pngBuffer))

    const rgba = new Uint8Array(parsed.data)
    const palette = quantize(rgba, 256, {
      format: 'rgba4444',
      oneBitAlpha: true,
      clearAlpha: false,
    })
    const index = applyPalette(rgba, palette, 'rgba4444')

    const transparentIndex = palette.findIndex((c) => c[3] === 0)

    gif.writeFrame(index, parsed.width, parsed.height, {
      palette,
      repeat: 0,
      delay: frameDelay,
      dispose: 2,
      transparent: transparentIndex >= 0,
      transparentIndex: transparentIndex >= 0 ? transparentIndex : 0,
    })
  }

  gif.finish()
  fs.writeFileSync(gifOutPath, gif.bytes())
}

function main() {
  ensureOutputDirectory()
  writeStaticPng()
  writeGlitchGif()

  console.log('Exported files:')
  console.log(`- ${pngOutPath}`)
  console.log(`- ${gifOutPath}`)
}

main()
