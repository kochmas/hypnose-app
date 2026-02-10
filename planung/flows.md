# Flows (Happy Path + Fehlerfälle)

Ziel: klare, testbare Abläufe für MVP – inkl. Safety Gate und Credits Reserve→Capture→Release.

---

## Flow A: Registrierung / Onboarding
**Happy path**
1. Nutzer öffnet App → Cookie/Consent (nur falls nicht notwendige Tools genutzt werden).
2. Nutzer erstellt Account (Magic Link oder OAuth).
3. Clickwrap:
   - AGB akzeptieren (Pflicht)
   - Datenschutz “zur Kenntnis” (Ack)
4. Optional: AI‑Hinweis (kurz) in Onboarding (“Text wird an KI‑Dienstleister übertragen …”).

**Fehlerfälle**
- Link abgelaufen → neuen Link senden.
- AGB nicht akzeptiert → kein Account/kein Kauf möglich.

---

## Flow B: Credits kaufen
**Happy path**
1. Nutzer öffnet Billing → wählt Credit‑Pack.
2. Checkout (z.B. Stripe) → Payment success.
3. Webhook bestätigt Zahlung → Ledger `purchase` → Wallet erhöht.
4. UI zeigt aktualisierten Saldo + Kaufbeleg.

**Fehlerfälle**
- Payment fail → kein Ledger‑Eintrag.
- Webhook doppelt → idempotent, kein doppelter `purchase`.
- Chargeback → Ledger `refund/adjustment` + ggf. Limits/Account‑Hold.
- Checkout rechtlich unvollständig (Pflichtinfos/Buttons) → Launch‑Blocker (siehe `planung/kriterien.md`)

---

## Flow C: Hypnose erstellen (Skript → Edit → Audio)

### C1: Create Wizard (Input)
1. Nutzer wählt: Ziel, Sprache, Länge, Tonalität, Do’s/Don’ts.
2. Nutzer wählt einen Pfad:
   - **Skript generieren** (LLM in der App)
   - **Eigenes Skript nutzen** (Paste/Import; z.B. aus anderer KI)
3. Safety Input Screen (Self‑harm/medical claims etc.):
   - `block` → Flow D (Krisen‑Hinweis)
   - `warn` → Nutzer muss Scope (Wellness) bestätigen und ggf. umformulieren; Output bleibt im Wellness‑Framing
   - `allow` → weiter

### C2a: Eigenes Skript nutzen (Paste/Import)
**Happy path**
1. Nutzer paste/importiert Skript (Markdown/Text), optional mit Pausen-Markern.
2. (Optional) Output Screening auf pasted Text (Fail‑safe: warn/block) → dann erst speichern.
3. Skript wird gespeichert (mit Version/Quelle “BYO”).
4. UI zeigt Skript in strukturierter Ansicht.

**Fehlerfälle**
- Script enthält “verbotene” Inhalte → block/warn + Hinweis (keine Speicherung oder nur lokal/temporär, je nach Policy).
- Format-Probleme → marker fail‑soft (siehe C3).

### C2b: Skript generieren (LLM Job)
**Happy path**
1. App schätzt Usage (Tokens) → Credits‑Schätzung.
2. Wenn Saldo < Reserve → Flow B (Credits kaufen).
3. Reserve Credits (`reserve`) + Job `queued`.
4. Worker generiert Skript (LLM) → Output Screening:
   - ok → Script speichern (mit `prompt_version`)
5. Capture Credits (`capture`) + Release Delta (`release`).
6. UI zeigt Skript in strukturierter Ansicht.

**Fehlerfälle**
- Provider timeout → Retry (max N) → fail → Release Reserve.
- Output Screening blockt → kein Skript anzeigen; Release Reserve; Hinweis anzeigen.
- Idempotency: doppelter “Generate” Klick erzeugt nicht doppelte Abbuchung.

### C3: Skript bearbeiten (tag‑free Pausen)
**Happy path**
1. Nutzer editiert Text + Pausen als UI‑Blocks (kein SSML/HTML).
2. Speichern erzeugt neue Script‑Version.
3. Optional Preview (DEC‑011).

**Fehlerfälle**
- Ungültige Pause (z.B. `[[pause:two]]`) → fail‑soft, Marker als Text behandeln oder UI‑Fehler anzeigen.

### C4: Stimme wählen & Audio generieren (TTS Job)
**Happy path**
1. Nutzer wählt Voice (Basic) oder Voice/Provider (Expert Allowlist).
2. App rendert Script → SSML (unter der Haube) + chunked nach Provider‑Limits.
3. Estimate chars/minutes → Reserve Credits → Job queued.
4. Worker: TTS per Chunk → merge → normalize → store in Object Storage.
5. Output Screening (falls nötig) → Capture/Release.
6. UI: Playback + Export (MP3/M4A).

**Fehlerfälle**
- Chunk fail → Retry; bei final fail: Release Reserve + Fehler anzeigen.
- Partial chunks succeeded → Policy festlegen (MVP: nur bei Endresultat abrechnen).

---

## Flow D: Safety Block (Krise/Selbstgefährdung)
**Happy path**
1. Safety Screen erkennt Krise/Selbstgefährdung → `block`.
2. App generiert **keine** Hypnose.
3. App zeigt kurzen Hinweis + Hilfsressourcen (regional anpassbar).
4. Keine Credits abbuchen (falls bereits reserviert → Release).

**Fehlerfälle**
- False positive → Nutzer kann neutral umformulieren; ggf. Support‑Kontakt.

---

## Flow E: Export / Löschung
**Export**
1. Nutzer wählt Hypnose → Export Skript (Markdown) + Audio (MP3/M4A).
2. Optional: ZIP bundle.

**Meine Daten exportieren (DSAR light)**
1. Nutzer klickt “Meine Daten exportieren”.
2. System erstellt Export (JSON/ZIP): Profil/Account-Metadaten, Skripte, Audio-Assets, Ledger-Auszug, Consent-Historie.
3. Nutzer erhält Download-Link (signed URL) mit Ablaufzeit; Export wird nach kurzer Zeit gelöscht.

**Löschung**
1. Nutzer löscht Hypnose oder Account.
2. System löscht DB‑Records + Audio‑Assets im Storage (async Job möglich).
3. Bestätigung in UI.

**Fehlerfälle**
- Storage delete fail → retry; am Ende Issue/Alert.
