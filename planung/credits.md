# Creditsystem: Dienste, Abrechnung, Architektur

## Ziel
Ein **einheitliches Credit-Wallet** (wie bei Hypnothera), über das Nutzer unterschiedliche KI-Dienste konsumieren können, z.B.:
- Skript-Erstellung (LLM)
- Skript-Überarbeitung/Varianten (LLM)
- Safety-/Policy-Checks (LLM)
- Übersetzung/Voice-Style-Transfer (LLM)
- Audio-Generierung (TTS)

BYO bleibt optional: Wenn Nutzer eigene Provider/Keys nutzen, läuft das **ohne** Credits (oder nur mit “App-Features”-Abo).

## Prinzip: “Service = Usage → Credits”
Jeder Dienst rechnet intern nach einer **Messgröße** ab:
- LLM: Tokens (input/output) oder “requests”
- TTS: Zeichen oder Minuten Audio
- Audio-Processing: i.d.R. kostenlos (CPU) oder pauschal

Das Creditsystem macht daraus:
`credits = ceil( usage_units * credits_per_unit + minimum_fee )`

## Kern-Bausteine (Minimal-Architektur)
### 1) Wallet (Saldo)
- Pro Nutzer ein Credit-Saldo.
- Änderungen nur über ein **Ledger** (siehe unten), niemals “Saldo überschreiben”.

### 2) Ledger (unveränderliches Journal)
Ledger-Events (Beispiele):
- `purchase` (Credit-Kauf)
- `promo_grant` (Gutschrift)
- `reserve` (Reservierung vor Jobstart)
- `capture` (finale Abbuchung nach Job)
- `release` (Reservierung freigeben bei Fehler/Abbruch)
- `refund` (Rückerstattung, z.B. bei Supportfall)
- `adjustment` (Admin-Korrektur)

Wichtig:
- **Idempotency-Key** pro Abbuchung (keine Doppelbelastung).
- Auditierbarkeit (welcher Job, welcher Provider, welche Usage).

### 3) Pricing-Tabelle (konfigurierbar, versioniert)
Ein zentraler “Preisplan”, pro Service/Provider/Model/Tier:
- `service` (z.B. `script_generate`, `tts_generate`)
- `provider` + `modelOrVoice`
- `unit` (`token`, `char`, `minute`)
- `creditsPerUnit`
- `minimumFeeCredits` (z.B. Mindestens 5 Credits)
- `effectiveFrom` (Startdatum), optional `effectiveTo`

Warum versionieren?
- Provider-Preise ändern sich; ihr wollt **reproduzierbare Abrechnungen** für vergangene Jobs.

### 4) Usage-Tracking (pro Job)
Pro Job speichern:
- Input-Metadaten (service, model/voice, Sprache, Länge)
- **estimatedUsage** (vorher)
- **actualUsage** (nachher, aus Provider-Response oder eigener Messung)
- Ledger-Referenzen (reserve/capture/release)

## Abrechnungs-Flow (empfohlen)
### Step 1: Estimate + Reserve
1. Nutzer klickt “Generieren”.
2. System schätzt Usage (z.B. Tokens/Zeichen) → schätzt Credits.
3. Credits werden **reserviert** (`reserve`).
4. Job läuft asynchron.

### Step 2: Execute + Capture (final)
1. Provider-Call liefert Usage (oder ihr berechnet sie).
2. System berechnet finale Credits.
3. `capture` bucht final ab, Differenz wird `release` (oder zusätzliche Abbuchung, wenn ihr das erlaubt).

### Step 3: Fehlerfälle
- Job schlägt fehl → `release` (Reservierung zurück).
- Teilweise erfolgreich (Chunking): entweder
  - “Best effort” pro Chunk abrechnen, oder
  - nur bei “fertigem Endresultat” abrechnen (MVP einfacher, aber riskanter).

## UX: Wie Credits “verständlich” werden
Empfehlungen:
- Vor Start: “**ca. X Credits**” + Hinweis “final nach tatsächlichem Verbrauch”.
- In der Historie: “Skript (Premium) – 84 Credits” + “Audio (Stimme A) – 220 Credits”.
- “Stufen” statt Anbieter-Namen: z.B. **Schnell / Standard / Premium** (intern mappt ihr auf konkrete Modelle).

### Basic vs. Expert (beides anbieten)
Um sowohl Einsteiger als auch Power-User abzuholen, kann die UI zwei Ebenen haben:

**Basic (Default)**
- Nutzer wählt nur **Tiers** (z.B. Schnell/Standard/Premium) + ggf. “Sprachstil”.
- Ihr mappt das auf ein kuratiertes Modell-Set (stabile Qualität, kontrollierte Kosten).
- Preisanzeige ist einfach: “~X Credits für 15/30 Min”.

**Expert (Optional)**
- Nutzer kann **Provider/Model/Voice** direkt wählen (aus einer von euch freigegebenen Liste).
- UI zeigt klar: (a) Kosten pro Einheit (Tokens/Zeichen), (b) erwartete Credits, (c) Datenregion/Provider-Hinweise.
- Schutzrails bleiben aktiv: Max-Längen, Rate-Limits, Abuse-Checks, “Estimate vor Reserve”.

Technisch bleibt es ein System:
- Basic-Tier ist nur ein Alias auf einen konkreten `pricingPlan`-Eintrag.
- Expert schreibt denselben `service+provider+model` in den Job und nutzt dieselbe Ledger-Logik.

## Margin & Kostenkontrolle (für dich als Betreiber)
Credits sind nur ein Wrapper. Entscheidend ist, dass ihr intern sauber kalkuliert:
- Provider-Kosten (pro Token/Zeichen)
- Payment-Gebühren (Kauf von Credits)
- Storage/Bandbreite (Audio)
- Support/Refunds

Typische Schutzmaßnahmen:
- Rate-Limits & Tageslimits pro Nutzer
- Minimum-/Maximum-Längen pro Job
- Abuse-Checks (extrem lange Inputs, Spam, verdächtige Wiederholungen)
- “Dry-run estimate” bevor reserviert wird

## Anbieter-/ToS-Hinweis (wichtig)
Nicht jeder KI-Provider erlaubt “Reselling” ohne Auflagen.
Für jeden Provider prüfen:
- Darf die App Endnutzern den Dienst “verkaufen” (Credits/Minuten)?
- Müssen Endnutzer-AGB/Notices eingebunden werden?
- Gibt es Einschränkungen bei Voice/Cloning oder “therapeutischen” Use-Cases?

## MVP-Empfehlung (konkret)
1. Creditsystem nur für 2 Services:
   - `script_generate` (1–2 Modell-Tiers)
   - `tts_generate` (1–2 Voice-Tiers)
2. Immutable Ledger + Pricing-Versionierung von Anfang an
3. Reserve→Capture-Flow + automatische Release bei Fehlern
