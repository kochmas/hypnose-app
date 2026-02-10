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

**Auth**
- `/login` (Magic Link + OAuth)
- `/signup` (optional, kann auf `/login` zusammenfallen)

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
### 0) Onboarding / Consent (Flow A)
- **Clickwrap (Pflicht)**: Checkbox “AGB akzeptieren” + Link + Version (loggen)
- **Privacy Ack**: “Datenschutz zur Kenntnis genommen” (loggen)
- **AI-Hinweis vor Generierung**: kurzer Hinweis nahe Generieren-CTA (“Text wird an KI‑Dienstleister übertragen … bitte keine sensiblen Daten”)
- Cookie/Consent Banner nur für nicht notwendige Tools (Tracking etc.)

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

UX-Notizen:
- **Warn/Refocus** unterscheidet (Copy/Hint) grob zwischen:
  - medical claims (“heilen/behandeln”) → Reframe erzwingen
  - mentale Gesundheitsthemen → Wellness/Grounding + Hinweis “bei akutem Leid Hilfe suchen” (siehe `planung/safety-policy.md`)
- BYO Skript: Import kann Marker `[[pause:…]]` enthalten; Editor bleibt tag‑free.

### B) Job-Status UI (LLM/TTS)
- Einheitliche Statuskomponente: `queued | running | succeeded | failed`
- Failure: klare Fehlermeldung + “Credits reserviert → freigegeben” Hinweis
- Keine Doppelstarts: Buttons während `running` disabled; Idempotency-Key in API
- Optional (MVP): “Abbrechen” falls Job noch `queued` ist (Release Reserve)

### C) Credits UX (Preflight)
- Vor Job: Estimate (Tokens/Chars) → “ca. X Credits” + Hinweis “final nach Verbrauch”
- Bei zu wenig Credits: CTA zu Billing (Flow B)
- Nach Job: tatsächliche Credits + Ledger-Eintrag verlinken
- Anzeige auch bei BYO: “LLM: 0 Credits (Import) / TTS: ~X Credits”

### D) Safety UX (DEC-018)
- **Warn/Refocus**: klare Grenze “Wellness”, keine Therapie/Heilclaims, ggf. Umformulierung erzwingen
- **Hard-Block**: Krisen-Hinweis + Ressourcen; keine Generierung, keine Abbuchung

### E) Library & Detail
- Library: Liste, Suche/Filter (später), Status-Badges (Skript vorhanden? Audio vorhanden?)
- Detail: Script-Versionen + Audio-Versionen, Export-Buttons, “Neu generieren” (später)

### F) Settings: Export/Löschung
- “Meine Daten exportieren” (DSAR light): Export anstoßen → Job-Status → Download-Link (signed URL, TTL)
- “Account löschen”: Confirmation Dialog → Async Delete Job → Bestätigung

## 4) Pausen-Editor (tag-free)
UI-Elemente:
- “Pause einfügen” zwischen Absätzen/Sätzen
- Pause-Chip/Block mit Dauer-Auswahl (0.5s/1s/2s/3s/5s)
- Auto-Pacing Default (aus `planung/pausen.md`), manuell nur Feintuning

Import/Export:
- Marker `[[pause:2s]]` nur für Copy/Paste/Export (nie SSML im Editor)

## 5) Design-System Defaults (MVP)
Ziel: Ein konsistentes, ruhiges UI ohne Design-Debatten im MVP.

**Komponenten**
- Buttons, Inputs, Selects, Dialogs, Toasts
- Stepper/Wizard
- Cards/Sections für Editor
- JobStatus/Progress, CreditBadge, SafetyNotice

**Typografie**
- Base: 16px, line-height großzügig (Skript lesen!), max line-length ~70–80 Zeichen
- Klare Überschriftenhierarchie (H1/H2/H3), ruhige Gewichtungen (nicht zu “bold”)

**Spacing/Layout**
- 8px Grid, großzügige Padding/Whitespace
- Desktop: Editor und “Meta/Job/Voice” als zwei Spalten möglich; Mobile: alles einspaltig

**Colors**
- Default: Light Theme im MVP (Dark später optional)
- Tokens (Beispiele): `background`, `foreground`, `muted`, `primary`, `danger`, `focus`
- Kontrast mind. WCAG AA, Fokus-Ring klar sichtbar

**A11y**
- Tastaturbedienung überall (Wizard, Editor, Player)
- Fokus sichtbar, Kontrast ≥ WCAG AA
- Fehlertexte an Feldern, ARIA Labels, Reduced Motion respektieren

## 6) UI-Ordnerstruktur (wenn Next.js Bootstrap da ist)
Ziel: “alles hat seinen Platz” und bleibt agentenfreundlich.

Vorschlag:
- `app/` routes (route groups: `(public)`, `(auth)`, `(app)`, `(admin)`)
- `components/ui/` (design-system primitives, z.B. shadcn/radix wrappers)
- `components/app/` (zusammengesetzte Komponenten: Wizard, Editor, JobStatus, Player)
- `features/`
  - `credits/` (estimate/reserve UI, wallet, ledger)
  - `safety/` (warn/block screens, reason codes)
  - `scripts/` (wizard/editor/versioning UI)
  - `tts/` (voice picker, audio job UI)
- `lib/` (utils, formatting, validators, API clients)

## 7) Offene UI-Entscheidungen (mit Bezug auf DEC)
- UI Component Library (DEC‑021): shadcn/ui vs. Radix only
- Script Editor (DEC‑022): Text+Blocks vs. Rich‑Text
- Job Updates (DEC‑023): Polling vs. SSE

## 8) Later (bewusst später)
- Musik/Binaural (lizenzsicher; DEC‑012)
- Sharing/UGC Features (DSA‑Scope)
- Vollständige Admin-UI (Operator kann initial config/CLI sein)
