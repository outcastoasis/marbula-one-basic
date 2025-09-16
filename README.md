# Marbula One Basic

Eine minimalistische Webplattform für ein Marbula-One-Gruppenrennen – entwickelt mit dem MERN‑Stack (MongoDB, Express.js, React, Node.js). Ziel ist es, Teilnehmer\*innen einem Team zuzuweisen, Rennen zu verwalten, Punkte zu verteilen und den Punktestand dynamisch anzuzeigen.

---

## Funktionen

- **Personen & Rennen verwalten**  
  Teilnehmer und Rennen können hinzugefügt oder gelöscht werden.

- **Punkte separat erfassen**  
  Nur eingetragene Punkte werden gespeichert – bestehende Punkte bleiben erhalten.

- **Ergebnis-Tabelle**  
  Übersichtliche Darstellung aller Rennen, Punkteverteilung und Gesamtpunktzahl.

- **Punktestand-Verlauf (Liniendiagramm)**  
  Live-Graph zur Visualisierung des Punktestands über alle Rennen.

- **Mobile-freundlich**  
  Optimiert für Smartphone und Tablet.

---

## Technologie-Stack

| Bereich       | Technologie                 |
| ------------- | --------------------------- |
| **Frontend**  | React, Recharts, Vercel     |
| **Backend**   | Node.js, Express.js, Render |
| **Datenbank** | MongoDB Atlas via Mongoose  |
| **Sonstiges** | REST-API, React Hooks, CSS  |

---

## Setup & Installation

### 1. Repository klonen

```bash
git clone https://github.com/outcastoasis/marbula-one-basic.git
cd marbula-one-basic
```

### 2. Client installieren

```bash
cd client
npm install
```

### 3. Server installieren

```bash
cd ../server
npm install
```

### 4. Umgebungsvariablen setzen

Erstelle eine `.env` Datei im `server`-Verzeichnis mit folgendem Inhalt:

```env
MONGODB_URI=<Deine MongoDB-Verbindungs-URL>
```

### 5. Lokalen Start durchführen

**Backend starten:**

```bash
cd server
node index.js
```

**Frontend starten (neues Terminal):**

```bash
cd client
npm run dev
```

---

## Projektstruktur

```
marbula-one-basic/
├── client/
│   ├── src/
│   │   ├── pages/           # Eingabe und Anzeige
│   │   ├── api.js           # BASE_URL-Konfiguration
│   │   ├── styles.css       # zentrales Styling
│   │   ├── App.jsx          # Seitenstruktur, Routing/Navigation
│   │   └── main.jsx         # Startpunkt Frontend, rendert App.jsx
│   └── public/              # Icons & Background
├── server/
│   ├── models/              # MongoDB-Modelle
│   ├── routes/              # Express-API-Endpunkte
│   └── index.js             # Server-Einstiegspunkt
└── README.md
```

---

## Deployment

- **Frontend**: über [Vercel](https://vercel.com)
- **Backend**: über [Render](https://render.com)
- Beide greifen auf dieselbe GitHub-Quelle zu oder können in getrennten Deployments betrieben werden.

---

## Bedienung

1. **Personen verwalten** – Name & Team eingeben und speichern.
2. **Rennen anlegen** – Name und Datum.
3. **Punkte erfassen** – Rennen auswählen, Punktzahlen eingeben, speichern.
4. **Ergebnisse ansehen** – Tabelle + Graph.

---

## Graph & Punkteverlauf

- Dynamisches Liniendiagramm zeigt den Punkteverlauf jeder Person über alle Rennen.
- Rennen werden **in der Eingabereihenfolge** dargestellt, nicht nach Datum.
- Die Farbverteilung für die Linien ist automatisch und passt sich der Teilnehmerzahl an.

---
