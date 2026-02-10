# ISSUE-0003: npm audit vulnerabilities (moderate)

## Meta
- Status: closed
- Severity: medium
- Bereich: security
- Erstellt: 2026-02-10
- Owner: (optional)

## Beschreibung
`npm audit` meldete moderate Vulnerabilities in der Dev-Toolchain (Vite/Vitest → `esbuild`).

## Impact
Risiko im Dev-Server-Kontext (Requests an Dev-Server + Response lesen). Betrifft i.d.R. nicht Production, aber sollte im Repo trotzdem sauber sein.

## Reproduktion / Nachweis
- `npm audit`

## Erwartetes Verhalten
- `npm audit` ist sauber (0 vulnerabilities).

## Vorschlag / Fix-Plan
1. `package.json` um `overrides.esbuild` ergänzen (auf `^0.25.0`).
2. `npm install`
3. `npm audit` prüfen.

## Akzeptanzkriterien
- [x] `npm audit` zeigt 0 vulnerabilities

## Notes
- Fix: `package.json` overrides
