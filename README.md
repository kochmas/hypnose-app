# hypnose-app

Agent-first geplante Web‑App, um Hypnose‑Skripte zu erstellen (LLM) und daraus Audio zu generieren (TTS) – mit Creditsystem, Safety/Legal‑Guardrails und DSGVO‑Gedanken.

## Repo-Struktur
- `planung/` – Produkt-/Legal-/Architektur‑Doku (SSoT für Anforderungen)
- `agents/` – Agent-Workflows (Tasks/Prompts/Evals/Runbooks)
- `docs/umsetzung.md` – Traceability: Planung → Code → Tests
- `src/` – Next.js App + Server-Code + Worker

## Local Dev (Bootstrap)
1. `npm install`
2. `.env.example` → `.env.local`
3. `docker compose up -d`
4. `npm run prisma:migrate`
5. Terminal A: `npm run dev`
6. Terminal B: `npm run worker:dev`

Smoke-Test: Auf `/` “Sleep-Job starten” klicken → Status `queued → running → succeeded`.

## Verify
`bash agents/scripts/verify.sh`
