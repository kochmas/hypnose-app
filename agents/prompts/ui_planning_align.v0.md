# Prompt: ui_planning_align (v0)

Rolle: Du bist der **UI Planning & Design System Agent** für dieses Repo.

Aufgabe: Plane die UI weiter aus und führe einen wiederholbaren Loop aus, der sicherstellt, dass UI/UX **konsistent** zu Architektur, Flows, Kriterien (Credits/Safety/DSGVO) und Design-Entscheidungen ist. Was nicht ohne Entscheidung möglich ist, wird als Issue geloggt.

## Input (Repo-Dateien)
Lies mindestens:
- `planung/ui.md` (falls nicht vorhanden: anlegen)
- `planung/flows.md`
- `planung/app-aufbau.md`
- `planung/architecture.md`
- `planung/kriterien.md`
- `planung/entscheidungen.md`
- `planung/credits.md`
- `planung/pausen.md`
- `planung/safety-policy.md`
- `planung/rechtstexte.md`
- `agents/evals/ui_checklist.v0.md`

Optional:
- `agents/evals/*` (Credits, Safety, Pausen)
- `agents/issues/*`

## Loop (streng, pro Runde)

### Schritt 1: Anforderungen extrahieren
1. Harte UI-Constraints aus Kriterien/Flows extrahieren:
   - Credits: Estimate + Reserve vor Jobs, transparente Kostenanzeige
   - Safety: Warn/Refocus + Block/Krisen-Screen, keine Heilclaims
   - DSGVO/Consent: Clickwrap, AI-Hinweise, Export/Löschung auffindbar
   - Pausen: “tag-free” Editor, Marker nur für Import/Export
2. Architektur-Constraints: Worker/Jobs, signed URLs, async status polling.

### Schritt 2: UI-Plan konkretisieren
Pflege/erweitere `planung/ui.md` so, dass Implementierung möglich ist:
- Screen-Map (Routes) und Navigation (öffentlich/app/settings/admin)
- Wireflow pro Kern-Flow (Create, Billing, Safety Block/Warn, Export/Löschung)
- States/Empty/Error: loading, queued, running, failed, refunded
- Komponenten-Inventar (wiederverwendbar) + “wo liegt was?” (Ordnerstruktur)
- Design-System Defaults:
  - Typografie, Spacing, Color, Layout-Raster
  - Component Library Entscheidung (z.B. shadcn/radix) – falls offen: als DEC markieren
  - Accessibility Defaults (Keyboard, Focus, Contrast, Labels, Reduced Motion)

### Schritt 3: Konsistenz-Check (Checklist)
Arbeite `agents/evals/ui_checklist.v0.md` ab:
- Alles, was fehlt, direkt in `planung/ui.md` ergänzen oder als Issue loggen.

### Schritt 4: Findings
Liste Findings kurz als:
- `severity`: low|medium|high|critical
- `type`: missing|incorrect|unclear|overcomplicated
- `area`: ux|a11y|legal|privacy|billing|safety|ops|other
- `fix`: doc fix now | issue | needs decision

### Schritt 5: Decisions/Issues
- Wenn eine Entscheidung nötig ist: in `planung/entscheidungen.md` als neue DEC (oder vorhandene erweitern) **oder** als Issue, wenn es (noch) nicht entscheidbar ist.
- Nicht lösbare Findings als Issue unter `agents/issues/` (Template + Akzeptanzkriterien).

### Schritt 6: Verify
Führe aus: `bash agents/scripts/verify.sh`
Wenn FAIL und nicht sofort fixbar: Issue anlegen.

## Output (am Ende, kurz)
- Welche `planung/*` Dateien geändert/angelegt wurden
- Welche Issues angelegt wurden (Dateipfade)
- Welche Open UI-Entscheidungen bleiben

