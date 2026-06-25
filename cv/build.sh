#!/usr/bin/env bash
# Regenerate the CV PDF from cv/Eirik_Mo_CV.md into the site's public dir.
# Source of truth: cv/Eirik_Mo_CV.md  →  output: src/public/Eirik_Mo_CV.pdf
# Run via: bun run cv   (or: ./cv/build.sh)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/cv/Eirik_Mo_CV.md"
OUT="$ROOT/src/public/Eirik_Mo_CV.pdf"

# Resolve the gstack make-pdf binary (env override → repo-local → home install).
P="${MAKE_PDF_BIN:-}"
[ -z "$P" ] && [ -x "$ROOT/.claude/skills/gstack/make-pdf/dist/pdf" ] && P="$ROOT/.claude/skills/gstack/make-pdf/dist/pdf"
[ -z "$P" ] && [ -x "$HOME/.claude/skills/gstack/make-pdf/dist/pdf" ] && P="$HOME/.claude/skills/gstack/make-pdf/dist/pdf"

if [ -z "$P" ] || [ ! -x "$P" ]; then
  echo "error: gstack make-pdf binary not found." >&2
  echo "  Install gstack and run './setup' in the gstack repo, or set MAKE_PDF_BIN=/path/to/pdf" >&2
  exit 1
fi

echo "Generating CV PDF…" >&2
"$P" generate "$SRC" "$OUT"
echo "CV written to: $OUT"
