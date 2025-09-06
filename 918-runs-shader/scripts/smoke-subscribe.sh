#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-}"
EMAIL="${2:-}"

if [ -z "$BASE_URL" ]; then
  echo "Usage: $0 https://your-vercel-app.vercel.app [email]"
  echo "Example: $0 https://my-app.vercel.app test+$(date +%s)@example.com"
  exit 1
fi

if [ -z "${EMAIL}" ]; then
  EMAIL="test+$(date +%s)@example.com"
fi

printf "\nPOST %s/api/subscribe\n" "$BASE_URL"
curl -sS -X POST "$BASE_URL/api/subscribe" \
  -H 'Content-Type: application/json' \
  --data "{\"email\":\"$EMAIL\",\"tags\":[\"918Runs\",\"Smoke\"],\"metadata\":{\"source\":\"smoke-script\"}}" \
  | sed 's/{/\n{\n/g; s/,/\n,/g; s/}/\n}\n/g'

echo "\nDone."

