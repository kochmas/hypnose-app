# Stimmen (TTS): Optionen, Einbindung, Abrechnung

> Ziel: “Stimmen anbieten”, ohne dass ihr zwingend alles selbst hosten müsst. Fokus: web-basierte Hypnose-Audio-Erstellung aus Skript (inkl. Pausen/SSML).

## 1) Welche Optionen gibt es?

### A) Voll integriert (ihr bietet Stimmen an)
Ihr habt ein/mehrere TTS-Provider-Konten (Server-seitig). Nutzer wählen Stimme/Qualität, ihr generiert Audio und liefert es aus.

**Vorteile**
- Beste UX (1 Klick, keine Keys).
- Konsistente Qualität/SSML-Unterstützung.

**Nachteile**
- Ihr tragt die variablen Kosten + Missbrauchs-/Fraud-Risiko.
- DSGVO-Aufwand (AVV, Transfers, Logs, Retention).

### B) BYO-TTS (Nutzer bringt eigenen Provider / Key)
Nutzer nutzt seinen eigenen TTS-Zugang (API-Key/Abo). Die App unterstützt:
- **Import**: Nutzer lädt fertiges Audio hoch (MP3/WAV).
- **oder Client-seitige Generierung**: Browser ruft Provider direkt mit Nutzer-Key auf (Key bleibt beim Nutzer).
- **oder “Proxy ohne Speicherung”**: Backend leitet Requests durch, speichert Key nicht (trotzdem heikel).

**Vorteile**
- Eure variablen TTS-Kosten ~0.
- Nutzer kann “seinen” Lieblingsanbieter nutzen.

**Nachteile**
- Setup-Komplexität + Support (“Key geht nicht”).
- Nicht jeder Provider ist sauber im Browser nutzbar (CORS/SDKs).

### C) Self-hosted (open-source TTS)
Ihr hostet ein Modell selbst (GPU/CPU).

**Vorteile**
- Volle Kontrolle, keine Drittlandtransfers durch Provider.
- Langfristig evtl. günstig bei hoher Last.

**Nachteile**
- Hoher Ops-Aufwand (GPU, Skalierung, Qualität, Updates).
- Qualitätsniveau oft schwerer “premium” zu halten.

**Pragmatischer Start (Empfehlung):** A (1 Provider) + BYO-Import als “Power-User”-Pfad. Self-hosted später.

## 2) Was kann man “nutzen/einbinden” (Provider-Kategorien)
Ohne auf konkrete Preise festgenagelt zu sein, lassen sich Provider grob so einteilen:

- **Cloud-Standard-TTS** (viele Sprachen, solide, oft SSML): gut für MVP.
- **Premium/Expressive-TTS** (sehr natürlich, oft “sprechender”): teurer, aber Differenzierung.
- **Voice-Cloning Anbieter**: rechtlich/safety-seitig anspruchsvoll (Einwilligungen, Missbrauchsschutz).

Wichtig für Hypnose:
- **SSML / Pausen** (`break`) und **Prosody** (Tempo, Pitch).
- Stabiler Output bei langen Texten (Chunking).
- Rechte/ToS für kommerzielle Nutzung + Audio-Distribution.

## 3) Wie macht man die Einbindung genau? (Technik-Blueprint)

### Schritt 1: Voice-Katalog modellieren
Legt intern ein Voice-Objekt an:
- `provider` (z.B. “ProviderA”)
- `voiceId`
- `language`
- `tier` (standard/premium)
- `supportsSsml` (ja/nein)
- `pricingUnit` (chars/minutes) + interner `costMultiplier`

Damit könnt ihr Stimmen später austauschen, ohne UI/Business-Logik neu zu schreiben.

### Schritt 2: Skript → “TTS-Input” (SSML/Chunks)
Für Hypnose lohnt sich eine “Rendering”-Schicht:
- aus Markdown/Struktur (Einleitung/Vertiefung/…) wird **SSML** gebaut
- **Pausen** an Abschnittswechseln
- “slow rate”/ruhiger Ton als Default

Wichtig (UX): Nutzer sollen **keine SSML/HTML-Tags tippen müssen**.
Stattdessen: Pausen als UI-Elemente oder einfache Marker (z.B. `[[pause:2s]]`) und dann “unter der Haube” zu SSML rendern.
Details: `planung/pausen.md`.

Bei Provider-Limits (max. Zeichen pro Request) splittet ihr in **Chunks**:
- Chunking nach Abschnitten/Sätzen, nicht mitten im Wort
- pro Chunk TTS call → Audio-Stück
- am Ende zusammenfügen (Concat + Fades + Loudness Normalization)

### Schritt 3: Asynchroner Job-Flow
TTS dauert; macht es als Job:
- `POST /tts-jobs` → Job erstellt, Credits reserviert
- Worker generiert Audio (Chunks) und schreibt in Object Storage (S3 o.ä.)
- `GET /tts-jobs/:id` → Status + Ergebnis-URL

### Schritt 4: Storage/Playback
Speichert nur:
- Job-Metadaten (voice, Länge, chars, timestamps)
- Audio-Datei (mit Zugriffsschutz, z.B. signed URLs)
Optional: Cache via Content-Hash (gleiches Skript + Stimme → reuse).

## 4) Wie läuft die Abrechnung “auf deiner Seite”?

### Modell 1: BYO (Nutzer zahlt Provider direkt)
Ihr rechnet **nur eure App** ab (z.B. Abo oder “Editor/Library”-Features).
- Kein TTS-Kostenrisiko bei euch.
- Kein “Reselling” von TTS – Nutzer hat Vertrag mit Provider.

### Modell 2: Ihr “resellt” TTS via Credits (typisch bei integrierten Stimmen)
**Provider → ihr:** Provider stellt euch periodisch (monatlich) Rechnung nach Nutzung (meist Zeichen/Requests/Minuten).

**Ihr → Nutzer:** ihr verkauft Credits/Minuten/“Hypnosen”.

Empfohlene interne Abrechnungslogik:
1. Vor Jobstart: Textlänge messen (Zeichen) → **Kostenschätzung**.
2. Credits **reservieren** (Pre-Auth).
3. Nach Job: tatsächliche Usage speichern (chars, providerResponse) → **finale Abbuchung**.
4. Idempotency: gleiche Job-ID darf nicht doppelt abgerechnet werden.
5. Refund-Policy: bei Fehlern automatische Rückgabe.

**Preisbildung (einfach):**
`userPrice = providerCost * (1 + marge) + paymentFees + storage/traffic-Anteil`

Für Nutzer ist “Minuten” verständlicher, für Provider oft “Zeichen”.
Praktisch: ihr zeigt Minuten an, rechnet intern über Zeichen und habt pro Voice-Tier feste “Credits pro 1.000 Zeichen”.

### Modell 3: Abo + Fair-Use + Overages
Nutzer zahlt monatlich, hat Kontingent (z.B. X Minuten), darüber wird pro Minute/credit abgerechnet.
Technisch identisch zu Modell 2 (Ledger + Usage), nur andere UX.

## 5) DSGVO/Safety-Hinweise speziell für TTS
- Text kann personenbezogen sein → Provider ist i.d.R. Auftragsverarbeiter: **AVV/DPA** + Region/Transfers prüfen.
- Retention: Logs und Audio-Dateien nur so lange wie nötig.
- Voice-Cloning nur mit sehr klarer Einwilligung + Missbrauchsschutz (keine “I can clone anyone” Funktionen).
- Für “synthetische Stimme”: Transparenz/Labeling früh einplanen (AI-Transparenz).

## 6) Entscheidungshilfe (MVP)
Wenn ihr schnell starten wollt:
- **1 integrierter TTS-Provider** (Standard + Premium Tier)
- plus **BYO-Import** (Audio upload) für Power-User
- Credits: **zeichengestützt** (intern) + **minutenbasiert** (UI)

## 7) UX: Basic vs. Expert (Stimmen-Auswahl)
Passend zur Idee “Tiers + direkte Modellwahl”:

**Basic (Default)**
- Nutzer sieht 3–6 kuratierte Stimmen (z.B. “Ruhig – Standard”, “Warm – Premium”).
- Keine Provider-Begriffe, Fokus auf Ergebnis.

**Expert (Optional)**
- Vollständige Voice-Liste (nach Sprache/Provider/Features filterbar).
- Anzeige von SSML-Support, Limits (max chars), evtl. Region/Datentransfer-Hinweis.
- Kosten: “Credits pro 1.000 Zeichen” + Live-Schätzung für das aktuelle Skript.
