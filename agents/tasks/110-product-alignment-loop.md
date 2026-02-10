# Task: Product Alignment Loop (Planung ↔ Architektur ↔ UI)

## Ziel
- [ ] Architektur (`planung/architecture.md`), Planung (`planung/*`) und UI-Plan (`planung/ui.md`) sind widerspruchsfrei und umsetzungsbereit.
- [ ] Offene Entscheidungen werden in kleinen Diskussionspaketen (max. 3–5 Fragen) vorbereitet.

## Kontext / Links
- Planung: `planung/plan.md`, `planung/backlog.md`, `planung/flows.md`
- Architektur: `planung/architecture.md`
- UI: `planung/ui.md`
- Entscheidungen (SSoT): `planung/entscheidungen.md`
- Kriterien/Risiken/Legal: `planung/kriterien.md`, `planung/risiken.md`, `planung/safety-policy.md`, `planung/rechtstexte.md`
- Checklists:
  - `agents/evals/app_plan_checklist.v0.md`
  - `agents/evals/architecture_checklist.v0.md`
  - `agents/evals/ui_checklist.v0.md`
  - `agents/evals/decisions_checklist.v0.md`
- Agent-Prompt: `agents/prompts/product_alignment_loop.v0.md`

## Scope (In / Out)
**In:**
- [ ] Cross-Check: UI ↔ Flows (Wizard, Job-States, Credits preflight, Export/Löschung)
- [ ] Cross-Check: Architektur ↔ Flows (Worker/Jobs, signed URLs, Retention, Idempotency)
- [ ] Cross-Check: UI ↔ Legal/Privacy (Clickwrap, AI‑Hinweis, DSAR Export/Löschung)
- [ ] Safety UX ↔ Safety Policy (warn/refocus/block)
- [ ] Offene Entscheidungen priorisieren und konkrete Fragen formulieren
- [ ] Dokumente minimal angleichen (keine Romane)

**Out:**
- [ ] Feature-Implementierung (separate Tasks)

## Akzeptanzkriterien
- [ ] Keine offensichtlichen Widersprüche zwischen `planung/flows.md`, `planung/architecture.md` und `planung/ui.md`
- [ ] Open Decisions sind als DEC/Issues sichtbar und nicht “zwischen den Zeilen”
- [ ] `bash agents/scripts/verify.sh` läuft (Report erzeugt)

## Prüfen
- [ ] `bash agents/scripts/verify.sh`

