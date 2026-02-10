# Ungereimtheiten-Log (Implementierung ↔ Planung/UI/Architektur)

Dieses Dokument sammelt Abweichungen zwischen Implementierung und den Referenzdokumenten unter `planung/`.

Ziel:
- Inkonsistenzen frueh sichtbar machen
- Fixes und offene Punkte nachvollziehbar halten
- Entscheidungsbedarf klar markieren

## Eintragsformat (pro Runde)
- **Datum:** YYYY-MM-DD
- **Scope:** z.B. "Repo bootstrap", "Credits reserve/capture", "Safety input gate"
- **Gepruefte Dateien:** Liste der betroffenen Code/Doc-Dateien
- **Findings:** Liste oder "keine Findings"

Fuer jedes Finding:
- `severity`: low|medium|high|critical
- `area`: ui|architecture|planning|legal|privacy|billing|safety|ops|other
- `type`: missing|incorrect|unclear|drift
- `action`: fixed-now | issue | decision-needed
- `status`: open | resolved
- `referenzen`: betroffene Dateien/DEC/Issue

---

## Runde: 2026-02-10 (Initialisierung des Logs)
- **Scope:** Setup des Alignment-Workflows
- **Gepruefte Dateien:** `agents/tasks/130-implementation-alignment-loop.md`, `agents/prompts/implementation_alignment_loop.v0.md`
- **Findings:** keine Findings (Initial-Setup)

## Runde: 2026-02-10 (Repo-Bootstrap Alignment)
- **Scope:** Abgleich der bestehenden Repo-Bootstrap-Implementierung gegen Planung/UI/Architektur
- **Gepruefte Dateien:** `planung/architecture.md`, `planung/ui.md`, `planung/flows.md`, `planung/entscheidungen.md`, `docs/umsetzung.md`, `src/app/page.tsx`, `src/app/api/jobs/sleep/route.ts`, `src/app/api/jobs/[id]/route.ts`, `src/worker/worker.ts`
- **Findings:**
  - `severity: low`
    `area: architecture`
    `type: drift`
    `action: fixed-now`
    `status: resolved`
    `referenzen: planung/architecture.md`  
    Beschreibung: Package-Manager-Angaben waren auf `pnpm` fixiert, Implementierung/Runbooks nutzen `npm` als Default.
  - `severity: low`
    `area: architecture`
    `type: drift`
    `action: fixed-now`
    `status: resolved`
    `referenzen: planung/architecture.md`  
    Beschreibung: Repo-Struktur in Architektur-Doku (`app/`, `worker/`) wich vom aktuellen Code (`src/app/`, `src/worker/`, `src/server/`) ab.
  - `severity: low`
    `area: planning`
    `type: incorrect`
    `action: fixed-now`
    `status: resolved`
    `referenzen: docs/umsetzung.md`  
    Beschreibung: Trade-off-Hinweis zu Build-Warnungen war veraltet; aktualisiert auf den verbleibenden Verifikationspunkt (lokales E2E ohne Docker).

## Runde: 2026-02-10 (MVP Slice 01 Legal Baseline Alignment)
- **Scope:** Abgleich der Legal-Baseline-Implementierung gegen Planung/UI/Architektur
- **Gepruefte Dateien:** `planung/backlog.md`, `planung/rechtstexte.md`, `planung/ui.md`, `planung/flows.md`, `planung/entscheidungen.md`, `src/app/page.tsx`, `src/app/_components/SleepJobDemo.tsx`, `src/app/_components/SiteLegalLinks.tsx`, `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx`, `src/app/agb/page.tsx`, `src/server/legal/versions.ts`, `docs/umsetzung.md`
- **Findings:** keine Findings
