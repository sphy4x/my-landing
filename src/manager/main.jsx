import React from 'react';
import { createRoot } from 'react-dom/client';
import Manager from './Manager.jsx';
import './manager.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/manager-sw.js', { scope: '/manager/' })
      .catch(() => { /* Push setup is optional until the backend is configured. */ });
  });
}

createRoot(document.getElementById('manager-root')).render(
  <React.StrictMode><Manager /></React.StrictMode>
);
