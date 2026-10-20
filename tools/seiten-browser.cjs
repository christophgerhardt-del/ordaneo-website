#!/usr/bin/env node
// tools/seiten-browser.cjs – Seiten im echten Browser prüfen (Google Chrome über Playwright, nichts installieren).
// Prüft je Seite bei 1440 px und 390 px: keine Seitwärts-Scrollleiste, keine Anfragen an fremde Adressen, keine
// fehlgeschlagenen Anfragen, keine Konsolenfehler, alle Bilder geladen. Dazu einmal Ausklappmenü (Desktop) und
// Burger-Menü (Telefon). Optional Bildschirmfotos als JPEG in einen Ordner außerhalb des Repositorys.
//
//   python3 -m http.server 9391 --bind 127.0.0.1        (im Repository; eigener Port, danach per PID beenden)
//   NODE_PATH=~/warenwirtschaft-marke/node_modules node tools/seiten-browser.cjs http://127.0.0.1:9391 [--fotos ORDNER] [pfad …]
//
// Ohne Pfade: alle gebauten Seiten. Exit 1, wenn etwas auffällt.
'use strict'
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')
const { FUNKTIONEN, BRANCHEN, WEITERE } = require('./seiten.cjs')

const ROOT = path.resolve(__dirname, '..')
const args = process.argv.slice(2)
const basis = (args.shift() || '').replace(/\/$/, '')
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(basis)) {
  console.log('Aufruf: node tools/seiten-browser.cjs http://127.0.0.1:PORT [--fotos ORDNER] [pfad …]')
  process.exit(2)
}
let fotos = null
const i = args.indexOf('--fotos')
if (i >= 0) { fotos = path.resolve(args[i + 1]); args.splice(i, 2); fs.mkdirSync(fotos, { recursive: true }) }
const gebaut = ['/', ...[...WEITERE, ...FUNKTIONEN, ...BRANCHEN].map((s) => s.pfad), '/impressum.html', '/datenschutz.html', '/404.html']
  .filter((p, n, a) => a.indexOf(p) === n)
  .filter((p) => fs.existsSync(p.endsWith('/') ? path.join(ROOT, p, 'index.html') : path.join(ROOT, p)))
const pfade = args.length ? args : gebaut
const BREITEN = [
  { name: '1440', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
  { name: '390', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
]

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  let auffaellig = 0
  for (const b of BREITEN) {
    const context = await browser.newContext({ viewport: b.viewport, deviceScaleFactor: 1, isMobile: b.isMobile, hasTouch: b.hasTouch, locale: 'de-DE' })
    for (const pfad of pfade) {
      const page = await context.newPage()
      const befunde = []
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') befunde.push(`Konsole ${m.type()}: ${m.text()}`) })
      page.on('pageerror', (e) => befunde.push(`Skriptfehler: ${e.message}`))
      page.on('request', (r) => { const u = r.url(); if (!u.startsWith(basis) && !u.startsWith('data:')) befunde.push(`fremde Anfrage: ${u}`) })
      page.on('requestfailed', (r) => befunde.push(`Anfrage fehlgeschlagen: ${r.url()}`))
      page.on('response', (r) => { if (r.status() >= 400 && !(pfad === '/404.html' && r.url() === basis + pfad)) befunde.push(`HTTP ${r.status()}: ${r.url()}`) })
      await page.goto(basis + pfad, { waitUntil: 'load' })
      await page.evaluate(async () => {
        const warte = (ms) => new Promise((r) => setTimeout(r, ms))
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await warte(60) }
        await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.addEventListener('load', r); img.addEventListener('error', r); setTimeout(r, 5000) }))))
        window.scrollTo(0, 0)
      })
      await page.waitForLoadState('networkidle')
      const lage = await page.evaluate(() => {
        const w = document.documentElement.clientWidth
        const sw = document.documentElement.scrollWidth
        const breit = []
        for (const el of document.querySelectorAll('main *, footer *')) {
          const r = el.getBoundingClientRect()
          if (r.width && r.right > w + 1) {
            const k = typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : ''
            breit.push(`${el.tagName.toLowerCase()}${k} (rechts ${Math.round(r.right)} px)`)
            if (breit.length >= 6) break
          }
        }
        const kaputt = [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.getAttribute('src'))
        return { w, sw, breit, kaputt }
      })
      if (lage.sw > lage.w) befunde.push(`Seitwärts-Scrollleiste: Seite ${lage.sw} px breit bei ${lage.w} px`)
      for (const e of lage.breit) befunde.push(`ragt heraus: ${e}`)
      for (const k of lage.kaputt) befunde.push(`Bild nicht geladen: ${k}`)
      if (fotos) {
        const name = (pfad === '/' ? 'start' : pfad.replace(/^\/|\/$/g, '').replace(/[/.]/g, '_')) + `-${b.name}.jpg`
        await page.screenshot({ path: path.join(fotos, name), fullPage: true, type: 'jpeg', quality: 50 })
      }
      // Menüs einmal je Breite auf der ersten Seite
      if (pfad === pfade[0]) {
        if (b.name === '1440') {
          await page.hover('.hat-menue.mega .hat-knopf')
          await page.waitForTimeout(300)
          const box = await page.$eval('#flyout-funktionen', (el) => { const r = el.getBoundingClientRect(); return { sichtbar: getComputedStyle(el).visibility === 'visible', links: r.left, rechts: r.right, w: document.documentElement.clientWidth } })
          if (!box.sichtbar) befunde.push('Ausklappmenü „Funktionen“ öffnet bei Hover nicht')
          if (box.links < 0 || box.rechts > box.w) befunde.push('Ausklappmenü „Funktionen“ ragt aus dem Fenster')
          if (fotos) await page.screenshot({ path: path.join(fotos, `menue-funktionen-${b.name}.jpg`), type: 'jpeg', quality: 60 })
          await page.mouse.move(5, 600)
          await page.waitForTimeout(400)
          await page.click('.hat-menue:not(.mega) .hat-pfeil')
          await page.waitForTimeout(300)
          const offen = await page.$eval('#flyout-branchen', (el) => getComputedStyle(el).visibility === 'visible')
          if (!offen) befunde.push('Ausklappmenü „Branchen“ öffnet per Klick nicht')
          await page.keyboard.press('Escape')
          await page.waitForTimeout(300)
          const zu = await page.$eval('#flyout-branchen', (el) => getComputedStyle(el).visibility === 'hidden')
          if (!zu) befunde.push('Escape schließt das Ausklappmenü nicht')
        } else {
          await page.click('.burger')
          await page.waitForTimeout(300)
          await page.click('#menue details summary')
          await page.waitForTimeout(200)
          const ok = await page.$eval('#menue', (el) => getComputedStyle(el).opacity === '1' && el.querySelector('details').open)
          if (!ok) befunde.push('Burger-Menü oder Gruppe „Funktionen“ öffnet nicht')
          if (fotos) await page.screenshot({ path: path.join(fotos, `menue-mobil-${b.name}.jpg`), type: 'jpeg', quality: 60 })
        }
      }
      await page.close()
      const eindeutig = [...new Set(befunde)]
      auffaellig += eindeutig.length
      console.log(`${eindeutig.length ? '✗' : '✓'} ${b.name.padStart(4)} ${pfad}`)
      for (const f of eindeutig) console.log(`      ${f}`)
    }
    await context.close()
  }
  await browser.close()
  console.log(`\n${pfade.length} Seite(n) × ${BREITEN.length} Breiten · ${auffaellig} Befund(e)${fotos ? ` · Fotos in ${fotos}` : ''}`)
  process.exitCode = auffaellig ? 1 : 0
})().catch((e) => { console.error(e); process.exitCode = 1 })
