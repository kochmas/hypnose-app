# Umsetzung / Traceability

Dieses Dokument beschreibt **nachvollziehbar**, wie Anforderungen und Entscheidungen aus `planung/` in Code, Tests und Doku umgesetzt wurden.

Ziel:
- schneller Review (“entspricht das der Planung?”)
- gute KI‑Testbarkeit (klare Module, klare Tests, klare Referenzen)
- reduzierte Regressionen (warum wurde etwas so gebaut?)

## Konvention (pro Feature/Epic)
Ergänze pro umgesetztem Baustein einen Abschnitt:

### <Feature/Titel> (YYYY‑MM‑DD)
- **Planung:** Links zu `planung/*` (Flows/Kriterien) + relevante DEC‑IDs
- **Implementierung:** wichtigste Dateipfade/Module (z.B. `app/...`, `src/...`, `worker/...`)
- **Tests:** Dateipfade (Unit/Integration/E2E)
- **Doku/Runbooks:** zusätzliche Doku‑Updates (z.B. `agents/runbooks/*`)
- **Abweichungen/Trade-offs:** kurz (warum anders als Plan / warum so?)
- **Offene Punkte:** Issues (Dateipfade unter `agents/issues/`)

## Repo-Bootstrap: Web+DB+Worker Skeleton (2026-02-10)
- **Planung:** `planung/architecture.md` (Worker + DB), `planung/flows.md` (Job-Polling), DEC‑020/DEC‑009 in `planung/entscheidungen.md`
- **Implementierung:**
  - Next.js App: `src/app/layout.tsx`, `src/app/page.tsx`
  - API: `src/app/api/health/route.ts`, `src/app/api/jobs/sleep/route.ts`, `src/app/api/jobs/[id]/route.ts`
  - DB/Prisma: `prisma/schema.prisma`, `src/server/db.ts`
  - Migration: `prisma/migrations/20260210201500_init/migration.sql`, `prisma/migrations/migration_lock.toml`
  - Queue/Worker: `src/server/queue.ts`, `src/worker/worker.ts`
  - Local Dev: `docker-compose.yml`, `.env.example`
- **Tests:** `src/server/env.test.ts`
- **Doku/Runbooks:** `agents/tasks/120-implementation-loop.md` (Loop), `agents/runbooks/dev_setup.md` (Setup, wird laufend konkretisiert)
- **Abweichungen/Trade-offs:**
  - Postgres ist Voraussetzung für Jobs/Queue; `docker compose` ist geplant, kann aber in Umgebungen ohne Docker nicht direkt verifiziert werden.
  - Lokales E2E des Worker-Flows (UI-Klick bis `succeeded`) ist in dieser Umgebung ohne Docker-DB nicht vollständig verifiziert; Build/Lint/Unit-Tests sind grün.
- **Offene Punkte:** Siehe `agents/issues/` (z.B. Provider-Recherche DEC‑003/004, ggf. Audit/Warnings später triagieren)

## MVP Slice 01: Public Legal Baseline + AI-Transparenz (2026-02-10)
- **Planung:** `planung/backlog.md` (Epic 1, P0), `planung/rechtstexte.md`, `planung/ui.md` (Flow A/C), `planung/flows.md` (Onboarding + Generierung), DEC‑001/DEC‑014 in `planung/entscheidungen.md`
- **Implementierung:**
  - Home + CTA-Hinweis: `src/app/page.tsx`, `src/app/_components/SleepJobDemo.tsx`
  - Rechtstextseiten: `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx`, `src/app/agb/page.tsx`
  - Sichtbare Footer-Links: `src/app/_components/SiteLegalLinks.tsx`
  - Versionierung rechtlicher Texte: `src/server/legal/versions.ts`
  - Metadaten/Layout-Basis: `src/app/layout.tsx`
- **Tests:** `src/server/legal/versions.test.ts`
- **Doku/Runbooks:** `agents/tasks/140-implementation-legal-baseline.md`, `docs/ungereimtheiten.md`
- **Abweichungen/Trade-offs:**
  - Rechtstexte sind bewusst als vorlaeufige Platzhalter markiert; finale juristische Texte bleiben ein separater Launch-Block.
  - Clickwrap/Consent-Logging ist in diesem Slice noch nicht technisch umgesetzt (separater Folgetask mit Auth-/Account-Kontext).
- **Offene Punkte:** ggf. Folgetask fuer vollstaendiges Consent-Logging + versionierte Clickwrap-Speicherung in der DB.

## MVP Slice 02: Clickwrap & Consent-Logging (2026-02-10)
- **Planung:** `planung/rechtstexte.md` (Clickwrap/Consent), `planung/flows.md` (Flow A/C), `planung/kriterien.md` (Consent-Logging, Transparenz), DEC‑001/DEC‑014 in `planung/entscheidungen.md`
- **Implementierung:**
  - Consent-Datenmodell: `prisma/schema.prisma`, `prisma/migrations/20260210223000_add_consent_records/migration.sql`
  - Consent-Logik: `src/server/legal/consent.ts`
  - Consent-APIs: `src/app/api/consents/status/route.ts`, `src/app/api/consents/accept/route.ts`, `src/app/api/consents/revoke/route.ts`
  - Job-Gating (serverseitig): `src/app/api/jobs/sleep/route.ts`
  - Clickwrap-UI am CTA: `src/app/_components/SleepJobDemo.tsx`, `src/app/page.tsx`
  - Workflow/Task: `agents/tasks/150-implementation-clickwrap-consent.md`
- **Tests:** `src/server/legal/consent.test.ts`, `src/server/legal/versions.test.ts`
- **Doku/Runbooks:** `docs/ungereimtheiten.md`, `agents/issues/ISSUE-0004-consent-records-not-yet-mapped-to-authenticated-user.md`
- **Abweichungen/Trade-offs:**
  - Consent ist im MVP noch an anonymen `subjectKey` gebunden (LocalStorage), nicht an `userId`.
  - AI-Hinweis ist optional bestaetigbar und widerrufbar; AGB + Datenschutz sind fuer Jobstart zwingend.
- **Offene Punkte:** Auth-basiertes Consent-Mapping als Folgearbeit (siehe `agents/issues/ISSUE-0004-consent-records-not-yet-mapped-to-authenticated-user.md`).
