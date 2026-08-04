import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../app.jsx';
import '../styles.css';
import '../motion.css';
import '../motion-overrides.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
