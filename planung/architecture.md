# Architektur (Technische Umsetzung & Werkzeuge)

Dieses Dokument beschreibt einen konkreten Vorschlag, wie wir die Hypnose‑Web‑App technisch aufbauen (MVP‑tauglich, DSGVO‑gedacht) – passend zu den Anforderungen in `planung/`.

Open Decisions (SSoT): `planung/entscheidungen.md`

## 1) Ziele & Constraints
- **Skript → Audio**: Hypnose‑Skript erzeugen, editieren (inkl. Pausen), daraus Audio per TTS generieren.
- **Creditsystem**: Mehrere Dienste (LLM/TTS/Rewrite/Checks) über Credits abrechnen (Wallet + Ledger, Reserve→Capture).
- **Basic + Expert**: Default über Tiers (Schnell/Standard/Premium), optional direkte Modell-/Voice‑Wahl.
- **Pausen “tag‑free”**: Nutzer tippt kein SSML/HTML; Pausen als UI‑Element/Marker, intern Render zu SSML.
- **Safety/Legal**: Krisen-/Selbstgefährdungs‑Guardrails, Consent/Clickwrap Logging, DSGVO‑Auftragsverarbeitung/Transfers.

## 2) Empfohlene Architektur (MVP)
**Fullstack Web + Worker**, minimaler Komponenten‑Footprint:

1. **Web App (Frontend + API)**: Next.js (TypeScript)
2. **DB**: Postgres (EU‑Region)
3. **Job Queue / Worker**: Postgres‑basierter Worker (kein Redis im MVP; siehe DEC‑009 in `planung/entscheidungen.md`)
4. **Object Storage**: S3‑kompatibel (EU Bucket) für Audio
5. **Payment**: Stripe (Credits kaufen)
6. **Observability**: Sentry (FE/BE), strukturierte Logs

> Warum Postgres‑Queue? Weniger moving parts: kein Redis nötig, trotzdem async Jobs + Retries.

### Komponentenbild (textuell)
- Browser → Next.js UI
- Next.js API:
  - Auth
  - Admin/Operator (role‑gated)
  - Script Jobs (LLM)
  - TTS Jobs (Chunking)
  - Credits Ledger (Reserve/Capture)
  - Consent/Terms Logging
- Worker‑Prozess:
  - führt Jobs aus (LLM/TTS)
  - schreibt Usage + Ledger Events
  - speichert Audio in Object Storage
- Postgres:
  - Users, Scripts, Jobs, Pricing, Ledger

## 3) Tech‑Stack (konkret vorgeschlagen)
**Sprache/Runtime**
- TypeScript, Node.js LTS

**Frontend**
- Next.js (App Router)
- UI: Tailwind CSS + shadcn/ui (Radix‑basiert; siehe DEC‑021) oder Radix UI
- Form/Validation: Zod

**Backend**
- Next.js Route Handlers (REST) oder tRPC (optional)
- ORM: Prisma
- Auth: NextAuth/Auth.js (Magic Link + OAuth; Details siehe `planung/entscheidungen.md`)
- AuthZ: Rollen/Policies (mind. `user` vs. `admin/operator`) + Audit‑Logging für Admin‑Aktionen
- Rate limiting: per Middleware (IP/User), plus serverseitige Job‑Limits

**Jobs/Worker**
- Postgres Worker: **`graphile-worker`** (Default; kein Redis)
- Audio Processing: ffmpeg (Merge/Normalize/Fades)
- Job-Policy (MVP): Status‑State‑Machine, Retries/Backoff, Idempotency‑Keys, Abbruch/Timeouts, “bill only on final output”

**Storage**
- S3 kompatibel (AWS S3 eu‑central‑1 / Cloudflare R2 EU o.ä.)
- Auslieferung: signed URLs (kurze TTL), keine “public by default” Buckets

**Payments/Credits**
- Stripe Checkout + Webhooks
- Ledger‑First (immutable Entries), Pricing versioniert
- Credits als stabile interne Einheit (siehe DEC‑005 in `planung/entscheidungen.md`)
- MVP‑Testphase: `promo_grant` statt Stripe möglich (Public Launch: DEC‑017)

**Observability**
- Sentry (Front + API + Worker)
- Audit Logs light (Ledger/Consent/Policy Blocks)

**Dev/CI**
- Package manager: pnpm
- Lint/Format: ESLint + Prettier
- Tests: Vitest (Unit), Playwright (E2E, später)
- CI: GitHub Actions (lint/test/build)
- Regression: `agents/evals/*` + `bash agents/scripts/verify.sh` als “Safety net”

## 4) Repo‑Struktur (Vorschlag)
Im MVP reicht ein Repo:
- `app/` (Next.js)
- `src/` (shared: domain, adapters, pricing, renderer)
- `worker/` (Job runner)
- `prisma/` (Schema/Migrations)
- `agents/` (Tasks/Prompts/Evals/Runbooks – bereits angelegt)
- `planung/` (Produkt/Legal‑Docs – bereits angelegt)

## 5) Kern‑Domänen (Datenmodell, MVP)
Tabellen (minimal):
- `users`
- `user_roles` oder `users.role` (für Admin/Operator)
- `consents` (termsVersion, privacyVersion, cookieConsent, timestamps)
- `pricing_plans` (versioniert: service/provider/modelOrVoice/unit/creditsPerUnit/minFee/effectiveFrom)
- `credit_wallets` (optional als View/Materialized: berechneter Saldo)
- `credit_ledger_entries` (purchase/reserve/capture/release/refund/adjustment, idempotencyKey)
- `scripts` (structured content + raw markdown + pause blocks/markers)
- `jobs` (type, status, payloadRef, idempotencyKey, estimatedUsage, actualUsage, errors)
- `audio_assets` (storageKey, duration, voice, format, hash/cacheKey)

## 6) Kritische Flows (MVP‑tauglich)
### A) Script Generate (LLM)
1. Input screen → Safety Screen (block/warn/allow)
2. Estimate tokens → Credits reserve
3. Job queued → Worker call LLM
4. Output screen (post‑check) → Script speichern (mit `prompt_version`)
5. Capture credits (actual usage), release delta

### A2) Script Import (BYO)
1. Nutzer paste/importiert Skript (Markdown/Text)
2. Output‑Screening (fail‑safe warn/block) → speichern als neue Script‑Version
3. Kein LLM‑Job, keine Credits (nur optional TTS später)

### B) Pausen/Timing (tag‑free)
- Editor speichert Pausen als **Blocks/Marker** (z.B. `[[pause:2s]]`)
- Renderer baut daraus provider‑spezifisches SSML (unter der Haube)
- Details: `planung/pausen.md`

### C) TTS Generate (Audio)
1. Script render → SSML chunks (provider limits)
2. Estimate chars/minutes → Credits reserve
3. Worker: TTS per chunk → merge → normalize → store
4. Capture credits, signed URL zurück

### D) Credits/Abrechnung (Ledger)
- Reserve→Capture→Release + Idempotency überall
- Details: `planung/credits.md`

### E) Consent/Terms
- Clickwrap AGB + “Datenschutz zur Kenntnis” loggen
- Cookie‑Consent getrennt
- Details: `planung/rechtstexte.md`

## 7) Provider‑Abstraktion (LLM/TTS)
Ziel: Provider austauschbar, Basic/Expert passt auf dasselbe API.

Interfaces (MVP):
- `LLMAdapter.generateScript(input): { markdown, usage }`
- `LLMAdapter.safetyScreen(text): { allowed, category, action }`
- `TTSAdapter.synthesize(ssmlOrText, voice): { audioBuffer, usage }`
- `TTSAdapter.getLimits(): { maxCharsPerRequest, supportsSsml }`

Konfig:
- “Tier mapping” (Basic) zeigt auf konkrete `provider+model/voice`
- Expert darf nur freigegebene Modelle/Voices wählen

## 8) Admin/Operator (MVP)
Minimaler Operator‑Scope (role‑gated, auditiert):
- Pricing/Mapping: Tier → Model/Voice konfigurieren, “Kill‑Switch” für Modelle/Voices/Templates
- Risk/Safety: Block‑Events einsehen, Incident‑Runbook ausführen, problematische Prompt‑Versionen deaktivieren
- Billing/Support: Ledger‑Adjustments/Refunds (manuell), Job‑Reprocess (falls safe)

Hinweis (Scope):
- MVP kann das zunächst als **Config/CLI/geschützte Endpoints** lösen; eine “schöne Admin‑UI” ist nicht zwingend im ersten Wurf.

Security/Privacy:
- Admin‑Aktionen audit‑loggen (wer/was/wann), datensparsam
- Zugang nur für wenige Accounts (Rolle), optional 2FA später

## 9) DSGVO‑Pragmatik (technisch)
- EU‑Hosting/DB bevorzugen; Transfers zu LLM/TTS bewusst entscheiden.
- Retention: Inputs/Logs kurz halten; Audio löschbar; “Alles löschen” umsetzbar.
- DSAR: “Meine Daten exportieren” (ZIP/JSON) + “Account löschen” als (async) Jobs, inkl. Storage‑Cleanup; Details: `agents/runbooks/dsar_delete.md`
- Secrets: nur serverseitig; BYO‑Keys möglichst clientseitig oder verschlüsselt.
- AVV/DPA + Provider‑Onboarding: `agents/runbooks/provider_onboarding.md`

## 10) “Agent‑first” Entwicklungsloop
Wir nutzen den `agents/`‑Ordner als Engineering‑Betriebssystem:
- Verify‑Loop: `bash agents/scripts/verify.sh` (Report in `agents/reports/`)
- Nicht lösbare Findings: Issue in `agents/issues/` (per `agents/scripts/new_issue.sh`)
- Runbook: `agents/runbooks/verify_triage.md`
- Safety Incident: `agents/runbooks/incident_safety.md`

## 11) Nächste Entscheidungen (kurz)
Siehe `planung/entscheidungen.md` (z.B. DEC‑003/004/007/009/019/020).

## 12) Local Dev: “Wie läuft das?”
Ziel: lokale Entwicklung ohne Cloud-Abhängigkeiten, aber produktnah (Jobs, Storage, FFmpeg).

**Voraussetzungen (MVP)**
- Node.js LTS + pnpm
- Docker (für Postgres; optional MinIO für S3 lokal)

**Lokal-Setup (geplant)**
1. Postgres via `docker compose` starten.
2. Prisma: Schema/Migrations anwenden.
3. Web/API starten (Next.js).
4. Worker separat starten (1 Prozess), der Jobs aus der Queue zieht.

**Warum 2 Prozesse?**
- Web‑Requests sollen schnell bleiben (kein 60s+ TTS in HTTP).
- Worker kann Retries/Backoff/Idempotency sauber abwickeln.

Runbook: `agents/runbooks/dev_setup.md`

## 13) Deployment (MVP): Entscheidung
Entschieden (DEC‑020 in `planung/entscheidungen.md`):
- **A) 1 Node‑Host (Container/VPS)**: Web/API + Worker als **2 Prozesse** im selben Deployment.
- **EU‑Hosting Default**: DB + Object Storage in EU.

Der Worker ist “always‑on” und verarbeitet Jobs asynchron (siehe DEC‑009).

Fallback/Alternativen (später, falls nötig):
- Vercel (Web) + Worker separat (mehr moving parts, aber gutes FE‑DX)
- Managed Queue + serverless workers (mehr Cloud‑Glue, oft unnötig im MVP)

## 14) Backups, Secrets, Kostenkontrolle (MVP)
**Backups/DR**
- Postgres: automatisierte Backups + Restore‑Test (regelmäßig), EU‑Region.
- Object Storage: Lifecycle/Retention‑Regeln für Exports; Audio nur privat + signed URLs.
- Löschung vs. Backups: DSAR/Löschung muss erklären, wie Backups gehandhabt werden (Policy + Dokumentation).

**Secrets/Config**
- Secrets in Env‑Vars (keine Repo‑Secrets), getrennt nach Web/Worker.
- Least‑Privilege: getrennte Keys/Rollen (Storage write vs read, Stripe webhook, Provider‑Keys).

**Kostenkontrolle**
- Preflight Estimates + Strict Reserve (DEC‑006) vor jedem Job
- Max‑Limits (Dauer/Chars/Jobs pro Tag) + Rate‑Limits
- Caching optional: gleiche (ScriptHash + Voice) kann Audio wiederverwenden (später)
