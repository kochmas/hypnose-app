# ISSUE-0001: Provider-Recherche: LLM (DEC-003)

## Meta
- Status: open
- Severity: high
- Bereich: privacy
- Erstellt: 2026-02-10
- Owner: (optional)

## Beschreibung
Für den integrierten Pfad (Credits → LLM‑Skript) brauchen wir einen LLM‑Provider, der:
- Reselling/Credits in den ToS erlaubt
- DSGVO‑kompatible Verträge (AVV/DPA) anbietet und Transfers sauber dokumentiert (SCCs etc.)
- verlässliche Usage‑Metriken liefert (Tokens) für Ledger‑Billing
- gute deutschsprachige Qualität liefert (Hypnose‑Ton/Stil/Struktur)

## Impact
- Launch‑Blocker für integrierten Modus (ohne Provider kein LLM‑Job)
- Compliance‑Risiko (falsche Vertragsgrundlage, unklare Transfers/Retention)
- Billing‑Risiko (fehlende/uneinheitliche Usage → falsche Credits)
- Produkt‑Risiko (schlechte DE‑Qualität → schlechte Hypnosen, mehr Support/Refunds)

## Reproduktion / Nachweis
- `planung/entscheidungen.md` (DEC‑003) ist “Recherche nötig”
- Runbook/Checkliste: `agents/runbooks/provider_onboarding.md`

## Erwartetes Verhalten
- Wir haben 2–4 LLM‑Kandidaten mit dokumentiertem Ergebnis (Tabelle) und können einen Default für MVP wählen.
- Für den gewählten Provider ist klar: ToS/Reselling, DPA/AVV, Region/Transfers, Retention/Logging, Usage‑Metriken, Preis‑Units.

## Vorschlag / Fix-Plan
1. Kandidaten‑Shortlist erstellen (2–4 Provider) passend zu MVP.
2. Pro Kandidat ausfüllen (mindestens):
   - ToS: Reselling/Credits erlaubt?
   - DPA/AVV verfügbar? Unter welchen Bedingungen?
   - Datenregion / Transfers / SCCs / Sub‑processor Liste
   - Retention/Training Defaults & Opt‑outs
   - Usage‑Metriken: tokens (input/output), request IDs
   - Preis‑Units & Worst‑Case‑Kosten (für DEC‑006 Strict Reserve)
   - DE‑Qualität: 1–2 Testprompts (Hypnose‑Struktur) + Output‑Beurteilung
3. Ergebnis als Tabelle dokumentieren (Planungsdoc oder Issue‑Anhang).
4. Empfehlung formulieren + DEC‑003 auf `decided` setzen; danach `planung/architecture.md`/`planung/credits.md` ggf. angleichen.

## Akzeptanzkriterien
- [ ] Tabelle mit mind. 2 LLM‑Kandidaten ist dokumentiert (ToS/DPA/Region/Retention/Usage/Pricing/DE‑Qualität)
- [ ] `planung/entscheidungen.md` DEC‑003 ist auf `decided` (Provider genannt) oder klar “proposed” mit finaler Frage

## Notes
- Entscheidung: `planung/entscheidungen.md` (DEC‑003)
- Risiken/Transfers: `planung/kriterien.md`, `planung/risiken.md`
- Onboarding‑Checkliste: `agents/runbooks/provider_onboarding.md`
