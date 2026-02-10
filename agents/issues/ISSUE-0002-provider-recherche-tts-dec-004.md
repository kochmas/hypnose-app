# ISSUE-0002: Provider-Recherche: TTS (DEC-004)

## Meta
- Status: open
- Severity: high
- Bereich: legal
- Erstellt: 2026-02-10
- Owner: (optional)

## Beschreibung
Für den integrierten Pfad (Credits → TTS‑Audio) brauchen wir einen TTS‑Provider, der:
- kommerzielle Audio‑Erstellung/Distribution erlaubt (ToS/Lizenz)
- SSML‑Breaks/Prosody sauber unterstützt (Pausen/Timing)
- verlässliche Usage‑Metriken liefert (chars/minutes) für Ledger‑Billing
- DE‑Stimmen in ausreichender Qualität bietet
- Limits/Chunking gut handhabbar macht (max chars/request, rate limits)

## Impact
- Launch‑Blocker für integrierten Modus (ohne Provider kein Audio‑Pfad)
- Rechts-/ToS‑Risiko (fehlende kommerzielle Rechte, Voice‑Restrictions)
- Billing‑Risiko (keine/unklare Usage‑Metriken → falsche Credits)
- UX‑Risiko (Pausen/Timing wirkt “hakelig” → schlechte Hypnosequalität)

## Reproduktion / Nachweis
- `planung/entscheidungen.md` (DEC‑004) ist “Recherche nötig”
- Pausen‑Konzept: `planung/pausen.md`
- Runbook/Checkliste: `agents/runbooks/provider_onboarding.md`

## Erwartetes Verhalten
- Wir haben 2–4 TTS‑Kandidaten mit dokumentiertem Ergebnis (Tabelle) und können einen Default für MVP wählen.
- Für den gewählten Provider ist klar: ToS/kommerzielle Rechte, DPA/AVV, Region/Transfers, Usage‑Metriken, Limits/Chunking, SSML‑Support, DE‑Voice‑Qualität.

## Vorschlag / Fix-Plan
1. Kandidaten‑Shortlist erstellen (2–4 Provider) passend zu MVP.
2. Pro Kandidat ausfüllen (mindestens):
   - ToS/Lizenz: kommerzielle Nutzung/Distribution, Weiterverkauf über Credits?
   - DPA/AVV + Transfers/Region
   - Usage‑Metriken (chars/minutes) + request IDs
   - Limits (max chars/request), Chunking‑Strategie möglich?
   - SSML‑Support: `<break>` + prosody; Qualität bei Pausen/Rate
   - DE‑Voices: 1–2 Testskripte + Hörtest (natürlich/hypnotisch)
   - Preis‑Units & Worst‑Case‑Kosten (für DEC‑006 Strict Reserve)
3. Ergebnis als Tabelle dokumentieren (Planungsdoc oder Issue‑Anhang).
4. Empfehlung formulieren + DEC‑004 auf `decided` setzen; danach `planung/stimmen.md`/`planung/architecture.md` ggf. angleichen.

## Akzeptanzkriterien
- [ ] Tabelle mit mind. 2 TTS‑Kandidaten ist dokumentiert (ToS/DPA/Region/Usage/Limits/SSML/DE‑Qualität/Pricing)
- [ ] `planung/entscheidungen.md` DEC‑004 ist auf `decided` (Provider genannt) oder klar “proposed” mit finaler Frage

## Notes
- Entscheidung: `planung/entscheidungen.md` (DEC‑004)
- Stimmen/TTS: `planung/stimmen.md`
- Pausen/Timing: `planung/pausen.md`
- Onboarding‑Checkliste: `agents/runbooks/provider_onboarding.md`
