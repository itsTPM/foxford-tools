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
    magick - -background transparent -gravity center -extent "${size}x${size}" PNG32:"${OUT}/icon${size}.png"
  echo "  ✓ ${OUT}/icon${size}.png"
done

magick "${OUT}/icon32.png" public/favicon.ico
echo "  ✓ public/favicon.ico"

node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const sizes = [16, 32, 48, 128];
const iconPath = s => 'icons/icon' + s + '.png';
manifest.icons = Object.fromEntries(sizes.map(s => [String(s), iconPath(s)]));
manifest.action.default_icon = Object.fromEntries(sizes.map(s => [String(s), iconPath(s)]));
fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2) + '\n');
"

echo "  ✓ manifest.json"
echo "Done!"
