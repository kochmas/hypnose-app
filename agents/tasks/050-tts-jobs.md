# Task: TTS Job-Pipeline (Chunking, Storage, Auslieferung)

## Ziel
- [ ] Ein implementierbarer Blueprint für TTS-Jobs existiert (async Jobs, Chunking, Storage, signed URLs, Abrechnung).

## Kontext / Links
- `planung/stimmen.md`
- `planung/credits.md`
- `planung/pausen.md`

## Scope (In / Out)
**In:**
- [ ] Job-States definieren (queued/running/succeeded/failed)
- [ ] Chunking-Strategie festlegen (max chars, respektiert Pause-Blöcke)
- [ ] Storage-Strategie festlegen (object storage, signed URLs, retention)
- [ ] Credits Reserve→Capture pro Job integrieren

**Out:**
- [ ] UI/Player-Design (separat)

## Akzeptanzkriterien
- [ ] Fehlerfälle/Retry/Idempotency sind beschrieben
- [ ] DSGVO: Retention/Deletion für Audio/Logs ist berücksichtigt

## Betroffene Dateien
- [ ] `agents/evals/tts_job_flows.v0.md`

## Prüfen
- [ ] Flows in `agents/evals/tts_job_flows.v0.md` durchgehen

