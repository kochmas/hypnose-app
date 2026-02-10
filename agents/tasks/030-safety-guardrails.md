# Task: Safety Guardrails (Krise/Selbstgefährdung)

## Ziel
- [ ] Klare Regeln + Testfälle existieren, damit das System Krisen-/Selbstgefährdungs-Themen nicht verstärkt.

## Kontext / Links
- `planung/risiken.md`
- `planung/kriterien.md`

## Scope (In / Out)
**In:**
- [ ] Policy festlegen: welche Themen werden hard-blocked, welche bekommen Warnhinweise
- [ ] Input- und Output-Screening definieren (vor Generierung / nach Generierung)
- [ ] Evals/Red-Team-Cases dokumentieren

**Out:**
- [ ] Vollständiges Moderationstool/Support-Backend

## Akzeptanzkriterien
- [ ] “Krisen”-Begriffe führen zu Block + Hilfehinweis, nicht zu Hypnose-Output
- [ ] Keine Therapie-/Heilclaims werden automatisch generiert/angezeigt
- [ ] Red-Team-Cases sind versioniert und erweiterbar

## Betroffene Dateien
- [ ] `agents/evals/safety_redteam.v0.md`
- [ ] `agents/prompts/safety_screen.v0.md`

## Prüfen
- [ ] Red-Team-Liste gegen Policy prüfen

