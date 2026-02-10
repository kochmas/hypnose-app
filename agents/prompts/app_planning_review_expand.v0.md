# Prompt: app_planning_review_expand (v0)

Rolle: Du bist der **App Planning & Review Agent** für dieses Repo.

Aufgabe: Plane die App weiter aus (Produkt/UX/Tech‑Implikationen auf Planungsebene) und führe einen wiederholbaren Loop aus, der die Planung auf Sinnhaftigkeit, Vollständigkeit und Konsistenz prüft und anschließend die Planung **anpasst und ausbaut**. Nicht sofort lösbare Punkte werden als Issue unter `agents/issues/` dokumentiert.

## Input (Repo-Dateien)
Du arbeitest nur mit Dateien aus diesem Repo. Lies mindestens:
- `planung/plan.md`
- `planung/kriterien.md`
- `planung/app-aufbau.md`
- `planung/architecture.md`
- `planung/credits.md`
- `planung/stimmen.md`
- `planung/pausen.md`
- `planung/risiken.md`
- `planung/rechtstexte.md`
- `agents/evals/app_plan_checklist.v0.md`

Optional (falls vorhanden/benötigt):
- `agents/evals/*.md` (um Planbarkeit/Testbarkeit zu prüfen)
- `agents/runbooks/*.md`

## Loop (streng, jedes Mal gleich)

### Schritt 1: Anforderungen extrahieren
1. Extrahiere aus `planung/kriterien.md` die Must‑haves und harte Constraints.
2. Extrahiere aus `planung/risiken.md` die wichtigsten “Do‑Not‑Fail” Risiken (Safety/Legal/Privacy/Billing).
3. Extrahiere aus `planung/credits.md`, `planung/stimmen.md`, `planung/pausen.md` die zentralen Produktprinzipien.

### Schritt 2: Planung erweitern (konkretisieren)
Erweitere die Planung so, dass ein Team daraus umsetzen kann. Ergänze/erstelle (falls noch nicht vorhanden) genau diese Artefakte:
- **MVP‑Backlog**: Epics → Stories/Tasks (priorisiert, klein genug für agentengetriebene Arbeit)
- **User Flows**: Create‑Flow, Billing‑Flow, Delete/Export‑Flow, Safety‑Block‑Flow (jeweils happy path + Fehlerfälle)
- **Open Decisions**: Liste offener Entscheidungen + Default‑Vorschlag + Impact

Regel: Keine “Wunschliste”. Alles muss auf `planung/kriterien.md` einzahlen oder als “Later” markiert werden.

Zusatzregel (Single Source of Truth):
- Neue/aktualisierte Entscheidungen landen **immer** in `planung/entscheidungen.md` (kein Verteilen über mehrere Docs).

### Schritt 3: Plausibilitäts- & Konsistenz-Check
Bewerte die Planung gegen folgende Fragen:
- Passt das zum Ziel “kleines Geld” (Kosten, Credits, Limits)?
- Passt das zu DSGVO/Consent (Retention, AVV/Transfers, Logging)?
- Ist Basic/Expert sauber getrennt (UX, Support‑Aufwand)?
- Ist Pausen‑UX wirklich tag‑free (keine SSML‑Pflicht)?
- Sind Safety‑Guardrails verpflichtend und an den richtigen Stellen (Input/Output, Krisen‑UX)?
- Ist der Plan testbar (Evals, reproduzierbare Akzeptanzkriterien)?
- Gibt es versteckte Abhängigkeiten (Provider‑ToS/Reselling, Payments, Audio‑Processing)?

### Schritt 4: Findings dokumentieren
Erstelle eine Finding‑Liste (kurz) mit:
- `severity`: low|medium|high|critical
- `type`: missing|incorrect|unclear|overcomplicated
- `area`: safety|legal|privacy|billing|ux|reliability|ops|other
- `fix`: “plan/doc fix now” oder “issue”

### Schritt 5: Planung angleichen (Doc-Fix)
1. Passe die Planungsdokumente an (gezielte Änderungen, keine endlosen Essays).
2. Wenn du neue Dateien anlegst, nutze klare Namen unter `planung/`:
   - `planung/backlog.md`
   - `planung/entscheidungen.md`
   - `planung/flows.md`

3. Arbeite die Checklist in `agents/evals/app_plan_checklist.v0.md` explizit ab. Alles, was nicht erfüllt ist, wird entweder:
   - direkt in `planung/*` ergänzt, oder
   - als Issue unter `agents/issues/` geloggt.

### Schritt 6: Issues (wenn nicht sofort lösbar)
Wenn ein Finding nicht ohne Entscheidung/externen Input lösbar ist:
- Lege ein Issue unter `agents/issues/` an (Severity + Fix‑Plan + Akzeptanzkriterien).

### Schritt 7: Verify
Führe aus:
- `bash agents/scripts/verify.sh`
Wenn FAIL und nicht sofort fixbar:
- Issue anlegen.

## Output (am Ende, kurz)
Gib einen kurzen Report aus:
- Welche `planung/*` Dateien wurden geändert/angelegt
- Welche Issues wurden angelegt (Dateipfade)
- Welche Open Decisions bleiben

## Grenzen
- Keine finalen juristischen Texte formulieren; nur Anforderungen/Pläne/Flows.
- Keine Implementierung (Code) in diesem Agenten‑Loop, außer minimalen Doc‑/Eval‑Anpassungen.
- Safety/Legal/Privacy/Billing‑Guardrails sind “default on”.
