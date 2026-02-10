# Runbook: Verify & Triage (Fix oder Issue)

## Ziel
Nach jeder Änderung:
- Implementierung prüfen (Tests/Lint/Basic Scans)
- Risiken/Probleme sichtbar machen
- Fixen, wenn möglich
- Sonst sauber als Issue dokumentieren

## Schritte
1. Verify ausführen:
   - `bash agents/scripts/verify.sh`
2. Report öffnen:
   - liegt unter `agents/reports/verify-*.md`
3. Findings triagieren:
   - **Fix now:** kleine, lokale Änderung möglich → Patch + Verify erneut.
   - **Log issue:** braucht Entscheidung/Refactor/externen Input → Issue anlegen:
     - `bash agents/scripts/new_issue.sh "Kurzer Titel"`
     - Template ausfüllen (Severity, Impact, Fix-Plan, Akzeptanzkriterien).
4. Regression verhindern:
   - wenn Finding “wiederkommen kann” → passenden Eval in `agents/evals/` ergänzen.

## Severity-Richtlinie (Daumenregel)
- `critical`: Secrets geleakt, Auth umgehen möglich, sensible Daten öffentlich, Zahlungsfluss kompromittiert
- `high`: Privacy/Safety-Guardrails fehlen, schwere Sicherheitslücke, massiver Fraud möglich
- `medium`: potenzielles Leak/DoS/Cost-Explosion, unklare Einwilligungen, unklare Retention
- `low`: Style/kleine UX-Kante, Tech-Debt ohne akutes Risiko

