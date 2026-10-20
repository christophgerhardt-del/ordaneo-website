# Ordaneo · Marke

Stand: 20.10.2026 · Version 1.2 (Bildmarke A „Eckstein“ mit oranger Einheit) · ersetzt den Arbeitstitel „Merxo“

Ordaneo ist eine mandantenfähige Warenwirtschaft für Lager, Filialen, Handel und Großhandel. Der Name kommt von
*ordnen* bzw. lateinisch *ordo*, Ordnung und Reihe. Die Marke soll genau das ausstrahlen: ruhig, präzise,
vertrauenswürdig. Sie ist bewusst zurückhaltend: Graphit und Hell, dazu genau ein Farbpunkt – die **orange Einheit**
der Bildmarke. In der Anwendung kann diese Einheit die Hausfarbe des Mandanten annehmen; sonst bringt dort der Mandant
die Farbe mit. Die Website ist aus einer Hand mit presio.eu gestaltet und nutzt deren Palette (Abschnitt 6).

## 1 · Idee: „Eckstein“

Die Bildmarke zeigt ein **eckiges O**, dessen letzte Ecke die **Einheit** schließt.

- Das **O** ist der erste Buchstabe von „ordaneo“ und steht für *ordo*: ein Rahmen mit gleichmäßig gerundeten Ecken,
  in dem alles seinen Platz hat.
- Die **Einheit** ist das kleine Quadrat, das schon das alte Zeichen kannte. Sie sitzt dort, wo der Rahmen offen ist,
  und macht ihn vollständig: Die Ware kommt an ihren Platz, der Vorgang ist abgeschlossen.
- Rahmen und Einheit bleiben getrennt. So entsteht die Form ohne Kiste, Einkaufswagen, Zahnrad oder Pfeil.

## 2 · Entwürfe und Entscheidung

Neun Richtungen wurden im 32er-Raster skizziert und in 16, 32 und 128 px hell und dunkel gerendert. Die drei stärksten
kamen in den Vergleich:

| Entwurf | Idee | Ergebnis |
|---|---|---|
| **A · Eckstein** | eckiges O als Rahmen, die Einheit schließt die letzte offene Ecke | **gewählt** (Christoph Gerhardt, 20.10.2026) |
| B · o-Punkt | o und Punkt, die Einheit auf der Grundlinie | Alternative, siehe unten |
| C · Platz | Rahmen mit der Einheit genau in der Mitte | am ruhigsten, aber verwechselbar mit „Aufnahme stoppen“ und einem Optionsfeld; in Rot (Mandantenfarbe) wäre es ein Aufnahmeknopf |

Verworfen wurden außerdem drei Zeilen mit Einheit (wirkt wie ein Listen- oder Menü-Symbol), ein Anschlagwinkel (wirkt
wie Diagrammachsen), ein Fach in U-Form (liest sich als „U“), ein offener Ring mit Einheit (wirkt wie „Neu laden“) und
gedrehte Varianten von A (wirken wie „C“ bzw. „Rückgängig“).

**Warum A:** kräftige, eigenständige Silhouette; die Kachelform wiederholt sich im Zeichen, und die Einheit hat eine
klare Aufgabe (sie schließt den Rahmen). Genau ein Element, die Einheit, ist farbig.

**Farbe der Einheit** (Entscheidung Christoph Gerhardt, 20.10.2026 abends): **Orange `#E8650E`** auf der
Graphit-Kachel mit weißem Rahmen – überall, auf der Website wie in der Anwendung, in den App-Symbolen und
Store-Grafiken. Bis dahin war die Einheit weiß wie der Rahmen. In der Anwendung bleibt die Einheit das eine Element,
das die Hausfarbe eines Betriebs annehmen darf; ohne Hausfarbe ist sie orange.

**Bekannte Einschränkung:** Bei 16 px kann das Zeichen als „G“ oder „Q“ gelesen werden. Die Einheit liegt bei 32 px
auf ganzen Pixeln, bei 16 px ist ihre rechte und untere Kante eine halbe Pixelreihe weich. Eine Verschiebung um höchstens
0,5 Einheiten macht nicht beide Kanten scharf; die Geometrie bleibt deshalb wie entworfen.

**Alternative B „o-Punkt“** (nicht verwendet, zur Dokumentation): Kreis um x 12 / y 16, Radius 6,25, Strichstärke 3,5;
Einheit 6 × 6 bei x 22 / y 18, Radius 1,5. Bei 16 px eindeutiger, weil Kreis und Punkt nicht an Buchstaben erinnern;
die Dateien liegen nicht mehr im Ordner, lassen sich aber mit diesen Maßen neu erzeugen.

## 3 · Bildmarke: Geometrie

Raster 32 × 32, drei Elemente, gleicher Aufbau wie das bisherige Zeichen (gleiche CSS-Variablen):

| Element | Geometrie | Farbe hell | Farbe dunkel |
|---|---|---|---|
| Kachel | Quadrat 32 × 32, Eckenradius 8 | `--color-inverse` (Graphit `#15171b`) | `--color-inverse` (`#f3f4f6`) |
| Rahmen (O) | offener Linienzug, Mittellinie x 8,5 bis 23,5 und y 8,5 bis 23,5, Eckenradius 4,5, Strichstärke 3, runde Enden; offen zwischen x 14,5 (unten) und y 14,5 (rechts) | `--color-fg-inverse` | `--color-fg-inverse` |
| Einheit | Quadrat 7 × 7 bei x 18 / y 18, Eckenradius 1,75 | `--color-logo-unit`: ohne Hausfarbe Orange `#E8650E`, mit Hausfarbe `accent-400` | ohne Hausfarbe Orange tief `#C9530A`, mit Hausfarbe `accent-600` |

Kontrollmaße: Außenkanten des Rahmens bei x 7 bis 25 und y 7 bis 25; die Einheit schließt bündig mit der rechten und
unteren Außenkante (25); Abstand zwischen den runden Enden des Rahmens und der Einheit 2. Das Zeichen ist im Raster
genau mittig (7 bis 25 in beiden Richtungen). Bei 32 px liegen Rahmen und Einheit auf ganzen Pixeln.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ordaneo">
  <rect width="32" height="32" rx="8" fill="var(--color-inverse, #15171b)"/>
  <path d="M14.5 23.5H13a4.5 4.5 0 0 1-4.5-4.5v-6A4.5 4.5 0 0 1 13 8.5h6a4.5 4.5 0 0 1 4.5 4.5v1.5" fill="none"
        stroke="var(--color-fg-inverse, #f9fafb)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="18" y="18" width="7" height="7" rx="1.75" fill="var(--color-logo-unit, #e8650e)"/>
</svg>
```

**Varianten**

- **Ohne Kachel** (`ordaneo-symbol.svg`; Inline-Zeichen, KI-Assistent, Stempel): dieselbe Form um den Mittelpunkt auf
  das 1,5-Fache vergrößert, Strichstärke 4,5; Rahmen-Mittellinie x/y 4,75 bis 27,25, Eckenradius 6,75; Einheit
  10,5 × 10,5 bei x 19 / y 19, Radius 2,625. Außenmaß 2,5 bis 29,5. Rahmen in `currentColor`, Einheit orange passend
  zum Grund: auf hellem Grund Orange tief (`--color-logo-unit-bare`, Rückfallwert `#C9530A`), auf dunklem Grund
  `ordaneo-symbol-dark.svg` mit hellem Rahmen und Orange `#E8650E`. In der Anwendung trägt die Einheit mit Hausfarbe
  deren Akzent.
- **Einfarbig** (Belegdruck schwarz-weiß, Stempel): Einheit in derselben Farbe wie der Rahmen.
- **Dunkel** (`ordaneo-mark-dark.svg`): helle Kachel `#f3f4f6`, Rahmen `#0e1114`, Einheit Orange tief `#C9530A` –
  feste Farben für dunkle Flächen außerhalb der Anwendung, wie das dunkle Theme der Anwendung.

## 4 · Wortmarke

„ordaneo“ in Kleinbuchstaben, eigens gezeichnet und als Pfade abgelegt (keine Schrift nötig). Geometrische
Grotesk mit einheitlicher Strichstärke und geraden Enden: Kreise für o, d, a und e, einstöckiges a, Oberlänge nur am d.

| Maß (Einheiten der Datei) | Wert |
|---|---|
| x-Höhe | 100 |
| Strichstärke | 21 (Querstrich des e: 18, optisch ausgeglichen) |
| Oberlänge d | 40 über der x-Höhe |
| Überhang der Rundungen | 2 über x-Höhe und Grundlinie |
| Abstände der Außenkanten | rund–rund 10, rund–gerade 14, gerade–gerade 16, r–d −2 (die Schale läuft unter den Arm) |
| Gesamtmaß | 721,92 × 142 |

Die Pfade sind Linienzüge (`stroke`). In Figma oder Illustrator lassen sie sich mit „Kontur umwandeln“ in Flächen
überführen, falls ein Dienstleister das verlangt. Die Farbe kommt über `currentColor`, voreingestellt per
`color`-Attribut: Inline eingebunden lässt sie sich mit CSS (`color: …`) setzen.

## 5 · Lockup (Bildmarke + Wortmarke)

- Kachelhöhe = 1,5 × x-Höhe, vertikal mittig zur x-Höhe (die Oberlänge des d ragt darüber hinaus).
- Abstand Kachel–Wortmarke = 0,35 × Kachelhöhe.
- Nur als ganze Datei verwenden (`ordaneo-lockup.svg` bzw. `-dark.svg`), nicht nachbauen. In der Anwendung zeichnet
  `Logo.tsx` den Lockup mit denselben Wortmarken-Pfaden.

## 6 · Farben

| Rolle | Wert | Verwendung |
|---|---|---|
| Graphit | `#15171b` (neutral-900) | Kachel hell, Wortmarke hell, Text |
| Hell | `#f9fafb` (neutral-50) | Rahmen auf Graphit, Wortmarke dunkel, Seitengrund hell |
| Kachel dunkel | `#f3f4f6` (neutral-100) | Kachel auf dunklem Grund (wie im dunklen Theme) |
| Zeichen dunkel | `#0e1114` (neutral-950) | Rahmen auf heller Kachel |
| **Orange** | **`#E8650E`** | **nur** die Einheit auf der Graphit-Kachel und auf dunklem Grund |
| Orange tief | `#C9530A` | die Einheit auf heller Kachel (dunkles Theme, `-dark`-Dateien, Favicon im dunklen Schema) und das Zeichen ohne Kachel auf hellem Grund |

**Kontraste der Einheit** (WCAG 2.2, 1.4.11: grafische Objekte ≥ 3 : 1):

| Einheit | Grund | Kontrast |
|---|---|---|
| Orange `#E8650E` | Graphit-Kachel `#15171b` | 5,4 : 1 |
| Orange `#E8650E` | dunkler Grund `#0e1114` / `#090a0d` | 5,7 : 1 / 5,9 : 1 |
| Orange `#E8650E` | helle Kachel `#f3f4f6` | 3,0 : 1 – nur knapp, bei 16 px durch Kantenglättung darunter; deshalb dort Orange tief |
| Orange tief `#C9530A` | helle Kachel `#f3f4f6` | 4,0 : 1 |
| Orange tief `#C9530A` | `#f9fafb` / Weiß | 4,3 : 1 / 4,4 : 1 |

Orange tief hat denselben Farbton (OKLCH 0,59 / 0,17 / 44° statt 0,66 / 0,18 / 46°) und wirkt neben dem dunklen
Rahmen wie dasselbe Orange. Der Rahmen hält auf beiden Kacheln 17,2 : 1.

### Website: Palette von presio.eu (seit 20.10.2026 abends)

Christoph hat entschieden, dass ordaneo.de so professionell aufgebaut ist wie presio.eu (gleicher Anbieter): Bausteine
und Typografie wie dort, aber eigene Farben – Variante A „Petrol“ (Entscheidung 20.10.2026). Kupfer als Akzent entfällt.
Die Werte stehen als Variablen in `assets/site.css`.

| Rolle | Wert | Verwendung |
|---|---|---|
| Navy | `#0A2540` | Überschriften, Schaltfläche dunkel, dunkles Band |
| Fließtext | `#425466` | Text auf Weiß und Hellgrau (7,4 : 1 auf `#F6F9FC`) |
| Leise | `#697386` | kleine Schrift, Bildunterschriften (4,78 : 1 auf Weiß, 4,52 : 1 auf `#F6F9FC`) |
| Hellgrau | `#F6F9FC` | jeder zweite Abschnitt, Fußzeile |
| Linie | `#E6EBF1` | Rahmen von Karten, Trennlinien |
| **Petrol** | **`#0E7490`** | Eyebrow-Labels, Symbole, Schaltflächen (5,36 : 1 auf Weiß) |
| Petrol tief | `#155E75` | Links, „Mehr erfahren“, Hover (7,0 : 1 auf `#F6F9FC`) |
| Violett, Bernstein, Grün, Rose, Petrol | `#7C3AED`, `#D97706`, `#16A34A`, `#E11D48`, `#0D9488` | nur Symbol-Kacheln und Häkchen-Kästchen, nie für Text |
| Hero-Verlauf | `#0A4D5C` → `#0E7490` → `#14918F` (Lichter `#1BA3A0`, `#073B48`) | Hero der Startseite, Vorschaubild, Kontakt-Band; Unterseiten mit dem dunklen Petrol-Verlauf `#06313B` → `#0E7490` |

Die Bildmarke steht auf der Website **überall gleich**: Graphit-Kachel `#15171b`, heller Rahmen, orange Einheit – auf
dem Hero, im festen Kopf, im Menü auf dem Telefon, in der Fußzeile und im Vorschaubild `og.png`; daneben die
Wortmarke in Weiß (Hero) bzw. Navy. Die Farben stehen als `--marke-kachel`, `--marke-rahmen`, `--marke-einheit` in
`assets/site.css`. **Die Website-Farben bleiben Petrol; das Orange ist nur die Einheit der Marke** – nie Text,
Schaltfläche, Fläche oder Symbol-Kachel. Weiße Schrift steht auf dem Hero nur im linken, dunkleren Teil (mindestens
5,2 : 1).

In der Anwendung gibt es weder Kupfer noch die Website-Palette: Dort bleibt Graphit der Standard; Farbe tragen nur die
Einheit der Bildmarke (orange oder in der Hausfarbe) und die Hausfarbe des Mandanten.

## 7 · Schutzraum und Mindestgrößen

| | Schutzraum (ringsum frei) | Mindestgröße |
|---|---|---|
| Bildmarke mit Kachel | ¼ Kachelbreite | 16 px |
| Zeichen ohne Kachel | ¼ Zeichenhöhe | 14 px |
| Wortmarke | ½ x-Höhe | 14 px Gesamthöhe (x-Höhe ≈ 10 px) |
| Lockup | ¼ Kachelhöhe | 20 px Gesamthöhe |

## 8 · Verwendung hell und dunkel

| Untergrund | Datei |
|---|---|
| hell (Weiß, `#f9fafb`, helle Fotos) | `ordaneo-lockup.svg`, `ordaneo-mark.svg`, `ordaneo-wordmark.svg` |
| dunkel (Graphit, `#0e1114`, dunkle Fotos) | `ordaneo-lockup-dark.svg`, `ordaneo-mark-dark.svg`, `ordaneo-wordmark-dark.svg` |
| in der Anwendung | `ordaneo-mark.svg` (folgt den Variablen und damit Theme und Hausfarbe) |
| Browser-Tab | `favicon.svg` (wechselt mit `prefers-color-scheme` selbst auf die helle Kachel), Ersatz `favicon-32.png` |
| Homescreen, PWA | `apple-touch-icon.png` (180, randlos), `icon-192.png`, `icon-512.png` (Kachel mit transparenten Ecken), `icon-maskable-512.png` (randlos, Zeichen auf 72 %, innerhalb der sicheren Zone von 80 %) |

Nicht erlaubt: Zeichen verzerren, drehen oder mit Schatten versehen; den Rahmen einfärben oder schließen; die Einheit rund machen;
die Einheit in einer anderen Farbe als Orange, Orange tief oder (in der Anwendung) der Hausfarbe; Orange für Kachel,
Rahmen, Wortmarke oder Text; Kachel und Zeichen in derselben Farbe; Lockup aus Bildmarke und gesetzter Schrift nachbauen; Wortmarke in Versalien
oder mit großem O.

## 9 · Schrift für die Website

Seit der Neugestaltung im Stil von presio.eu (20.10.2026) nutzt die Website die **Systemschrift** des Geräts
(`-apple-system`, SF Pro, Segoe UI, Roboto …) und lädt keine Schriftdateien. Überschriften 720–750, Laufweite −0,02 em;
Fließtext 400, Zeilenhöhe 1,6; Belegkürzel und Code in der Monospace-Schrift des Systems.

Die Anwendung nutzt weiter Inter und Geist Mono (SIL Open Font License 1.1). Die Wortmarke ist keine Schrift und wird
nie mit einer Schrift nachgesetzt.

## 10 · Dateien

| Datei | Inhalt |
|---|---|
| `ordaneo-mark.svg` | Bildmarke mit Kachel, CSS-Variablen wie in der Anwendung |
| `ordaneo-mark-dark.svg` | Bildmarke für dunklen Grund, feste Farben |
| `ordaneo-symbol.svg` | Zeichen ohne Kachel für hellen Grund: Rahmen `currentColor`, Einheit Orange tief |
| `ordaneo-symbol-dark.svg` | Zeichen ohne Kachel für dunklen Grund: Rahmen hell, Einheit Orange |
| `ordaneo-wordmark.svg` / `-dark.svg` | Wortmarke als Pfade |
| `ordaneo-lockup.svg` / `-dark.svg` | Bildmarke + Wortmarke |
| `favicon.svg` | Favicon mit Umschaltung hell/dunkel |
| `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | PNG-Exporte, in Chrome gerendert |

Alle Dateien und `favicon.ico` (16/32/48) erzeugt `tools/build-brand.cjs` (README, „Markendateien neu erzeugen“).

## 11 · Übernahme in die Anwendung

Umgesetzt in der Anwendung (zuletzt orange Einheit, 20./21.10.2026): `web/public/ordaneo-mark.svg` und `favicon.svg`
(Kopien von hier, gleiche Variablen und Rückfallfarben), `web/public/icons/*.png` (Kopien), die Inline-Geometrie in
`web/ui/Logo.tsx` (Kachel-Variante aus Abschnitt 3, Variante ohne Kachel aus „Varianten“, Lockup mit den
Wortmarken-Pfaden), die Farben als `--color-logo-unit` und `--color-logo-unit-bare` in `web/styles/tokens.css` und
als `brand.logo.unit`/`unitOnLight` in `shared/brand.ts`, App-Symbole, Startbilder, Android-Vektoren, Store-Grafiken
und Offline-Seite der Handy-Apps (`apps/mobile/scripts/assets.mjs`) sowie Abschnitt 1.2/1.3 des Design-Systems.
Die Prüfung „Name und Logo überall“ steht in `docs/marke-pruefung.md` der Anwendung.
