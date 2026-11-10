import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

// GitHub Pages is static. Render meaningful, crawlable HTML during the build,
// then hydrate it on the client so the existing React interactions still work.
const paths = [
  '/',
  '/services/plakakia/',
  '/services/elaiokhromatismoi/',
  '/services/ydraulika/',
  '/services/apoxiloseis/',
  '/services/anakainisi-baniou/',
  '/services/anakainiseis/',
  '/privacy/',
  '/terms/'
];

const server = await createServer({
  appType: 'custom',
  server: { middlewareMode: true },
  logLevel: 'error'
});

try {
  const { default: App } = await server.ssrLoadModule('/app.jsx');

  for (const pathname of paths) {
    globalThis.window = { location: { pathname } };
    const markup = renderToString(React.createElement(App));
    if (!/<h1\b[^>]*>/.test(markup)) {
      throw new Error(`Missing H1 on ${pathname}`);
    }
    const file = resolve('dist', pathname.slice(1), 'index.html');
    const html = await readFile(file, 'utf8');
    const placeholder = '<div id="root"></div>';
    if (!html.includes(placeholder)) {
      throw new Error(`Missing React root in ${file}`);
    }
    await writeFile(file, html.replace(placeholder, `<div id="root">${markup}</div>`));
    console.log(`Prerendered ${pathname} (${markup.length} HTML characters)`);
  }
} finally {
  delete globalThis.window;
  await server.close();
}
