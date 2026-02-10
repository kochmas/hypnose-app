# SPIKE: DEC-009 Queue/Worker (Postgres vs Redis/Managed)

## Ziel
Praktisch testen, welche Queue/Worker‑Variante für den MVP (LLM/TTS Jobs + Credits) am zuverlässigsten und am einfachsten zu betreiben ist.

## Hypothese
- **Postgres‑Worker** reicht für MVP (weniger Infra), wenn wir einen dauerhaften Worker‑Prozess betreiben können.
- Redis/Managed lohnt erst, wenn Throughput/Isolation/Observability Probleme machen.

## Optionen (zu testen)
1. **Postgres‑Worker** (z.B. `graphile-worker` oder `pg-boss`)
2. **Redis Queue** (BullMQ)
3. **Managed Queue** (SQS o.ä.) – nur als Vergleich/Plan, nicht zwingend im Spike 1

## Voraussetzungen / Prereqs
- `agents/tasks/005-repo-bootstrap.md` ist umgesetzt (Next.js + Postgres + Prisma + Worker Skeleton).

## Test-Setup (lokal)
1. Postgres via `docker compose` starten.
2. Minimaler Job‑Typ: `sleep_job` (5–10s) + Statusupdates in DB.
3. API Endpoint: `POST /api/jobs/sleep` (enqueue) + `GET /api/jobs/:id` (status).
4. UI: einfache Seite, die Job startet und Status **pollt** (DEC‑023 Default).

## Messkriterien
- **DX**: Wie schnell ist Setup lokal? Wie “glatt” sind Retries/Backoff?
- **Idempotency**: Doppelstart darf nicht doppelt ausführen/abbuchen.
- **Reliability**: Crash des Workers → Job wird wieder aufgenommen/neu versucht.
- **Ops**: Monitoring/Dead-letter/Visibility: wie gut kann man hängen gebliebene Jobs finden?
- **Kosten/Infra**: zusätzliche Komponente nötig? (Redis/Managed)

## Abbruchkriterien
- Wenn Option 1 innerhalb von ~1–2h keinen stabilen “Hello Job” liefert → auf Option 2 wechseln.

## Ergebnis (auszufüllen)
- Beobachtungen:
- Empfehlung:
- Decision readiness: Kann DEC‑009 auf `decided`?

## Folgearbeiten
- Update `planung/entscheidungen.md` (DEC‑009) + ggf. `planung/architecture.md`.

