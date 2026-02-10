# Prompt: safety_screen (v0)

Aufgabe: Prüfe eine Nutzeranfrage oder ein generiertes Skript auf Safety-Risiken und gib eine kurze, maschinenlesbare Entscheidung zurück.

## Input
Text: {{text}}

## Output (nur JSON)
Gib ausschließlich JSON aus:
```json
{
  "allowed": true,
  "category": "ok|self_harm|medical_claims|illegal|hate|other",
  "action": "allow|block|warn",
  "reason": "kurz",
  "notes": "optional"
}
```

Regeln:
- `self_harm` → immer `block`
- medizinische Diagnose/Behandlungsversprechen → `warn` oder `block` je nach Schwere
- Keine langen Erklärungen, keine Details zu Selbstschädigung.

