# Eval: Implementation Alignment Checklist (v0)

Ziel: Sicherstellen, dass Implementierungsaenderungen konsistent zu UI, Architektur und Planung sind und Ungereimtheiten dokumentiert werden.

## Pflicht-Checks pro Runde
- [ ] Diff-basierter Scope ist klar (welche Aenderung wird geprueft)
- [ ] Abgleich gegen `planung/ui.md`, `planung/architecture.md`, `planung/flows.md` wurde gemacht
- [ ] DEC-Constraints aus `planung/entscheidungen.md` wurden beruecksichtigt
- [ ] `docs/ungereimtheiten.md` wurde aktualisiert (auch bei "keine Findings")

## Findings-Qualitaet
- [ ] Jedes Finding hat `severity`, `area`, `type`, `action`, `status`
- [ ] `action=fixed-now` wurde gepatcht
- [ ] `action=issue` wurde in `agents/issues/` dokumentiert
- [ ] `action=decision-needed` referenziert eine DEC in `planung/entscheidungen.md`

## Verifikation
- [ ] `bash agents/scripts/verify.sh` ist PASS

