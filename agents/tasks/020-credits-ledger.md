# Task: Creditsystem (Wallet + Ledger + Pricing-Versionierung)

## Ziel
- [ ] Creditsystem ist als technisches Minimal-Design festgelegt (Reserve→Capture→Release) inkl. Idempotency und Pricing-Versionierung.

## Kontext / Links
- `planung/credits.md`
- `planung/kriterien.md`

## Scope (In / Out)
**In:**
- [ ] Ledger-Event-Typen definieren (purchase, reserve, capture, release, refund, adjustment)
- [ ] Preisplan-Model definieren (service/provider/model/tier, unit, creditsPerUnit, minimumFee, effectiveFrom)
- [ ] Flow definieren: Estimate → Reserve → Job → Actual Usage → Capture/Release
- [ ] Abuse/Fraud-Rails definieren (Limits, Rate-limits, Refund-Regeln)

**Out:**
- [ ] Payment-Provider-Integration (separater Task)

## Akzeptanzkriterien
- [ ] Jede Abbuchung ist idempotent (doppelte Requests ≠ doppelte Abbuchung)
- [ ] Vergangene Jobs bleiben reproduzierbar abrechenbar (Pricing-Versionen)
- [ ] Fehlerfälle sind sauber beschrieben (Job fail → release, partial success Policy)

## Betroffene Dateien
- [ ] `agents/evals/credits_flows.v0.md`

## Prüfen
- [ ] Flows in `agents/evals/credits_flows.v0.md` durchgehen (Happy path + Fehlerfälle)

