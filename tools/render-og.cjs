// Rendert assets/og.png (1200 × 630) aus tools/og.html in Google Chrome über Playwright.
//
// Voraussetzung: eine lokale Vorschau läuft (siehe README) und Playwright ist auffindbar,
// z. B. aus einem anderen Projekt über NODE_PATH – im Website-Ordner wird nichts installiert:
//   NODE_PATH=/pfad/zu/projekt/node_modules node tools/render-og.cjs http://127.0.0.1:9370
//
// Es wird der installierte Chrome benutzt (channel 'chrome'), kein Browser-Download.
const path = require('path')
const { chromium } = require('playwright')

const base = (process.argv[2] || 'http://127.0.0.1:9370').replace(/\/$/, '')
const out = path.join(__dirname, '..', 'assets', 'og.png')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome' })
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
    await page.goto(`${base}/tools/og.html`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: out, type: 'png' })
    console.log(`geschrieben: ${out}`)
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
