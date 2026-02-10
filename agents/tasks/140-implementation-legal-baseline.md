# Task: MVP Slice 01 - Public Legal Baseline + AI-Transparenz

## Ziel
- [ ] Eine erste produktnahe, oeffentliche Basis steht: rechtliche Pflichtseiten sind vorhanden und die KI-Weitergabe ist im UI klar sichtbar.

## Kontext / Links
- `planung/backlog.md` (Epic 1, P0)
- `planung/rechtstexte.md`
- `planung/kriterien.md`
- `planung/ui.md`
- `planung/flows.md` (Flow A, Flow C)
- `planung/entscheidungen.md` (DEC-001, DEC-014)
- `agents/tasks/130-implementation-alignment-loop.md`
- `docs/ungereimtheiten.md`

## Scope (In / Out)
**In:**
- [ ] Oeffentliche Seiten anlegen: `/impressum`, `/datenschutz`, `/agb` (MVP-Platzhalterstruktur, klar als vorlaeufig markiert)
- [ ] Home/App-Einstieg verlinkt die Rechtstexte sichtbar (Footer oder Header)
- [ ] KI-Hinweis direkt am Generierungs-CTA einbauen ("Text wird an KI-Dienstleister uebertragen ...")
- [ ] Zentrale Rechtsdokument-Versionen als Code-Konstante ablegen (Basis fuer spaeteres Clickwrap-Logging)
- [ ] Kleine, stabile Tests fuer die neuen, deterministischen Helper/Konstanten
- [ ] Traceability und Alignment-Doku aktualisieren (`docs/umsetzung.md`, `docs/ungereimtheiten.md`)

**Out:**
- [ ] Finale juristische Formulierungen (externe Rechtspruefung)
- [ ] Vollstaendiges Clickwrap-Logging mit User-Konto und Consent-Historie (eigener Folgetask)
- [ ] Cookie-Banner/Tracking-Consent fuer Third-Party-Tools (nur wenn solche Tools eingefuehrt werden)

## Etappen
- [ ] Etappe 1: Public Legal Routes + gemeinsame Navigation/Fusszeile
- [ ] Etappe 2: AI-Transparenzhinweis am Generierungs-Flow
- [ ] Etappe 3: Rechtstexte-Versionierung als technische Basis
- [ ] Etappe 4: Tests + Doku + Alignment-Loop + Verify

## Akzeptanzkriterien
- [ ] Die Seiten `/impressum`, `/datenschutz`, `/agb` sind erreichbar und von der Startseite aus verlinkt
- [ ] Vor dem Start eines Generierungsjobs ist ein klarer KI-Transparenzhinweis im UI sichtbar
- [ ] Versions-Konstanten fuer Rechtstexte sind zentral abgelegt und per Test abgesichert
- [ ] `docs/umsetzung.md` enthaelt den Mapping-Abschnitt (Planung -> Code -> Tests -> Trade-offs)
- [ ] Alignment-Check gegen Planung/UI/Architektur wurde durchgefuehrt
- [ ] `docs/ungereimtheiten.md` wurde aktualisiert (auch bei "keine Findings")
- [ ] `bash agents/scripts/verify.sh` ist PASS

## Risiken / offene Punkte
- [ ] Ohne finale Rechtstexte bleiben Seiten explizit "vorlaeufig"; juristische Finalisierung als separater Schritt einplanen
- [ ] Consent-Logging bleibt bis zum Auth/Account-Slice unvollstaendig (Follow-up Task noetig)

## Betroffene Dateien
- [ ] `src/app/page.tsx`
- [ ] `src/app/layout.tsx`
- [ ] `src/app/impressum/page.tsx`
- [ ] `src/app/datenschutz/page.tsx`
- [ ] `src/app/agb/page.tsx`
- [ ] `src/server/legal/versions.ts`
- [ ] `src/server/legal/versions.test.ts`
- [ ] `docs/umsetzung.md`
- [ ] `docs/ungereimtheiten.md`

## Prüfen
- [ ] `bash agents/scripts/verify.sh`
- [ ] Alignment-Loop gemaess `agents/tasks/130-implementation-alignment-loop.md` ausgefuehrt
- [ ] Manuell: Startseite zeigt Links auf alle drei Rechtstext-Seiten
- [ ] Manuell: KI-Hinweis ist unmittelbar beim Generierungs-CTA sichtbar

## Notes
- Diese Task ist bewusst klein gehalten und liefert den ersten "produktnahen" Slice nach dem Repo-Bootstrap.
