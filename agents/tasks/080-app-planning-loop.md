# Task: App-Planung-Loop (Ausbau → Review → Angleichen)

## Ziel
- [ ] Die Planungsdokumente unter `planung/` sind so konkret, dass MVP‑Implementierung als agentengetriebene Tasks abgeleitet werden kann.

## Kontext / Links
- `planung/app-aufbau.md`
- `planung/kriterien.md`
- `planung/architecture.md`
- Agent-Prompt: `agents/prompts/app_planning_review_expand.v0.md`

## Scope (In / Out)
**In:**
- [ ] MVP‑Backlog (priorisiert) erstellen/ergänzen
- [ ] User Flows (inkl. Fehlerfälle) dokumentieren
- [ ] Open Decisions erfassen
- [ ] Planung gegen Kriterien/Risiken prüfen und angleichen
- [ ] Nicht lösbare Punkte als Issue loggen

**Out:**
- [ ] Implementierung einzelner Features (separate Tasks)

## Akzeptanzkriterien
- [ ] Es gibt `planung/backlog.md` mit priorisierten Epics/Stories und klaren Akzeptanzkriterien
- [ ] Es gibt `planung/flows.md` (Happy paths + Failure cases)
- [ ] Es gibt `planung/entscheidungen.md` (Open Decisions + Defaults)
- [ ] Planung verweist konsistent auf Credits, Pausen, Safety, Rechtstexte
- [ ] `bash agents/scripts/verify.sh` läuft (Report erzeugt)

## Prüfen
- [ ] `bash agents/scripts/verify.sh`

