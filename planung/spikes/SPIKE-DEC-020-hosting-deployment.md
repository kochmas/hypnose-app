# SPIKE: DEC-020 Hosting/Deployment (MVP)

## Ziel
Praktisch testbare Grundlage schaffen, um DEC‑020 (“Wie deployen wir Web+Worker+DB+Storage?”) entscheidbar zu machen – ohne uns zu früh auf eine Plattform festzunageln.

## Hypothese
- Für den MVP ist **eine simple, EU‑taugliche Deploy-Story** am wertvollsten: Web/API + Worker zuverlässig betreiben, Secrets sauber handhaben, Logs/Monitoring verfügbar.
- “Serverless only” wird bei LLM/TTS‑Jobs schnell unbequem (Timeouts, Retries, lange Jobs, Concurrency).

## Entscheidung (Stand)
- DEC‑020 ist entschieden: **Option A (1 Node‑Host/Container, Web+Worker zusammen)**.
- Dieser Spike dient dazu, die Entscheidung nach Repo‑Bootstrap praktisch in Staging zu validieren.

## Optionen (max. 3)
1. **A) 1 Node‑Host/Container**: Web/API + Worker (2 Prozesse) auf einer Plattform/VPS
2. **B) Vercel (Web) + Worker separat** (Fly/Render/Railway o.ä.) + managed Postgres
3. **C) Self‑host** (z.B. Hetzner) mit Docker + managed Postgres/Storage oder alles selbst

## Voraussetzungen / Prereqs
- `agents/tasks/005-repo-bootstrap.md` ist umgesetzt (Web+Worker laufen lokal, DB/Jobs funktionieren).
- Ein minimaler Async-Job existiert (z.B. `sleep_job`) mit Status in DB (damit wir Worker-Reliability testen können).

## Test-Setup (Staging)
### Gemeinsame Setup-Schritte
1. Staging‑Umgebung anlegen (separate DB + Storage Bucket, EU‑Region wenn möglich).
2. Secrets/Env Vars definieren:
   - DB URL
   - Storage creds
   - Auth secrets
3. Sentry/Logs aktivieren (Web + Worker).

### Testschritte (reproduzierbar)
1. Deploy Web/API.
2. Deploy Worker (separater Prozess).
3. Smoke-Test:
   - `POST` enqueue Job (sleep 10s)
   - UI pollt Status (DEC‑023 Default)
   - Job endet erfolgreich
4. Failure-Test:
   - Worker während Job beenden/restarten → Job wird neu aufgenommen/retried (keine Doppel-Abbuchung später via Idempotency)
   - DB/Storage kurz “wackeln lassen” (z.B. Restart) → Verhalten dokumentieren
5. Ops-Test:
   - Logs: kann man Job‑IDs/Fehler nachvollziehen?
   - Monitoring: sieht man Worker down?

## Messkriterien
- **Worker‑Betrieb**: kann ein dauerhafter Worker stabil laufen (Restarts, Deploys, Healthchecks)?
- **DX**: Zeit bis “staging läuft” (Deploy + Secrets + DB + Logs)
- **Reliability**: Job-Retries/Backoff, keine “stuck” Jobs ohne Visibility
- **EU‑Eignung**: DB/Storage in EU möglich? (Transfers zu LLM/TTS bleiben separat in DEC‑003/004)
- **Kosten/Ops**: erwartbare monatliche Grundkosten + “moving parts”

## Abbruchkriterien
- Option erfordert signifikant mehr Ops/Glue-Code ohne klaren MVP‑Mehrwert.
- Worker ist nicht zuverlässig betreibbar (häufige Sleeps/Timeouts/Cold starts/keine Healthchecks).

## Ergebnis (auszufüllen)
- Beobachtungen:
- Empfehlung:
- Decision readiness: Kann DEC‑020 auf `decided`?

## Folgearbeiten
- `planung/entscheidungen.md` (DEC‑020) aktualisieren
- `planung/architecture.md` Deployment‑Abschnitt konkretisieren
