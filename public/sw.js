self.addEventListener('install', () => {
  // activar inmediatamente
  globalThis.skipWaiting();
});

self.addEventListener('activate', async () => {
  // eliminar todos los caches existentes
  const keys = await caches.keys();
  await Promise.all(keys.map(key => caches.delete(key)));

  // desinstalarse a sí mismo
  globalThis.registration.unregister();

  // reclamar control y forzar que todos los clientes se recarguen
  const clients = await globalThis.clients.matchAll({ type: 'window' });
  for (const client of clients) {
    client.navigate(client.url);
  }
});
