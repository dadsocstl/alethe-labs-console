#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
[[ -d node_modules ]] || npm install
export PORT="${PORT:-3000}"
exec npm run dev -- --hostname 0.0.0.0 --port "$PORT"
