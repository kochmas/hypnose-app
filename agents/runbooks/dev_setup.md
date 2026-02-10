# Runbook: Local Dev Setup (MVP)

Ziel: Ein reproduzierbarer Ablauf, um die App lokal (Web + Worker + DB) zum Laufen zu bringen.

## Voraussetzungen
- Node.js (>= 18.18)
- npm (oder pnpm)
- Docker (für lokale Postgres‑DB)

## Ablauf (lokal)
1. Dependencies installieren:
   - `npm install`
2. Env anlegen:
   - `.env.example` → `.env.local`
3. Postgres lokal starten:
   - `docker compose up -d`
4. Prisma Migrations ausführen:
   - `npm run prisma:migrate`
5. Web/API starten (Next.js):
   - `npm run dev`
6. Worker starten (separater Prozess), der Jobs abarbeitet:
   - LLM‑Jobs (Skript)
   - TTS‑Jobs (Chunking → Merge → ffmpeg Normalize)
   - aktuell (Bootstrap): Sleep‑Job Smoke‑Test
   - `npm run worker:dev`

## Smoke‑Test (Bootstrap)
1. `npm run dev` läuft → öffne `http://localhost:3000`
2. `npm run worker:dev` läuft
3. Im UI “Sleep-Job starten” klicken
4. Status wechselt `queued → running → succeeded`

## Failure Triage (typisch)
- DB down: `docker compose ps`, Logs prüfen.
- Migrations fail: `DATABASE_URL` prüfen, Schema vs. Migration State prüfen.
- Worker läuft nicht: Queue‑Config prüfen (DEC‑009), Logs prüfen.
- `next build` schlägt fehl: `npm run build` + Fehler auf Route-Handler/Types prüfen.

## Relevante Dokus
- Architektur: `planung/architecture.md`
- Flows: `planung/flows.md`
- Credits: `planung/credits.md`
- Verify/Triage: `agents/runbooks/verify_triage.md`
