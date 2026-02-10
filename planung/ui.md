# UI-Plan (MVP) – Screens, Patterns, Design-System

Ziel: Die UI ist konsistent zu `planung/flows.md`, `planung/app-aufbau.md`, `planung/architecture.md` und den Kriterien (Credits/Safety/DSGVO).

Open Decisions (SSoT): `planung/entscheidungen.md`

---

## 1) Design-Prinzipien (Default)
- **Ruhig & klar**: wenig visuelles Rauschen, große Lesbarkeit (Skript!)
- **Kostenkontrolle sichtbar**: vor jedem Job “ca. Credits”, danach “tatsächlich”
- **Safety-by-default**: Warn/Refocus statt Heilclaims; Hard-Block bei Krisen-Signalen
- **Tag-free Editing**: Pausen werden als UI-Elemente bearbeitet, nicht als SSML/HTML
- **A11y-first**: Keyboard/Fokus/Kontrast als Default, keine “only color” Signale

## 2) Screen-Map / Navigation (MVP)
**Public**
- `/` Landing (Value, Credits/Preise, Beispiele)
- `/impressum`, `/datenschutz`, `/agb`

**App (auth)**
- `/app` Dashboard/Library
- `/app/create` Create Wizard
- `/app/hypnosen/[id]` Detail (Skript-Versionen, Audio, Export)
- `/app/billing` Credits kaufen + Ledger
- `/app/settings` Profil, Export/Löschung, Consents

**Safety**
- `/app/safety-block` (Krisen-/Hard-Block)
- `/app/safety-warn` (Warn/Refocus + Scope-Bestätigung)

**Admin/Operator (role-gated, MVP minimal)**
- `/admin` (optional; kann im MVP auch über config/CLI statt UI passieren)

## 3) Kern-Patterns (MVP)
### A) Create Wizard (Flow C)
Schritte (UI):
1. Ziel/Stil/Länge/Do’s/Don’ts + **Basic/Expert** Toggle
2. Pfadwahl: **LLM generieren** oder **BYO Skript paste/import**
3. Safety Screen:
   - `allow` → weiter
   - `warn` → Scope bestätigen/umformulieren
   - `block` → Krisen-Screen
4. Skript-Editor (strukturierte Ansicht + Pausen-Chips/Blocks)
5. Voice wählen + Kosten schätzen
6. TTS Job starten → Status (queued/running) → Playback/Export

### B) Job-Status UI (LLM/TTS)
- Einheitliche Statuskomponente: `queued | running | succeeded | failed`
- Failure: klare Fehlermeldung + “Credits reserviert → freigegeben” Hinweis
- Keine Doppelstarts: Buttons während `running` disabled; Idempotency-Key in API

### C) Credits UX (Preflight)
- Vor Job: Estimate (Tokens/Chars) → “ca. X Credits” + Hinweis “final nach Verbrauch”
- Bei zu wenig Credits: CTA zu Billing (Flow B)
- Nach Job: tatsächliche Credits + Ledger-Eintrag verlinken

### D) Safety UX (DEC-018)
- **Warn/Refocus**: klare Grenze “Wellness”, keine Therapie/Heilclaims, ggf. Umformulierung erzwingen
- **Hard-Block**: Krisen-Hinweis + Ressourcen; keine Generierung, keine Abbuchung

## 4) Pausen-Editor (tag-free)
UI-Elemente:
- “Pause einfügen” zwischen Absätzen/Sätzen
- Pause-Chip/Block mit Dauer-Auswahl (0.5s/1s/2s/3s/5s)
- Auto-Pacing Default (aus `planung/pausen.md`), manuell nur Feintuning

Import/Export:
- Marker `[[pause:2s]]` nur für Copy/Paste/Export (nie SSML im Editor)

## 5) Design-System Defaults (MVP)
**Komponenten**
- Buttons, Inputs, Selects, Dialogs, Toasts
- Stepper/Wizard
- Cards/Sections für Editor
- JobStatus/Progress, CreditBadge, SafetyNotice

**A11y**
- Tastaturbedienung überall (Wizard, Editor, Player)
- Fokus sichtbar, Kontrast ≥ WCAG AA
- Fehlertexte an Feldern, ARIA Labels, Reduced Motion respektieren

## 6) UI-Ordnerstruktur (wenn Next.js Bootstrap da ist)
Ziel: “alles hat seinen Platz” und bleibt agentenfreundlich.

Vorschlag:
- `app/` routes (route groups: `(public)`, `(app)`, `(admin)`)
- `components/ui/` (design-system primitives)
- `components/app/` (feature components: Wizard, Editor, JobStatus)
- `features/` (domain-driven: credits, safety, scripts, tts)
- `lib/` (utils, formatting, validators)

## 7) Offene UI-Entscheidungen (mit Bezug auf DEC)
- Component Library: shadcn/ui vs. Radix only (DEC nötig)
- Light/Dark Theme im MVP? (Default: light only, später optional)
- Editor: Plain text + Blocks vs. Rich-text (MVP: text+blocks)

