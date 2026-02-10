# ISSUE-0004: Consent records not yet mapped to authenticated user

## Meta
- Status: open
- Severity: medium
- Bereich: privacy
- Erstellt: 2026-02-10
- Owner: (optional)

## Beschreibung
Die aktuellen Consent-Eintraege werden ueber einen anonymen `subjectKey` (LocalStorage) gespeichert.
Es gibt im MVP-Slice noch keine Zuordnung zu einem authentifizierten User-Konto.

## Impact
- Bei Multi-Device-Nutzung sind Consents nicht automatisch synchron.
- Bei spaeterem Login kann die Nachweisfuehrung pro User inkonsistent sein.
- Datenschutz/Legal-Reviews brauchen zusaetzliche Erklaerung, warum Consent nur clientseitig gebunden ist.

## Reproduktion / Nachweis
1. Generierungsflow aufrufen und Pflicht-Consents setzen.
2. Browser/Profil wechseln oder LocalStorage loeschen.
3. Consent-Status ist erneut "nicht gesetzt", obwohl kein User-gebundenes Mapping existiert.

Nachweis in Code:
- `src/app/_components/SleepJobDemo.tsx` (`hypnose.consentSubjectKey` im LocalStorage)
- `src/app/api/consents/*` (`subjectKey` als primaerer Schluessel)
- `prisma/schema.prisma` (`ConsentRecord.subjectKey` ohne `userId`)

## Erwartetes Verhalten
Nach Auth-Einfuehrung sollen Consent-Daten primär an `userId` gebunden werden (optional mit Migration vom anonymen Subject-Key).

## Vorschlag / Fix-Plan
1. `User`-Modell/Auth-Slice finalisieren.
2. `ConsentRecord` um `userId` erweitern und geeignete Indizes/Uniques definieren.
3. Beim Login vorhandene anonymen Consents optional uebernehmen/mergen.
4. Consent-API auf user-basiertes Lesen/Schreiben umstellen.
5. Regression-Tests fuer Device-Wechsel + Login-Migration ergaenzen.

## Akzeptanzkriterien
- [ ] Consent-Status bleibt nach Login ueber Sessions/Devices konsistent pro User.
- [ ] Consent-Nachweise enthalten `userId`, Dokumentversion und Timestamp.
- [ ] Anonymer Fallback ist dokumentiert und technisch klar abgegrenzt.

## Notes
- Task: `agents/tasks/150-implementation-clickwrap-consent.md`
- Traceability: `docs/umsetzung.md`
- Alignment-Log: `docs/ungereimtheiten.md`
- Planung: `planung/rechtstexte.md`, `planung/flows.md`, `planung/kriterien.md`
