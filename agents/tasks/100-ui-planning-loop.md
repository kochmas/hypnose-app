# Task: UI-Planung-Loop (UX/Design-System → Review → Angleichen)

## Ziel
- [ ] Die UI-Planung ist so konkret, dass die Umsetzung als agentengetriebene UI-Tasks möglich ist.
- [ ] UI passt konsistent zu `planung/flows.md`, `planung/app-aufbau.md`, `planung/architecture.md` und den Kriterien (Credits/Safety/DSGVO).
- [ ] Design-Entscheidungen sind stringend dokumentiert (Design-System/Patterns), ohne “alles neu zu erfinden”.

## Kontext / Links
- UI-Plan: `planung/ui.md`
- Flows: `planung/flows.md`
- App-Aufbau: `planung/app-aufbau.md`
- Architektur: `planung/architecture.md`
- Kriterien: `planung/kriterien.md`
- Entscheidungen (SSoT): `planung/entscheidungen.md`
- Safety/Legal: `planung/safety-policy.md`, `planung/rechtstexte.md`
- Agent-Prompt: `agents/prompts/ui_planning_align.v0.md`

## Scope (In / Out)
**In:**
- [ ] Screen-Map + Navigation (Core, Billing, Settings, Legal, Safety)
- [ ] UI-Patterns: Wizard, Job-Status, Credits-Preflight, Warn/Block UX
- [ ] Design-System Defaults (Typography, Spacing, Color, Components, Accessibility)
- [ ] UI-Datei-/Ordnerstruktur (wie bekommt “alles seinen Platz”)
- [ ] Open Design/Tech Decisions als DEC/Issues festhalten

**Out:**
- [ ] UI-Implementierung (kommt in separaten Feature-Tasks, z.B. Repo-Bootstrap + Core Screens)

## Akzeptanzkriterien
- [ ] `planung/ui.md` existiert und deckt die Kern-Flows ab (Create, Billing, Export/Löschung, Safety)
- [ ] Basic/Expert UI ist klar beschrieben (inkl. Kosten-Transparenz)
- [ ] Pausen-Editor ist “tag-free” (keine SSML/HTML im UI)
- [ ] A11y/WCAG-Basics sind als Default dokumentiert
- [ ] `bash agents/scripts/verify.sh` läuft (Report erzeugt)

## Prüfen
- [ ] `bash agents/scripts/verify.sh`

