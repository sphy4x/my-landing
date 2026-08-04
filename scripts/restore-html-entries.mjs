import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const entries = [
  ['source-pages/index.html', 'index.html'],
  ['source-pages/services/plakakia/index.html', 'services/plakakia/index.html'],
  ['source-pages/services/elaiokhromatismoi/index.html', 'services/elaiokhromatismoi/index.html'],
  ['source-pages/services/ydraulika/index.html', 'services/ydraulika/index.html'],
  ['source-pages/services/apoxiloseis/index.html', 'services/apoxiloseis/index.html'],
  ['source-pages/privacy/index.html', 'privacy/index.html'],
  ['source-pages/terms/index.html', 'terms/index.html']
];

for (const [source, destination] of entries) {
  const target = resolve(destination);
  await mkdir(dirname(target), { recursive: true });
  await cp(resolve(source), target);
}

console.log(`Restored ${entries.length} Vite HTML entries from source-pages.`);
