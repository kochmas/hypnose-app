# MVP Backlog (priorisiert)

Ziel: aus `planung/kriterien.md` ableitbarer, agentenfreundlicher Umsetzungsplan (kleine, überprüfbare Einheiten).

Open Decisions (SSoT): `planung/entscheidungen.md`

Legende:
- P0 = Blocker/MVP‑Pfad
- P1 = sehr wichtig nach MVP‑Pfad
- Later = bewusst später

---

## Epic 0 (P0): Projekt-Setup & DX
- [ ] (P0) Repo bootstrap (Next.js/TS) + `npm|pnpm` Scripts (lint/test/build)
- [ ] (P0) Local Dev Setup: `docker compose` Postgres + `.env.example` + Prisma init
- [ ] (P0) Worker Skeleton: separater Prozess (Queue/Worker nach DEC‑009) + “job runner” Hello-World
- [ ] (P0) CI (GitHub Actions): lint + tests + build
- [ ] (P0) Env/Config Pattern (12‑factor): `.env.example`, Secrets‑Handling
- [ ] (P0) Basic Observability: Sentry + strukturierte Logs
- [ ] (P0) Auth baseline: Magic Link + OAuth (Details: `planung/entscheidungen.md`)

## Epic 1 (P0): Legal Pages & Consent/Clickwrap
Referenzen: `planung/rechtstexte.md`, `planung/kriterien.md`
- [ ] (P0) Seiten: Impressum/Datenschutz/AGB (Platzhalter, juristisch später finalisieren)
- [ ] (P0) Clickwrap: AGB akzeptieren (Version + Timestamp loggen)
- [ ] (P0) Cookie-Consent nur für nicht notwendige Tools (falls genutzt)
- [ ] (P0) In-App Hinweis vor Generierung: “Text wird an KI‑Dienstleister übertragen …”
- [ ] (P0) “KI generiert” Labels/Transparenz im UI (Text + Audio) (AI‑Transparenz vorbereiten)

Akzeptanz:
- Clickwrap/Consent wird in DB nachvollziehbar gespeichert (`agents/evals/consent_logging.v0.md`)

## Epic 2 (P0): Creditsystem (Wallet + Ledger)
Referenzen: `planung/credits.md`, `planung/kriterien.md`
- [ ] (P0) DB Schema: `pricing_plans`, `credit_ledger_entries` (immutable), `jobs` usage fields
- [ ] (P0) API: estimate → reserve → capture/release (idempotent)
- [ ] (P0) Pricing-Versionierung (effectiveFrom/effectiveTo)
- [ ] (P0) Limits: max duration, max chars, daily caps (anti-cost-explosion)
- [ ] (P0) Wallet UI minimal: Saldo + letzte Ledger-Einträge + “ca. Credits” Anzeige
- [ ] (P0) Dev/Test Top-up: `promo_grant` oder Admin-Grant (ohne Stripe) für interne Tests

Akzeptanz:
- Ledger-Flows erfüllen `agents/evals/credits_flows.v0.md`

## Epic 3 (P0): Safety Gate (Input + Output)
Referenzen: `planung/risiken.md`, `planung/safety-policy.md`, `agents/evals/safety_redteam.v0.md`
- [ ] (P0) Safety Policy: block/warn/allow Regeln (Self‑harm hard block)
- [ ] (P0) Input Screening vor Jobstart (LLM/TTS)
- [ ] (P0) Output Screening nach Generation, vor Anzeige/Export
- [ ] (P0) Warn/Refocus UX: Scope‑Bestätigung (Wellness) + klare Hinweise (siehe DEC‑018)
- [ ] (P0) Krisen‑UX (Flow D in `planung/flows.md`)

Akzeptanz:
- Red-Team Cases werden geblockt/warned wie in `agents/evals/safety_redteam.v0.md`

## Epic 4 (P0): Skript-Erstellung (LLM Job) + Script Library
Referenzen: `agents/prompts/script_generate.v0.md`, `planung/flows.md`
- [ ] (P0) Create Wizard: Ziel/Stil/Länge/Do’s/Don’ts + Basic/Expert Toggle
- [ ] (P0) BYO Skript: Paste/Import eigenes Skript (skip LLM Job) + Safety Output Screening + Versionierung
- [ ] (P0) Preflight: Safety Input Screen + Cost Estimate + Reserve (vor Jobstart)
- [ ] (P0) Script Generate Job (async) inkl. Credits reserve/capture/release + Idempotency
- [ ] (P0) Script Speicherung + Versionen
- [ ] (P0) Library UI: Liste + Detailansicht

Akzeptanz:
- Script Output erfüllt Struktur + Safety‑Constraints (siehe Prompt + Evals)

## Epic 5 (P0): Pausen/Timing “tag-free”
Referenzen: `planung/pausen.md`, `agents/evals/pause_markers.v0.md`
- [ ] (P0) Editor UI: Pausen als Blocks/Chips (kein SSML)
- [ ] (P0) Import/Export Marker `[[pause:…]]`
- [ ] (P0) Renderer: Marker/Blocks → SSML `<break>` (unter der Haube)

Akzeptanz:
- Parser/Renderer erfüllt `agents/evals/pause_markers.v0.md`

## Epic 6 (P0): TTS Job Pipeline + Export
Referenzen: `planung/stimmen.md`, `agents/evals/tts_job_flows.v0.md`
- [ ] (P0) Voice Katalog (Basic: kuratierte Stimmen; Expert: allowlist)
- [ ] (P0) Preflight: Cost Estimate + Reserve (chars/minutes) + Limits (max Länge)
- [ ] (P0) TTS Job: chunking → synth → merge → normalize (ffmpeg) → store (idempotent)
- [ ] (P0) Signed URLs + Retention/Löschung
- [ ] (P0) Export: MP3 oder M4A (mindestens eins)

Akzeptanz:
- Job Flow erfüllt `agents/evals/tts_job_flows.v0.md`

## Epic 7 (P1 → Public Launch): Billing Integration (Stripe) + Ledger Sync
- [ ] (P1) Stripe Checkout (Credit-Packs) + korrekte Checkout-Informationen (B2C/Digital Content)
- [ ] (P1) Webhooks idempotent → Ledger `purchase`
- [ ] (P1) Billing UI: Wallet, Verbrauch, Kaufhistorie, Refunds

## Epic 8 (P1): Admin/Operator minimal
- [ ] (P1) Pricing/Model mapping UI oder config (Tier→Model/Voice)
- [ ] (P1) “Kill switch” für Modelle/Voices/Templates
- [ ] (P1) Ledger Support Tools (refund/adjustment)

## Epic 9 (P1): Datenschutz-Flows (Export/Löschung)
Referenzen: `planung/flows.md`, `planung/kriterien.md`, `agents/runbooks/dsar_delete.md`
- [ ] (P1) Export: “Meine Daten exportieren” (Skripte + Audio-Assets + Ledger-Auszug)
- [ ] (P1) Löschung: “Account löschen” (DB + Storage, async + retries)
- [ ] (P1) Retention Defaults technisch enforcebar (konfigurierbar; siehe `planung/entscheidungen.md`)

## Epic 10 (P1): BYO & Iteration (Should-haves)
Referenzen: `planung/kriterien.md`, `planung/ui.md`
- [ ] (P1) BYO-Prompting: Prompt-Editor + “Paste/Import” von LLM-Ergebnis (ohne LLM-Kosten)
- [ ] (P1) BYO-TTS: Audio-Import (WAV/MP3) + optional Post-Processing (Lautheit/Fades)
- [ ] (P1) Varianten: einzelne Abschnitte regenerieren (z.B. Suggestionen), Credits transparent
- [ ] (P1) Kapitelmarken/Marker im Skript + Timeline-Marker in Audio (später)

## Later (bewusst später)
- BYO‑Keys (clientseitig) statt nur Import
- Hintergrundmusik/Binaural (lizenzsicher)
- Sharing/UGC Plattformfeatures (DSA‑Scope)
- Multi‑Voice/Voice‑Cloning (hohes Risk/Safety)
- Vollständige BFSG-Audits + externe Accessibility-Reviews (falls BFSG-scope)
