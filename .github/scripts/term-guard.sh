#!/usr/bin/env bash
# Rejects prohibited terms in the lines a PR adds, its title, and its body.
# Patterns use character-class form so this file never matches itself.
# Usage: term-guard.sh <base-sha> <head-sha>   (PR_TITLE and PR_BODY come from the environment)
set -uo pipefail

PATTERN='[c]laude|[a]nthropic|servi[c]e[ _-]?mesh'
META_PATTERN="$PATTERN|generated [w]ith|co-authored-[b]y"

base="${1:?base sha}"
head="${2:?head sha}"
status=0

if hits=$(git diff -U0 --no-color "$base...$head" -- . ':(exclude).github/scripts/term-guard.sh' \
    | grep -E '^\+[^+]' | grep -Ein "$PATTERN"); then
  echo "Prohibited term in added lines:" >&2
  echo "$hits" | head -50 >&2
  status=1
fi

for field in PR_TITLE PR_BODY; do
  if printf '%s' "${!field:-}" | grep -Eiq "$META_PATTERN"; then
    echo "Prohibited term in ${field}" >&2
    status=1
  fi
done

if git diff --name-only "$base...$head" | grep -Eiq '(^|/)\.[c]laude/|(^|/)[c]laude[^/]*$'; then
  echo "Agent config files are part of this change" >&2
  status=1
fi

exit "$status"
