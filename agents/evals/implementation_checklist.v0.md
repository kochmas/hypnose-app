# Eval: Implementation Checklist (v0)

Ziel: Jede Implementierungsrunde liefert **Code + Tests + Doku**, bleibt plan‑konform und ist überprüfbar.

## Scope/Planung
- [ ] Ein klarer Scope wurde gewählt (1 Task oder 1 kleines Backlog‑Item)
- [ ] Relevante Entscheidungen aus `planung/entscheidungen.md` wurden berücksichtigt oder als Blocker geloggt
- [ ] Architektur/UI/Flows sind nicht widersprüchlich zur Implementierung (bei Bedarf Docs minimal angepasst)

## Testbarkeit
- [ ] Domain‑Logik ist in testbaren, deterministischen Funktionen gekapselt
- [ ] Side‑Effects (DB/Provider/Storage/Clock) sind isoliert/mocks möglich
- [ ] Zu jeder Codeänderung existieren passende Tests (Unit/Integration)
- [ ] Tests sind reproduzierbar (keine Flakes durch Timer/Netzwerk)

## Doku/Traceability
- [ ] `docs/umsetzung.md` wurde aktualisiert (Mapping Planung → Code → Tests)
- [ ] Trade-offs/Abweichungen sind kurz begründet

## Qualität/Gegenprüfung
- [ ] `bash agents/scripts/verify.sh` ist PASS
- [ ] Reviewer‑Pass (`agents/prompts/implementation_review.v0.md`) wurde durchgeführt (Fix oder Issue)
- [ ] Keine Secrets im Repo (Secret Scan grün / keine Warnzeichen ignoriert)

