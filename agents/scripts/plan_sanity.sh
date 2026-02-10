#!/usr/bin/env bash
set -euo pipefail

root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "${root}"

fail=0

require_file() {
  local path="$1"
  if [[ ! -f "${path}" ]]; then
    echo "MISSING (required): ${path}"
    fail=1
  else
    echo "OK: ${path}"
  fi
}

recommend_file() {
  local path="$1"
  if [[ ! -f "${path}" ]]; then
    echo "MISSING (recommended): ${path}"
  else
    echo "OK: ${path}"
  fi
}

echo "## Planning sanity"

# Core planning docs
require_file "planung/plan.md"
require_file "planung/kriterien.md"
require_file "planung/app-aufbau.md"
require_file "planung/architecture.md"
require_file "planung/credits.md"
require_file "planung/stimmen.md"
require_file "planung/pausen.md"
require_file "planung/risiken.md"
require_file "planung/rechtstexte.md"

echo ""

# Recommended planning artifacts created by the planning loop.
recommend_file "planung/backlog.md"
recommend_file "planung/flows.md"
recommend_file "planung/entscheidungen.md"
recommend_file "planung/ui.md"

echo ""

# Guard against duplicate/misplaced architecture docs.
if [[ -f "architecture.md" ]]; then
  echo "WARN: Found repo-root architecture.md (prefer planung/architecture.md)."
fi

if command -v rg >/dev/null 2>&1; then
  if [[ -f "planung/entscheidungen.md" ]]; then
    if rg -n --fixed-strings "planung/entscheidungen.md" "planung/architecture.md" >/dev/null 2>&1; then
      echo "OK: planung/architecture.md references planung/entscheidungen.md"
    else
      echo "WARN: planung/architecture.md does not reference planung/entscheidungen.md (SSoT for decisions)."
    fi
  fi
else
  echo "WARN: rg not available; skipping reference checks."
fi

exit "${fail}"
