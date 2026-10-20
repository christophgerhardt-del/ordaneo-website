# ordaneo.de – Website

Statische Produktseite für **Ordaneo**, die Warenwirtschaft für Handel und Großhandel. Gestaltet aus einer Hand mit
presio.eu (gleicher Anbieter): Systemschrift, Navy und Blau, farbiger Hero mit schrägem Abschluss, Karten mit
Symbol-Kacheln, abwechselnd weiße und helle Abschnitte; nur hell. Reines HTML und CSS ohne Build-Schritt, dazu ein
kleines Skript für die Navigation (`assets/site.js`: fester Kopf beim Scrollen, Menü auf dem Telefon – speichert
nichts, lädt nichts nach; ohne JavaScript bleibt alles nutzbar). Keine externen Anfragen zur Laufzeit (keine CDN,
keine Webfonts, kein Tracking).
Veröffentlicht über **GitHub Pages** unter **https://ordaneo.de** (Repository `christophgerhardt-del/ordaneo-website`).
Die Anwendung selbst läuft unter `erp.ordaneo.de` (seit 20.10.2026; `warenwirtschaft.actuvo.de` bleibt daneben erreichbar).

Stand: 20.10.2026 abends (Neugestaltung im Stil von presio.eu) – offene Punkte unten.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero mit Geräte-Bild, Zahlen, Funktionen (Karten), Ablauf (Belegkette), Lager, Touren, Kasse, Rechnung, Apps, Außerdem an Bord, Zugriff und Betrieb (dunkles Band), Branchen, Einführung, Häufige Fragen, Kontakt |
| `impressum.html` | Gerüst mit markierten Platzhaltern (`<span class="ph">[… – Angabe folgt]</span>`) |
| `datenschutz.html` | Entwurf für eine statische Seite ohne Cookies und Tracking, Hosting GitHub Pages |
| `404.html` | Fehlerseite; GitHub Pages liefert sie unter jeder unbekannten Adresse aus, deshalb Pfade ab `/` |
| `assets/site.css` | alle Stile; Farben als Variablen nach der Palette von presio.eu (nur hell) |
| `assets/site.js` | Navigation: fester Kopf ab dem Scrollen, Menü hinter dem Burger auf schmalen Bildschirmen |
| `assets/brand/` | Marke: Bildmarke, Wortmarke, Lockup, Favicons, `BRAND.md` |
| `assets/screens/` | Produktbilder als WebP in zwei bis drei Breiten und das Geräte-Bild des Hero (siehe „Produktbilder“) |
| `assets/og.png` | Vorschaubild für geteilte Links (1200 × 630), gerendert aus `tools/og.html` |
| `favicon.ico`, `site.webmanifest` | Favicon (16/32/48, in Chrome aus `assets/brand/favicon.svg` gerendert) und Symbole für den Startbildschirm |
| `robots.txt`, `sitemap.xml`, `CNAME` | Suchmaschinen und eigene Domain (`ordaneo.de`) |
| `_config.yml` | sagt GitHub Pages, dass `README.md`, `tools/` und `BRAND.md` nicht veröffentlicht werden |
| `tools/` | Vorlagen und Skripte für das Open-Graph-Bild und das Geräte-Bild (werden nicht veröffentlicht) |

## Lokale Vorschau

```sh
cd ~/ordaneo-website
python3 -m http.server 9370 --bind 127.0.0.1
# dann http://127.0.0.1:9370/ öffnen; beenden mit Strg+C
```

Die Fehlerseite unter http://127.0.0.1:9370/404.html ansehen (der Python-Server zeigt bei unbekannten Adressen seine
eigene Fehlerseite, GitHub Pages dagegen `404.html`).

## Produktbilder

Die Bilder sind echte Bildschirmfotos der umbenannten Anwendung (Stand 20.10.2026, Worktree `warenwirtschaft-ordaneo`,
Demo-Daten, Bildmarke A). Sie liegen als WebP in `assets/screens/<name>-hell-<breite>.webp`; `srcset`/`sizes` wählen
die Breite.

| Datei | Ansicht | Aufnahme | Rahmen auf der Seite |
|---|---|---|---|
| `uebersicht` | Start der Geschäftsführung (Johanna) | Desktop 1440 × 900, 2× | im Geräte-Bild (Rechner) |
| `bestand` | Lager › MHD & Chargen, „Alle Chargen“, alle Standorte | Desktop 1440 × 900, 2× | Browserfenster (`.bild-rahmen`) |
| `tour` | Verkauf › Disposition, Seitenleiste eingeklappt | Desktop 1440 × 900, 2× | Browserfenster |
| `kasse` | Kasse › Kassieren (Lea), Bon aus der Demo-Geschichte (49,13 €) | iPad quer 1180 × 820, 2× | Tablet (`.tablet-rahmen`) und Geräte-Bild |
| `erechnung` | Rechnung mit Karte „E-Rechnung“ (Claudia) | Desktop 1440 × 900, 2× | Browserfenster |
| `app` | Inventur › Zählen am Telefon (Petra) | Telefon 390 × 844, 3× | Telefon (`.handy-rahmen`) und Geräte-Bild |
| `geraete` | Rechner, iPad und iPhone (wie auf presio.eu) | aus `tools/geraete.html`, 2000 × 1440, transparent | Hero |

**Was an den Bildern bearbeitet ist:** Der Demo-Betrieb trägt in der Anwendung Namen, Logo, Standorte und
Artikelnummern des Erstkunden. Für die Aufnahmen wurde deshalb nur in einer eigenen, danach gelöschten Datenbank
umbenannt: Betrieb „Getränke Muster“ ohne Logo und Hausfarbe, Orte „Nordstadt“, „Oststadt“, „Weststadt“ (mit
erfundenen Postleitzahlen und Straßen der Standorte), Kennzeichen `M-OD …`, Artikelnummern `GM-…` statt `AL-…`. Für
die Disposition wurde die nur geplante Tour 3 abgebrochen, damit planbare Aufträge zu sehen sind, und die Kartenkacheln
(OpenStreetMap) sind weichgezeichnet, damit keine Ortsnamen den Standort des Erstkunden verraten. Sonst ist nichts
retuschiert; die Hinweise „Demo-Daten“, „Schulungsbeleg (DEMO)“ und „DEMO – keine TSE“ sind echt und bleiben sichtbar.

Neue Bilder: dieselben Ansichten in Chrome aufnehmen (Playwright, hell), wieder nur erfundene Daten und keinen
Kundennamen zeigen, als WebP (Qualität etwa 82) in den Breiten 800, 1440 und 2400 (Kasse 2360, Telefon 564 und 846)
ablegen. Danach das Geräte-Bild neu rendern (Vorschau muss laufen; Playwright aus einem vorhandenen Projekt leihen,
hier nichts installieren; Pillow mit WebP nötig):

```sh
NODE_PATH=~/warenwirtschaft-ordaneo/node_modules node tools/render-geraete.cjs http://127.0.0.1:9370
```

## Open-Graph-Bild neu rendern

Bei geänderter Überschrift oder neuem Geräte-Bild `tools/og.html` anpassen und mit Playwright in Google Chrome rendern (Vorschau muss laufen;
Playwright wird aus einem vorhandenen Projekt geliehen, hier nichts installieren):

```sh
NODE_PATH=~/warenwirtschaft-ordaneo/node_modules node tools/render-og.cjs http://127.0.0.1:9370
```

## Veröffentlichung über GitHub Pages

Eingerichtet am 20.10.2026: öffentliches Repository `christophgerhardt-del/ordaneo-website`, Pages aus `main` (Root),
eigene Domain `ordaneo.de`, HTTPS erzwungen. Ein Push auf `main` veröffentlicht. So war es eingerichtet:

1. Repository anlegen (z. B. `ordaneo-website`), diesen Ordner als `main` pushen.
2. Im Repository **Settings → Pages**: *Deploy from a branch*, Branch `main`, Ordner `/ (root)`.
3. Unter **Custom domain** `ordaneo.de` eintragen (die Datei `CNAME` enthält das schon). Empfohlen vorher: die Domain
   im GitHub-Konto unter **Settings → Pages → Verified domains** bestätigen (TXT-Eintrag
   `_github-pages-challenge-<konto>` bei Squarespace), damit niemand anderes sie für Pages nutzen kann.
4. Sobald das Zertifikat ausgestellt ist (kann bis zu einer Stunde dauern): **Enforce HTTPS** einschalten.

Ohne eigene Domain läge die Seite unter `https://<konto>.github.io/ordaneo-website/` – dort stimmen die Pfade der
`404.html` (ab `/`) nicht. Deshalb erst mit eingerichteter Domain testen.

## DNS bei Squarespace (setzt Christoph)

In Squarespace unter **Domains → ordaneo.de → DNS** zuerst die voreingestellten Squarespace-Einträge für `@` und `www`
entfernen (Vorlage „Squarespace Defaults“), dann:

| Host | Typ | Wert |
|---|---|---|
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |
| `www` | CNAME | `<GitHub-Konto>.github.io` (z. B. `christophgerhardt-del.github.io`, falls das Repository dort liegt) |
| `_github-pages-challenge-<konto>` | TXT | Wert aus GitHub (Schritt 3 oben) |

Die IP-Adressen vor dem Eintragen mit der GitHub-Hilfe „Managing a custom domain for your GitHub Pages site“
abgleichen. Gibt es CAA-Einträge, muss `letsencrypt.org` erlaubt sein. `www.ordaneo.de` leitet GitHub dann selbst auf
`ordaneo.de` um.

**Nicht Teil der Website, aber in derselben Zone – nicht löschen:** `erp` → A `167.233.15.101` (Demo-Server Hetzner
Nürnberg, seit 20.10.2026 eingetragen und am Server eingerichtet). Ebenso bleibt die Vorlage „E-Mail-Sicherheit“
(SPF `-all`, DMARC `reject`) stehen, bis ein Postfach eingerichtet wird; dann ersetzen die MX-, SPF-, DKIM- und
DMARC-Einträge des Mail-Anbieters diese Vorlage.

## Offene Punkte

- **Impressum und Datenschutz:** Anbieter ist die Presio UG (haftungsbeschränkt) i. Gr., Hohenzollernstr. 7,
  80801 München (Angaben wie im Impressum von presio.eu). Noch offen: Vertretung (Geschäftsführung), Telefon,
  Aufsichtsbehörde, Postfach-Anbieter, Grundlage der Übermittlung an GitHub; alles rechtlich prüfen lassen;
  dann die Hinweise „Entwurf – vor Veröffentlichung prüfen“ entfernen.
- **Postfach `kontakt@ordaneo.de` muss noch eingerichtet werden** (MX und SPF/DKIM/DMARC bei Squarespace). Bis dahin
  laufen E-Mail-Links ins Leere.
- **`erp.ordaneo.de`** ist seit 20.10.2026 eingerichtet (DNS, Server, Zertifikat); alle „Demo ansehen“-Knöpfe zeigen
  dorthin. Den neuen Namen zeigt die Anwendung erst, wenn der Umbenennungs-Zweig ausgeliefert ist.
- **Öffentliche Demo:** Unter „Demo-Zugänge“ stehen nur erfundene Betriebe (gilt ab der Auslieferung vom 20.10.2026).
- Hinweis zu den Apps („Veröffentlichung in den App-Stores folgt“) anpassen, sobald sie in den Stores sind.

## Regeln für Texte

Jede Funktionsaussage muss durch gebaute Funktionen gedeckt sein (Quellen: `docs/STATUS.md`, `README.md`,
`docs/ENTSCHEIDUNGEN.md`, `docs/modules/*.md`, `docs/DEMO.md` im Repository der Anwendung, Stand `main` vom
19.10.2026). Nicht schreiben: „rechtssicher“, „zertifiziert“, „GoBD-konform“, „KassenSichV-konform“,
„revisionssicher“, „DSGVO-konform“ oder ähnliche Gütesiegel; keine erfundenen Zahlen, Kunden, Referenzen, Zitate oder
Preise; keinen Kundennamen. Die Kasse verkauft nur mit Verbindung zum Server – einen Betrieb ohne Verbindung nicht
bewerben. „Server in Nürnberg“ beschreibt den heutigen Betrieb, ist kein Versprechen. Ton wie auf presio.eu: kurze
Sätze, Sie-Form, je Abschnitt eine Überschrift, die ohne den Rest verständlich ist. Farben nur aus der Palette in
`assets/site.css` (siehe auch `assets/brand/BRAND.md`, Abschnitt Farben).
