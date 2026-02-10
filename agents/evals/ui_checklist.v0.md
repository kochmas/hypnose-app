# Eval: UI Planning Checklist (v0)

Ziel: `planung/ui.md` ist konsistent zu Planung/Architektur und konkret genug für MVP-Implementierung.

## Muss enthalten (MVP)
- [ ] Screen-Map/Routes und Navigation (öffentlich, app, settings, legal)
- [ ] Create Flow UI: Wizard → Editor → Voice → Job Status → Playback/Export
- [ ] Credits UX: Kosten-Schätzung vor Job, Reserve-Hinweis, tatsächliche Abbuchung danach
- [ ] Safety UX: Warn/Refocus (Scope Wellness) + Block/Krisen-Screen (keine Details, Ressourcen)
- [ ] Consent UX: Clickwrap (AGB), Privacy Ack, AI-Hinweis vor Generierung
- [ ] Export/Löschung: in Settings auffindbar, DSAR-Export beschrieben
- [ ] Pausen-Editor: tag-free (Chips/Blocks), Marker nur Import/Export

## Design-System & A11y
- [ ] Design-Prinzipien (ruhig, klar, “hypnotisch” ohne dark patterns)
- [ ] Typografie/Spacing/Colors als Defaults beschrieben
- [ ] A11y Basics: Keyboard, Focus, Kontrast, Labels, Error Messages, Reduced Motion
- [ ] Mobile/Responsive: Wizard + Editor + Player sind nutzbar

## “Alles hat seinen Platz”
- [ ] Vorgeschlagene UI-Ordnerstruktur (z.B. `app/`, `components/`, `features/`, `lib/`)
- [ ] Wiederverwendbare Komponenten sind benannt (Button, Stepper, JobStatus, CreditBadge, SafetyNotice, PauseChip)

## Nicht überladen
- [ ] Later-Features sind klar als später markiert (z.B. Music/Binaural, Sharing)

