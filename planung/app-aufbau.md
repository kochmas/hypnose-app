# Vorschlag: App-Aufbau (Architektur + Features)

## Ausgangslage (was wir bisher festgelegt haben)
- **Skript → Audio**: Nutzer erstellen ein Hypnose-Skript und generieren daraus Audio per TTS.
- **Creditsystem**: Mehrere Dienste (LLM/TTS/Rewrite/Checks) werden über ein Wallet/Ledger abgerechnet (`planung/credits.md`).
- **Basic + Expert**: Einsteiger wählen Tiers (Schnell/Standard/Premium), Power-User können Modelle/Stimmen direkt wählen (`planung/credits.md`, `planung/stimmen.md`).
- **Pausen/Timing ohne Tags**: Editor ist “tag-free”; Pausen als UI-Elemente/Marker, intern Render zu SSML (`planung/pausen.md`).
- **Safety/Legal**: Krisen-/Selbstgefährdung guardrailen, keine Heil-/Therapie-Claims, DSGVO/Impressum/Clickwrap/Consent (`planung/risiken.md`, `planung/rechtstexte.md`, `planung/kriterien.md`).

Siehe auch:
- MVP Backlog: `planung/backlog.md`
- Flows: `planung/flows.md`
- Entscheidungen (SSoT): `planung/entscheidungen.md`
- Tech-Architektur: `planung/architecture.md`

## 1) Was die App “braucht” (MVP-Screens)
**Öffentlich**
- Landing (Value, Preise/Credits, Beispiele)
- Impressum / Datenschutz / AGB

**Account**
- Login/Signup (E-Mail Magic Link oder OAuth)
- Profil/Settings: Sprache, Datenexport/-löschung, Consent-Settings
- Billing: Credits kaufen, Ledger/Verbrauch, Rechnungen

**Core**
- Dashboard / Library: Liste der Hypnosen (Skript + Audio-Assets), Suche/Tags
- Create Flow (Wizard):
  1) Ziel + Stil + Länge + “Do’s/Don’ts”
  2) Skript generieren **oder eigenes Skript nutzen** (Basic/Expert; Kosten-Schätzung + Reserve nur bei LLM)
  3) Skript editorieren (inkl. **Pausen-UI**)
  4) Stimme wählen (Basic/Expert; Kosten-Schätzung + Reserve)
  5) Audio generieren (Async Job) + Preview + Export
- Hypnose-Detail: Versionen (Skript v1/v2), Audio v1/v2, Export/Share (optional)

**Operator/Admin (separat, minimal)**
- Pricing/Model-Mapping (Tier → Model/Voice)
- Abuse/Safety: Block-Events, Reports, Disable Prompt/Template/Model
- Credits/Fraud: Limits, Chargebacks-Notizen

## 2) Kern-Domänenobjekte (Datenmodell grob)
Minimal sinnvoll:
- `User`
- `ConsentRecord` (AGB-Version, Datenschutzerklärung “zur Kenntnis”, Cookie-Consents, optionale Opt-ins)
- `PromptVersion` / `Template` (welcher Prompt wurde genutzt; wichtig für Reproduzierbarkeit)
- `Script` (Struktur + Text + Pausen-Blöcke/Marker; Versionshistorie)
- `AudioAsset` (Datei-URL/Key, Format, Dauer, Voice-Metadaten)
- `Job` (LLM/TTS Jobs: queued/running/succeeded/failed; idempotencyKey; usage)
- `CreditWallet` + `CreditLedgerEntry` (purchase/reserve/capture/release/refund)
- `PricingPlan` (versioniert: service/provider/model/tier, unit, creditsPerUnit, effectiveFrom)

## 3) Backend-Bausteine (Services/Module)
### A) Provider-Abstraktion (LLM/TTS)
Ziel: “Provider austauschbar”.
- `LLMProviderAdapter`: generate script, rewrite section, safety-screen (optional)
- `TTSProviderAdapter`: synthesize, supports SSML?, limits (max chars), voices list
- “Tier mapping”: Basic-Tier → konkrete Provider+Model/Voice (konfigurierbar)

### B) Credits & Billing
- **Estimate/Reserve/Capture/Release** (Ledger-first)
- Idempotency überall (Requests/Jobs dürfen nicht doppelt abbuchen)
- Limits (pro Tag/Job) + Risk-Scoring Hooks (Fraud)

### C) Jobs/Queue
Warum: LLM/TTS kann dauern, Chunking, Retries.
- `script_generate_job`
- `tts_generate_job` (Chunking + Merge + Normalization)
- Storage: Audio in Object Storage; Zugriff über signed URLs

### D) Safety Gate
Einzeln, zentral, verpflichtend:
- Input screening (vor Generierung)
- Output screening (nach Generierung, vor Auslieferung)
- Hard-block für Krisen-/Selbstgefährdung (siehe `planung/risiken.md`)

### E) Consent/Terms
- Clickwrap Logging (AGB-Version, Timestamp)
- Cookie-Consent getrennt (nicht mit AGB vermischen)
- In-App Hinweis: “Text wird an KI-Dienstleister übertragen” (UX + Transparenz)

## 4) Frontend-Bausteine (UI/UX)
### A) Script Editor (entscheidend)
Ziele:
- Struktur sichtbar (Einleitung/Induktion/…)
- **Pausen ohne SSML**: Pausen als Chips/Blocks + Slider/Dropdown
- Preview: “60s Test” mit gleichen Pacing-Regeln (Kosten/Iteration)

### B) Basic vs. Expert UI
Default: “Schnell/Standard/Premium” + 3–6 kuratierte Stimmen.
Expert: Provider/Model/Voice wählbar (nur freigegebene Liste) + transparente Kostenschätzung.

## 5) Empfohlene technische Umsetzung (2 gute Optionen)
### Option 1 (schnell): “Fullstack Web” in einem Repo
- Frontend: Next.js/React (App Router)
- Backend: API Routes + Background Worker (separater Prozess)
- DB: Postgres
- Queue: Redis + BullMQ (oder Cloud-Queue)
- Storage: S3/R2/GCS (signed URLs)
- Payments: Stripe (Credits kaufen)

### Option 2 (klar getrennt): Frontend + API-Service
- Frontend: Next.js/React
- Backend: FastAPI/NestJS
- Queue/Worker: separater Dienst
- Vorteil: saubere Service-Grenzen (mehr Setup)

Für MVP ist Option 1 meist schneller; später kann man trennen, wenn nötig.

## 6) MVP in Phasen (konkret vorgeschlagen)
**Phase 0 (Setup)**
- Auth + Legal Pages + Consent Logging (ohne Marketing-Tracking)

**Phase 1 (Skript)**
- Script Generate (1 Tier) **oder BYO Skript** + Script Editor + Pausen-UI (Auto + Manual)
- Safety Gate (Input/Output) + Evals

**Phase 2 (Audio)**
- TTS Generate (1–2 Stimmen) via async Job + Export
- Credits Reserve/Capture integriert

**Phase 3 (Erweitern)**
- Expert Mode, mehrere Provider, BYO-Import, Pricing-Admin

## 7) Offene Entscheidungen (mit Default-Vorschlag)
Siehe `planung/entscheidungen.md` (SSoT), z.B.:
- DEC‑001 (Scope)
- DEC‑002 (Provider-Strategie)
- DEC‑007 (Retention)
