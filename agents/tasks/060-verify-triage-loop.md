# Task: Verify → Risiken finden → Fix oder loggen

## Ziel
- [ ] Ein Standard-Loop existiert, der nach jeder Implementierung automatisch/halbautomatisch überprüft, Risiken sichtbar macht und sie entweder direkt fixt oder als Issue ablegt.

## Kontext / Links
- `agents/scripts/verify.sh`
- `agents/issues/README.md`
- `planung/risiken.md`
- `planung/kriterien.md`

## Ablauf (MVP)
1. Änderungen implementieren (kleine PR/Commit-Units).
2. Verify laufen lassen: `bash agents/scripts/verify.sh`
3. Findings triagieren:
   - **Fix now:** Bug/Security/Privacy/Cost-Problem lässt sich direkt beheben → Patch + erneutes Verify.
   - **Log:** Nicht sofort lösbar (fehlende Entscheidung, externe Abhängigkeit, größerer Refactor) → Issue erstellen:
     - `bash agents/scripts/new_issue.sh "Titel"`
4. Evals erweitern, wenn ein Finding eine Regression war (damit es nicht wiederkommt).

## Akzeptanzkriterien
- [ ] Verify erzeugt einen Report unter `agents/reports/`
- [ ] Offene Findings werden als Issue unter `agents/issues/` dokumentiert (Severity + Fix-Plan)

