// @ts-nocheck TODO: fix types .. move to TS file
var CACHE_NAME = 'local-todo-1';

self.addEventListener('install', (event) => {
	event.waitUntil((async () => {
		const cache = await caches.open(CACHE_NAME);
		self.skipWaiting();
		return (await cache.keys()).map(key => cache.delete(key));
	})());
});

self.addEventListener('activate', (event) => {
	clients.claim();
});


self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
			.then(function (response) {
				// Cache hit - return response
				if (response) {
					// update cache in the background
					handleRequest(event.request)
					return response;
				}
				return handleRequest(event.request);
			})
	);
});


const handleRequest = async (request) => {
	const response = await fetch(request).catch(error => {
		console.error(error);
	});
	if(!request){
		return null;
	}
	const url = new URL(request.url);
	const responseToCache = response.clone();
	const cache = await caches.open(CACHE_NAME);
	cache.put(request, responseToCache);
	return response;
}