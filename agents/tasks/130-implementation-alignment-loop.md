# Task: Implementation Alignment Loop (Code ↔ UI/Arch/Plan)

## Ziel
- [ ] Jede Implementierungsrunde wird systematisch gegen `planung/ui.md`, `planung/architecture.md` und die übrige Planung geprüft.
- [ ] Ungereimtheiten werden in einem **separaten Dokument** festgehalten: `docs/ungereimtheiten.md`.

## Kontext / Links
- Planung: `planung/plan.md`, `planung/backlog.md`, `planung/flows.md`, `planung/entscheidungen.md`
- Architektur/UI: `planung/architecture.md`, `planung/ui.md`
- Kriterien/Risiken: `planung/kriterien.md`, `planung/risiken.md`, `planung/safety-policy.md`
- Traceability: `docs/umsetzung.md`
- Findings-Dokument: `docs/ungereimtheiten.md`
- Prompt: `agents/prompts/implementation_alignment_loop.v0.md`
- Eval: `agents/evals/implementation_alignment_checklist.v0.md`
- Verify/Triage: `agents/tasks/060-verify-triage-loop.md`

## Scope (In / Out)
**In:**
- [ ] Geänderte Implementierung (Diff) analysieren
- [ ] Abgleich Code ↔ UI ↔ Architektur ↔ Planung durchführen
- [ ] Findings in `docs/ungereimtheiten.md` dokumentieren (mit Severity + Bereich + Status)
- [ ] Kleinere Abweichungen direkt korrigieren
- [ ] Größere/unsichere Punkte als Issue loggen

**Out:**
- [ ] Neue Features ohne Bezug zum geprüften Diff
- [ ] Juristische Finaltexte schreiben

## Loop (pro Runde)
1. Lies den aktuellen Diff (`git diff`/geänderte Dateien).
2. Prüfe für jede Änderung:
   - passt sie zu `planung/architecture.md`?
   - passt sie zu `planung/ui.md`/`planung/flows.md`?
   - passt sie zu `planung/entscheidungen.md` (DEC-Constraints)?
3. Dokumentiere Ungereimtheiten in `docs/ungereimtheiten.md`:
   - Datum, Scope, Files
   - `severity`: low|medium|high|critical
   - `area`: ui|architecture|planning|legal|privacy|billing|safety|ops|other
   - `type`: missing|incorrect|unclear|drift
   - `action`: fixed-now | issue | decision-needed
   - `status`: open|resolved
4. Fixe kleine Inkonsistenzen direkt (Code oder Doku).
5. Nicht sofort lösbare Punkte als Issue in `agents/issues/` dokumentieren.
6. Verifiziere mit `bash agents/scripts/verify.sh`.

## Akzeptanzkriterien
- [ ] Für jede Runde existiert ein Eintrag in `docs/ungereimtheiten.md` (auch wenn “keine Findings”)
- [ ] Findings sind priorisiert und enthalten klare Folgeaktion
- [ ] Relevante Fixes sind umgesetzt oder als Issue dokumentiert
- [ ] `bash agents/scripts/verify.sh` ist PASS

## Prüfen
- [ ] `bash agents/scripts/verify.sh`

