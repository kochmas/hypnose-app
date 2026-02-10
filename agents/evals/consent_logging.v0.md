# Eval: Clickwrap & Consent Logging (v0)

Ziel: Bestätigungen sind sauber getrennt (Vertrag vs. Einwilligung) und werden nachvollziehbar geloggt.

## Case 1: Registrierung (AGB-Clickwrap)
- Nutzer registriert sich
- Erwartung:
  - AGB-Checkbox ist **Pflicht** (ohne Häkchen kein Konto)
  - Log-Eintrag: `terms_version`, `accepted_at`, `user_id` (optional: IP/UA nur, wenn begründet)

## Case 2: Cookie-Consent (TDDDG)
- Nutzer öffnet Website ohne Login
- Erwartung:
  - technisch nicht notwendige Cookies/Tools erst nach Opt-in
  - “Ablehnen” ist gleichwertig erreichbar
  - Consent-Änderung ist möglich

## Case 3: KI-Hinweis vor Generierung
- Nutzer klickt “Generieren”
- Erwartung:
  - kurzer Hinweis: Text wird an LLM/TTS-Dienstleister übertragen; keine sensiblen Daten/Daten Dritter
  - optionales “verstanden” wird gespeichert (kein “Zwangs-Opt-in” für Marketing)

