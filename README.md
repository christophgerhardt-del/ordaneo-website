# ordaneo.com – Website

Statische Produktseite für **Ordaneo**, die Warenwirtschaft für Handel und Großhandel. Reines HTML und CSS, kein
Build-Schritt, kein JavaScript, keine externen Anfragen zur Laufzeit (keine CDN, keine Google Fonts, kein Tracking).
Veröffentlicht werden soll sie über **GitHub Pages** unter **https://ordaneo.com**; `ordaneo.de` leitet dorthin um.
Die Anwendung selbst läuft unter `erp.ordaneo.com` (heute noch `warenwirtschaft.actuvo.de`).

Stand: 20.10.2026 · **Noch nicht veröffentlicht** – offene Punkte unten.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Ablauf (Belegkette), Funktionen, Zugriff und Betrieb, Branchen, Einführung, Kontakt |
| `impressum.html` | Gerüst mit markierten Platzhaltern (`<span class="ph">[… – Angabe folgt]</span>`) |
| `datenschutz.html` | Entwurf für eine statische Seite ohne Cookies und Tracking, Hosting GitHub Pages |
| `404.html` | Fehlerseite; GitHub Pages liefert sie unter jeder unbekannten Adresse aus, deshalb Pfade ab `/` |
| `assets/site.css` | alle Stile, Farben als Variablen, hell und dunkel über `prefers-color-scheme` |
| `assets/fonts/` | Inter (opsz + wght) und Geist Mono (wght) als WOFF2, Untermengen `latin` und `latin-ext`, mit Lizenz (SIL OFL 1.1) |
| `assets/brand/` | Marke: Bildmarke, Wortmarke, Lockup, Favicons, `BRAND.md` |
| `assets/og.png` | Vorschaubild für geteilte Links (1200 × 630), gerendert aus `tools/og.html` |
| `favicon.ico`, `site.webmanifest` | Favicon (16/32/48, in Chrome aus `assets/brand/favicon.svg` gerendert) und Symbole für den Startbildschirm |
| `robots.txt`, `sitemap.xml`, `CNAME` | Suchmaschinen und eigene Domain (`ordaneo.com`) |
| `_config.yml` | sagt GitHub Pages, dass `README.md`, `tools/` und `BRAND.md` nicht veröffentlicht werden |
| `tools/` | Vorlage und Skript für das Open-Graph-Bild (wird nicht veröffentlicht) |

Schriften: Inter Variable `inter-latin-opsz-normal.woff2` usw. aus `@fontsource-variable/inter@5.3.0`, Geist Mono aus
`@fontsource-variable/geist-mono@5.3.0` (per `npm pack` außerhalb des Projekts geladen, nichts installiert).

## Lokale Vorschau

```sh
cd ~/ordaneo-website
python3 -m http.server 9370 --bind 127.0.0.1
# dann http://127.0.0.1:9370/ öffnen; beenden mit Strg+C
```

Die Fehlerseite unter http://127.0.0.1:9370/404.html ansehen (der Python-Server zeigt bei unbekannten Adressen seine
eigene Fehlerseite, GitHub Pages dagegen `404.html`).

## Produktbilder einsetzen

Auf der Startseite stehen sechs Platzhalter-Rahmen, erkennbar an `data-shot`:

| `data-shot` | Abschnitt | Format des Rahmens |
|---|---|---|
| `übersicht` | Hero | Browser, 16 : 10 |
| `bestand` | Lager und Bestand | Browser, 16 : 10 |
| `tour` | Touren und Auslieferung | Browser, 16 : 10 |
| `kasse` | Kasse | Browser, 16 : 10 |
| `erechnung` | Rechnung und E-Rechnung | Browser, 16 : 10 |
| `app` | Apps für Tablet und Telefon | Telefon, 9 : 19,5 |

So wird ein Bild eingesetzt: Datei nach `assets/shots/<name>.png` (oder `.webp`) legen, im `<figure data-shot="…">` den
Inhalt von `<div class="shot-body is-placeholder" …>` ersetzen durch
`<img src="assets/shots/<name>.png" alt="<Text aus data-alt>" width="…" height="…" loading="lazy">`, dann am `div` die
Klasse `is-placeholder` sowie `role` und `aria-label` entfernen. Das Bild bestimmt danach die Höhe selbst. Das erste Bild
(`übersicht`) ohne `loading="lazy"`. Für hell und dunkel getrennte Bilder geht `<picture>` mit
`<source media="(prefers-color-scheme: dark)" srcset="…">`. Nur erfundene Demo-Daten zeigen, keinen Kundennamen.

## Open-Graph-Bild neu rendern

Bei geänderter Überschrift `tools/og.html` anpassen und mit Playwright in Google Chrome rendern (Vorschau muss laufen;
Playwright wird aus einem vorhandenen Projekt geliehen, hier nichts installieren):

```sh
NODE_PATH=~/warenwirtschaft-ordaneo/node_modules node tools/render-og.cjs http://127.0.0.1:9370
```

## Veröffentlichung über GitHub Pages

1. Repository anlegen (z. B. `ordaneo-website`), diesen Ordner als `main` pushen.
2. Im Repository **Settings → Pages**: *Deploy from a branch*, Branch `main`, Ordner `/ (root)`.
3. Unter **Custom domain** `ordaneo.com` eintragen (die Datei `CNAME` enthält das schon). Empfohlen vorher: die Domain
   im GitHub-Konto unter **Settings → Pages → Verified domains** bestätigen (TXT-Eintrag
   `_github-pages-challenge-<konto>` bei Squarespace), damit niemand anderes sie für Pages nutzen kann.
4. Sobald das Zertifikat ausgestellt ist (kann bis zu einer Stunde dauern): **Enforce HTTPS** einschalten.

Ohne eigene Domain läge die Seite unter `https://<konto>.github.io/ordaneo-website/` – dort stimmen die Pfade der
`404.html` (ab `/`) nicht. Deshalb erst mit eingerichteter Domain testen.

## DNS bei Squarespace (setzt Christoph)

In Squarespace unter **Domains → ordaneo.com → DNS** zuerst die voreingestellten Squarespace-Einträge für `@` und `www`
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
abgleichen. Gibt es CAA-Einträge, muss `letsencrypt.org` erlaubt sein. `www.ordaneo.com` leitet GitHub dann selbst auf
`ordaneo.com` um.

**Nicht Teil der Website, aber in derselben Zone:** `erp` → A `167.233.15.101` (Demo-Server Hetzner Nürnberg). Der
Server muss die neue Adresse zusätzlich kennen (Caddy, Zertifikat); `warenwirtschaft.actuvo.de` bleibt daneben
bestehen. MX-, SPF-, DKIM- und DMARC-Einträge für das Postfach kommen vom Mail-Anbieter – beim Aufräumen der
Squarespace-Vorgaben nichts davon löschen.

### Weiterleitung ordaneo.de

In Squarespace unter **Domains → ordaneo.de → Domain forwarding** (Weiterleitung) eine dauerhafte Weiterleitung (301)
von `ordaneo.de` und `www.ordaneo.de` auf `https://ordaneo.com` anlegen, mit Pfad. Danach prüfen, dass
`https://ordaneo.de` ohne Zertifikatswarnung weiterleitet. Klappt das nicht, kann `ordaneo.de` als zweite
GitHub-Pages-Seite mit eigener `CNAME` betrieben werden, die per Meta-Refresh weiterleitet (schlechter: kein 301).

## Offene Punkte vor der Veröffentlichung

- **Impressum und Datenschutz:** alle markierten Angaben ergänzen (Anbieter, Anschrift, Vertretung, Register,
  USt-IdNr., Aufsichtsbehörde, Postfach-Anbieter, Grundlage der Übermittlung an GitHub) und rechtlich prüfen lassen;
  dann die Hinweise „Entwurf – vor Veröffentlichung prüfen“ entfernen.
- **Postfach `kontakt@ordaneo.com` muss noch eingerichtet werden** (MX und SPF/DKIM/DMARC bei Squarespace). Bis dahin
  laufen E-Mail-Links ins Leere.
- **`erp.ordaneo.com`** ist noch nicht eingerichtet (DNS und Server). Alle „Demo ansehen“-Knöpfe zeigen dorthin.
- **Die Demo zeigt heute Namen und Logo des Erstkunden** und noch den alten Namen der Anwendung. Bevor die Website auf
  die Demo verlinkt, klären, ob das so öffentlich sein darf (sonst einen neutralen Beispielbetrieb voranstellen).
- **Produktbilder** einsetzen (siehe oben).
- Hinweis zu den Apps („Veröffentlichung in den App-Stores folgt“) anpassen, sobald sie in den Stores sind.

## Regeln für Texte

Jede Funktionsaussage muss durch gebaute Funktionen gedeckt sein (Quellen: `docs/STATUS.md`, `README.md`,
`docs/ENTSCHEIDUNGEN.md`, `docs/modules/*.md`, `docs/DEMO.md` im Repository der Anwendung, Stand `main` vom
19.10.2026). Nicht schreiben: „rechtssicher“, „zertifiziert“, „GoBD-konform“, „KassenSichV-konform“,
„revisionssicher“, „DSGVO-konform“ oder ähnliche Gütesiegel; keine erfundenen Zahlen, Kunden, Referenzen, Zitate oder
Preise; keinen Kundennamen. Die Kasse verkauft nur mit Verbindung zum Server – einen Betrieb ohne Verbindung nicht
bewerben. „Server in Nürnberg“ beschreibt den heutigen Betrieb, ist kein Versprechen. Pro Ansicht höchstens eine
Hauptaktion in Kupfer (siehe `assets/brand/BRAND.md`).
