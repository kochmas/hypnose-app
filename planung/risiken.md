# Risiken (Safety/Legal): Womit man als Anbieter konfrontiert sein kann

> Hinweis: Keine Rechtsberatung. Das ist eine Risiko- und Maßnahmen-Checkliste für Produktplanung. Vor Launch: juristische Prüfung + ggf. psychologische/therapeutische Fachexpertise einbeziehen.

## 1) Worst-Case-Szenario (Beispiel)
Ein Nutzer ist in einer akuten Krise, erstellt viele Hypnose-/Selbstsuggestions-Inhalte, und ein generiertes Skript/Audioskript enthält (direkt oder indirekt) Aussagen, die Selbstschädigung normalisieren, verstärken oder als “Ausweg” rahmen. Kommt es zu einem Suizidversuch/Suizid, sind typische Folgen:
- Medien-/Reputationsschaden (sehr schnell, sehr hart)
- Zivilrechtliche Ansprüche (Schadensersatz/Schmerzensgeld etc.) + Anwaltsschreiben
- Datenschutz-/Sicherheitsfragen (Welche Daten habt ihr gespeichert? Wer hatte Zugriff?)
- Regulatorisches Interesse (je nach Claims/Einordnung als Gesundheitsprodukt/Medizinprodukt)

## 2) Rechtliche/operative Risikofelder (typisch)

### A) Zivilrechtliche Haftungsrisiken (Vertrag + Delikt)
**Womit ihr konfrontiert sein könnt:**
- Vorwurf, ihr hättet fahrlässig Inhalte generiert/ausgespielt, die vorhersehbar schädlich sind.
- Vorwurf, ihr hättet Warn-/Sorgfaltspflichten verletzt (fehlende Schranken, fehlende Hinweise, fehlende Sperren bei Krisensignalen).
- Streit über Kausalität: “Hat das Tool dazu beigetragen?” (auch wenn schwer beweisbar, kann es Prozesse geben).

**Was hilft (Risikosenkung, nicht “Immunität”):**
- Klare Produktgrenzen (Wellness/Entspannung statt Behandlung), keine Heilversprechen.
- Safety-by-design: Krisen-/Selbstgefährdungs-Signale erkennen → nicht generieren, sondern Hilfe-Hinweise/Resources.
- Gute Dokumentation der Maßnahmen (Policies, Tests, Monitoring, Incident-Runbooks).

### B) Produkthaftung / “Produktfehler”-Vorwürfe
**Womit ihr konfrontiert sein könnt:**
- Argumentation, dass ein fehlerhaftes Produkt (inkl. Software) zu Gesundheitsschäden beitrug.
- Unabhängig von AGB/Haftungsausschlüssen (Produktliabilität ist i.d.R. nicht “wegzuklicken”).

**Praktische Konsequenz:**
- Sicherheits-/Qualitätsanforderungen sind nicht nur “nice to have”, sondern haftungsrelevant (Updates, bekannte Risiken, klare Zweckbestimmung).

### C) Einordnung als Medizinprodukt (Regulatorik)
**Womit ihr konfrontiert sein könnt:**
- Wenn ihr (durch Marketing, UI, Texte) den Eindruck erweckt, Depression/Angst/PTBS etc. “zu behandeln”, kann das in Medizinprodukte-Regeln rutschen (CE, QMS, Clinical Evidence, PMS, etc.).
- Auch “nur Software” kann relevant sein, wenn die Zweckbestimmung medizinisch ist.

**Risikosenkung:**
- Claim-Disziplin (keine Therapie-/Heil-Claims, keine Diagnostik, keine “Behandlung” suggerieren).
- Im Zweifel: früh regulatorisch beraten lassen, bevor ihr Marketing/Positionierung festnagelt.

### D) Werberecht / Irreführung / Heilmittelwerberecht
**Womit ihr konfrontiert sein könnt:**
- Abmahnungen wegen irreführender Versprechen (“garantiert”, “klinisch bewiesen” ohne Nachweise).
- Speziell im Gesundheitsumfeld sind Claims sehr sensibel (Belege, “success guarantee”, Nebenwirkungsfreiheit etc.).

### E) Datenschutz (DSGVO) & Sicherheit
**Womit ihr konfrontiert sein könnt:**
- Eingaben enthalten schnell “Gesundheitsdaten” oder sehr intime Informationen → höheres Schutz-/Risikoniveau.
- Datenpannen → Meldepflichten, Bußgelder, Vertrauensverlust.
- Drittlandtransfer (LLM/TTS) → zusätzliche Governance, AV-Verträge.

**Risikosenkung:**
- Datensparsamkeit, kurze Retention, Verschlüsselung, strikte Zugriffsrechte.
- BYO-Optionen (Keys clientseitig), klare Transparenz.

### F) KI-spezifische Risiken (Output, Drift, Prompt-Missbrauch)
**Womit ihr konfrontiert sein könnt:**
- Modelle “driften”, Provider ändern Verhalten/Qualität.
- Prompt-Injection / Jailbreaks (Expert-Mode) → Safety-Bypass.
- Wiederholte Nutzung kann bei vulnerablen Personen problematische “Echokammer”-Effekte verstärken (auch ohne böse Absicht).

**Risikosenkung:**
- Mehrstufige Safety-Checks (Input + Output), nicht nur “Prompt”.
- Hard Blocks für bestimmte Themen (Selbstverletzung, akute Krise).
- Monitoring: Fehlermuster, Report-Button, schnelle Deaktivierung problematischer Templates/Modelle.

### G) Payment/Fraud/Abuse (Credits)
**Womit ihr konfrontiert sein könnt:**
- Chargebacks, gestohlene Karten, Bot-Nutzung.
- “Credit washing” / reselling Accounts.

**Risikosenkung:**
- Rate-Limits, KYC-light bei Auffälligkeiten, Risiko-Scoring, Limits pro Tag, Device-Fingerprinting (DSGVO/TDDDG-konform!), Fraud-Provider.

### H) IP/Rechte (Audio, Musik, Stimmen)
**Womit ihr konfrontiert sein könnt:**
- Unsaubere Musiklizenzen, Rechteketten unklar.
- Voice/Cloning → Einwilligungen/Verträge + Missbrauch (Impersonation).

## 3) Konkrete Maßnahmen für das “Suizid-/Krisen”-Risiko
**Ziel:** Nicht “perfekt erkennen”, sondern “robust verhindern, dass euer System Krisen verstärkt”.

Produktmaßnahmen:
- “Nicht für Krisen” klar kommunizieren (Onboarding + in der App, nicht nur im Footer).
- Input-Detektion: Hinweise auf Selbstgefährdung → Generation stoppen + Hilfsangebote anzeigen.
- Output-Detektion: Kein Output, der Selbstverletzung normalisiert, anleitet oder romantisiert; bei Fehlern hard-fail.
- Topic-Policy: bestimmte Themen komplett sperren (z.B. Suizid, Selbstverletzung, akute Krise, Gewalt gegen sich/andere).
- Warn/Refocus statt Block (DEC‑018): bei mentalen Gesundheitsthemen (Trauma/PTBS, Depression/Angst, akute Psychose) nur Wellness‑/Entspannungs‑Output, keine Therapie-/Heil‑Claims; bei Krisensignalen bleibt Hard‑Block (`planung/safety-policy.md`).
- Audit: Templates/Prompts auf riskante Formulierungen testen (Red-Teaming).

Operative Maßnahmen:
- Meldebutton (“Inhalt problematisch”) + schneller Takedown von Templates/Voices.
- Incident-Runbook: wer entscheidet, was wird deaktiviert, welche Kommunikation, welche Daten werden gesichert.

## 4) Praktisches “Minimum” für den Start (MVP)
- Ein Safety-Policy-Dokument (was ihr generiert / nicht generiert).
- Krisen-Blocker (Input/Output) + Logging der Block-Events (minimal, datensparsam).
- Claim-Review (Marketing/Website/App-Texte) vor jeder Veröffentlichung.
- Provider-ToS-Check (Reselling, Voice, Health use-cases).

Policy-Doc: `planung/safety-policy.md`
