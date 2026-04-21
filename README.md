# Wettervorhersage-App

Eine JavaScript-Webanwendung zur Anzeige von Wetterdaten für heute sowie die nächsten 3 bzw. 7 Tage.

## Was macht die App?

Zeigt Wetterdaten (Temperatur, Wetterlage, Wetterwarnungen) aus lokalen JSON-Dateien an — tagesweise abrufbar über Buttons. Die Daten werden in einer Tabelle mit Wettericons dargestellt und zusätzlich als Temperaturdiagramm (Min/Max) visualisiert.

## Technologien

- HTML / CSS
- Chart.js (Temperaturdiagramm)
- Fetch API (JSON-Datenabruf)

## Projektstruktur

```
├── app.js               ← Einstiegspunkt, initialisiert alle Klassen
├── weatherDAO.js        ← Datenzugriff (lädt JSON-Dateien per Fetch)
├── weatherService.js    ← Geschäftslogik (Datumsberechnung, Datenaufbereitung)
├── weatherView.js       ← UI-Rendering (Tabelle, Icons, Chart)
├── index.html           ← Hauptseite
├── style.css            ← Styling
└── JSON/                ← Wetterdaten als JSON-Dateien (YYYY_MM_DD.json)
    └── pictures/        ← Wettericons (sun.png, rain.png, ...)
```

## Architektur

Die App folgt dem **DAO / Service / View Pattern**:

- **weatherDAO** — lädt die JSON-Rohdaten vom lokalen Server
- **weatherService** — berechnet Dateinamen aus Datum, bereitet Daten für Tabelle und Chart auf
- **weatherView** — rendert die Tabelle und reagiert auf Button-Klicks

## JSON-Datenformat

Die Wetterdaten werden als JSON-Dateien erwartet, benannt nach dem Schema `YYYY_MM_DD.json`:

```json
{
  "Wetterdaten": [
    {
      "Temperatur minimum": 12,
      "Temperatur maximum": 22,
      "Wetterlage": "sonnig",
      "Wetterwarnung": ""
    }
  ]
}
```

Mögliche Wetterlagen: `sonnig`, `bewölkt`, `regen`, `starker Regen`, `windig`

## Lokalen Server starten

Die App benötigt einen lokalen Webserver (wegen Fetch-Anfragen):

```bash
# z.B. mit VS Code Live Server oder:
npx serve .
```

Dann im Browser öffnen: `http://127.0.0.1:3000`

## Features

- Wetteranzeige für heute, 3 Tage und 7 Tage
- Tabelle mit Datum, Min/Max-Temperatur, Wetterlage, Wetterwarnung und Icon
- Temperaturdiagramm (Min/Max) mit Chart.js
- Fehlende Daten werden als "Keine Daten" angezeigt

## Info

- Schulprojekt — 5. Semester