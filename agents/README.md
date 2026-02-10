# Agents-Arbeitsordner

Dieser Ordner ist für eine agentengetriebene Entwicklung gedacht: kleine, klar definierte Tasks, versionierte Prompts und reproduzierbare Tests/Evals.

## Struktur
- `agents/tasks/` – Arbeitsaufträge mit Akzeptanzkriterien (1 Task = 1 überprüfbares Ergebnis)
- `agents/prompts/` – versionierte Prompt-Dateien (z.B. `*.v0.md`, `*.v1.md`)
- `agents/evals/` – Testfälle/Golden-Cases (Safety, Format, Regressionen)
- `agents/runbooks/` – wiederholbare Abläufe (Provider-Onboarding, Incident, DSAR/Löschung)
- `agents/scripts/` – kleine Hilfsskripte (Verify, Issue-Erstellung)
- `agents/reports/` – generierte Verify-Reports
- `agents/issues/` – Backlog für Risiken/Nacharbeiten, die nicht sofort gelöst werden

## Bezug zu unserer Planung
Die Produkt- und Legal-Notizen liegen in `planung/`:
- `planung/plan.md` (Vision/Flow/Kostenblöcke)
- `planung/kriterien.md` (MVP- und Compliance-Kriterien)
- `planung/stimmen.md` (TTS/Voices + Abrechnung)
- `planung/credits.md` (Creditsystem/Abrechnungslogik)
- `planung/pausen.md` (Pausen/Timing ohne SSML/HTML)
- `planung/risiken.md` (Safety/Legal-Risiken)
- `planung/rechtstexte.md` (AGB/Datenschutz/Consent-Plan)

## Arbeitsweise (empfohlen)
1. Task aus `agents/tasks/` wählen.
2. Akzeptanzkriterien umsetzen + minimaler Test/Eval ergänzen.
3. Verifizieren: `agents/scripts/verify.sh` ausführen (Report landet in `agents/reports/`).
4. Prompt-Änderungen immer als neue Version speichern (z.B. `script_generate.v1.md`).
5. Evals erweitern, wenn neue Edge-Cases auftauchen (Regression verhindern).
6. Nicht sofort lösbare Findings als Issue festhalten: `agents/scripts/new_issue.sh "Titel"`

## Quick Commands
- Verify: `bash agents/scripts/verify.sh`
- New issue: `bash agents/scripts/new_issue.sh "Kurzer Titel"`
