# Task: Repo/Stack Bootstrap (MVP)

## Ziel
- [ ] Ein lauffähiges Grundgerüst existiert, damit die nachfolgenden Feature‑Tasks (Credits, Safety, Jobs, TTS) umgesetzt werden können.

## Kontext / Links
- Architektur: `planung/architecture.md`
- Backlog: `planung/backlog.md` (Epic 0)
- Entscheidungen: `planung/entscheidungen.md` (DEC‑009/DEC‑020)
- Dev Runbook: `agents/runbooks/dev_setup.md`

## Scope (In / Out)
**In:**
- [ ] Next.js + TypeScript Grundsetup
- [ ] Package Manager + Scripts (dev/lint/test/build)
- [ ] Local Dev: Postgres via `docker compose` + `.env.example`
- [ ] Prisma init (DB‑Connection steht, Migrations-Lifecycle steht)
- [ ] Worker Skeleton: separater Prozess startet und kann “Jobs” abarbeiten (Queue‑Tech nach DEC‑009)
- [ ] Minimaler Healthcheck (Web + Worker)

**Out:**
- [ ] Produktfeatures (Credits, Safety, TTS) – kommen in separaten Tasks

## Akzeptanzkriterien
- [ ] Lokales Setup ist dokumentiert (siehe `agents/runbooks/dev_setup.md`)
- [ ] Web startet lokal ohne Cloud-Abhängigkeiten
- [ ] Worker startet lokal und verarbeitet einen “Hello World” Job (End-to-End)
- [ ] `bash agents/scripts/verify.sh` erzeugt einen PASS-Report (nach `npm install` oder `pnpm install`)

## Prüfen
- [ ] `bash agents/scripts/verify.sh`
