# Rechtstexte & Nutzer-Bestätigungen (AGB/Datenschutz/Consent)

> Hinweis: Keine Rechtsberatung. Ziel ist ein praktikabler Plan für **welche Texte** benötigt werden und **wie** Nutzer-Bestätigungen sauber umgesetzt werden.

## 1) Welche Dokumente braucht die Web-App typischerweise (DE/EU)?
- **Impressum** (Anbieterkennzeichnung)
- **Datenschutzerklärung** (Art. 13/14 DSGVO)
- **AGB/ToS** (vertragliche Regeln; nicht zwingend, aber sinnvoll)
- **Widerrufsbelehrung** + Infos zu digitalen Inhalten (bei B2C-Verträgen)
- **Preis-/Leistungsübersicht** (Credits, Abos, Kontingente)
- **Cookie-/Consent-Hinweise** (falls nicht notwendige Cookies/Tools)
- Optional: **Nutzungsrichtlinien** (Content Policy), **Safety-Hinweise**, **Transparenz zu KI**

## 2) Wo muss “Daten gehen an LLM/TTS-Provider” rein?

### Datenschutz (Pflicht)
In die **Datenschutzerklärung** gehört konkret:
- Zwecke: z.B. “Generierung von Skripten (LLM)”, “Audio-Erzeugung (TTS)”
- Rechtsgrundlage (z.B. Vertragserfüllung, ggf. Einwilligung bei besonderen Daten)
- Empfänger/Kategorien: LLM-/TTS-Dienstleister, Hosting, Payment etc.
- Drittlandtransfer (falls zutreffend) + Schutzmaßnahmen (SCCs etc.)
- Speicherdauer/Retention (Input/Output/Logs/Audio)

### AGB/ToS (sinnvoll)
In die **AGB** kann (und sollte) rein:
- Dass zur Leistungserbringung **KI-Dienste Dritter** genutzt werden und Eingaben/Outputs dafür verarbeitet werden.
- Dass Nutzer **keine Rechte Dritter verletzen** dürfen und keine fremden personenbezogenen Daten ohne Rechtsgrundlage eingeben.
- Qualitäts-/Haftungsrahmen (kein Heilversprechen, keine Therapie, keine garantierten Ergebnisse).
- Regeln für BYO-Keys (wenn angeboten): Verantwortung, Limits, keine Speicherung (wenn so umgesetzt).

## 3) “Bestätigungen” in der App: Was muss man wirklich bestätigen lassen?
Wichtig: “Bestätigung” ersetzt nicht automatisch die passende Rechtsgrundlage. Praktisch braucht ihr aber **Clickwrap** für Verträge und ggf. **Einwilligungen** für bestimmte Verarbeitungen.

### A) Vertrag / AGB (Clickwrap)
Bei Registrierung / erstem Kauf:
- Checkbox: “Ich akzeptiere die AGB” (mit Versions-/Datumshinweis, Link)
- Optional: “Ich habe die Datenschutzerklärung zur Kenntnis genommen” (keine Einwilligung, eher Acknowledgement)

**Speichern:** Zeitstempel, Terms-Version, User-ID (und ggf. IP/User-Agent, datensparsam begründen).

### B) Datenschutz-Einwilligungen (nur wo nötig)
Separate, granulare Opt-ins (nicht in einer “Alles akzeptieren”-Checkbox mischen):
- Analytics/Marketing-Cookies (über Consent-Banner)
- Newsletter/Marketing-E-Mails
- Optional: “Inhalte zur Verbesserung des Produkts verwenden” (wenn ihr das überhaupt wollt)

**Sonderfall Art. 9 DSGVO (Gesundheitsdaten):**
- Wenn ihr Eingaben erwartet, die Gesundheitsdaten enthalten können, braucht ihr entweder:
  - Produktdesign, das solche Inhalte **vermeidet** (Hinweise + Filter + keine Speicherung), oder
  - **explizite Einwilligung** für die Verarbeitung solcher Daten (klar getrennt, widerrufbar) + zusätzliche Schutzmaßnahmen.

### C) “AI-Processing Acknowledgement” vor Generierung (produktpraktisch)
Auch wenn ihr rechtlich auf Vertragserfüllung basiert, ist es sinnvoll UX-seitig:
- kurzer Hinweis direkt am “Generieren”-Button:
  - “Dein Text wird zur Generierung an KI-Dienstleister (LLM/TTS) übertragen. Bitte keine sensiblen Daten/keine Daten Dritter eingeben.”
- optional Checkbox/Toggle (einmalig, dann gespeichert):
  - “Ich verstehe und möchte fortfahren.”

Das ist weniger “Einwilligung” als “informierte Nutzung”.

## 4) Minimaler Umsetzungsplan (MVP)
1. **AGB/ToS v1**: KI-Nutzung, Nutzungsregeln, Haftungsrahmen, Credits/Refunds, BYO.
2. **Datenschutzerklärung v1**: KI-Anbieter als Empfänger, Transfers, Retention.
3. **Consent-Banner**: nur technisch nicht notwendige Tools.
4. **Clickwrap + Consent-Logging**: Versionsnummern, Zeitstempel.
5. **In-App AI-Hinweis** beim Generieren + “Don’t enter sensitive data” Copy.

