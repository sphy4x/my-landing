import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const paths = [
  '/',
  '/services/plakakia/',
  '/services/elaiokhromatismoi/',
  '/services/ydraulika/',
  '/services/apoxiloseis/',
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
    const html = renderToStaticMarkup(React.createElement(App));

    if (!html.includes('TechnoHome.gr') || !html.includes('699 683 2335')) {
      throw new Error(`Required business content is missing for ${pathname}`);
    }

    if (pathname === '/' && !html.includes('1000+')) {
      throw new Error('Homepage trust metrics are missing');
    }

    console.log(`PASS ${pathname} (${html.length} chars)`);
  }
} finally {
  await server.close();
}
