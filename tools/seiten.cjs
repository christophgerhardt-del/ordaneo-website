#!/usr/bin/env node
// tools/seiten.cjs – Seitenliste, gemeinsamer Kopf und Fuß und Prüfung aller Seiten von ordaneo.de.
// Reines Node, keine Abhängigkeit. Wird nicht veröffentlicht (_config.yml › exclude: tools).
//
//   node tools/seiten.cjs teile                  Kopf und Fußzeile in alle Seiten schreiben – zwischen den Markern
//                                                <!-- KOPF --> … <!-- /KOPF --> und <!-- FUSS --> … <!-- /FUSS -->
//   node tools/seiten.cjs pruefen [pfad …]       alle (oder die genannten) Seiten prüfen; Exit 1 bei Fehlern
//   node tools/seiten.cjs symbol NAME [GRÖSSE]   SVG eines Symbols zum Einfügen ausgeben (Standard 18 px)
//   node tools/seiten.cjs symbole                alle Symbolnamen
//   node tools/seiten.cjs bild STAMM [hero]      fertiges <figure> für ein Produktbild (Alt-Text und Unterschrift aus plan/BILDER.md)
//   node tools/seiten.cjs bilder                 alle Bilder aus plan/BILDER.md (ID, Format, Datei-Stamm)
//
// Kopf und Fuß entstehen allein aus SEITEN unten. Neue Seiten bekommen sie über die Vorlage
// (tools/vorlage-seite.html) schon fertig; `teile` braucht nur, wer Kopf oder Fuß ändert (Hauptsitzung).
'use strict'
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SITE = 'https://ordaneo.de'
const DEMO = 'https://erp.ordaneo.de'

// ── Symbole (Strichzeichnungen 24 × 24, Farbe über currentColor) ──────────────────────────────────────────────
const SYMBOLE = {
  lager: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  chargen: '<path d="M6 3h12M6 21h12M8 3v3.5l4 4.5 4-4.5V3M8 21v-3.5l4-4.5 4 4.5V21"/>',
  pfand: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v4.5h-4.5"/>',
  inventur: '<rect x="5" y="4" width="14" height="17.5" rx="2"/><path d="M9 4V2.5h6V4M8.5 12.5l2.4 2.4 4.6-4.6"/>',
  einkauf: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h3l2.4 11.2a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.2L21 8H6.6"/>',
  verkauf: '<path d="M5.5 7.5h13l-1 13.5h-11z"/><path d="M9 7.5V6a3 3 0 0 1 6 0v1.5"/>',
  preise: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  online: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  touren: '<path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 10h4l3.5 3.5V16h-7.5"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  kasse: '<path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 7.5h6M9 11.5h6M9 15.5h3"/>',
  rechnung: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  erechnung: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M10 12.5l-2 2.25 2 2.25M14 12.5l2 2.25-2 2.25"/>',
  auswertungen: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  ki: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7z"/>',
  rechte: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  apps: '<path d="M3 7.5V5a2 2 0 0 1 2-2h2.5M16.5 3H19a2 2 0 0 1 2 2v2.5M21 16.5V19a2 2 0 0 1-2 2h-2.5M7.5 21H5a2 2 0 0 1-2-2v-2.5M7.5 8v8M10.5 8v8M13.5 8v8M16.5 8v8"/>',
  getraenke: '<path d="M10 2.5h4M10.5 2.5v4l-2 3a3 3 0 0 0-.5 1.7V20a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-8.8a3 3 0 0 0-.5-1.7l-2-3v-4M8 14h8"/>',
  fachhandel: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  einfuehrung: '<path d="M4 21V4M4 4h12l-2 4 2 4H4"/>',
  sicherheit: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  fragen: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 1c0 1.8-2.5 2.3-2.5 3.8M12 17.5h.01"/>',
  haken: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  auge: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  storno: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  personen: '<path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"/><circle cx="10" cy="8" r="3.5"/><path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 4.6a3.5 3.5 0 0 1 0 6.8"/>',
  uhr: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  kalender: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
  ort: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/>',
  geld: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v.01M18 14.5v.01"/>',
  liste: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  sperre: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  glocke: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="1.8"/><rect x="3" y="13" width="18" height="7" rx="1.8"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  datenbank: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  telefon: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
  tablet: '<rect x="4" y="2.5" width="16" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  gebaeude: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
  prozent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  pin: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 12h.01M10.5 12h.01M14 12h.01M17.5 12h.01"/>',
  warnung: '<path d="M12 3.5L2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/>',
  export: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  hochladen: '<path d="M12 21V9M7 14l5-5 5 5M4 4h16"/>',
  sprechblase: '<path d="M21 12a8 8 0 0 1-11.8 7L4 20.5l1.5-4.7A8 8 0 1 1 21 12z"/>',
  suche: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  schalter: '<rect x="2.5" y="7" width="19" height="10" rx="5"/><circle cx="16.5" cy="12" r="2.5"/>',
  kette: '<path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8"/>',
  stern: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7z"/>',
  barcode: '<path d="M4 5v14M7.5 5v14M11 5v14M14 5v14M17.5 5v14M20.5 5v14"/>',
  drucker: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
  festschreiben: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5"/>',
  zahnrad: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  fest: '<path d="M5.8 11.3L2 22l10.7-3.8"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01"/><path d="M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="M11 13l-4.5-4.5L2 22"/>',
}

function svg(name, groesse = 18) {
  const inner = SYMBOLE[name]
  if (!inner) throw new Error(`Unbekanntes Symbol „${name}“ – node tools/seiten.cjs symbole`)
  return `<svg width="${groesse}" height="${groesse}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`
}

// ── Seitenliste (Seitenplan Abschnitt 3.1; Liste A/B/C laut plan/VORLAGE.md) ─────────────────────────────────
const GRUPPEN = [
  { key: 'ware', name: 'Ware &amp; Lager' },
  { key: 'handel', name: 'Einkauf &amp; Verkauf' },
  { key: 'geld', name: 'Auslieferung, Kasse &amp; Geld' },
  { key: 'steuerung', name: 'Überblick &amp; Steuerung' },
]
// name = Menü, Fußzeile und Brotkrume · zeile = Menüzeile · titel = <title> · liste = Bau-Liste
const FUNKTIONEN = [
  { nr: '1', pfad: '/funktionen/lager-bestand/', name: 'Lager &amp; Bestand', zeile: 'Bestand aus jeder Bewegung, bis auf den Lagerplatz.', titel: 'Lager und Bestand – Ordaneo', symbol: 'lager', farbe: 'bg-blau', gruppe: 'ware', liste: 'B' },
  { nr: '2', pfad: '/funktionen/chargen-mhd/', name: 'Chargen &amp; MHD', zeile: 'Was zuerst abläuft, geht zuerst raus.', titel: 'Chargen, MHD und FEFO – Ordaneo', symbol: 'chargen', farbe: 'bg-amber', gruppe: 'ware', liste: 'A' },
  { nr: '3', pfad: '/funktionen/pfand-leergut/', name: 'Pfand &amp; Leergut', zeile: 'Vom Kastenpfand bis zum Leergutkonto – an Kasse und Tür.', titel: 'Pfand und Leergut – Ordaneo', symbol: 'pfand', farbe: 'bg-teal', gruppe: 'ware', liste: 'A' },
  { nr: '12', pfad: '/funktionen/inventur/', name: 'Inventur', zeile: 'Blind am Telefon zählen, permanent oder zum Stichtag.', titel: 'Inventur – Ordaneo', symbol: 'inventur', farbe: 'bg-gruen', gruppe: 'ware', liste: 'B' },
  { nr: '4', pfad: '/funktionen/einkauf/', name: 'Einkauf', zeile: 'Bestellvorschlag, Freigabe, Wareneingang, Rechnungsprüfung.', titel: 'Einkauf – Ordaneo', symbol: 'einkauf', farbe: 'bg-violett', gruppe: 'handel', liste: 'B' },
  { nr: '5', pfad: '/funktionen/verkauf/', name: 'Verkauf, Kommission &amp; Verleih', zeile: 'Angebot bis Rücknahme, Kreditlimit, Festservice.', titel: 'Verkauf, Kommission und Verleih – Ordaneo', symbol: 'verkauf', farbe: 'bg-blau', gruppe: 'handel', liste: 'B' },
  { nr: '11', pfad: '/funktionen/preise-aktionen/', name: 'Preise &amp; Aktionen', zeile: 'Preislisten, Massenänderung mit Vorschau, Etiketten.', titel: 'Preise und Aktionen – Ordaneo', symbol: 'preise', farbe: 'bg-rose', gruppe: 'handel', liste: 'B' },
  { nr: '7', pfad: '/funktionen/online-bestellung/', name: 'Online-Bestellung &amp; Abholung', zeile: 'Bestell-App anbinden, Lieferfenster, Gutscheine, Abholcode.', titel: 'Online-Bestellung, Lieferregeln und Abholung – Ordaneo', symbol: 'online', farbe: 'bg-navy', gruppe: 'handel', liste: 'A' },
  { nr: '6', pfad: '/funktionen/touren/', name: 'Touren &amp; Auslieferung', zeile: 'Disposition, Ladeliste, Fahrer an der Tür.', titel: 'Touren und Auslieferung – Ordaneo', symbol: 'touren', farbe: 'bg-amber', gruppe: 'geld', liste: 'A' },
  { nr: '8', pfad: '/funktionen/kasse/', name: 'Kasse', zeile: 'Pfand, Leergut und Alterskontrolle am selben Bon.', titel: 'Kasse – Ordaneo', symbol: 'kasse', farbe: 'bg-rose', gruppe: 'geld', liste: 'A' },
  { nr: '9', pfad: '/funktionen/rechnung/', name: 'Rechnung &amp; Mahnwesen', zeile: 'Rechnungslauf, Zahlungen, Mahnwesen, Buchungsexport.', titel: 'Rechnung, offene Posten und Mahnwesen – Ordaneo', symbol: 'rechnung', farbe: 'bg-gruen', gruppe: 'geld', liste: 'B' },
  { nr: '10', pfad: '/funktionen/e-rechnung/', name: 'E-Rechnung', zeile: 'XRechnung beim Festschreiben, Eingang prüfen und zuordnen.', titel: 'E-Rechnung – Ordaneo', symbol: 'erechnung', farbe: 'bg-teal', gruppe: 'geld', liste: 'A' },
  { nr: '13', pfad: '/funktionen/auswertungen/', name: 'Auswertungen', zeile: 'Kennzahlen je Rolle – jede Zahl bis zum Beleg.', titel: 'Auswertungen – Ordaneo', symbol: 'auswertungen', farbe: 'bg-violett', gruppe: 'steuerung', liste: 'B' },
  { nr: '14', pfad: '/funktionen/ki-assistent/', name: 'KI-Assistent', zeile: 'Fragt, sucht und ändert – mit Ihren Rechten, nach Ihrer Bestätigung.', titel: 'KI-Assistent – Ordaneo', symbol: 'ki', farbe: 'bg-navy', gruppe: 'steuerung', liste: 'A' },
  { nr: '15', pfad: '/funktionen/rechte-freigaben/', name: 'Rechte &amp; Freigaben', zeile: 'Je Rolle und Standort, Vier-Augen, Vorschau, Protokoll.', titel: 'Rechte, Freigaben und Protokoll – Ordaneo', symbol: 'rechte', farbe: 'bg-blau', gruppe: 'steuerung', liste: 'A' },
  { nr: '16', pfad: '/funktionen/apps-scannen/', name: 'Apps &amp; Scannen', zeile: 'Im Lager am Telefon, im Laden am Tablet.', titel: 'Apps und Scannen – Ordaneo', symbol: 'apps', farbe: 'bg-teal', gruppe: 'steuerung', liste: 'B' },
]
const BRANCHEN = [
  { nr: 'B1', pfad: '/branchen/getraenkehandel/', name: 'Getränkehandel', zeile: 'Getränkefachgroßhandel und Getränkemärkte', titel: 'Warenwirtschaft für den Getränkehandel – Ordaneo', symbol: 'getraenke', farbe: 'bg-amber', liste: 'C' },
  { nr: 'B2', pfad: '/branchen/fachhandel/', name: 'Fach- und Eisenwarenhandel', zeile: 'Eisenwaren, Werkzeug, Fachhandel ohne Pfand', titel: 'Warenwirtschaft für den Fach- und Eisenwarenhandel – Ordaneo', symbol: 'fachhandel', farbe: 'bg-navy', liste: 'C' },
]
const WEITERE = [
  { nr: 'Ü', pfad: '/funktionen/', name: 'Alle Funktionen', titel: 'Funktionen – Ordaneo', liste: 'A' },
  { nr: 'B0', pfad: '/branchen/', name: 'Branchen', titel: 'Branchen – Ordaneo', liste: 'C' },
  { nr: 'S', pfad: '/sicherheit/', name: 'Sicherheit und Betrieb', titel: 'Sicherheit und Betrieb – Ordaneo', liste: 'C' },
  { nr: 'E', pfad: '/einfuehrung/', name: 'Einführung', titel: 'Einführung – Ordaneo', liste: 'C' },
  { nr: 'F', pfad: '/fragen/', name: 'Häufige Fragen', titel: 'Häufige Fragen – Ordaneo', liste: 'C' },
]
const GEPLANT = [...FUNKTIONEN, ...BRANCHEN, ...WEITERE]
const OHNE_SITEMAP = new Set(['/404.html'])

// ── Kopf und Fuß ───────────────────────────────────────────────────────────────────────────────────────────
const LOGO_INNEN = '<span class="logo-mark"><svg viewBox="6 6 20 20" aria-hidden="true" focusable="false"><path class="zf" d="M14.5 23.5H13a4.5 4.5 0 0 1-4.5-4.5v-6A4.5 4.5 0 0 1 13 8.5h6a4.5 4.5 0 0 1 4.5 4.5v1.5" fill="none" stroke="#f9fafb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect class="ze" x="18" y="18" width="7" height="7" rx="1.75" fill="#e8650e"/></svg></span><svg class="wort" viewBox="0 0 721.92 142" aria-hidden="true" focusable="false"><g transform="translate(0 40)" fill="none" stroke="currentColor"><path stroke-width="18" d="M607.13 50H514.42"/><path stroke-width="21" d="M10.5 50a41.5 41.5 0 1 0 83 0a41.5 41.5 0 1 0 -83 0M128.5 0V100M128.5 20.74A40 40 0 0 1 176.08 13.18M264.75 24.03A41.5 41.5 0 1 0 264.75 75.97M264.75 -40V100M373.62 24.03A41.5 41.5 0 1 0 373.62 75.97M373.62 0V100M410.62 0V100M410.62 20.74A40 40 0 0 1 479.42 48.5V100M596.79 57.18A41.5 41.5 0 1 0 586.76 77.77M628.42 50a41.5 41.5 0 1 0 83 0a41.5 41.5 0 1 0 -83 0"/></g></svg>'
const LOGO = `<a class="logo" href="/" aria-label="Ordaneo – zur Startseite">${LOGO_INNEN}</a>`

function flyoutLink(s) {
  return `<a href="${s.pfad}"><span class="fi ${s.farbe}">${svg(s.symbol, 17)}</span><span><b>${s.name}</b><span class="zeile">${s.zeile}</span></span></a>`
}
function mobilLink(s) {
  return `<a href="${s.pfad}"><span class="fi ${s.farbe}">${svg(s.symbol, 15)}</span>${s.name}</a>`
}

function kopf() {
  const gruppen = GRUPPEN.map((g) => `        <div><p class="flyout-titel">${g.name}</p>${FUNKTIONEN.filter((f) => f.gruppe === g.key).map(flyoutLink).join('')}</div>`).join('\n')
  const mobilGruppen = GRUPPEN.map((g) => `      <p class="mm-titel">${g.name}</p>${FUNKTIONEN.filter((f) => f.gruppe === g.key).map(mobilLink).join('')}`).join('\n')
  return `<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<nav class="top" id="nav" aria-label="Hauptnavigation">
  <div class="wrap nav-inner">
    ${LOGO}
    <div class="nav-links">
      <div class="hat-menue mega">
        <a class="hat-knopf" href="/funktionen/">Funktionen</a><button class="hat-pfeil" type="button" aria-expanded="false" aria-controls="flyout-funktionen" aria-label="Menü Funktionen öffnen"></button>
        <div class="flyout gross" id="flyout-funktionen">
${gruppen}
          <div class="flyout-fuss"><span>Ein Bestand für Lager, Einkauf, Verkauf, Auslieferung und Kasse.</span><a href="/funktionen/">Alle Funktionen im Überblick</a></div>
        </div>
      </div>
      <div class="hat-menue">
        <a class="hat-knopf" href="/branchen/">Branchen</a><button class="hat-pfeil" type="button" aria-expanded="false" aria-controls="flyout-branchen" aria-label="Menü Branchen öffnen"></button>
        <div class="flyout" id="flyout-branchen">
          ${BRANCHEN.map(flyoutLink).join('')}
          <div class="flyout-fuss"><a href="/branchen/">Branchen im Überblick</a></div>
        </div>
      </div>
      <a href="/einfuehrung/">Einführung</a><a href="/sicherheit/">Sicherheit</a><a href="/fragen/">Fragen</a>
    </div>
    <button class="burger" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="menue"><span></span><span></span><span></span></button>
    <a class="btn hell" href="${DEMO}">Demo ansehen</a>
  </div>
</nav>
<div class="mobil-menue" id="menue" inert>
  <details>
    <summary>Funktionen</summary>
    <div>
      <a class="mm-alle" href="/funktionen/">Alle Funktionen im Überblick</a>
${mobilGruppen}
    </div>
  </details>
  <details>
    <summary>Branchen</summary>
    <div>
      <a class="mm-alle" href="/branchen/">Branchen im Überblick</a>${BRANCHEN.map(mobilLink).join('')}
    </div>
  </details>
  <a href="/einfuehrung/">Einführung</a><a href="/sicherheit/">Sicherheit und Betrieb</a><a href="/fragen/">Häufige Fragen</a>
  <a class="btn blau" href="${DEMO}">Demo ansehen</a>
</div>`
}

function fuss() {
  return `<footer class="gross">
  <div class="wrap">
    <div class="fuss-grid">
      <div class="fuss-marke">
        ${LOGO}
        <p>Die Warenwirtschaft für Handel und Großhandel – Lager, Einkauf, Verkauf, Touren und Kasse in einer Anwendung.</p>
        <p>Ein Produkt der Presio UG (haftungsbeschränkt) i.&nbsp;Gr.</p>
      </div>
      <div class="fuss-funktionen">
        <h4>Funktionen</h4>
        <div class="fuss-zwei">${FUNKTIONEN.map((f) => `<a href="${f.pfad}">${f.name}</a>`).join('')}</div>
      </div>
      <div>
        <h4>Branchen</h4>
        ${BRANCHEN.map((b) => `<a href="${b.pfad}">${b.name}</a>`).join('')}<a href="/branchen/">Alle Branchen</a>
        <h4 class="weiter">Ordaneo</h4>
        <a href="/funktionen/">Alle Funktionen</a><a href="/einfuehrung/">Einführung</a><a href="/sicherheit/">Sicherheit und Betrieb</a><a href="/fragen/">Häufige Fragen</a><a href="${DEMO}">Demo</a>
      </div>
      <div>
        <h4>Kontakt</h4>
        <a href="/#kontakt">Gespräch vereinbaren</a><a href="mailto:kontakt@ordaneo.de">kontakt@ordaneo.de</a><a href="/impressum.html">Impressum</a><a href="/datenschutz.html">Datenschutz</a>
      </div>
    </div>
    <div class="fuss-unten">
      <span>© 2026 Presio UG (haftungsbeschränkt) i.&nbsp;Gr.</span>
      <nav aria-label="Rechtliches"><a href="/impressum.html">Impressum</a><a href="/datenschutz.html">Datenschutz</a></nav>
    </div>
  </div>
</footer>`
}

const MARKER = {
  kopf: ['<!-- KOPF -->', '<!-- /KOPF -->', kopf],
  fuss: ['<!-- FUSS -->', '<!-- /FUSS -->', fuss],
}

// ── Dateien ──────────────────────────────────────────────────────────────────────────────────────────────
const AUSGENOMMEN = new Set(['.git', 'tools', 'plan', 'assets', 'node_modules'])
function seitenDateien(dir = ROOT, rel = '') {
  const out = []
  for (const eintrag of fs.readdirSync(dir, { withFileTypes: true })) {
    if (eintrag.name.startsWith('.') || AUSGENOMMEN.has(eintrag.name) && rel === '') continue
    const r = rel ? `${rel}/${eintrag.name}` : eintrag.name
    if (eintrag.isDirectory()) out.push(...seitenDateien(path.join(dir, eintrag.name), r))
    else if (eintrag.name.endsWith('.html')) out.push(r)
  }
  return out.sort()
}
function urlPfad(rel) {
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`
  return `/${rel}`
}
function dateiZu(pfad) {
  const ohne = pfad.split('#')[0].split('?')[0]
  if (ohne.endsWith('/')) return path.join(ROOT, ohne, 'index.html')
  return path.join(ROOT, ohne)
}

// ── teile ────────────────────────────────────────────────────────────────────────────────────────────────
function teile() {
  let geaendert = 0
  for (const rel of [...seitenDateien(), 'tools/vorlage-seite.html']) {
    const datei = path.join(ROOT, rel)
    let html = fs.readFileSync(datei, 'utf8')
    const vorher = html
    for (const [anfang, ende, bau] of Object.values(MARKER)) {
      const a = html.indexOf(anfang)
      const e = html.indexOf(ende)
      if (a < 0 || e < a) { console.log(`  ${rel}: Marker ${anfang} fehlt – übersprungen`); continue }
      html = `${html.slice(0, a + anfang.length)}\n${bau()}\n${html.slice(e)}`
    }
    if (html !== vorher) { fs.writeFileSync(datei, html); geaendert++; console.log(`  ${rel}: Kopf/Fuß geschrieben`) }
  }
  console.log(`${geaendert} Seite(n) geändert.`)
}

// ── pruefen ──────────────────────────────────────────────────────────────────────────────────────────────
const VERBOTEN = [
  [/konform/i, '„konform“ (RE §15)'], [/rechtssicher/i, '„rechtssicher“'], [/zertifizi/i, '„zertifiziert“'],
  [/revisionssicher/i, '„revisionssicher“'], [/manipulationssicher/i, '„manipulationssicher“'], [/fälschungssicher/i, '„fälschungssicher“'],
  [/garanti/i, '„garantiert/Garantie“'], [/Rückruf auf Knopfdruck/i, '„Rückruf auf Knopfdruck“'],
  [/lückenlose Rückverfolgung/i, '„lückenlose Rückverfolgung“'], [/automatische Altersprüfung/i, '„automatische Altersprüfung“'],
  [/DATEV/i, '„DATEV“'], [/DSFinV/i, '„DSFinV-K“'], [/fiskalisiert/i, '„fiskalisiert“'], [/Peppol/i, '„Peppol“'],
  [/Daten bleiben/i, '„Daten bleiben …“'], [/KoSIT/i, '„KoSIT“'], [/Kaution/i, '„Kaution“'], [/bewährt/i, '„bewährt“'],
  [/im Einsatz bei/i, '„im Einsatz bei“'], [/erprobt/i, '„erprobt“'], [/Passkey/i, '„Passkeys“ (nicht gebaut)'],
  [/ISO[\s-]?27001/i, '„ISO 27001“'], [/Merxo/i, 'alter Name „Merxo“'],
  [/HACCP|IFS Food/i, 'HACCP/IFS'], [/Verkehrslage|in Echtzeit/i, 'Verkehrslage/Echtzeit (im Bau)'],
  ...lokaleVerbote(),
]

/**
 * Namen, die nicht ins öffentliche Repository gehören (Erstkunde, Orte der Region), stehen in der nicht versionierten
 * Datei tools/verboten.local.txt (eine Regex je Zeile, # = Kommentar; Eintrag in .gitignore). Fehlt sie, warnt die
 * Prüfung nur.
 */
function lokaleVerbote() {
  const datei = path.join(__dirname, 'verboten.local.txt')
  if (!fs.existsSync(datei)) {
    console.log('Hinweis: tools/verboten.local.txt fehlt – Kunden- und Ortsnamen werden nicht geprüft.')
    return []
  }
  return fs.readFileSync(datei, 'utf8').split('\n').map((z) => z.trim()).filter((z) => z && !z.startsWith('#'))
    .map((z) => [new RegExp(z, 'i'), 'lokale Verbotsliste (tools/verboten.local.txt)'])
}
const HINWEIS_WOERTER = [
  [/offline/i, '„offline“ – nur „Anzeigen ohne Verbindung“ ist gebaut; Wortlaut prüfen'],
  [/\b\d{1,3}\s?%/, 'Prozentangabe – nur mit Beleg (keine erfundenen Zahlen)'],
  [/ZUGFeRD/i, '„ZUGFeRD“ – nur für den Eingang; der Ausgang ist nicht gebaut'],
]

function cssKlassen() {
  const klassen = new Set()
  for (const datei of ['assets/site.css', 'assets/seiten.css']) {
    const p = path.join(ROOT, datei)
    if (!fs.existsSync(p)) continue
    const css = fs.readFileSync(p, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, '')
    for (const m of css.matchAll(/\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)) klassen.add(m[1])
  }
  return klassen
}
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'))
  return m ? (m[2] ?? m[3]) : null
}
function entity(s) {
  return s.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
}
function ohneTeile(html) {
  let s = html
  for (const [anfang, ende] of Object.values(MARKER)) {
    const a = s.indexOf(anfang)
    const e = s.indexOf(ende)
    if (a >= 0 && e > a) s = s.slice(0, a) + s.slice(e + ende.length)
  }
  return s
}
function sichtbarerText(html) {
  return entity(ohneTeile(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<(img|meta)\b[^>]*>/gi, (tag) => ` ${attr(tag, 'alt') ?? ''} ${attr(tag, 'content') ?? ''} `)
    .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')
}

function pruefen(nur) {
  const klassen = cssKlassen()
  const alle = seitenDateien()
  const dateien = nur && nur.length ? alle.filter((rel) => nur.some((n) => urlPfad(rel) === n || rel === n || rel === n.replace(/^\//, ''))) : alle
  const sitemap = fs.existsSync(path.join(ROOT, 'sitemap.xml')) ? fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8') : ''
  const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))
  const kopfSoll = kopf()
  const fussSoll = fuss()
  const titel = new Map()
  let fehlerGesamt = 0
  let hinweiseGesamt = 0
  const nochNichtGebaut = new Map()

  for (const rel of dateien) {
    const html = fs.readFileSync(path.join(ROOT, rel), 'utf8')
    const pfad = urlPfad(rel)
    const fehler = []
    const hinweise = []
    const plan = GEPLANT.find((s) => s.pfad === pfad)

    // gemeinsame Teile
    for (const [name, [anfang, ende], soll] of [['Kopf', MARKER.kopf, kopfSoll], ['Fuß', MARKER.fuss, fussSoll]]) {
      const a = html.indexOf(anfang)
      const e = html.indexOf(ende)
      if (a < 0 || e < a) fehler.push(`${name}: Marker ${anfang} … ${ende} fehlen`)
      else if (html.slice(a + anfang.length, e).trim() !== soll.trim()) fehler.push(`${name} weicht von tools/seiten.cjs ab (Kopf/Fuß nie von Hand ändern; Hauptsitzung: node tools/seiten.cjs teile)`)
    }
    if (!/<main id="inhalt">/.test(html)) fehler.push('<main id="inhalt"> fehlt (Sprungziel „Zum Inhalt springen“)')

    // Kopfbereich
    const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1]
    const desc = attr(html.match(/<meta name="description"[^>]*>/)?.[0] || '', 'content')
    const canonical = attr(html.match(/<link rel="canonical"[^>]*>/)?.[0] || '', 'href')
    const og = (p) => attr(html.match(new RegExp(`<meta property="og:${p}"[^>]*>`))?.[0] || '', 'content')
    if (!t) fehler.push('<title> fehlt')
    else {
      if (titel.has(t)) fehler.push(`<title> doppelt (auch ${titel.get(t)})`)
      titel.set(t, rel)
      if (plan && entity(t) !== plan.titel) fehler.push(`<title> „${entity(t)}“ ≠ Seitenplan „${plan.titel}“`)
    }
    if (!/<link rel="stylesheet" href="\/assets\/site\.css">/.test(html)) fehler.push('assets/site.css nicht eingebunden')
    if (pfad !== '/404.html') {
      if (!desc) fehler.push('<meta name="description"> fehlt')
      else if (entity(desc).length > 160) fehler.push(`Beschreibung hat ${entity(desc).length} Zeichen (höchstens 160)`)
      if (canonical !== SITE + pfad) fehler.push(`canonical „${canonical}“ ≠ ${SITE + pfad}`)
      if (plan || pfad === '/') {
        if (og('url') !== canonical) fehler.push('og:url ≠ canonical')
        if (!og('image')) fehler.push('og:image fehlt')
      }
      if (plan) {
        if (entity(og('title') || '') !== entity(t || '')) fehler.push('og:title ≠ <title>')
        if (entity(og('description') || '') !== entity(desc || '')) fehler.push('og:description ≠ Beschreibung')
      }
      if (!OHNE_SITEMAP.has(pfad) && !inSitemap.has(SITE + pfad)) fehler.push(`fehlt in sitemap.xml (${SITE + pfad})`)
    }
    if (plan && !/<link rel="stylesheet" href="\/assets\/seiten\.css">/.test(html)) fehler.push('assets/seiten.css nicht eingebunden')
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        const daten = JSON.parse(m[1])
        const liste = [daten, ...(daten['@graph'] || [])].find((d) => d['@type'] === 'BreadcrumbList')
        if (liste) {
          const letzte = liste.itemListElement[liste.itemListElement.length - 1]
          if (letzte.item !== canonical) fehler.push(`BreadcrumbList: letzter Eintrag ${letzte.item} ≠ canonical`)
        }
      } catch (err) { fehler.push(`JSON-LD nicht lesbar: ${err.message}`) }
    }
    if (plan && !/"BreadcrumbList"/.test(html)) hinweise.push('BreadcrumbList (JSON-LD) fehlt')

    // Inhalt
    const h1 = (html.match(/<h1[\s>]/g) || []).length
    if (h1 !== 1) fehler.push(`${h1} × <h1> (genau eine)`)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    const doppelt = ids.filter((id, i) => ids.indexOf(id) !== i)
    if (doppelt.length) fehler.push(`id doppelt: ${[...new Set(doppelt)].join(', ')}`)
    const eigeneIds = new Set(ids)

    for (const m of html.matchAll(/\sclass="([^"]*)"/g)) {
      for (const k of m[1].split(/\s+/).filter(Boolean)) if (!klassen.has(k)) fehler.push(`Klasse „${k}“ gibt es in site.css/seiten.css nicht`)
    }
    const stile = (ohneTeile(html).match(/\sstyle="/g) || []).length
    if (stile) hinweise.push(`${stile} × style="…" – nur Klassen aus site.css/seiten.css verwenden`)

    // Bilder
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0]
      const src = attr(tag, 'src')
      const alt = attr(tag, 'alt')
      if (alt === null || (!alt.trim() && attr(tag, 'aria-hidden') !== 'true' && attr(tag, 'role') !== 'presentation')) fehler.push(`Bild ohne Alt-Text: ${src}`)
      if (!attr(tag, 'width') || !attr(tag, 'height')) fehler.push(`Bild ohne width/height: ${src}`)
      if (attr(tag, 'loading') !== 'lazy' && attr(tag, 'fetchpriority') !== 'high') hinweise.push(`Bild ohne loading="lazy": ${src}`)
      const quellen = [src, ...(attr(tag, 'srcset') || '').split(',').map((s) => s.trim().split(/\s+/)[0])].filter(Boolean)
      for (const q of quellen) {
        if (/^https?:/.test(q)) fehler.push(`Bild von fremder Adresse: ${q}`)
        else if (!fs.existsSync(dateiZu(q))) fehler.push(`Bilddatei fehlt: ${q}`)
      }
    }

    // Links und Einbindungen
    for (const m of html.matchAll(/<(link|script)\b[^>]*>/g)) {
      const ziel = attr(m[0], 'href') || attr(m[0], 'src')
      const rel2 = attr(m[0], 'rel') || ''
      if (!ziel || rel2 === 'canonical') continue
      if (/^(https?:)?\/\//.test(ziel)) fehler.push(`fremde Einbindung: ${ziel}`)
      else if (!fs.existsSync(dateiZu(ziel))) fehler.push(`eingebundene Datei fehlt: ${ziel}`)
    }
    for (const m of html.matchAll(/<a\b[^>]*>/g)) {
      const href = attr(m[0], 'href')
      if (!href) { fehler.push('Link ohne href'); continue }
      if (/^(mailto:|tel:)/.test(href)) continue
      if (/^https?:/.test(href)) {
        if (!href.startsWith(DEMO) && !href.startsWith(SITE)) hinweise.push(`externer Link: ${href}`)
        continue
      }
      if (href.startsWith('#')) {
        if (href.length > 1 && !eigeneIds.has(href.slice(1))) fehler.push(`Sprungziel ${href} gibt es auf der Seite nicht`)
        continue
      }
      if (!href.startsWith('/')) { fehler.push(`relativer Link „${href}“ – Pfade immer ab / schreiben`); continue }
      const ohne = href.split('#')[0]
      if (!ohne.endsWith('/') && !/\.[a-z0-9]+$/i.test(ohne)) { fehler.push(`Link ohne Schrägstrich am Ende: ${href}`); continue }
      const datei = dateiZu(href)
      if (!fs.existsSync(datei)) {
        if (GEPLANT.some((s) => s.pfad === ohne)) nochNichtGebaut.set(ohne, (nochNichtGebaut.get(ohne) || 0) + 1)
        else fehler.push(`Link ins Leere: ${href}`)
        continue
      }
      const anker = href.split('#')[1]
      if (anker) {
        const ziel = fs.readFileSync(datei, 'utf8')
        if (!new RegExp(`\\sid="${anker}"`).test(ziel)) fehler.push(`Sprungziel #${anker} gibt es auf ${ohne} nicht`)
      }
    }

    // Wörter
    const text = sichtbarerText(html)
    for (const [re, was] of VERBOTEN) {
      const m = text.match(re)
      if (m) fehler.push(`verbotenes Wort ${was}: „…${text.slice(Math.max(0, m.index - 40), m.index + 40).trim()}…“`)
    }
    for (const [re, was] of HINWEIS_WOERTER) {
      const m = text.match(re)
      if (m) hinweise.push(`${was}: „…${text.slice(Math.max(0, m.index - 40), m.index + 40).trim()}…“`)
    }
    const textOhneZeilen = sichtbarerText(html.replace(/<span class="zeile">[^<]*<\/span>/g, ' '))
    if (pfad !== '/funktionen/kasse/' && /\bKasse\b/.test(textOhneZeilen) && !/href="\/funktionen\/kasse\/"/.test(ohneTeile(html)) && !/class="stand-kasten"/.test(html)) {
      hinweise.push('erwähnt die Kasse ohne Link auf /funktionen/kasse/ oder Stand-Kasten (Seitenplan §0)')
    }

    fehlerGesamt += fehler.length
    hinweiseGesamt += hinweise.length
    const zeichen = fehler.length ? '✗' : '✓'
    console.log(`${zeichen} ${pfad}${plan ? ` (${plan.nr}, Liste ${plan.liste})` : ''}`)
    for (const f of fehler) console.log(`    Fehler: ${f}`)
    for (const h of hinweise) console.log(`    Hinweis: ${h}`)
  }

  if (!nur || !nur.length) {
    for (const loc of inSitemap) {
      const p = loc.replace(SITE, '')
      if (!fs.existsSync(dateiZu(p))) { console.log(`✗ sitemap.xml nennt ${loc}, die Datei fehlt`); fehlerGesamt++ }
    }
    const offen = GEPLANT.filter((s) => !fs.existsSync(dateiZu(s.pfad)))
    if (offen.length) console.log(`\nNoch nicht gebaut (Links darauf sind erlaubt): ${offen.map((s) => `${s.pfad} [${s.liste}]`).join(' · ')}`)
  } else if (nochNichtGebaut.size) {
    console.log(`\nLinks auf noch nicht gebaute Seiten: ${[...nochNichtGebaut.keys()].join(' · ')}`)
  }
  console.log(`\n${dateien.length} Seite(n) geprüft · ${fehlerGesamt} Fehler · ${hinweiseGesamt} Hinweis(e)`)
  return fehlerGesamt
}

// ── Bilder: fertiges <figure> aus assets/screens und plan/BILDER.md ──────────────────────────────────────────
function escapeAttr(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;') }
function bilderListe() {
  const datei = path.join(ROOT, 'plan', 'BILDER.md')
  const liste = new Map()
  if (!fs.existsSync(datei)) return liste
  for (const zeile of fs.readFileSync(datei, 'utf8').split('\n')) {
    const m = zeile.match(/^\| (B\d+) \| `([a-z0-9-]+)` \| ([DTP]) (\d+) × (\d+) \| [^|]* \| ([^|]+) \| ([^|]+) \|/)
    if (m) liste.set(m[2], { id: m[1], format: m[3], breite: Number(m[4]), hoehe: Number(m[5]), alt: m[6].trim(), unterschrift: m[7].trim() })
  }
  return liste
}
// bild('pfand-leergutkonto')                 Bild im Abschnitt, mit Bildunterschrift aus BILDER.md
// bild('pfand-zaehlen', { hero: true })      Bild im Hero (ohne Unterschrift, ohne lazy, fetchpriority=high)
// Optionen: alt, unterschrift (Text ersetzt den Vorschlag; false = keine), klasse (zusätzliche Klasse am <figure>)
function bild(stamm, optionen = {}) {
  const info = bilderListe().get(stamm)
  if (!info) throw new Error(`„${stamm}“ steht nicht in plan/BILDER.md`)
  const breiten = fs.readdirSync(path.join(ROOT, 'assets', 'screens'))
    .map((n) => n.match(new RegExp(`^${stamm}-(\\d+)\\.webp$`))).filter(Boolean).map((m) => Number(m[1])).sort((a, b) => a - b)
  const url = (b) => `/assets/screens/${stamm}-${b}.webp`
  const srcset = breiten.map((b) => `${url(b)} ${b}w`).join(', ')
  const alt = escapeAttr(optionen.alt || info.alt)
  const laden = optionen.hero ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'
  const groesse = info.format === 'P' ? (optionen.hero ? '272px' : '300px') : (optionen.hero ? '(max-width: 900px) 100vw, 520px' : '(max-width: 900px) 100vw, 620px')
  const img = `<img src="${url(info.breite === 390 ? 780 : info.breite)}" srcset="${srcset}" sizes="${groesse}" width="${info.breite}" height="${info.hoehe}" ${laden} alt="${alt}">`
  const rahmen = info.format === 'P' ? `<div class="handy-rahmen">${img}</div>`
    : info.format === 'T' ? `<div class="tablet-rahmen">${img}</div>`
    : `<div class="bild-rahmen"><div class="kopf" aria-hidden="true"><i></i><i></i><i></i><span>erp.ordaneo.de</span></div>${img}</div>`
  const klassen = [optionen.hero ? 'hero-bild' : '', optionen.klasse || ''].filter(Boolean).join(' ')
  const unterschrift = optionen.hero || optionen.unterschrift === false ? '' : `\n  <figcaption>${optionen.unterschrift || info.unterschrift}</figcaption>`
  return `<figure${klassen ? ` class="${klassen}"` : ''}>\n  ${rahmen}${unterschrift}\n</figure>`
}

// ── Aufruf ───────────────────────────────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const [befehl, ...rest] = process.argv.slice(2)
  if (befehl === 'teile') teile()
  else if (befehl === 'pruefen') process.exitCode = pruefen(rest) ? 1 : 0
  else if (befehl === 'symbol') console.log(svg(rest[0], Number(rest[1]) || 18))
  else if (befehl === 'symbole') console.log(Object.keys(SYMBOLE).join('\n'))
  else if (befehl === 'bild') console.log(bild(rest[0], { hero: rest.includes('hero') }))
  else if (befehl === 'bilder') console.log([...bilderListe()].map(([stamm, b]) => `${b.id}  ${b.format}  ${stamm}`).join('\n'))
  else {
    console.log('Aufruf: node tools/seiten.cjs teile | pruefen [pfad …] | symbol NAME [GRÖSSE] | symbole | bild STAMM [hero] | bilder')
    process.exitCode = 2
  }
}
module.exports = { SYMBOLE, svg, bild, FUNKTIONEN, BRANCHEN, WEITERE, GRUPPEN, kopf, fuss, DEMO, SITE }
