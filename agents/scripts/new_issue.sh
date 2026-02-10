#!/usr/bin/env bash
set -euo pipefail

title="${1:-}"
if [[ -z "${title}" ]]; then
  echo "Usage: agents/scripts/new_issue.sh \"Kurzer Titel\""
  exit 1
fi

root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
issues_dir="${root}/agents/issues"
template="${issues_dir}/TEMPLATE.md"

if [[ ! -f "${template}" ]]; then
  echo "Missing template: ${template}"
  exit 1
fi

mkdir -p "${issues_dir}"

shopt -s nullglob
issue_files=("${issues_dir}"/ISSUE-*.md)
shopt -u nullglob

if (( ${#issue_files[@]} == 0 )); then
  next_id="0001"
else
  next_id="$(
    printf "%s\n" "${issue_files[@]}" \
      | sed -E 's/.*ISSUE-([0-9]{4}).*/\1/' \
      | sort -n \
      | tail -n 1 \
      | awk '{printf("%04d\n", $1 + 1)}'
  )"
fi

slug="$(
  echo "${title}" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' \
    | cut -c1-60
)"

file="${issues_dir}/ISSUE-${next_id}-${slug}.md"

date_ymd="$(date -I)"

sed \
  -e "s/^# ISSUE-0000:/# ISSUE-${next_id}:/" \
  -e "s/<Titel>/${title}/" \
  -e "s/^\\- Erstellt: YYYY-MM-DD/\\- Erstellt: ${date_ymd}/" \
  "${template}" > "${file}"

echo "${file}"
