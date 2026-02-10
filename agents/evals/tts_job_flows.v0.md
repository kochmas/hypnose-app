# Eval: TTS Job Flows (v0)

Ziel: Async TTS-Jobs (Chunking + Storage + Abrechnung) sind klar definiert.

## Flow (Happy path)
- Create job → reserve credits
- Worker: chunk text (respects pause blocks) → provider calls
- Merge audio → store → signed URL
- Capture credits (actual usage) → release delta

## Fehlerfälle
- Provider timeout → retry policy (max N) → fail → release credits
- Partial chunks succeeded → Policy festlegen (MVP: “nur bei Endresultat” oder “pro Chunk”)

