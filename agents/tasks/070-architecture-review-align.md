# Task: Architektur-Loop (Review → Lücken → Angleichen)

## Ziel
- [ ] `planung/architecture.md` ist konsistent zu `planung/*` und deckt die MVP‑Anforderungen vollständig ab (oder hat klare Open Decisions + Issues).

## Kontext / Links
- `planung/architecture.md`
- `planung/plan.md`
- `planung/kriterien.md`
- Agent-Prompt: `agents/prompts/architecture_review_align.v0.md`

## Scope (In / Out)
**In:**
- [ ] Architektur lesen, gegen Planung abgleichen
- [ ] Lücken/Fehlannahmen dokumentieren
- [ ] `planung/architecture.md` gezielt korrigieren/ergänzen
- [ ] Nicht lösbare Punkte als Issue loggen

**Out:**
- [ ] Große Implementierungsarbeiten (separate Tasks)

## Akzeptanzkriterien
- [ ] Jede “harte” MVP‑Anforderung aus `planung/kriterien.md` ist in `planung/architecture.md` abgedeckt (oder als Open Decision markiert)
- [ ] Fehlende/unklare Punkte sind als Issue in `agents/issues/` dokumentiert (Severity + Fix‑Plan)
- [ ] `bash agents/scripts/verify.sh` läuft (Report erzeugt)

## Prüfen
- [ ] `bash agents/scripts/verify.sh`
