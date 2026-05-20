#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

SVG="src/assets/logo.svg"
OUT="public/icons"
SIZES=(16 32 48 128)

echo "Generating icons from $SVG..."
mkdir -p "$OUT"

for size in "${SIZES[@]}"; do
  rsvg-convert -w "$size" "$SVG" | \
    magick - -background transparent -gravity center -extent "${size}x${size}" PNG32:"${OUT}/${size}.png"
  echo "  ✓ ${OUT}/${size}.png"
done

magick "${OUT}/32.png" public/favicon.ico
echo "  ✓ public/favicon.ico"
echo "Done!"
