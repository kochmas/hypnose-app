# Runbook: Local Dev Setup (MVP)

Ziel: Ein reproduzierbarer Ablauf, um die App lokal (Web + Worker + DB) zum Laufen zu bringen.

> Hinweis: Aktuell ist das Repo noch “Planung‑first” (wenig Code). Dieses Runbook definiert den Soll‑Ablauf für die anstehenden Setup-Tasks.

## Voraussetzungen
- Node.js LTS
- pnpm
- Docker (für lokale Postgres‑DB)

## Soll-Ablauf (wenn Code/Setup-Tasks erledigt sind)
1. Dependencies installieren (pnpm).
2. Postgres lokal starten (`docker compose`).
3. Prisma Migrations ausführen.
4. Web/API starten (Next.js).
5. Worker starten (separater Prozess), der Jobs abarbeitet:
   - LLM‑Jobs (Skript)
   - TTS‑Jobs (Chunking → Merge → ffmpeg Normalize)
6. Smoke‑Test:
   - Login/Signup
   - Script erstellen (BYO oder LLM)
   - TTS Job starten, Status poll, Audio abspielen

## Failure Triage (typisch)
- DB down: `docker compose ps`, Logs prüfen.
- Migrations fail: Schema vs. Migration State prüfen.
- Worker läuft nicht: Queue‑Config prüfen (DEC‑009), Concurrency/Locks.
- Audio/ffmpeg fehlt: Worker-Image/Host muss ffmpeg enthalten.

## Relevante Dokus
- Architektur: `planung/architecture.md`
- Flows: `planung/flows.md`
- Credits: `planung/credits.md`
- Verify/Triage: `agents/runbooks/verify_triage.md`
