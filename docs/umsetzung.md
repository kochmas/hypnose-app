# Umsetzung / Traceability

Dieses Dokument beschreibt **nachvollziehbar**, wie Anforderungen und Entscheidungen aus `planung/` in Code, Tests und Doku umgesetzt wurden.

Ziel:
- schneller Review (“entspricht das der Planung?”)
- gute KI‑Testbarkeit (klare Module, klare Tests, klare Referenzen)
- reduzierte Regressionen (warum wurde etwas so gebaut?)

## Konvention (pro Feature/Epic)
Ergänze pro umgesetztem Baustein einen Abschnitt:

### <Feature/Titel> (YYYY‑MM‑DD)
- **Planung:** Links zu `planung/*` (Flows/Kriterien) + relevante DEC‑IDs
- **Implementierung:** wichtigste Dateipfade/Module (z.B. `app/...`, `src/...`, `worker/...`)
- **Tests:** Dateipfade (Unit/Integration/E2E)
- **Doku/Runbooks:** zusätzliche Doku‑Updates (z.B. `agents/runbooks/*`)
- **Abweichungen/Trade-offs:** kurz (warum anders als Plan / warum so?)
- **Offene Punkte:** Issues (Dateipfade unter `agents/issues/`)

## Status
Noch keine Code‑Implementierung (Planung‑first). Startpunkt: `agents/tasks/005-repo-bootstrap.md`.

