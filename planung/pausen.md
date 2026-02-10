# Pausen & Timing ohne SSML/HTML (Pacing-Design)

## Ziel
Pausen sollen **automatisch** gut klingen und **manuell** editierbar sein, ohne dass Nutzer SSML/HTML-Tags schreiben müssen. Intern kann weiterhin SSML genutzt werden, aber die UI ist “tag-free”.

## Grundidee: Script-Format + Rendering-Schicht
Wir trennen:
- **Skript-Editor-Format** (für Menschen) mit einfachen *Pausen-Markern* + UI-Controls
- **Interne Struktur** (AST/JSON) mit Text-Blöcken + `pauseBefore/pauseAfter`
- **TTS-Renderer**, der daraus provider-spezifisch SSML baut (`<break time="…"/>`) oder API-Parameter setzt

## 1) Pacing-Modi
### A) Auto (Default)
Heuristiken/Defaults:
- Satzende (`.?!`) → kurze Pause (z.B. 400–700 ms)
- Absatzwechsel → mittlere Pause (z.B. 1.0–1.6 s)
- Kapitel/Heading → längere Pause (z.B. 1.5–2.5 s)
- “Rückführung”/Schluss → etwas langsamerer Rhythmus (optional)

Optionaler Regler:
- **Tempo**: Schnell / Normal / Langsam (skaliert alle Pausen × Faktor)
- **Stil**: neutral / hypnotisch (z.B. etwas längere Pausen, weichere Übergänge)

### B) Manual (per UI, ohne Tags)
UI-Elemente:
- Button “Pause einfügen” zwischen Absätzen/Sätzen
- Slider/Dropdown für Dauer (z.B. 0.5s / 1s / 2s / 3s / 5s)
- Timeline/Preview: Abschnitt anhören + Pausen feinjustieren

### C) Expert (optional)
Für Power-User:
- “Show advanced” Ansicht, die die **Marker-Syntax** sichtbar macht (nicht SSML)
- Optional: “SSML exportieren” nur als Export/Debug, nicht als Primär-Editor

## 2) Marker-Syntax (für Text-Import/Export)
Damit Nutzer Skripte copy/pasten können, ohne SSML zu tippen, verwenden wir eine einfache, eindeutige Notation.

Empfehlung (einfach & robust):
- Inline: `[[pause:1.5s]]`
- Oder Zeile: `[[pause:2s]]` (zwischen Absätzen)

Beispiel:
```
Atme tief ein.
[[pause:2s]]
Und langsam wieder aus.
```

Parser-Regeln (MVP):
- akzeptiere `ms` oder `s` (`[[pause:500ms]]`, `[[pause:2s]]`)
- clamp auf Range (z.B. 0.2s–10s)
- unbekannte Marker ignorieren/als Text behandeln (fail-soft)

## 3) Interne Datenstruktur (Beispiel)
Statt Tags im Text:
- `blocks[]`:
  - `{ type: "text", text: "Atme tief ein.", pauseAfterMs: 0 }`
  - `{ type: "pause", durationMs: 2000 }`
  - `{ type: "text", text: "Und langsam wieder aus.", pauseAfterMs: 0 }`

Das erlaubt:
- UI kann Pausen “zwischen Blöcken” editieren
- Renderer kann provider-spezifisch erzeugen
- Export kann Marker wieder einfügen

## 4) Rendering zu TTS (unter der Haube)
Beim Generieren:
- Textblöcke → SSML `<s>` / `<p>` (je nach Provider)
- Pauseblöcke → `<break time="2s"/>`

Wichtig:
- Chunking muss Marker respektieren (nicht mitten in “Pause-Block” schneiden)
- Wenn Provider kein SSML hat: Pausen über Chunk-Gaps oder Audio-Postprocessing approximieren

## 5) UX-Details, die Hypnothera “hakelig” vermeiden
- Keine “Tag-Suppe” im Editor: Pausen sind **Chip/Block-Elemente**.
- “Auto-Pacing” als Ausgangspunkt, manuell nur Feintuning.
- Preview pro Abschnitt, nicht erst nach kompletter 30-Min-Generierung:
  - z.B. “Vorschau (60s)” mit denselben Pacing-Regeln

## 6) MVP-Scope
MVP liefert:
- Auto-Pacing (Satz/Absatz/Heading)
- Pause-Block UI + Export/Import via `[[pause:…]]`
- TTS-Renderer: Marker → SSML
Später:
- Prosody (rate/pitch) als UI-Regler
- “Breath cues” (sanfte Atempausen) als Stil-Option

