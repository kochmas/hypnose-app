# Task: MVP Slice 02 - Clickwrap & Consent-Logging

## Ziel
- [ ] Clickwrap/Consent ist technisch umgesetzt: Pflicht-Consents werden gespeichert und serverseitig vor Generierungsjobs durchgesetzt.

## Kontext / Links
- `planung/backlog.md` (Epic 1, P0)
- `planung/rechtstexte.md`
- `planung/flows.md` (Flow A, Flow C)
- `planung/kriterien.md`
- `planung/entscheidungen.md` (DEC-001, DEC-014)
- `agents/evals/consent_logging.v0.md`
- `agents/tasks/130-implementation-alignment-loop.md`
- `docs/ungereimtheiten.md`

## Scope (In / Out)
**In:**
- [ ] Consent-Datenmodell in DB (Version + Timestamp + Typ + Subject-Key)
- [ ] API fuer Consent-Status, Accept und optionalen AI-Hinweis-Widerruf
- [ ] Clickwrap-UI im Generierungsflow (AGB Pflicht, Datenschutz Kenntnisnahme Pflicht, AI-Hinweis optional)
- [ ] Serverseitige Blockade fuer Generierungsjob ohne Pflicht-Consents
- [ ] Tests fuer Consent-Logik + Doku/Traceability + Alignment-Eintrag

**Out:**
- [ ] Vollstaendiges Auth-basiertes User-Mapping
- [ ] Cookie-Banner/Tracking-Consent fuer Third-Party-Tools
- [ ] Finale juristische Textfassung

## Etappen
- [ ] Etappe 1: Consent-Schema + Migration + Server-Helper
- [ ] Etappe 2: Consent-API (status/accept/revoke) + Job-Gating
- [ ] Etappe 3: Clickwrap-UI an Generierungs-CTA
- [ ] Etappe 4: Tests + Doku + Alignment + Verify

## Akzeptanzkriterien
- [ ] Ohne AGB+Datenschutz-Consent startet kein Generierungsjob
- [ ] Consent-Status ist fuer Subject-Key abrufbar und versioniert
- [ ] AI-Hinweis kann optional bestaetigt und widerrufen werden
- [ ] Tests fuer Consent-Regeln sind vorhanden und gruen
- [ ] Alignment-Check gegen Planung/UI/Architektur wurde durchgefuehrt
- [ ] `docs/ungereimtheiten.md` wurde aktualisiert (auch bei "keine Findings")
- [ ] `bash agents/scripts/verify.sh` ist PASS

## Risiken / offene Punkte
- [ ] Subject-Key ist im MVP noch anonym und nicht an Auth-User gebunden
- [ ] Finale Consent-Policy (z.B. IP/UA Logging) bleibt juristisch/produktseitig zu klaeren

## Betroffene Dateien
- [ ] `prisma/schema.prisma`
- [ ] `prisma/migrations/*`
- [ ] `src/server/legal/consent.ts`
- [ ] `src/app/api/consents/*`
- [ ] `src/app/api/jobs/sleep/route.ts`
- [ ] `src/app/_components/SleepJobDemo.tsx`
- [ ] `src/server/legal/consent.test.ts`
- [ ] `docs/umsetzung.md`
- [ ] `docs/ungereimtheiten.md`

## Prüfen
- [ ] `bash agents/scripts/verify.sh`
- [ ] Alignment-Loop gemaess `agents/tasks/130-implementation-alignment-loop.md` ausgefuehrt
- [ ] Manuell: Jobstart ohne Pflicht-Checkboxen zeigt Blockade
- [ ] Manuell: Nach Consent-Setzung startet Job erfolgreich
