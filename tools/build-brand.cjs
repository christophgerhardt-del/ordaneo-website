// Erzeugt alle Markendateien in assets/brand (SVG + PNG) und favicon.ico (16/32/48) aus der Geometrie der
// Bildmarke A „Eckstein“ (BRAND.md §3) und den Farben aus BRAND.md §6. Die Wortmarke wird nicht neu gezeichnet:
// Ihre Pfade kommen aus assets/brand/ordaneo-wordmark.svg und gehen unverändert in die Lockups.
//
// Voraussetzung: Playwright ist auffindbar (z. B. über NODE_PATH aus einem anderen Projekt – im Website-Ordner wird
// nichts installiert); gerendert wird mit dem installierten Chrome (channel 'chrome', kein Browser-Download):
//   NODE_PATH=/pfad/zu/projekt/node_modules node tools/build-brand.cjs
//
// Danach die Dateien der Anwendung abgleichen (BRAND.md §11): web/public/ordaneo-mark.svg, favicon.svg und
// web/public/icons/*.png sind Kopien von hier.
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'assets', 'brand')

// Farben (BRAND.md §6). Das Orange gehört nur der Einheit der Bildmarke (Entscheidung Christoph 20.10.2026).
const C = {
  graphit: '#15171b', // Kachel hell (neutral-900)
  hell: '#f9fafb', // Rahmen auf Graphit (neutral-50)
  kachelDunkel: '#f3f4f6', // Kachel auf dunklem Grund (neutral-100, wie im dunklen Theme der Anwendung)
  zeichenDunkel: '#0e1114', // Rahmen auf heller Kachel (neutral-950)
  orange: '#e8650e', // Einheit auf Graphit: 5,4 : 1
  orangeTief: '#c9530a', // Einheit auf heller Kachel / hellem Grund: 4,0 : 1 auf #f3f4f6 (das Orange nur 3,0 : 1)
}

// Bildmarke A „Eckstein“, Raster 32 × 32: eckiges O als Rahmen, die Einheit schließt die letzte Ecke
const FRAME_D = 'M14.5 23.5H13a4.5 4.5 0 0 1-4.5-4.5v-6A4.5 4.5 0 0 1 13 8.5h6a4.5 4.5 0 0 1 4.5 4.5v1.5'
const FRAME_W = 3
const UNIT = { x: 18, y: 18, s: 7, rx: 1.75 }
// Zeichen ohne Kachel: dieselbe Form um die Mitte auf das 1,5-Fache vergrößert
const BARE_D = 'M13.75 27.25H11.5a6.75 6.75 0 0 1-6.75-6.75v-9A6.75 6.75 0 0 1 11.5 4.75h9a6.75 6.75 0 0 1 6.75 6.75v2.25'
const BARE_UNIT = '<rect x="19" y="19" width="10.5" height="10.5" rx="2.625"'

const ring = (stroke) =>
  `<path d="${FRAME_D}" fill="none" stroke="${stroke}" stroke-width="${FRAME_W}" stroke-linecap="round" stroke-linejoin="round"/>`
const unit = (fill) => `<rect x="${UNIT.x}" y="${UNIT.y}" width="${UNIT.s}" height="${UNIT.s}" rx="${UNIT.rx}" fill="${fill}"/>`

const files = {}

files['ordaneo-mark.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ordaneo">
  <rect width="32" height="32" rx="8" fill="var(--color-inverse, ${C.graphit})"/>
  ${ring(`var(--color-fg-inverse, ${C.hell})`)}
  ${unit(`var(--color-logo-unit, ${C.orange})`)}
</svg>
`

files['ordaneo-mark-dark.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ordaneo">
  <rect width="32" height="32" rx="8" fill="${C.kachelDunkel}"/>
  ${ring(C.zeichenDunkel)}
  ${unit(C.orangeTief)}
</svg>
`

// Zeichen ohne Kachel (Inline, KI-Assistent): Rahmen in currentColor, Einheit orange passend zum Grund
const symbol = (color, unitFill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ordaneo" color="${color}">
  <path d="${BARE_D}" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  ${BARE_UNIT} fill="${unitFill}"/>
</svg>
`
files['ordaneo-symbol.svg'] = symbol(C.graphit, `var(--color-logo-unit-bare, ${C.orangeTief})`)
files['ordaneo-symbol-dark.svg'] = symbol(C.hell, C.orange)

files['favicon.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .k { fill: ${C.graphit} } .z { stroke: ${C.hell} } .e { fill: ${C.orange} }
    @media (prefers-color-scheme: dark) { .k { fill: ${C.kachelDunkel} } .z { stroke: ${C.zeichenDunkel} } .e { fill: ${C.orangeTief} } }
  </style>
  <rect class="k" width="32" height="32" rx="8"/>
  <path class="z" d="${FRAME_D}" fill="none" stroke-width="${FRAME_W}" stroke-linecap="round" stroke-linejoin="round"/>
  <rect class="e" x="${UNIT.x}" y="${UNIT.y}" width="${UNIT.s}" height="${UNIT.s}" rx="${UNIT.rx}"/>
</svg>
`

// Wortmarke: Pfade aus der vorhandenen Datei (x-Höhe 100, Ursprung der Gruppe = Oberkante x-Höhe, Oberlänge 40)
const wordmarkSvg = fs.readFileSync(path.join(OUT, 'ordaneo-wordmark.svg'), 'utf8')
const [, wmW, wmH] = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(wordmarkSvg) || []
const wmPaths = (/<g [^>]*>\s*([\s\S]*?)\s*<\/g>/.exec(wordmarkSvg) || [])[1]
const asc = Number((/translate\(0 ([\d.]+)\)/.exec(wordmarkSvg) || [])[1])
if (!wmW || !wmPaths || !asc) throw new Error('assets/brand/ordaneo-wordmark.svg: viewBox, Pfade oder Oberlänge nicht gefunden')
const top = -asc
const bottom = Number(wmH) - asc

// Lockup: Kachel = 1,5 × x-Höhe, mittig auf der x-Höhe; Abstand = 0,35 × Kachel
const T = 150
const tileTop = 50 - T / 2
const gap = T * 0.35
const lkTop = Math.min(top, tileTop)
const lkBottom = Math.max(bottom, tileTop + T)
const lkW = +(T + gap + Number(wmW)).toFixed(2)
const lkH = lkBottom - lkTop
const lockup = (tile, line, unitFill, text) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lkW} ${lkH}" role="img" aria-label="Ordaneo" color="${text}">
  <g transform="translate(0 ${tileTop - lkTop}) scale(${T / 32})">
    <rect width="32" height="32" rx="8" fill="${tile}"/>
    ${ring(line)}
    ${unit(unitFill)}
  </g>
  <g transform="translate(${T + gap} ${-lkTop})" fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="miter">
    ${wmPaths}
  </g>
</svg>
`
files['ordaneo-lockup.svg'] = lockup(C.graphit, C.hell, C.orange, C.graphit)
files['ordaneo-lockup-dark.svg'] = lockup(C.kachelDunkel, C.zeichenDunkel, C.orangeTief, C.hell)

for (const [name, svg] of Object.entries(files)) fs.writeFileSync(path.join(OUT, name), svg)

// PNG-Exporte: immer die Graphit-Kachel mit hellem Rahmen und oranger Einheit
const tileSvg = (size, opts = {}) => {
  // opts.bleed: randlose Fläche (iOS/maskable), opts.scale: Zeichengröße relativ zur Kachel
  const s = opts.scale ?? 1
  const g = `<g transform="translate(16 16) scale(${s}) translate(-16 -16)">${ring(C.hell)}${unit(C.orange)}</g>`
  const bg = opts.bleed ? `<rect width="32" height="32" fill="${C.graphit}"/>` : `<rect width="32" height="32" rx="8" fill="${C.graphit}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">${bg}${g}</svg>`
}
const pngs = [
  ['favicon-32.png', 32, {}],
  ['apple-touch-icon.png', 180, { bleed: true, scale: 0.9 }],
  ['icon-192.png', 192, {}],
  ['icon-512.png', 512, {}],
  ['icon-maskable-512.png', 512, { bleed: true, scale: 0.72 }],
]

/** ICO mit eingebetteten PNGs (Windows Vista und neuer, alle aktuellen Browser) */
function ico(images) {
  const head = Buffer.alloc(6 + 16 * images.length)
  head.writeUInt16LE(0, 0)
  head.writeUInt16LE(1, 2)
  head.writeUInt16LE(images.length, 4)
  let offset = head.length
  images.forEach(({ size, png }, i) => {
    const e = 6 + 16 * i
    head.writeUInt8(size >= 256 ? 0 : size, e)
    head.writeUInt8(size >= 256 ? 0 : size, e + 1)
    head.writeUInt8(0, e + 2)
    head.writeUInt8(0, e + 3)
    head.writeUInt16LE(1, e + 4)
    head.writeUInt16LE(32, e + 6)
    head.writeUInt32LE(png.length, e + 8)
    head.writeUInt32LE(offset, e + 12)
    offset += png.length
  })
  return Buffer.concat([head, ...images.map((i) => i.png)])
}

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome' })
  try {
    const page = await browser.newPage({ viewport: { width: 600, height: 600 }, deviceScaleFactor: 1, colorScheme: 'light' })
    for (const [name, size, o] of pngs) {
      await page.setContent(`<body style="margin:0;background:transparent"><div id="w" style="width:${size}px;height:${size}px;line-height:0">${tileSvg(size, o)}</div>`)
      await page.locator('#w').screenshot({ path: path.join(OUT, name), omitBackground: true })
    }
    // favicon.ico aus favicon.svg (helles Schema = Graphit-Kachel), als Bild gezeichnet wie im Browser-Tab
    const data = `data:image/svg+xml;base64,${Buffer.from(files['favicon.svg']).toString('base64')}`
    const images = []
    for (const size of [16, 32, 48]) {
      await page.setContent(`<body style="margin:0;background:transparent"><img id="w" src="${data}" width="${size}" height="${size}" style="display:block"></body>`)
      await page.locator('#w').evaluate((img) => img.decode())
      images.push({ size, png: await page.locator('#w').screenshot({ omitBackground: true }) })
    }
    fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico(images))
  } finally {
    await browser.close()
  }
  console.log(Object.keys(files).concat(pngs.map((p) => p[0]), ['../../favicon.ico (16, 32, 48)']).join('\n'))
  console.log(`Lockup ${lkW} × ${lkH}`)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
