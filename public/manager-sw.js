/* Private Manager service worker. Never caches leads, sessions or API responses. */
self.addEventListener('push', (event) => {
  const title = 'Techno Home · Νέο αίτημα';
  // Deliberately avoid customer details in Android lock-screen notifications.
  event.waitUntil(self.registration.showNotification(title, {
    body: 'Άνοιξε το Manager για να δεις τη νέα αίτηση.',
    icon: '/manager-icon.svg',
    badge: '/manager-icon.svg',
    tag: 'technohome-new-lead',
    renotify: true,
    data: { url: '/manager/' }
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const found = windows.find((client) => new URL(client.url).pathname.startsWith('/manager/'));
    if (found) return found.focus();
    return clients.openWindow('/manager/');
  })());
});
