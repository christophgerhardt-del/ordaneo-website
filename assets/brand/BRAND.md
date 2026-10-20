# Ordaneo · Marke

Stand: 20.10.2026 · Version 1.0 · ersetzt den Arbeitstitel „Merxo“

Ordaneo ist eine mandantenfähige Warenwirtschaft für Lager, Filialen, Handel und Großhandel. Der Name kommt von
*ordnen* bzw. lateinisch *ordo*, Ordnung und Reihe. Die Marke soll genau das ausstrahlen: ruhig, präzise,
vertrauenswürdig. Sie bleibt wie die Anwendung bewusst farblos (Graphit und Hell); Farbe bringt in der Anwendung der
Mandant mit, auf der Website eine einzige Akzentfarbe.

## 1 · Idee: „o.“

Die Bildmarke zeigt ein **o** und einen **Punkt**.

- Das **o** ist der erste und letzte Buchstabe von „ordaneo“ und steht für *ordo*: ein geschlossener, gleichmäßiger Kreis.
- Der **Punkt** ist die „Einheit“, die schon das alte Zeichen kannte: ein kleines Quadrat, das genau auf der Grundlinie
  an seinem Platz steht. Gleichzeitig ist er der Schlusspunkt: gebucht, gezählt, abgeschlossen.
- Rund gegen eckig ergibt den Kontrast zwischen Ordnung (Kreis) und Ware (Quadrat), ohne dass Kiste, Einkaufswagen,
  Zahnrad oder Pfeil nötig wären.

## 2 · Entwürfe und Entscheidung

Neun Richtungen wurden im 32er-Raster skizziert und in 16, 32 und 128 px hell und dunkel gerendert. Die drei stärksten
kamen in den Vergleich:

| Entwurf | Idee | Ergebnis |
|---|---|---|
| A · Eckstein | eckiges O als Rahmen, die Einheit schließt die letzte offene Ecke | kräftige Silhouette, liest sich bei 16 px aber als „G“ oder „Q“ |
| **B · o-Punkt** | o und Punkt, die Einheit auf der Grundlinie | **gewählt** |
| C · Platz | Rahmen mit der Einheit genau in der Mitte | am ruhigsten, aber verwechselbar mit „Aufnahme stoppen“ und einem Optionsfeld; in Rot (Mandantenfarbe) wäre es ein Aufnahmeknopf |

Verworfen wurden außerdem drei Zeilen mit Einheit (wirkt wie ein Listen- oder Menü-Symbol), ein Anschlagwinkel (wirkt
wie Diagrammachsen), ein Fach in U-Form (liest sich als „U“), ein offener Ring mit Einheit (wirkt wie „Neu laden“) und
gedrehte Varianten von A (wirken wie „C“ bzw. „Rückgängig“).

**Warum B:**

1. **Bei 16 px eindeutig.** Ring und Punkt bleiben getrennt, der Punkt sitzt auf ganzen Pixeln (16 und 32 px scharf),
   nichts läuft zu.
2. **Kein bekanntes Bedienelement.** A erinnert an Buchstaben, C an Medien- und Formular-Symbole; B nicht.
3. **Trägt die Hausfarbe.** Wie bisher kann genau ein Element die Farbe des Mandanten annehmen. Ein farbiger Punkt neben
   einem graphitfarbenen o wirkt bei jeder Farbe ruhig, auch bei Rot oder Gelb.
4. **Passt zur Wortmarke.** Der Ring ist derselbe geometrische Kreis wie die beiden o in „ordaneo“.

## 3 · Bildmarke: Geometrie

Raster 32 × 32, drei Elemente, gleicher Aufbau wie das bisherige Zeichen (gleiche CSS-Variablen):

| Element | Geometrie | Farbe hell | Farbe dunkel |
|---|---|---|---|
| Kachel | Quadrat 32 × 32, Eckenradius 8 | `--color-inverse` (Graphit `#15171b`) | `--color-inverse` (`#f3f4f6`) |
| Ring (o) | Kreis um x 12 / y 16, Radius 6,25 (Mittellinie), Strichstärke 3,5 | `--color-fg-inverse` | `--color-fg-inverse` |
| Einheit (Punkt) | Quadrat 6 × 6 bei x 22 / y 18, Eckenradius 1,5 | `--color-logo-unit`: ohne Hausfarbe wie der Ring, mit Hausfarbe `accent-400` | ohne Hausfarbe wie der Ring, mit Hausfarbe `accent-600` |

Kontrollmaße: Außenkanten des Rings bei x 4 bis 20 und y 8 bis 24; Abstand Ring–Einheit 2; Einheit unten bündig mit
dem Ring (y 24). Das Zeichen ist im Raster genau mittig (x 4 bis 28, y 8 bis 24). Die Einheit liegt auf geraden
Koordinaten und ist deshalb bei 16 und 32 px pixelscharf.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ordaneo">
  <rect width="32" height="32" rx="8" fill="var(--color-inverse, #15171b)"/>
  <circle cx="12" cy="16" r="6.25" fill="none" stroke="var(--color-fg-inverse, #f9fafb)" stroke-width="3.5"/>
  <rect x="22" y="18" width="6" height="6" rx="1.5" fill="var(--color-logo-unit, #f9fafb)"/>
</svg>
```

**Varianten**

- **Ohne Kachel** (`ordaneo-symbol.svg`; Inline-Zeichen, KI-Assistent, Stempel): kräftiger gezeichnet. Kreis um
  x 11 / y 16, Radius 7,75, Strichstärke 4; Einheit 7 × 7 bei x 23 / y 18,75, Radius 1,75. Farbe `currentColor`; in
  der Anwendung darf die Einheit `--color-accent` tragen.
- **Einfarbig** (Belegdruck schwarz-weiß, Stempel): Einheit in derselben Farbe wie der Ring. Das ist zugleich die
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
- Nur als ganze Datei verwenden (`ordaneo-lockup.svg` bzw. `-dark.svg`), nicht nachbauen. Die Anwendung setzt die
  Wortmarke derzeit als Text (Inter 600); beim Umbenennen sollte `Logo.tsx` im Lockup die Wortmarken-Pfade verwenden.

## 6 · Farben

| Rolle | Wert | Verwendung |
|---|---|---|
| Graphit | `#15171b` (neutral-900) | Kachel hell, Wortmarke hell, Text |
| Hell | `#f9fafb` (neutral-50) | Zeichen auf Graphit, Wortmarke dunkel, Seitengrund hell |
| Kachel dunkel | `#f3f4f6` (neutral-100) | Kachel auf dunklem Grund (wie im dunklen Theme) |
| Zeichen dunkel | `#0e1114` (neutral-950) | Ring und Einheit auf heller Kachel |
| **Akzent Kupfer** | **`#C0500C`** | nur Website: Hauptaktion, Links auf hellem Grund, wahlweise die Einheit im Zeichen |
| Kupfer hell | `#EC955C` | Links und kleine Akzentschrift auf dunklem Grund; Schaltfläche dunkel mit Graphit-Schrift |
| Kupfer tief | `#A4430A` | Hover/gedrückt auf hellem Grund |

### Akzentfarbe Kupfer

Warum Kupfer: ein warmer, ruhiger Gegenpol zu Graphit, klar unterscheidbar vom üblichen Software-Blau und von den
Statusfarben der Anwendung (Fehler Rot bei Farbton 27, Warnung Bernstein bei 80; Kupfer liegt bei 45). Auf einem Beleg
erinnert er an den Buchungsstempel: der Punkt in Kupfer heißt „erledigt“. In OKLCH: `oklch(0.569 0.159 44.5)`.

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

Nicht erlaubt: Zeichen verzerren, drehen oder mit Schatten versehen; den Ring einfärben; die Einheit rund machen;
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

## 11 · Übernahme in die Anwendung (Hinweis, nicht umgesetzt)

`ordaneo-mark.svg` passt 1:1 an die Stelle von `web/public/merxo-mark.svg` (gleiche Variablen, gleiche
Rückfallfarben, `role="img"`, `aria-label`). Zusätzlich anzupassen: die Inline-Geometrie in `web/ui/Logo.tsx`
(Kachel-Variante: Kreis und Einheit aus Abschnitt 3; Variante ohne Kachel: Maße aus „Varianten“), die PNGs unter
`web/public/icons/`, der Favicon-Verweis in `web/index.html`, Name und Wortmarke in der Markenquelle (`brand`) sowie
Abschnitt 1.2/1.3 des Design-Systems.
