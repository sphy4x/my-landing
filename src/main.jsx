import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '../app.jsx';
import '../styles.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production pages contain server-rendered HTML for SEO. Local Vite
// development still uses the normal empty root.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
