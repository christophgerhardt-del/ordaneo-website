# ordaneo.de – Website

Statische Produktseite für **Ordaneo**, die Warenwirtschaft für Handel und Großhandel. Gestaltet aus einer Hand mit
presio.eu (gleicher Anbieter): Systemschrift, Navy und Blau, farbiger Hero mit schrägem Abschluss, Karten mit
Symbol-Kacheln, abwechselnd weiße und helle Abschnitte; nur hell. Reines HTML und CSS ohne Build-Schritt, dazu ein
kleines Skript für die Navigation (`assets/site.js`: fester Kopf beim Scrollen, Menü auf dem Telefon – speichert
nichts, lädt nichts nach; ohne JavaScript bleibt alles nutzbar). Keine externen Anfragen zur Laufzeit (keine CDN,
keine Webfonts, kein Tracking).
Veröffentlicht über **GitHub Pages** unter **https://ordaneo.de** (Repository `christophgerhardt-del/ordaneo-website`).
Die Anwendung selbst läuft unter `erp.ordaneo.de` (seit 20.10.2026; `warenwirtschaft.actuvo.de` bleibt daneben erreichbar).

Stand: Nacht 20./21.10.2026 – 27 Seiten: Startseite, Funktionsübersicht, 16 Funktionsseiten, Branchen (Übersicht,
Getränkehandel, Fachhandel), Sicherheit, Einführung, Fragen, Impressum, Datenschutz, 404. Offene Punkte unten.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero mit Geräte-Bild, Zahlen, Funktionen (Karten → Funktionsseiten), Was Ordaneo besonders macht, Ablauf (Belegkette), Lager, Touren, Kasse, Rechnung, Apps, Außerdem an Bord, Zugriff und Betrieb (dunkles Band), Branchen, Einführung, Häufige Fragen, Kontakt |
| `funktionen/` | Übersicht aller Funktionen und je Funktion ein Ordner mit `index.html` (Seitenliste in `tools/seiten.cjs`, Stand in `plan/VORLAGE.md`) |
| `branchen/`, `sicherheit/`, `einfuehrung/`, `fragen/` | weitere Unterseiten: Branchen mit Getränke- und Fachhandel, Sicherheit und Betrieb, Einführung, alle häufigen Fragen |
| `impressum.html` | Gerüst mit markierten Platzhaltern (`<span class="ph">[… – Angabe folgt]</span>`) |
| `datenschutz.html` | Entwurf für eine statische Seite ohne Cookies und Tracking, Hosting GitHub Pages |
| `404.html` | Fehlerseite; GitHub Pages liefert sie unter jeder unbekannten Adresse aus, deshalb Pfade ab `/` |
| `assets/site.css` | Grundstile, Kopf mit Ausklappmenüs, Fußzeile, Bausteine der Startseite; Farben als Variablen nach der Palette von presio.eu (nur hell) |
| `assets/seiten.css` | Bausteine der Unterseiten (Hero mit Brotkrume, „Auf einen Blick“, Häkchen-Liste, „Das ist besonders“, Stand-Kasten, „Passt dazu“ …) |
| `assets/site.js` | Navigation: fester Kopf ab dem Scrollen, Ausklappmenüs „Funktionen“/„Branchen“, Menü hinter dem Burger, aktuelle Seite markieren |
| `assets/brand/` | Marke: Bildmarke, Wortmarke, Lockup, Favicons, `BRAND.md` |
| `assets/screens/` | Produktbilder als WebP in zwei bis drei Breiten und das Geräte-Bild des Hero (siehe „Produktbilder“) |
| `assets/og.png` | Vorschaubild für geteilte Links (1200 × 630), gerendert aus `tools/og.html` |
| `favicon.ico`, `site.webmanifest` | Favicon (16/32/48, in Chrome aus `assets/brand/favicon.svg` gerendert) und Symbole für den Startbildschirm |
| `robots.txt`, `sitemap.xml`, `CNAME` | Suchmaschinen und eigene Domain (`ordaneo.de`) |
| `_config.yml` | sagt GitHub Pages, dass `README.md`, `tools/` und `BRAND.md` nicht veröffentlicht werden |
| `tools/` | Vorlagen und Skripte für die Markendateien, das Open-Graph-Bild, das Geräte-Bild und die Unterseiten (werden nicht veröffentlicht) |
| `tools/seiten.cjs` | Seitenliste, gemeinsamer Kopf und Fuß (`teile`), Prüfung aller Seiten (`pruefen`), Symbole und Bild-Markup |
| `tools/verboten.local.txt` | **nicht versioniert** (`.gitignore`): Namen, die nie auf die Website und nie ins öffentliche Repository dürfen (Erstkunde, Orte der Region) – eine Regex je Zeile, `pruefen` liest sie mit |
| `tools/seiten-browser.cjs` | Prüfung im Browser bei 1440 und 390 px (Scrollleiste, fremde Anfragen, Konsole, Bilder, Menüs) |
| `tools/vorlage-seite.html` | Kopiervorlage für eine Unterseite |
| `plan/` | Seitenplan, Bilderliste, Vorlage für die Unterseiten, Prüfbericht – **nicht versioniert** (`.gitignore`, seit 21.10.2026), liegt nur lokal |

## Lokale Vorschau

```sh
cd ~/ordaneo-website
python3 -m http.server 9370 --bind 127.0.0.1
# dann http://127.0.0.1:9370/ öffnen; beenden mit Strg+C
```

Die Fehlerseite unter http://127.0.0.1:9370/404.html ansehen (der Python-Server zeigt bei unbekannten Adressen seine
eigene Fehlerseite, GitHub Pages dagegen `404.html`).

## Unterseiten bauen und prüfen

Kopf und Fußzeile sind auf allen Seiten gleich und entstehen aus der Seitenliste in `tools/seiten.cjs`; in den
Seiten stehen sie zwischen `<!-- KOPF -->`/`<!-- /KOPF -->` und `<!-- FUSS -->`/`<!-- /FUSS -->`. Nach einer
Änderung an Menü oder Fußzeile:

```sh
node tools/seiten.cjs teile      # Kopf und Fuß in alle Seiten schreiben
node tools/seiten.cjs pruefen    # Kopfbereich, Links, Bilder, Klassen, verbotene Wörter, Sitemap
NODE_PATH=~/warenwirtschaft-marke/node_modules node tools/seiten-browser.cjs http://127.0.0.1:9370
```

Neue Seite: `tools/vorlage-seite.html` kopieren; Anleitung, Bausteine und offene Listen in `plan/VORLAGE.md`.

## Produktbilder

Die Bilder sind echte Bildschirmfotos der Anwendung (Stand 20./21.10.2026, Worktree `warenwirtschaft-marke`, Bildmarke
A mit orangem Quadrat, Demo-Daten, hell, 2-fache Pixeldichte). Sie liegen als WebP in
`assets/screens/<seite>-<name>-<breite>.webp`; `srcset`/`sizes` wählen die Breite. Die vollständige Liste der 40
Aufnahmen für den Ausbau – mit Format, Seiten, Alt-Text, Bildunterschrift und Beleg – steht in `plan/BILDER.md`.

Auf der Startseite im Einsatz:

| Datei | Ansicht | Aufnahme | Rahmen auf der Seite |
|---|---|---|---|
| `auswertungen-start` | Start der Geschäftsführung (Johanna) | Desktop 1440 × 900 | im Geräte-Bild (Rechner) |
| `chargen-liste` | Lager › MHD & Chargen, „Alle Chargen“, alle Standorte | Desktop 1440 × 900 | Browserfenster (`.bild-rahmen`) |
| `touren-disposition` | Verkauf › Disposition, Seitenleiste eingeklappt, Karte weichgezeichnet und ohne Linien | Desktop 1440 × 900 | Browserfenster |
| `kasse-verkauf` | Kasse › Kassieren (Lea), Bon aus der Demo-Geschichte (49,13 €) | iPad quer 1180 × 820 | Tablet (`.tablet-rahmen`) und Geräte-Bild |
| `erechnung-rechnung` | Rechnung mit Karte „E-Rechnung“ (Claudia) | Desktop 1440 × 900 | Browserfenster |
| `inventur-zaehlen` | Inventur › Zählen am Telefon (Petra) | Telefon 390 × 844 | Telefon (`.handy-rahmen`) und Geräte-Bild |
| `geraete` | Rechner, iPad und iPhone (wie auf presio.eu) | aus `tools/geraete.html`, 2000 × 1440, transparent | Hero |

**Was an den Bildern bearbeitet ist:** Der Demo-Betrieb trägt in der Anwendung Namen, Logo, Standorte und
Artikelnummern des Erstkunden. Für die Aufnahmen wurde deshalb nur in einer eigenen, danach gelöschten Datenbank
umbenannt: Betrieb „Getränke Muster“ ohne Logo und Hausfarbe, Orte „Nordstadt“, „Oststadt“, „Weststadt“ (beim
Eisenwaren-Betrieb „Südstadt“, „Bergstadt“), erfundene Straßen und Postleitzahlen auch bei den Beispielkunden,
Kundennamen ohne Ortsbezug, Kennzeichen `B-OD …`, Artikelnummern `GM-…` statt `AL-…`. Seit der Nachbesserung vom
21.10.2026 tragen auch die Lieferanten erfundene Namen (etwa „Brauerei Muster KG“, „Brauhaus Beispiel GmbH“,
„Kelterei Beispiel“) und die Postleitzahlen liegen im Bereich der Mustertexte (12345 ff.); Artikelnamen bleiben echt. Für die Disposition wurde die
nur geplante Tour 3 abgebrochen, damit planbare Aufträge zu sehen sind; die Kartenkacheln (OpenStreetMap) sind stark
weichgezeichnet und die Linien zwischen den Stopps ausgeblendet (ohne Routendienst wären es Luftlinien). Was sonst für
einzelne Aufnahmen vorbereitet wurde, steht in `plan/BILDER.md`. Nichts ist retuschiert; die Hinweise „Demo-Daten“,
„Schulungsbeleg (DEMO)“, „DEMO – keine TSE“ und „Demo-Modus“ sind echt und bleiben sichtbar.

Neue Bilder: dieselben Ansichten in Chrome aufnehmen (Playwright, hell), wieder nur erfundene Daten und keinen
Kundennamen zeigen, als WebP (Qualität etwa 82) ablegen – Desktop 800/1440 (wichtige Bilder auch 2400), Tablet
800/1180 (auch 2360), Telefon 390/780. Danach das Geräte-Bild und `og.png` neu rendern (Vorschau muss laufen;
Playwright aus einem vorhandenen Projekt leihen, hier nichts installieren; Pillow mit WebP nötig):

```sh
NODE_PATH=~/warenwirtschaft-marke/node_modules node tools/render-geraete.cjs http://127.0.0.1:9370
NODE_PATH=~/warenwirtschaft-marke/node_modules node tools/render-og.cjs http://127.0.0.1:9370
```

## Markendateien neu erzeugen

Alle Dateien in `assets/brand` (SVG, PNG) und `favicon.ico` (16/32/48) entstehen aus `tools/build-brand.cjs`
(Geometrie und Farben wie in `BRAND.md`; die Wortmarke wird aus `ordaneo-wordmark.svg` übernommen). Keine Vorschau
nötig, Playwright wird geliehen:

```sh
NODE_PATH=~/warenwirtschaft-ordaneo/node_modules node tools/build-brand.cjs
```

Die Inline-Kopien der Bildmarke in den Seiten (Kopf und Fußzeile, Klassen `.logo-mark`, `.zf`, `.ze`) holen ihre
Farben aus `assets/site.css` (`--marke-kachel`, `--marke-rahmen`, `--marke-einheit`); `tools/og.html` nennt sie
direkt. Danach `og.png` neu rendern (unten) und die Dateien der Anwendung abgleichen (`BRAND.md` §11).

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
  80801 München (Angaben wie im Impressum von presio.eu). Vertretung und Verantwortlicher nach MStV wie im Impressum von presio.eu (Christoph Gerhardt). Seit 21.10.2026 eingetragen: Telefon
  (Vertrieb, wie auf presio.eu), Aufsichtsbehörde (BayLDA), Grundlage der Übermittlung an GitHub (Data Privacy
  Framework), Speicherdauer beim Hoster. Noch offen: Postfach-Anbieter, Datenschutzbeauftragte(r), Hinweise der
  Anwendung; alles rechtlich prüfen lassen; dann die Hinweise „Entwurf – vor Veröffentlichung prüfen“ entfernen.
- **Postfach `kontakt@ordaneo.de` muss noch eingerichtet werden** (MX und SPF/DKIM/DMARC bei Squarespace). Bis dahin
  laufen E-Mail-Links ins Leere (Stand 21.10.2026: kein MX, SPF `-all`, DMARC `reject`).
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
