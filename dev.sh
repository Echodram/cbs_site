#!/bin/bash
# Fixes .next ownership if created by root (e.g. after a Claude Code build),
# then starts the Next.js dev server.

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -d "$PROJECT_DIR/.next" ] && [ "$(stat -c '%U' "$PROJECT_DIR/.next")" = "root" ]; then
  echo "Fixing .next ownership..."
  sudo chown -R "$USER:$USER" "$PROJECT_DIR/.next"
fi

cd "$PROJECT_DIR" && npm run dev
