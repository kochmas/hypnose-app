# Task: Pausen/Timing ohne SSML im Editor

## Ziel
- [ ] Ein “tag-free” Pausen-System ist spezifiziert und technisch umsetzbar (Marker + Rendering), ohne dass Nutzer SSML/HTML tippen müssen.

## Kontext / Links
- `planung/pausen.md`
- `planung/kriterien.md`
- `planung/stimmen.md`

## Scope (In / Out)
**In:**
- [ ] Marker-Syntax festlegen (z.B. `[[pause:2s]]`) + Parser-Regeln (Range/Fehlerfälle)
- [ ] Interne Block-Struktur (Text/Pause) definieren
- [ ] Rendering-Regeln: Block-Struktur → provider-neutrales SSML (Breaks) + Chunking-Regeln
- [ ] Kleine Eval-Cases in `agents/evals/` ergänzen

**Out:**
- [ ] Vollständiger Audio-Renderer/Worker-Code (kommt in separaten Tasks)

## Akzeptanzkriterien
- [ ] Es gibt klare Beispiele (Input-Text → Parsed Blocks → Rendered Output)
- [ ] Parser ist fail-soft (unknown Marker bleiben Text; Pause clamp auf Range)
- [ ] Kein SSML/HTML muss im Nutzer-Editor sichtbar sein

## Betroffene Dateien
- [ ] `agents/evals/pause_markers.v0.md`

## Prüfen
- [ ] Review anhand der Beispiele in `agents/evals/pause_markers.v0.md`

