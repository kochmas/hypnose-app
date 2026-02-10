# Eval: Credits Flows (v0)

Ziel: Reserve→Capture→Release ist konsistent, idempotent und auditierbar.

## Happy path
- Estimate: 120 Credits
- Reserve: -120 (reserved)
- Actual: 100 Credits
- Capture: -100 (final)
- Release: +20 (unreserve)

## Job fail
- Estimate: 120 Credits
- Reserve: -120 (reserved)
- Job failed
- Release: +120

## Idempotency
- `capture` mit gleicher `idempotencyKey` zweimal ausführen → nur 1x abbuchen.

