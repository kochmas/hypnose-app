# Entscheidungen (Open Decisions & Defaults)

Diese Datei ist die **Single Source of Truth** für offene/entschiedene Produkt‑ und Tech‑Entscheidungen.
Andere Dokumente (z.B. `planung/architecture.md`) sollen hierher **verlinken**, statt eigene “Decision”-Listen zu pflegen.

Konvention:
- Status: `open | proposed | decided`
- Jede Entscheidung hat eine ID `DEC-XXX`

Archiv:
- Entscheidungen mit Status `decided` werden unten in **“Archiv (Decided)”** gesammelt (damit der obere Teil fokussiert bleibt).

---

## Aktive Entscheidungen (Open/Proposed)

## DEC-001: Zielgruppe & Scope (Wellness vs. Therapie)
- Status: open
- Default: **Wellness/Entspannung** (Schlaf, Stress, Fokus), keine Diagnose/Behandlung/Heilversprechen.
- Warum: reduziert regulatorisches/haftungsrechtliches Risiko (siehe `planung/risiken.md`).
- Ergänzung: Nutzer sollen das Tool frei nutzen können (inkl. eigene Skripte/Prompts), aber die App macht **keine Wirk‑/Heilversprechen** und klare Verantwortung/Transparenz ist Pflicht (`planung/rechtstexte.md`).
- Impact: Marketing‑Copy, Prompt‑Guards, Safety‑Policy/Guardrails (siehe DEC‑018 + `planung/safety-policy.md`).

## DEC-002: Provider-Strategie (MVP)
- Status: open
- Default: **1 integrierter LLM + 1 integrierter TTS** (KI‑Stimmen in der App sind der Hauptpfad).
- Optional: **Audio‑Import** als Zusatzpfad (z.B. Nutzer lädt extern generiertes Audio oder eigene Aufnahme hoch). Das ist kein Ersatz für TTS‑Stimmen, sondern ein Power‑User/Edge‑Case‑Feature.
- Warum: bestes UX/Kosten‑Verhältnis, ohne BYO‑Key‑Support‑Hölle im MVP.
- Impact: Provider‑Onboarding (AVV/Transfers/ToS), Credits‑Pricing, Abuse‑Prevention.

## DEC-003: LLM-Provider (MVP)
- Status: open
- Default: Provider wählen nach Kriterien (Recherche nötig):
  - Reselling erlaubt (Credits)
  - EU‑Region/Datenschutzoptionen (oder klare Transfers + SCCs)
  - stabile Usage‑Reports (tokens) für Billing
  - gute deutschsprachige Output‑Qualität
- Impact: `script_generate`, `rewrite`, `safety_screen`.
- Optionen (strategisch):
  - Managed LLM API (ein Provider) + klarer EU/Transfer‑Pfad + Usage‑Reporting
  - EU‑zentrierter Provider (wenn Features/Qualität reichen) → weniger Transfer‑Komplexität
  - Self‑host (Open‑Model) → maximale Kontrolle, aber hoher Ops‑Aufwand (für MVP eher “Later”)
- Next step (konkret): Provider‑Recherche (DEC‑003) nach Runbook `agents/runbooks/provider_onboarding.md` + Ergebnis in eigener Tabelle dokumentieren (ToS/Reselling, DPA/AVV, Region/Transfers, Retention, Usage‑Metriken, Pricing‑Units, DE‑Qualität).
- Entschieden (Constraints):
  - US‑Provider sind ok (mit sauber dokumentierten Transfers/SCCs).
  - Default‑Tier priorisiert Qualität (Kosten sind sekundär; Limits/Reserve schützen vor Ausreißern).
- Offen:
  - konkreter Provider + Model‑Mapping (siehe Issue `agents/issues/ISSUE-0001-provider-recherche-llm-dec-003.md`).

## DEC-004: TTS-Provider (MVP)
- Status: open
- Default: Provider wählen nach Kriterien (Recherche nötig):
  - SSML `<break>` + prosody support
  - Limits/Chunking gut handhabbar
  - kommerzielle Audio‑Distribution erlaubt
  - Usage‑Metriken (chars/minutes) sauber rücklieferbar
- Impact: Voice‑Katalog, Kosten, Job‑Pipeline.
- Optionen (strategisch):
  - Managed TTS API (ein Provider) mit sehr guter DE‑Stimme + SSML‑Support
  - Multi‑Provider (Basic vs. Premium) → bessere Voice‑Auswahl, aber mehr Ops/Billing‑Komplexität
  - BYO‑TTS via Import (kein API‑Support) → reduziert eigene variable Kosten, aber weniger “integriert”
- Next step (konkret): Provider‑Recherche (DEC‑004) nach `agents/runbooks/provider_onboarding.md` inkl. SSML‑Break‑Qualität, Chunk‑Limits, kommerzielle Rechte, Usage‑Metriken (chars/min), und Voice‑Katalog (DE).
- Fragen (für die Recherche/Entscheidung):
  1) MVP: **1 Provider** (mehrere Voices/“Qualitätsstufen” innerhalb des Providers) oder **2 Provider** (günstig + premium)?
- Entschieden (Constraint):
  - Mindestanforderung: **DE‑Stimmen** (native) = ja.
- Offen:
  - konkreter Provider + Voice‑Katalog + Pricing (siehe Issue `agents/issues/ISSUE-0002-provider-recherche-tts-dec-004.md`).

## DEC-007: Retention Defaults (Inputs/Outputs/Audio/Logs)
- Status: open
- Default:
  - Nutzer‑Assets (Skript/Audio): gespeichert bis Nutzer löscht
  - Provider‑Requests/Logs: minimal + kurz (z.B. 7–30 Tage), datensparsam
  - Audio‑Exports: nur im eigenen Storage, keine “public” Buckets
- Ergänzung: Nutzer müssen **Export** ihrer personenbezogenen Daten/Assets (DSAR‑gedacht) durchführen können (siehe `planung/flows.md`, `planung/kriterien.md`, `agents/runbooks/dsar_delete.md`).
- Impact: DSGVO‑Dokumentation, Storage‑Kosten, “Alles löschen” Implementierung.

## DEC-019: OAuth Provider (MVP)
- Status: open
- Default (Vorschlag): **Google OAuth** im MVP, Apple später (mehr Setup/Review).
- Warum: OAuth ist gewünscht, aber wir halten den MVP‑Scope klein.
- Fragen:
  1) OAuth im MVP: nur Google, oder Google + Apple?
- Impact: Auth‑Setup, Provider‑Configs, Support.

## DEC-009: Queue/Worker Technologie (MVP)
- Status: proposed
- Default (Vorschlag): Postgres‑basierter Worker (z.B. `pg-boss` oder `graphile-worker`) wie in `planung/architecture.md`.
- Diskussionspunkte (Optionen):
  - Postgres‑Worker: weniger Infra, aber DB‑Load/Locking/Throughput beachten.
  - Redis Queue (BullMQ): bewährt für Jobs, aber extra Komponente + Ops.
  - Managed Queue (z.B. SQS): sehr robust, aber mehr Setup/Glue‑Code + lokale Dev.
- Kriterien: Retries/Backoff, Job‑Visibility, Idempotency, Kosten, DX, Monitoring.
- Fragen:
  1) Willst du für MVP **Redis vermeiden** (Postgres‑Worker), oder ist Redis ok?
  2) Deployment‑Realität: können wir **einen dauerhaften Worker‑Prozess** betreiben (Container/VPS), oder soll alles “serverless” sein?
- Impact: Retry‑Policy, Job‑Monitoring, Deploy‑Komplexität.

## DEC-020: Hosting/Deployment (MVP)
- Status: open
- Default (Vorschlag): “weniger moving parts” für MVP:
  - Web/API + Worker als **Node‑Deploy** (2 Prozesse) auf einem Host/Container‑Setup
  - Postgres gemanagt (EU‑Region), Object Storage (EU)
- Optionen:
  - A) 1 Node‑Host (Container/VPS): Web + Worker zusammen (ein Deployment)
  - B) Vercel (Web) + Worker separat (Fly/Render o.ä.) + managed Postgres
  - C) Self‑host (z.B. Hetzner) + Postgres + Storage (mehr Ops, mehr Kontrolle)
- Fragen:
  1) Bevorzugst du A, B oder C fürs MVP?
  2) Ist “EU‑Hosting” als Default Pflicht (DB/Storage), auch wenn LLM/TTS ggf. US‑Transfers haben?
- Impact: DX, Ops-Aufwand, Kosten, Security/Secrets, Monitoring.

## DEC-012: Hintergrundmusik/Binaural (MVP)
- Status: open
- Default: **kein** Hintergrund im MVP (Lizenzrisiko) – später als optionales Add‑On.
- Impact: Audio‑Pipeline, Lizenzen, UI.

## DEC-013: Barrierefreiheit (BFSG) Scope & Umsetzung
- Status: open
- Default: MVP bereits **WCAG‑nah** bauen (semantisches HTML, Tastaturbedienung, Kontrast, Fokus) und BFSG‑Scope früh prüfen.
- Warum: Nachträgliche Fixes sind teuer; BFSG kann bei E‑Commerce relevant werden.
- Impact: UI‑Komponentenwahl (z.B. Radix), Testing (axe), Release‑Checkliste.

## DEC-014: KI-Transparenz (EU AI Act) – Umsetzungstiefe
- Status: open
- Default:
  - UI Labeling: “KI‑generiert” bei Skript/Audio
  - klare Hinweise, wo KI eingesetzt wird (Onboarding + vor Generierung)
  - Logging/Versionierung der Prompts/Model‑Mappings
- Impact: UX, Compliance, Support.

## DEC-015: Refund-/Rücktritts-Policy für Credits
- Status: open
- Default: klare, einfache Regeln (z.B. Auto‑Refund bei Fehljobs; manuelle Kulanz; Umgang mit ungenutzten Credits definieren).
- Impact: Support‑Aufwand, Ledger‑Funktionen, AGB‑Text (später juristisch prüfen).

## DEC-016: Alter / Minderjährige (Age Gating)
- Status: open
- Default: Zielgruppe **18+** (MVP), bis Policy + Consent für Minderjährige sauber geklärt ist.
- Impact: Signup UX, Compliance (Art. 8 DSGVO), Marketing.

## DEC-017: “Public Launch”-Voraussetzungen (Payments)
- Status: open
- Default: Für frühe Tests: `promo_grant` (dev) reicht. Für Public Launch: Stripe + Checkout‑Pflichten + Chargeback‑Handling.
- Impact: Epic 7 in `planung/backlog.md`, Rechts-/Checkout‑UX.

---

## Archiv (Decided)

## DEC-005: Credits “Währung” & Anzeige
- Status: decided
- Default: Credits als **stabile interne Einheit** (z.B. 100 Credits ≈ 1€ als UX‑Daumenregel), intern aber strikt über Usage‑Units gerechnet.
- Warum: Nutzer versteht “Credits”; intern bleibt es preissicher (Pricing‑Versionierung).
- Impact: Pricing‑Plan, Wallet UI, Support/Refunds.

## DEC-006: Overages Policy (Reserve vs. Nachbelasten)
- Status: decided
- Default: **Strict Reserve** im MVP (Job startet nur, wenn Reserve den Worst‑Case deckt).
- Alternative: allow overages (Nachbelastung) → höhere Komplexität + Streitpotenzial.
- Impact: Estimate‑Logik, Fehlermeldungen, “Job abbrechen” UX.

## DEC-010: “Basic vs. Expert” Umfang im MVP
- Status: decided
- Default:
  - Basic (Default): Tiers + kuratierte Stimmen
  - Expert: freigegebene Allowlist für Modelle/Voices (nicht “alles”)
- Impact: UI, Support, Safety‑Surface (Prompt‑Injection etc.).

## DEC-011: Preview/Iteration Kosten (z.B. 60s Vorschau)
- Status: decided
- Default: **volle Kostenkontrolle**:
  - “Eigene Skripte” (Paste/Import) → kein LLM‑Job nötig → deutlich günstiger (nur TTS).
  - Preview (z.B. 60s) nur, wenn Credits/Preis klar angezeigt sind (separater Service) oder erst später.
- Impact: Kostenkontrolle, UX, Abuse‑Risiko, Backlog (Skript‑Import).

## DEC-008: Auth (MVP)
- Status: decided
- Entscheidung: **E‑Mail Magic Link + OAuth** im MVP.
- Warum: weniger Friction für Einsteiger (Magic Link) + Komfort für Power‑User (OAuth).
- Offen (separat): welche OAuth‑Provider genau → siehe DEC‑019.
- Impact: Account‑UX, Support, Fraud‑Risiko.

## DEC-018: Guardrails-Striktheit (Block vs. Warn vs. Allow)
- Status: decided
- Entscheidung (MVP):
  - **Hard block**: Self‑harm/Suizid, Gewalt gegen sich/andere, illegal/hate.
  - **Warn/Refocus**: medizinische Heil-/Therapie‑Claims → Wellness‑Reframing erzwingen; ggf. block bei Insistieren.
  - **Warn/Refocus (statt Block)**: Trauma/PTBS/akute Psychose → nur Wellness‑/Entspannungs‑Output, keine Therapie-/Behandlungs‑Claims; bei Krisensignalen bleibt Hard‑Block.
  - **Allow (mit Warn/Wellness‑Reframe)**: Depression/Angst (ohne Heil-/Therapie‑Claims).
- Hinweis: Das erhöht Support‑/Haftungs-/Reputationsrisiko; muss sauber in `planung/safety-policy.md` + UX umgesetzt werden.
- Impact: Safety‑Policy, UX (Warn/Block Screens), Support‑Aufwand, Haftungs-/Reputationsrisiko.
