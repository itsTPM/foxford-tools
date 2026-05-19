import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import subsetFont from 'subset-font';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, '../src/assets/fonts/Inter');

function buildCharset() {
  const ranges = [
    [0x0020, 0x007e], // Basic Latin (ASCII printable)
    [0x0410, 0x044f], // Russian without Ё and ё
  ];
  const codepoints = [
    0x0401, // Ё
    0x0451, // ё
    0x00a0, // Non-breaking space
    0x00ab, // «
    0x00bb, // »
    0x2013, // –
    0x2014, // —
    0x2018, // '
    0x2019, // '
    0x201c, // "
    0x201d, // "
    0x2026, // …
    0x2116, // №
    0x20bd, // ₽
    0x25cf, // ●
  ];

  let chars = '';
  for (const [start, end] of ranges) {
    for (let cp = start; cp <= end; cp++) {
      chars += String.fromCodePoint(cp);
    }
  }
  for (const cp of codepoints) {
    chars += String.fromCodePoint(cp);
  }
  return chars;
}

const fontFiles = ['InterVariable.woff2', 'InterVariable-Italic.woff2'];
const chars = buildCharset();

for (const filename of fontFiles) {
  const filepath = join(fontsDir, filename);
  const original = await readFile(filepath);
  const subsetted = await subsetFont(original, chars, { targetFormat: 'woff2' });
  await writeFile(filepath, subsetted);

  const before = (original.length / 1024).toFixed(1);
  const after = (subsetted.length / 1024).toFixed(1);
  const reduction = (((original.length - subsetted.length) / original.length) * 100).toFixed(1);
  console.log(`${filename}: ${before} KB → ${after} KB (−${reduction}%)`);
}
