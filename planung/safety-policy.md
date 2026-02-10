# Safety Policy (MVP)

> Hinweis: Keine Rechtsberatung. Ziel ist eine klare Produktgrenze (Wellness) und robuste Guardrails gegen Krisen-/Selbstgefährdungs‑ und Heilversprechen‑Risiken.

## Zweck
Diese Policy definiert, welche Inhalte wir in der App zulassen, warnen oder blocken.
Sie ist Grundlage für:
- Input Screening (vor Generierung)
- Output Screening (nach Generierung, vor Anzeige/Export)
- UX‑Texte im Block/Warn‑Fall

Referenzen:
- Risiken: `planung/risiken.md`
- Evals: `agents/evals/safety_redteam.v0.md`

## Grundsatz
Die App ist für **Entspannung/Wellness** (kein Ersatz für Therapie/medizinische Behandlung).
Wir vermeiden Inhalte, die Nutzer in Krisen verstärken oder medizinische Behandlung suggerieren.

## Kategorien & Aktionen (MVP)

### 1) Self-harm / Suizid / akute Krise
- Aktion: **BLOCK**
- Verhalten:
  - keine Skript- oder Audio‑Generierung
  - kurze, nicht detaillierte Ablehnung
  - Hinweis auf professionelle Hilfe/Hotlines (regional anpassbar)
  - keine Credits abbuchen (Reserve sofort freigeben)

### 2) Medizinische Diagnose/Behandlung/Heilversprechen
- Aktion: **WARN** (oder BLOCK bei Schwere)
- Verhalten:
  - Output nur im Wellness‑Framing (“Entspannung”, “Schlafroutine”)
  - keine Formulierungen wie “heilt”, “behandelt”, “Therapieersatz”
  - wenn Nutzer insistiert → BLOCK oder “umformulieren” erzwingen

### 3) Mentale Gesundheitsthemen (Trauma/PTBS, Depression/Angst, akute Psychose)
- Aktion: **WARN/REFOCUS** (MVP)
- Verhalten:
  - Wir liefern nur **Wellness/Entspannungs-/Grounding**‑Inhalte (kein “Behandeln”, kein “Trauma bearbeiten”, keine Heilversprechen).
  - Deutlicher Hinweis: Wenn Nutzer akut leidet/überfordert ist, professionelle Hilfe suchen (regional anpassbar).
  - Wenn zusätzlich **Krisen-/Selbst-/Fremdgefährdungs-Signale** vorliegen → **BLOCK** (Kategorie 1).

### 4) Sonstige Policy-Verstöße (illegal, hate, harassment)
- Aktion: **BLOCK**
- Verhalten: kurze Ablehnung, keine Details.

### 5) Unkritische Wellness-Inhalte (Schlaf, Stress, Fokus, Ruhe)
- Aktion: **ALLOW**
- Verhalten: normaler Flow.

## Screening-Strategie (MVP)
1. **Input Screening** auf:
   - Freitext‑Felder (Ziel, Do/Don’ts)
   - evtl. Auswahlfelder (z.B. “Depression heilen” als Ziel vermeiden)
2. **Output Screening** auf:
   - generiertes Skript (bevor es im Editor erscheint)
   - ggf. gerenderte SSML‑Variante (bevor TTS startet)

Implementationsnotizen:
- Fail‑safe: Wenn Screening unsicher ist → lieber WARN/BLOCK als riskant ausspielen.
- Logging datensparsam: nur Kategorie/Action/Reason‑Code, keine vollständigen sensiblen Texte in Logs.

## UX Copy (Platzhalter)
- Block (Krise): “Ich kann dabei nicht helfen. Wenn du dich in Gefahr fühlst, wende dich bitte an …”
- Warn (Medical claims): “Ich kann keine medizinische Behandlung ersetzen. Ich kann dir aber eine Entspannungs‑Hypnose erstellen …”

## Testbarkeit
- Muss gegen `agents/evals/safety_redteam.v0.md` bestehen.
- Neue Edge‑Cases → als neuer Eval ergänzen (Regression vermeiden).
