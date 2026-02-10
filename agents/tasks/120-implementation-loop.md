# Task: Implementation Loop (Plan/Arch/UI → Code+Tests+Docs → Review)

## Ziel
- [ ] Ein Standard‑Workflow existiert, um Features **plan‑konform** zu implementieren: UI + Architektur + Planung berücksichtigen, **Tests & Doku immer mitschreiben**, und am Ende gegenprüfen (Verify/Tests/Review).

## Kontext / Links
- Planung (SSoT/Constraints): `planung/`
  - `planung/backlog.md`, `planung/flows.md`, `planung/kriterien.md`
  - `planung/architecture.md`, `planung/ui.md`
  - `planung/entscheidungen.md`
- Verify/Triage: `agents/tasks/060-verify-triage-loop.md`, `bash agents/scripts/verify.sh`
- Reviewer-Prompt: `agents/prompts/implementation_review.v0.md`
- Implementation Agent Prompt: `agents/prompts/implementation_loop.v0.md`
- Alignment Loop: `agents/tasks/130-implementation-alignment-loop.md`
- Traceability-Doku: `docs/umsetzung.md`
- Checklist: `agents/evals/implementation_checklist.v0.md`

## Scope (In / Out)
**In:**
- [ ] Pro Runde: **1 Task** aus `agents/tasks/*` oder **1 kleines Backlog‑Item**
- [ ] Stages/Etappen definieren (3–6), jeweils mit Akzeptanzkriterien
- [ ] Implementierung + passende Tests (Unit/Integration je nach Feature)
- [ ] Doku/Traceability aktualisieren (inkl. Begründung: Mapping Planung → Code)
- [ ] Nach Implementierung Alignment-Check ausführen und Ungereimtheiten in `docs/ungereimtheiten.md` dokumentieren
- [ ] Review/Verify ausführen und Findings fixen oder als Issue loggen

**Out:**
- [ ] Provider‑ToS/Preisannahmen erfinden (stattdessen: Issue/Decision/Spike)
- [ ] Große Refactors ohne Bezug zum aktuellen Task

## Akzeptanzkriterien
- [ ] Jede Etappe endet mit mindestens **einem** überprüfbaren Artefakt (Code+Test oder Doc+Test)
- [ ] `docs/umsetzung.md` enthält pro umgesetztem Feature Links zu:
  - Planung (welche Anforderungen/DEC)
  - Implementierung (Dateipfade/Module)
  - Tests (Dateipfade)
  - Abweichungen/Trade-offs (kurz)
- [ ] `bash agents/scripts/verify.sh` ist PASS
- [ ] Reviewer-Loop durchgeführt (Fix oder Issue)

## Risiken / offene Punkte
- [ ] Offene Decisions blocken Implementierung → `agents/tasks/090-decisions-discussion-loop.md` oder Spike `agents/tasks/095-decision-spike-loop.md`
- [ ] Nicht fixbare Findings → Issue unter `agents/issues/`

## Betroffene Dateien
- [ ] `agents/prompts/implementation_loop.v0.md`
- [ ] `agents/evals/implementation_checklist.v0.md`
- [ ] `docs/umsetzung.md`

## Prüfen
- [ ] `bash agents/scripts/verify.sh`
