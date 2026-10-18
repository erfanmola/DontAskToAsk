// Retire the old Workbox cache so existing installations receive the new site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		const keys = await caches.keys();
		await Promise.all(keys.filter((key) => key.startsWith("workbox-") || key.startsWith("dontasktoask")).map((key) => caches.delete(key)));
		await self.clients.claim();
		await self.registration.unregister();
	})());
});
