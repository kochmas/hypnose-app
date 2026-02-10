# Eval: App Planning Completeness Checklist (v0)

Ziel: Die Planung unter `planung/` ist konsistent, vollständig genug für MVP und testbar.

## Muss enthalten (MVP)
- [ ] MVP‑Backlog mit Prioritäten und Akzeptanzkriterien (`planung/backlog.md`)
- [ ] User Flows inkl. Fehlerfälle (`planung/flows.md`)
- [ ] Open Decisions + Default‑Vorschläge (`planung/entscheidungen.md`)
- [ ] Abrechnung/Usage: Reserve→Capture→Release ist in Flows berücksichtigt (Credits)
- [ ] Pausen/Timing ist “tag‑free” in UX beschrieben
- [ ] Safety Gate ist in Flows enthalten (Input + Output, Krisen‑Block)
- [ ] DSGVO/Consent: Clickwrap + Cookie‑Consent + Retention/Löschung sind in Planung berücksichtigt
- [ ] Admin/Operator‑Bedarf ist minimal beschrieben (Pricing‑Mapping, Abuse‑Disable, Ledger‑Support)
- [ ] Testbarkeit: Hinweise auf Evals/Regressionen (mind. Safety + Billing)

## Nicht überladen
- [ ] “Later” Features sind klar markiert (nicht im MVP‑Pfad)
- [ ] Keine Provider‑Details “raten”; Provider‑Auswahl ist Open Decision, wenn nicht entschieden

