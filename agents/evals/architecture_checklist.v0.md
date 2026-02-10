# Eval: Architecture Completeness Checklist (v0)

Ziel: `planung/architecture.md` deckt die MVP‑Anforderungen und kritischen Nicht‑Funktionalen Anforderungen ab.

## Muss enthalten (MVP)
- [ ] System-Komponenten (Frontend/API/Worker/DB/Storage/Payments/Provider)
- [ ] AuthN/AuthZ (inkl. Admin/Operator)
- [ ] Credits (Ledger, Reserve→Capture→Release, Pricing-Versionierung, Idempotency)
- [ ] Async Jobs (States, Retries, Failure/Partial Policy)
- [ ] Provider-Abstraktion (LLM/TTS) + Tier-Mapping + Expert Allowlist
- [ ] Pausen/Pacing “tag-free” (Marker/Blocks → Rendering → Chunking)
- [ ] Safety Gate (Input+Output, Krisen-Block, Claim-Disziplin)
- [ ] Consent/Clickwrap Logging + Cookie-Consent-Trennung
- [ ] DSGVO-Pragmatik (Retention, Löschung, AVV/Transfers, Logs)
- [ ] Observability + Incident/Runbooks (mindestens Verweise)
- [ ] Deployment/Secrets/Backups (EU‑Region, Config)
- [ ] Tests/CI (min. Unit + Safety/Billing Evals)

## Open Decisions (erlaubt)
- [ ] Provider-Auswahl ist als “Open Decision” markiert (nicht stillschweigend angenommen)
- [ ] Credit-Währung/Overages Policy ist als “Open Decision” markiert
- [ ] Retention Defaults sind definiert oder als Entscheidung markiert
