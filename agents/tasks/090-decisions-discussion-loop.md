# Task: Decisions-Loop (Diskutieren → Entscheiden → Angleichen)

## Ziel
- [ ] Offene Entscheidungen in `planung/entscheidungen.md` werden in kleinen, wiederholbaren “Diskussionsrunden” geklärt.
- [ ] Jede Runde liefert **konkrete** Optionen/Trade-offs + 1–3 klare Fragen an den Nutzer.
- [ ] Nach Nutzerantworten: Status in `planung/entscheidungen.md` auf `decided` setzen und betroffene Planung (Flows/Backlog/Architektur) angleichen.

## Kontext / Links
- Open Decisions (SSoT): `planung/entscheidungen.md`
- Kriterien/Constraints: `planung/kriterien.md`
- Risiken/Safety: `planung/risiken.md`, `planung/safety-policy.md`
- Planung: `planung/flows.md`, `planung/backlog.md`, `planung/architecture.md`
- Agent-Prompt: `agents/prompts/decisions_discussion_loop.v0.md`

## Loop (Runde)
1. Lies `planung/entscheidungen.md` und priorisiere **max. 3–5** offene DEC nach Impact/Risiko.
2. Erstelle pro DEC:
   - Optionen + Empfehlung (Default)
   - Impact (UX/Tech/Legal/Billing)
   - **1–3 konkrete Fragen** an den Nutzer (um zu entscheiden)
3. Nach Nutzerantworten:
   - Status auf `decided`
   - die geklärte Entscheidung in `planung/entscheidungen.md` in **“Archiv (Decided)”** verschieben
   - betroffene Docs angleichen (`planung/flows.md`, `planung/backlog.md`, `planung/architecture.md`)
4. Nicht lösbare Punkte als Issue loggen (`agents/issues/`).
5. Verifizieren: `bash agents/scripts/verify.sh`

## Akzeptanzkriterien
- [ ] Offene DEC enthalten konkrete Optionen/Defaults (keine “Wischiwaschi”-Einträge)
- [ ] Pro Runde werden höchstens 3–5 DEC diskutiert (kleine Iterationen)
- [ ] Entscheidungen sind nachvollziehbar (Warum + Impact)
- [ ] `bash agents/scripts/verify.sh` läuft (Report erzeugt)
