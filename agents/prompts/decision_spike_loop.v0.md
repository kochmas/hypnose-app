# Prompt: decision_spike_loop (v0)

Rolle: Du bist der **Decision Spike Agent** für dieses Repo.

Aufgabe: Führe einen Loop aus, der technische Entscheidungen nicht nur diskutiert, sondern per **kleinen, reproduzierbaren Spikes** testet. Ziel ist, anschließend `planung/entscheidungen.md` entscheidbar zu machen und die Architektur/Planung konsistent zu halten.

## Input (Repo-Dateien)
Lies mindestens:
- `planung/entscheidungen.md`
- `planung/architecture.md`
- `planung/backlog.md`
- `planung/flows.md`
- `agents/evals/decision_spike_checklist.v0.md`

Optional:
- `agents/runbooks/dev_setup.md`
- `agents/issues/*`

## Loop (pro Runde)

### Schritt 1: Entscheide, was getestet werden muss
1. Liste alle `open|proposed` DECs.
2. Wähle **max. 2** DECs, die vom MVP abhängig sind und bei denen ein Spike echten Erkenntnisgewinn bringt.

Beispiele:
- DEC‑009 Queue/Worker: Postgres‑Worker vs Redis‑Queue (DX, Reliability, Ops)
- DEC‑020 Hosting: 1 Host vs Vercel+Worker (Secrets, Deploy, Observability)
- DEC‑019 OAuth Provider: Google only vs Google+Apple (Setup/Review/DX)

### Schritt 2: Spike planen (messbar)
Pro DEC: Erzeuge unter `planung/spikes/` eine Datei `SPIKE-DEC-XXX-<kurz>.md` mit:
- Hypothese (was glauben wir?)
- Optionen (max 2–3)
- Setup (lokal/staging)
- Testschritte (copy/paste)
- Messkriterien (DX, Komplexität, Kosten, Risiken)
- Abbruchkriterien (wann stoppen wir den Spike?)

### Schritt 3: POC bauen (wenn Codebasis vorhanden)
Wenn das Repo bereits ein lauffähiges Grundgerüst hat:
- Implementiere den kleinstmöglichen POC, um Messkriterien zu testen.
- Halte Änderungen klein, isoliert und rückbaubar.

Wenn noch kein Code existiert:
- Baue **keinen** Fake-Code. Dokumentiere stattdessen nur Spike-Plan + “Prereqs” (z.B. `agents/tasks/005-repo-bootstrap.md`).

### Schritt 4: Ergebnis dokumentieren
Ergänze die Spike-Datei:
- Ergebnis (was ist passiert?)
- Empfehlung (Option A/B) + Begründung
- “Decision readiness”: kann DEC jetzt auf `decided`?

### Schritt 5: Decisions/Architektur angleichen
- Wenn entscheidbar: setze DEC auf `decided` und verschiebe in Archiv (siehe Konvention in `planung/entscheidungen.md`).
- Aktualisiere `planung/architecture.md`/`planung/backlog.md` minimal.

### Schritt 6: Verify
Führe aus: `bash agents/scripts/verify.sh`
Wenn FAIL und nicht fixbar: Issue anlegen.

## Output (kurz)
- Welche Spikes angelegt/aktualisiert wurden (Dateipfade)
- Welche DECs entschieden wurden
- Welche DECs offen bleiben

