# Task: Decision Spike Loop (Testen → Ergebnis → Entscheiden)

## Ziel
- [ ] Für **technische Open Decisions** (z.B. Queue/Worker/Hosting/Auth) gibt es einen Workflow, der Optionen nicht nur diskutiert, sondern **praktisch testet** (kleine POCs/Spikes) und die Entscheidung anschließend sauber dokumentiert.

## Kontext / Links
- Entscheidungen (SSoT): `planung/entscheidungen.md`
- Architektur: `planung/architecture.md`
- Backlog/Flows: `planung/backlog.md`, `planung/flows.md`
- Issues (Research/Blocker): `agents/issues/`
- Agent-Prompt: `agents/prompts/decision_spike_loop.v0.md`

## Scope (In / Out)
**In:**
- [ ] 1–2 Open Decisions auswählen (maximal pro Runde)
- [ ] “Spike” definieren: Hypothese, Setup, Messkriterien, Abbruchkriterien
- [ ] Minimaler POC (so klein wie möglich) + reproduzierbare Schritte
- [ ] Ergebnis dokumentieren (kurz) + Entscheidung ableiten
- [ ] `planung/entscheidungen.md` aktualisieren + in Archiv verschieben, wenn `decided`

**Out:**
- [ ] Vollständige Feature-Implementierung (das kommt danach als eigene Tasks)

## Artefakte
- [ ] Spike-Notizen unter `planung/spikes/` (eine Datei pro Spike)

## Akzeptanzkriterien
- [ ] Jeder Spike enthält: Hypothese, Setup, Testschritte, Ergebnisse, Empfehlung
- [ ] Entscheidung ist danach konkret (`decided`) oder klar “was fehlt noch”
- [ ] `bash agents/scripts/verify.sh` läuft (Report erzeugt)

## Prüfen
- [ ] `bash agents/scripts/verify.sh`

