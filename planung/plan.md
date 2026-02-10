# Planung

## Idee / Zielbild
Eine App, mit der Nutzer für kleines Geld personalisierte Hypnosen erstellen können – ohne dass alles “voll integriert” und teuer sein muss. Stattdessen:

- **Bring-your-own-Resources (BYO)**: Nutzer können eigene Prompts/Workflows für externe KIs nutzen (z.B. ihr eigenes LLM-/TTS-Abo oder API-Key).
- **Optional integriert**: Wer keinen eigenen Zugang hat, kann Credits in der App kaufen (App ruft dann LLM/TTS auf).
- **Output**: Am Ende steht ein **fertiges Hypnose-Skript** und daraus automatisch eine **fertige Audio-Hypnose** (inkl. Pausen, Intonation, evtl. Background).

## Grober Nutzer-Flow
1. Nutzer wählt Ziel, Stil, Länge (z.B. 10/20/30 Min), Sprache, “Tiefe”/Ton.
2. Nutzer (optional) beantwortet ein paar Fragen (Kontext/Trigger/Do’s & Don’ts).
3. Skript-Erstellung:
   - Variante A: App generiert per integriertem LLM.
   - Variante B: Nutzer nutzt eigenes LLM (BYO) mit eigenen Prompts; App importiert das Ergebnis.
4. Voice/Audio-Erstellung:
   - Variante A: App nutzt integriertes TTS (Standard-Stimmen oder Premium).
   - Variante B: Nutzer nutzt eigenes TTS (BYO) oder lädt eigene Sprach-Aufnahmen hoch.
5. Post-Processing: Pausen/Marker (tag-free, ohne SSML/HTML), Lautheit, Fades, optional Musik/Binaural, Export (MP3/M4A/WAV).

## Hypnothera: Was “kostet” es, so etwas anzubieten? (Modell/Schätzung)
Wichtig: **Interne Kosten von Hypnothera** kann man nicht direkt wissen. Aber man kann die typischen Kostenblöcke eines solchen Produkts grob abschätzen (variable Kosten pro Hypnose + fixe Kosten).

### 1) Skript-Ausarbeitung (LLM) – variable Kosten
**Kostentreiber:** Anzahl Tokens (Input + Output) × Preis des LLM.

Grobe Daumenwerte:
- 15 Minuten gesprochener Text ≈ **1.800–2.200 Wörter**
- 30 Minuten ≈ **3.600–4.400 Wörter**
- LLM-Ausgabe dafür grob ≈ **2.500–6.000 Tokens** (je nach Sprache/Formatierung), plus Input (Prompts, Nutzerinfos) ≈ **500–2.000 Tokens**

=> Pro Hypnose landet man oft bei **~3k–10k Tokens** insgesamt.

**Kosten-Spanne (nur LLM, pro Hypnose):**
- Bei günstigen Modellen: eher **Bruchteile von Cent bis wenige Cent**
- Bei Premium-Modellen / viel Iteration (mehrere Entwürfe, Safety-Checks, Rewrites): eher **einige Cent bis ~0,50 €**

Hinweis: In der Praxis entstehen Zusatzkosten, wenn man:
- mehrere Versionen generiert (A/B)
- automatisiert “QA”-Durchläufe macht (Ton, Struktur, verbotene Inhalte)
- personalisierte Varianten erzeugt

### 2) Stimmen anbieten (TTS) – variable Kosten + ggf. Lizenz
**Kostentreiber:** Länge des Textes (Zeichen oder Minuten) × Preis des TTS-Anbieters.

Details/Blueprint: siehe `planung/stimmen.md`.
Pausen/Timing ohne SSML/HTML im Editor: siehe `planung/pausen.md`.

Grobe Daumenwerte:
- 15 Minuten Text ≈ **~10k–15k Zeichen**
- 30 Minuten Text ≈ **~20k–30k Zeichen**

**Typische Kostenlogik (TTS):**
- Viele Anbieter rechnen pro **1 Mio. Zeichen** oder pro **Minute Audio** ab.
- Für 20k–30k Zeichen pro Hypnose sind die variablen Kosten je nach Anbieter/Qualität grob im Bereich **~0,10 € bis ~2,00 €** pro erzeugtem Audio realistisch (stark abhängig von Tarif, Stimme, “Expressiveness”, etc.).

**Wenn Hypnothera “eigene Stimmen” anbietet**, gibt es (mindestens) drei gängige Wege:
1. **Standard-Neural-TTS** (z.B. Cloud-Stimmen): kaum fixe Kosten, variable Kosten pro Hypnose.
2. **Lizensierte Premium-Stimmen** (Voice-Provider): variable Kosten + ggf. kommerzielle Lizenzbedingungen.
3. **Eigene Sprecher + Voice-Clones**: hohe fixe Kosten (Aufnahmen, Vertrag, Training) + laufende Kosten (Hosting/GPU oder Provider), dafür Differenzierung.

### 3) Audio-Produktion (Mixing, Musik, Export) – meist “günstig”, außer Lizenzen
- **Audio-Mixing/Processing** (Pausen, Lautheit, Fades, Normalization) ist CPU-seitig meist sehr günstig.
- **Musik/Background** kann teuer werden, wenn man nicht sauber lizenziert:
  - Stock-Musik-Lizenz oder Abo (fix)
  - eigene Loops (einmalig)
  - generative Musik (zusätzliche variable Kosten + Rechte-Fragen)

### 4) Storage & Bandbreite – meist klein, skaliert mit Downloads
Als Faustregel:
- 30 Minuten MP3 bei 96–128 kbps ≈ **~20–30 MB**
- Kosten für Storage + CDN/Egress sind pro Track i.d.R. deutlich kleiner als TTS-Kosten, werden aber relevant bei sehr vielen Downloads/Streams.

### 5) Support, Payment, Admin – oft unterschätzt
- Payment-Gebühren (pro Transaktion + %)
- Support (Rückfragen, Refunds)
- Moderation/Abuse-Prevention (insb. bei Voice-Cloning & “therapeutischen” Versprechen)

### 6) Fixkosten (Produkt/Team/Compliance)
Das ist häufig der Hauptgrund, warum “voll integrierte” Lösungen teuer sind:
- Produktentwicklung (App, Backend, Audio-Pipeline)
- UX/Onboarding
- Content-/Qualitätsarbeit (Templates, Tonalität, Safety-Richtlinien)
- Recht/Compliance (Disclaimer, Claims, DSGVO, ggf. medizinische Abgrenzung)
- Marketing/Vertrieb

**Kurzfazit:** Bei einer voll integrierten Hypnose-Generator-App sind die **variablen Kosten pro Hypnose** meist von **TTS dominiert**; LLM ist oft relativ günstig. “Teuer” wird es typischerweise durch **Fixkosten, Qualität, Lizenzen und Support**.

## Ansatz für unsere App (kostensenkend)
### BYO-first (Nutzer bringt LLM/TTS mit)
Vorteile:
- Unsere variablen Kosten nahe 0 (wir stellen UI, Prompt-Editor, Audio-Workflow).
- Nutzer kann sein bestehendes Abo/Keys nutzen.
Nachteile:
- Mehr Komplexität für Nutzer (Keys, Provider, Limits).
- Support-Aufwand (“Warum klappt mein Key nicht?”).

### Integriert als Fallback (Credits)
Idee:
- App bietet 1–2 “Default-Pipelines” (günstig + Premium).
- Abrechnung pro Hypnose/Minute oder via Credits.
Details: siehe `planung/credits.md`.

## Offene Fragen (fürs Brainstorming)
- Welche Zielgruppe zuerst? (Schlaf/Stress/Fokus vs. “Therapie”-nahe Themen)
- Welche Längen/Formate? (5-min Quick, 15-min Standard, 30-min Deep)
- Wie stark personalisiert? (Name, Ziele, Auslöser) vs. “semi-personalisiert”
- Welche Audio-Features sind MVP? (nur Stimme vs. + Musik + binaural)
- BYO: Welche Provider zuerst? (nur Import/Export vs. direkte API-Integrationen)
- Auswahl: **Basic (Tiers)** + optional **Expert (direkte Modelle/Stimmen)** (so wie besprochen)
- App-Aufbau/Architektur-Vorschlag: `planung/app-aufbau.md`
- MVP-Backlog: `planung/backlog.md`
- Flows: `planung/flows.md`
- Entscheidungen (SSoT): `planung/entscheidungen.md`

## Safety/Legal (nur als Marker)
Hypnose kann in Richtung “Gesundheit/Behandlung” rutschen. Sinnvoll ist früh:
- klare Disclaimer (“kein Ersatz für Therapie/medizinische Behandlung”)
- Einschränkungen für riskante Themen (Trauma, akute Krisen, etc.)
- Transparenz, wie personalisierte Inhalte entstehen und gespeichert werden
