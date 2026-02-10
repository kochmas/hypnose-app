# Eval: Decisions Discussion Checklist (v0)

Ziel: `planung/entscheidungen.md` ist entscheidbar, konsistent und nicht vage.

## Struktur
- [ ] Jede DEC hat eine ID `DEC-XXX`
- [ ] Jede DEC hat einen `Status: open | proposed | decided`
- [ ] Jede DEC hat einen Default (auch wenn nur “Vorschlag”)
- [ ] Jede DEC nennt mindestens einen Impact-Bereich (UX/Tech/Legal/Billing)
- [ ] `decided` Entscheidungen sind in `planung/entscheidungen.md` im Abschnitt **“Archiv (Decided)”** auffindbar

## Keine Vagen-Defaults
- [ ] “Abhängig”-Defaults werden entweder konkretisiert oder als `proposed` markiert + Next-Step
- [ ] Externe Provider/ToS/Preise werden nicht frei erfunden; stattdessen “needs research” + klarer Research-Scope

## Safety/Legal/Privacy/Billing nicht vergessen
- [ ] DEC mit Safety-Impact verweisen auf `planung/safety-policy.md` / `planung/risiken.md`
- [ ] DEC mit Privacy/DSGVO-Impact berücksichtigen Retention/Export/Löschung/AVV/Transfers
- [ ] DEC mit Billing-Impact berücksichtigen Reserve→Capture→Release + Idempotency
