// Rendert das Geräte-Bild des Hero (Rechner, iPad, iPhone) aus tools/geraete.html in Google Chrome über Playwright
// und speichert es als WebP in drei Breiten: assets/screens/geraete-1000.webp, -1400.webp, -2000.webp.
//
// Voraussetzung: eine lokale Vorschau läuft (siehe README), Playwright ist auffindbar (z. B. über NODE_PATH aus einem
// anderen Projekt – im Website-Ordner wird nichts installiert) und python3 mit Pillow (WebP) ist vorhanden:
//   NODE_PATH=/pfad/zu/projekt/node_modules node tools/render-geraete.cjs http://127.0.0.1:9370
const path = require('path')
const os = require('os')
const { execFileSync } = require('child_process')
const { chromium } = require('playwright')

const base = (process.argv[2] || 'http://127.0.0.1:9370').replace(/\/$/, '')
const outDir = path.join(__dirname, '..', 'assets', 'screens')
const png = path.join(os.tmpdir(), `ordaneo-geraete-${process.pid}.png`)

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome' })
  try {
    const page = await browser.newPage({ viewport: { width: 2000, height: 1440 }, deviceScaleFactor: 1 })
    await page.goto(`${base}/tools/geraete.html`, { waitUntil: 'networkidle' })
    await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode())))
    await page.locator('#flaeche').screenshot({ path: png, omitBackground: true })
  } finally {
    await browser.close()
  }
  const script = [
    'import sys',
    'from PIL import Image',
    'src, out = sys.argv[1], sys.argv[2]',
    'im = Image.open(src).convert("RGBA")',
    'for w in (1000, 1400, 2000):',
    '    h = round(im.height * w / im.width)',
    '    im.resize((w, h), Image.LANCZOS).save(f"{out}/geraete-{w}.webp", "WEBP", quality=86, method=6)',
  ].join('\n')
  execFileSync('python3', ['-c', script, png, outDir])
  console.log(`geschrieben: ${outDir}/geraete-{1000,1400,2000}.webp`)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
