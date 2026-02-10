# Kriterien

> Hinweis: Diese Checkliste ist keine Rechtsberatung. Vor Launch sollte das Setup (Impressum/Datenschutz/AGB/Claims) juristisch geprüft werden.

## Produkt-Ziel (kurz)
- [ ] Nutzer können in wenigen Minuten ein **Hypnose-Skript** erstellen.
- [ ] Nutzer können daraus eine **Audio-Hypnose** generieren oder importieren (BYO).
- [ ] Ergebnis ist **speicherbar, wiederauffindbar und exportierbar**.

## MVP (MoSCoW)
### Must-have
- [ ] Assistent/Flow: Ziel, Sprache, Länge, Tonalität, “Do’s & Don’ts”
- [ ] Skript-Generator: Template + strukturierte Ausgabe (Einleitung, Vertiefung, Suggestionen, Rückführung)
- [ ] Audio-Generator: TTS-Ausgabe mit **Pausen/Timing** (ohne dass Nutzer SSML/HTML tippen müssen; “tag-free” Pausen-UI/Marker)
- [ ] Export: MP3/M4A (mindestens eins) + Skript als Text/Markdown
- [ ] Bibliothek: Liste der erstellten Hypnosen + Detailansicht
- [ ] Safety: klare Disclaimer + Sperren/Warnings für riskante Themen (konfigurierbar)
- [ ] UI: Basic (Tiers) als Default + optionaler Expert-Modus (direkte Modell-/Voice-Auswahl) mit Kostenschätzung

### Should-have
- [ ] BYO-Prompting: Prompt-Editor + “Paste/Import” von LLM-Ergebnis
- [ ] BYO-TTS: Import von Audio (WAV/MP3) + optionales Post-Processing (Lautheit/Fades)
- [ ] Varianten: “Regenerieren” einzelner Abschnitte (z.B. Suggestionen) statt alles neu
- [ ] Markers: Kapitelmarken/Abschnittsmarker im Skript und in der Audio-Timeline

### Could-have
- [ ] Hintergrundmusik/Atmosphäre (lizenzsicher) + Mischregler
- [ ] Mehrstimmigkeit (z.B. Intro neutral, Hauptteil warm)
- [ ] Personalisierte “Trigger/Anchors” mit sicherer Konfiguration
- [ ] Mehrere Stile (direktiv, permissiv/Ericksonian, Schlaf-Story, usw.)

### Won’t-have (vorerst)
- [ ] Medizinische/therapeutische Diagnostik oder Behandlungsversprechen
- [ ] Vollautomatisches “Therapieprogramm” ohne klare Grenzen/Einwilligungen

## Qualitätskriterien (Skript)
- [ ] Konsistente Struktur und “Ton” (warm, ruhig, nicht wertend)
- [ ] Passende Länge (z.B. 15/30 Min) ohne unnötige Wiederholungen
- [ ] Klare Sprache, keine widersprüchlichen Suggestionen
- [ ] Keine problematischen Inhalte (z.B. manipulative/gefährliche Suggestionen)
- [ ] Nutzer-spezifische “Do’s & Don’ts” werden eingehalten

## Qualitätskriterien (Audio)
- [ ] Natürliche Sprechgeschwindigkeit und Pausen
- [ ] Gleichmäßige Lautheit (Normalisierung) und keine Peaks/Clipping
- [ ] Keine abrupten Übergänge (Fades)
- [ ] Stimme wirkt “hypnotisch”/angenehm (subjektiv, aber testbar via Nutzerfeedback)

## Kostenkriterien
- [ ] BYO-Modus: variable Kosten für uns ≈ 0 (außer Storage/Traffic)
- [ ] Integrierter Modus: Kosten pro 30-Min-Hypnose im Zielkorridor (z.B. < 1–2 € all-in, je nach Qualitätslevel)
- [ ] Preis/Value: klarer Vorteil gegenüber “voll integriert & teuer” (Transparenz über Credits)
- [ ] Creditsystem: preisausfallsicher (Pricing-Versionierung), auditierbar (Ledger), geringe Fraud-Anfälligkeit (Limits/Rate-Limits)
- [ ] Nutzer-Transparenz: vor Start “ca. Credits” + nach Job “tatsächliche Credits” + klare Refund-Regeln

## Datenschutz & Datenhaltung (DSGVO-gedacht)
- [ ] Datensparsamkeit: nur speichern, was nötig ist (optional: lokale Speicherung)
- [ ] Löschfunktion: “Alles löschen” + Export
- [ ] Klare Trennung: Nutzerdaten vs. Prompt-/Template-Daten
- [ ] BYO-Keys: niemals unverschlüsselt speichern; möglichst clientseitig
- [ ] Datenschutzerklärung nach Art. 13/14 DSGVO (Zwecke, Rechtsgrundlagen, Empfänger, Drittlandtransfer, Speicherdauer, Betroffenenrechte, Beschwerderecht, Kontakt)
- [ ] Consent-/Cookie-Management nach § 25 TDDDG (technisch nicht notwendige Cookies/Tools erst nach Einwilligung; “Ablehnen” gleichwertig erreichbar)
- [ ] Auftragsverarbeitung: AV-Verträge nach Art. 28 DSGVO mit allen relevanten Dienstleistern (Hosting, Analytics, Support, Payment, LLM/TTS, E-Mail)
- [ ] Drittlandtransfers prüfen (z.B. US-Provider): SCCs/Transfer-Impact-Assessments + dokumentierte Schutzmaßnahmen
- [ ] TOMs nach Art. 32 DSGVO (Verschlüsselung, Zugriffskontrolle, Protokollierung, Secrets-Handling, Backup/Restore, Least Privilege)
- [ ] Verzeichnis von Verarbeitungstätigkeiten nach Art. 30 DSGVO gepflegt
- [ ] Datenschutz-Folgenabschätzung nach Art. 35 DSGVO prüfen (insb. bei (potenziellen) Gesundheitsdaten, Profiling, Voice/Audio)
- [ ] Datenschutzbeauftragter prüfen (§ 38 BDSG u.a. bei DSFA-Pflicht oder ≥20 Personen mit automatisierter Verarbeitung)
- [ ] Incident- & Breach-Prozess (Art. 33/34 DSGVO, 72h-Meldeweg, Betroffeneninfo) inkl. Runbook und Zuständigkeiten
- [ ] Besondere Kategorien (Art. 9 DSGVO) vermeiden oder sauber abgrenzen (z.B. keine Diagnose-/Therapie-Daten; sonst explizite Einwilligung + zusätzliche Schutzmaßnahmen)
- [ ] Consent/Acceptance-Logging: AGB-Clickwrap (Version + Timestamp), Cookie-Consents, optionale Opt-ins; Widerruf/Änderung möglich
- [ ] KI-Weitergabe transparent: In Datenschutzerklärung + in-App Hinweis vor Generierung – Details: `planung/rechtstexte.md`

## Safety/Legal (Produktgrenzen)
- [ ] Deutlicher Disclaimer: kein Ersatz für Therapie/medizinische Behandlung
- [ ] “Red Flags” Handling: Hinweise/Weiterleitung bei Krisen (je nach Scope/Region)
- [ ] Inhaltsrichtlinien: welche Themen erlaubt/nicht erlaubt sind (klar dokumentiert) – Policy: `planung/safety-policy.md`
- [ ] Werbe-/Claim-Check: keine unzulässigen Heil-/Erfolgsaussagen (insb. Heilmittelwerbegesetz, Irreführung vermeiden)
- [ ] Nutzer-Generated Content/Sharing (falls geplant): Moderations- und Meldeprozess für rechtswidrige Inhalte (DSA/Plattformpflichten prüfen)
- [ ] Risikoregister pflegen (Worst-Case + Maßnahmen/Owner) – Details: `planung/risiken.md`

## Impressum & Pflichtangaben (DE)
- [ ] Impressum/Anbieterkennzeichnung leicht erkennbar, unmittelbar erreichbar, ständig verfügbar (inkl. Name/Firma, Anschrift, Kontakt, Vertretung, Registerangaben, USt-ID falls vorhanden) – Grundlage u.a. § 5 DDG
- [ ] Falls journalistisch-redaktionelle Inhalte (Blog/News/Podcast) vorhanden: “Verantwortliche Person” nach § 18 Abs. 2 MStV benennen
- [ ] Verbraucherstreitbeilegung: Hinweis nach § 36 VSBG (Teilnahmebereitschaft/-pflicht) + Prozess nach § 37 VSBG (Schlichtungsstelle nennen, wenn Streit nicht beigelegt)
- [ ] OS-/ODR-Plattform-Link nicht mehr verwenden (Pflicht entfiel seit 20.07.2025; veraltete Links entfernen)

## Verbraucherschutz & E-Commerce (wenn B2C-Verträge/Payments in der App)
- [ ] Preistransparenz nach PAngV (Endpreis inkl. USt, klare Zuordnung; Abo-Preise/Abrechnungszeiträume transparent)
- [ ] Vorvertragliche Informationspflichten (Art. 246a EGBGB i.V.m. § 312d BGB) abgedeckt (Leistungsbeschreibung, Laufzeit, Kündigung, Support, etc.)
- [ ] “Button-Lösung” (§ 312j BGB): Bestell-CTA eindeutig (“zahlungspflichtig bestellen” o.ä.) + hervorgehobene Bestellübersicht
- [ ] Widerruf/Widerrufsbelehrung korrekt; bei digitalen Inhalten: Erlöschen nach § 356 Abs. 5 BGB nur mit ausdrücklicher Zustimmung + Bestätigung + Vertragsbestätigung auf dauerhaftem Datenträger
- [ ] Kündigungsbutton (§ 312k BGB), wenn entgeltliche Dauerschuldverhältnisse online abgeschlossen werden können (inkl. Bestätigungsseite, Speicherbarkeit, Bestätigung in Textform)
- [ ] AGB/ToS (nicht zwingend, aber praktisch): Nutzungsregeln, Haftungsrahmen, Kündigung, Lizenz an Nutzerinhalte, BYO-Keys, Support
- [ ] AGB enthalten KI-Diensteinsatz: Eingaben/Outputs werden zur Leistungserbringung an LLM/TTS-Dienstleister übermittelt (Details/Empfänger in Datenschutzerklärung)

## Barrierefreiheit (BFSG)
- [ ] Prüfen, ob wir unter BFSG als “Dienstleistung im elektronischen Geschäftsverkehr” fallen (typisch bei Verbraucher-Vertragsschluss über Web/App)
- [ ] Wenn BFSG-relevant: Kern-Flows (Onboarding, Checkout, Account, Player/Export) barrierefrei nach BFSGV umsetzen; regelmäßige Audits
- [ ] Ausnahme Kleinstunternehmen (Dienstleistungen) prüfen (<10 Beschäftigte und ≤2 Mio. € Umsatz/Bilanzsumme) – trotzdem möglichst barrierearm bauen

## KI-Transparenz & Governance (EU KI-Verordnung / AI Act)
- [ ] Transparenz gegenüber Nutzern: klar kennzeichnen, wo KI Inhalte erzeugt/variiert; Nutzer verstehen, dass sie mit KI interagieren (spätestens ab 02.08.2026 relevant)
- [ ] Synthetic-Audio/Deepfake-Transparenz: generiertes/manipuliertes Audio angemessen offenlegen/labeln (spätestens ab 02.08.2026 relevant)
- [ ] KI-Kompetenz im Team (“AI literacy”) sicherstellen (seit 02.02.2025 relevant): interne Guidelines/Training, Prompt-/Output-Review, Abuse-Prevention

## Jugendschutz / Minderjährige
- [ ] Zielgruppe definieren (ab 16/18?) und ggf. Age-Gating/Eltern-Einwilligung (Art. 8 DSGVO bei direktem Angebot an Kinder)
- [ ] Falls Inhalte potenziell entwicklungsbeeinträchtigend: JMStV-Pflichten prüfen (Altersstufen, Jugendschutzbeauftragter, Maßnahmen)

## Rechte & Lizenzen
- [ ] Musik/Sounds nur mit sauberer Lizenz (Stock, Eigenproduktion, lizenzfreie Quellen mit Nachweis)
- [ ] Nutzergenerierte Inhalte: klare Rechte-/Lizenzklauseln (wer besitzt was, was dürfen wir verarbeiten/speichern/teilen)
- [ ] Voice/Cloning (falls angeboten): Rechte/Einwilligungen des Sprechers sicherstellen + Missbrauchs-Prevention

## Messbare Erfolgsmetriken (erste Version)
- [ ] Time-to-first-hypnosis (TTFH): < 5 Minuten
- [ ] Completion Rate: > X% (nach erster Session)
- [ ] Kosten pro generierter Hypnose (integriert): < Zielwert
- [ ] Nutzerzufriedenheit: einfache 1–5 Bewertung nach Nutzung
