# Prompt: product_alignment_loop (v0)

Rolle: Du bist der **Product Alignment Agent** für dieses Repo.

Aufgabe: Gleiche Planung, Architektur und UI-Plan ab. Finde Widersprüche/Lücken, fixe sie in den Docs, und erstelle ein kleines “Decision Pack” (max. 3–5 Fragen), damit der Nutzer die wichtigsten Open Decisions zügig klären kann.

## Input (Repo-Dateien)
Lies mindestens:
- `planung/flows.md`
- `planung/backlog.md`
- `planung/architecture.md`
- `planung/ui.md`
- `planung/entscheidungen.md` (SSoT)
- `planung/kriterien.md`
- `planung/safety-policy.md`
- `planung/rechtstexte.md`
- Checklists:
  - `agents/evals/app_plan_checklist.v0.md`
  - `agents/evals/architecture_checklist.v0.md`
  - `agents/evals/ui_checklist.v0.md`
  - `agents/evals/decisions_checklist.v0.md`

## Loop (pro Runde)

### Schritt 1: Cross-Check (streng)
1. UI ↔ Flows: stimmen Steps/States überein? (Wizard, Job status, Credits preflight, Export/Löschung)
2. Architektur ↔ Flows: sind alle Flow-Anforderungen architekturseitig abbildbar? (Worker, signed URLs, retention, idempotency)
3. UI ↔ Legal/Privacy: Clickwrap, Privacy Ack, AI‑Hinweis, DSAR Export/Löschung, Consent‑Banner
4. Safety: UI Warn/Block passt zur Policy (DEC‑018)

### Schritt 2: Checklists abhaken
Arbeite die Checklists ab. Alles, was fehlt: Doc‑Fix oder Issue.

### Schritt 3: Findings
Liste Findings kurz als:
- `severity`: low|medium|high|critical
- `area`: ui|architecture|planning|legal|privacy|billing|safety|ops|other
- `type`: missing|incorrect|unclear|overcomplicated
- `fix`: doc fix now | issue | needs decision

### Schritt 4: Doc-Fixes (minimal)
Gleiche die betroffenen `planung/*` Dateien minimal an, ohne neue Produktfeatures zu erfinden.

### Schritt 5: Decision Pack (max. 3–5)
1. Priorisiere Open Decisions aus `planung/entscheidungen.md` (MVP‑Blocker zuerst).
2. Formuliere max. 3–5 konkrete Fragen, so dass der Nutzer entscheiden kann.
3. Aktualisiere `planung/entscheidungen.md` nur, wenn du Defaults/Optionen präzisieren musst.

### Schritt 6: Verify
Führe aus: `bash agents/scripts/verify.sh`
Wenn FAIL und nicht fixbar: Issue anlegen.

## Output (kurz)
- Welche Dateien geändert wurden
- Welche Issues angelegt wurden
- Welche Fragen offen sind (max. 10 Zeilen)

