# Ordaneo · Marke

Stand: 20.10.2026 · Version 1.1 (Bildmarke A „Eckstein“) · ersetzt den Arbeitstitel „Merxo“

Ordaneo ist eine mandantenfähige Warenwirtschaft für Lager, Filialen, Handel und Großhandel. Der Name kommt von
*ordnen* bzw. lateinisch *ordo*, Ordnung und Reihe. Die Marke soll genau das ausstrahlen: ruhig, präzise,
vertrauenswürdig. Sie bleibt wie die Anwendung bewusst farblos (Graphit und Hell); Farbe bringt in der Anwendung der
Mandant mit, auf der Website eine einzige Akzentfarbe.

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
klare Aufgabe (sie schließt den Rahmen). Genau ein Element, die Einheit, kann die Hausfarbe des Mandanten tragen.

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
| Einheit | Quadrat 7 × 7 bei x 18 / y 18, Eckenradius 1,75 | `--color-logo-unit`: ohne Hausfarbe wie der Rahmen, mit Hausfarbe `accent-400` | ohne Hausfarbe wie der Rahmen, mit Hausfarbe `accent-600` |

Kontrollmaße: Außenkanten des Rahmens bei x 7 bis 25 und y 7 bis 25; die Einheit schließt bündig mit der rechten und
unteren Außenkante (25); Abstand zwischen den runden Enden des Rahmens und der Einheit 2. Das Zeichen ist im Raster
genau mittig (7 bis 25 in beiden Richtungen). Bei 32 px liegen Rahmen und Einheit auf ganzen Pixeln.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ordaneo">
  <rect width="32" height="32" rx="8" fill="var(--color-inverse, #15171b)"/>
  <path d="M14.5 23.5H13a4.5 4.5 0 0 1-4.5-4.5v-6A4.5 4.5 0 0 1 13 8.5h6a4.5 4.5 0 0 1 4.5 4.5v1.5" fill="none"
        stroke="var(--color-fg-inverse, #f9fafb)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="18" y="18" width="7" height="7" rx="1.75" fill="var(--color-logo-unit, #f9fafb)"/>
</svg>
```

**Varianten**

- **Ohne Kachel** (`ordaneo-symbol.svg`; Inline-Zeichen, KI-Assistent, Stempel): dieselbe Form um den Mittelpunkt auf
  das 1,5-Fache vergrößert, Strichstärke 4,5; Rahmen-Mittellinie x/y 4,75 bis 27,25, Eckenradius 6,75; Einheit
  10,5 × 10,5 bei x 19 / y 19, Radius 2,625. Außenmaß 2,5 bis 29,5. Farbe `currentColor`; in der Anwendung darf die
  Einheit `--color-accent` tragen.
- **Einfarbig** (Belegdruck schwarz-weiß, Stempel): Einheit in derselben Farbe wie der Rahmen. Das ist zugleich die
  Rückfallfarbe der Datei, wenn keine Variablen gesetzt sind.
- **Dunkel** (`ordaneo-mark-dark.svg`): helle Kachel `#f3f4f6`, Zeichen `#0e1114`, feste Farben für dunkle Flächen
  außerhalb der Anwendung.

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
| Hell | `#f9fafb` (neutral-50) | Zeichen auf Graphit, Wortmarke dunkel, Seitengrund hell |
| Kachel dunkel | `#f3f4f6` (neutral-100) | Kachel auf dunklem Grund (wie im dunklen Theme) |
| Zeichen dunkel | `#0e1114` (neutral-950) | Rahmen und Einheit auf heller Kachel |
| **Akzent Kupfer** | **`#C0500C`** | nur Website: Hauptaktion, Links auf hellem Grund, wahlweise die Einheit im Zeichen |
| Kupfer hell | `#EC955C` | Links und kleine Akzentschrift auf dunklem Grund; Schaltfläche dunkel mit Graphit-Schrift |
| Kupfer tief | `#A4430A` | Hover/gedrückt auf hellem Grund |

### Akzentfarbe Kupfer

Warum Kupfer: ein warmer, ruhiger Gegenpol zu Graphit, klar unterscheidbar vom üblichen Software-Blau und von den
Statusfarben der Anwendung (Fehler Rot bei Farbton 27, Warnung Bernstein bei 80; Kupfer liegt bei 45). Auf einem Beleg
erinnert er an den Buchungsstempel: die Einheit in Kupfer heißt „erledigt“. In OKLCH: `oklch(0.569 0.159 44.5)`.

Kontraste (WCAG 2.2, gerechnet):

| Paar | Kontrast | Freigabe |
|---|---|---|
| Kupfer `#C0500C` auf Weiß | 4,78 : 1 | Text AA |
| Kupfer auf Hell `#f9fafb` | 4,57 : 1 | Text AA |
| Weiße Schrift auf Kupfer | 4,78 : 1 | Text AA (Schaltfläche) |
| Kupfer auf Graphit `#15171b` | 3,75 : 1 | nur große Schrift, Flächen, Rahmen, Einheit (≥ 3 : 1) |
| Kupfer hell `#EC955C` auf Graphit | 7,71 : 1 | Text AAA |
| Graphit-Schrift auf Kupfer hell | 7,71 : 1 | Text AAA (Schaltfläche dunkel) |
| Kupfer tief `#A4430A` auf Weiß | 6,20 : 1 | Text AA |

Eine einzige Farbe kann nicht gleichzeitig auf Weiß und auf Graphit 4,5 : 1 erreichen. Deshalb: Kupfer ist die Farbe,
Kupfer hell nur die Textstufe für dunkle Flächen.

Regeln: pro Ansicht höchstens eine Hauptaktion in Kupfer; keine Verläufe, keine Kupferflächen hinter Text, nie für
Statusmeldungen. In der Anwendung gibt es kein Kupfer: dort bleibt Graphit der Standard und die Hausfarbe des Mandanten
die einzige Farbe.

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
Kachel und Zeichen in derselben Farbe; Lockup aus Bildmarke und gesetzter Schrift nachbauen; Wortmarke in Versalien
oder mit großem O.

## 9 · Schrift für die Website

**Inter** (Rasmus Andersson, SIL Open Font License 1.1) für alle Texte und **Geist Mono** (Vercel, SIL OFL 1.1) für
Artikelnummern, EAN und Code. Beide nutzt auch die Anwendung, Website und Produkt sehen damit gleich aus.

- Selbst gehostet als variable WOFF2 (Pakete `@fontsource-variable/inter` und `@fontsource-variable/geist-mono` oder
  die Dateien aus den offiziellen Releases), keine Einbindung über Google Fonts. Untermengen `latin` und `latin-ext`
  genügen; `font-display: swap`, die Datei für Fließtext per `<link rel="preload">` vorladen.
- Inter Variable mit Achse `opsz`: Überschriften bekommen automatisch die Display-Schnitte. Überschriften 600–650,
  Laufweite −0,02 em; Fließtext 400, 17–18 px, Zeilenhöhe 1,55; Zahlen in Tabellen mit `font-variant-numeric: tabular-nums`.
- Die Wortmarke ist keine Schrift und wird nie mit Inter nachgesetzt.

## 10 · Dateien

| Datei | Inhalt |
|---|---|
| `ordaneo-mark.svg` | Bildmarke mit Kachel, CSS-Variablen wie in der Anwendung |
| `ordaneo-mark-dark.svg` | Bildmarke für dunklen Grund, feste Farben |
| `ordaneo-symbol.svg` | Zeichen ohne Kachel, `currentColor` |
| `ordaneo-wordmark.svg` / `-dark.svg` | Wortmarke als Pfade |
| `ordaneo-lockup.svg` / `-dark.svg` | Bildmarke + Wortmarke |
| `favicon.svg` | Favicon mit Umschaltung hell/dunkel |
| `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | PNG-Exporte, in Chrome gerendert |

## 11 · Übernahme in die Anwendung

Umgesetzt im Zweig `feature/ordaneo-name` der Anwendung: `web/public/ordaneo-mark.svg` und `favicon.svg` (gleiche
Variablen und Rückfallfarben wie hier), die Inline-Geometrie in `web/ui/Logo.tsx` (Kachel-Variante aus Abschnitt 3,
Variante ohne Kachel aus „Varianten“, Lockup mit den Wortmarken-Pfaden), die PNGs unter `web/public/icons/`, App-Symbole,
Startbilder und Store-Grafiken der Handy-Apps sowie Abschnitt 1.2/1.3 des Design-Systems.
