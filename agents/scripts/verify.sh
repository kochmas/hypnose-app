#!/usr/bin/env bash
set -euo pipefail

root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "${root}"

ts="$(date -u +%Y%m%d-%H%M%S)"
report_dir="${root}/agents/reports"
report="${report_dir}/verify-${ts}.md"
mkdir -p "${report_dir}"

branch="$(git branch --show-current 2>/dev/null || echo "n/a")"
commit="$(git rev-parse --short HEAD 2>/dev/null || echo "n/a")"

fail=0

write() { printf "%s\n" "$*" >> "${report}"; }

run() {
  local title="$1"; shift
  write ""
  write "## ${title}"
  write ""
  write "\`\`\`"
  write "$*"
  write "\`\`\`"
  write ""
  if "$@" >> "${report}" 2>&1; then
    write ""
    write "**Result:** PASS"
  else
    fail=1
    write ""
    write "**Result:** FAIL"
  fi
}

write "# Verify Report"
write ""
write "- Time (UTC): ${ts}"
write "- Branch: ${branch}"
write "- Commit: ${commit}"
write ""

run "Repo Status" git status -sb
run "Changed Files" bash -lc "git diff --name-only && echo '' && git diff --stat"

# Lightweight secret scan (false positives possible; intended as early warning).
if command -v rg >/dev/null 2>&1; then
  run "Secret Scan (rg)" bash -lc "git ls-files -z | xargs -0 rg -n --no-heading --hidden --glob '!.git/*' -S \"AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|BEGIN (RSA|EC|OPENSSH) PRIVATE KEY|xox[baprs]-[A-Za-z0-9-]{10,}\" || true"
else
  write "## Secret Scan"
  write ""
  write "Skipped: \`rg\` not available."
  write ""
fi

if [[ -x "agents/scripts/plan_sanity.sh" ]]; then
  run "Planning Sanity" bash agents/scripts/plan_sanity.sh
fi

# Stack-aware checks (best-effort). Skips when tooling/deps are not present.
if [[ -f package.json ]] && command -v npm >/dev/null 2>&1; then
  if [[ ! -d node_modules ]]; then
    write "## JS/TS Checks"
    write ""
    write "Skipped: \`node_modules/\` missing. Run \`npm install\` first."
  else
    if command -v python3 >/dev/null 2>&1; then
      has_script() {
        local name="$1"
        python3 - "$name" <<'PY'
import json
import sys
name=sys.argv[1]
p=json.load(open("package.json","r",encoding="utf-8"))
print("1" if name in (p.get("scripts") or {}) else "0")
PY
      }
      if [[ "$(has_script lint)" == "1" ]]; then run "npm run lint" npm run -s lint; fi
      if [[ "$(has_script test)" == "1" ]]; then run "npm test" npm test -s; fi
      if [[ "$(has_script build)" == "1" ]]; then run "npm run build" npm run -s build; fi
    else
      run "npm -s run (list scripts)" npm -s run
    fi
  fi
fi

write ""
if [[ "${fail}" == "0" ]]; then
  write "## Summary"
  write ""
  write "**Overall:** PASS"
else
  write "## Summary"
  write ""
  write "**Overall:** FAIL"
  write ""
  write "If failures are not immediately fixable, log them under \`agents/issues/\` (use \`agents/scripts/new_issue.sh\`)."
fi

echo "${report}"
exit "${fail}"
