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
