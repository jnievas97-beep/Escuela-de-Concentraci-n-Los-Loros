const CACHE_VERSION = "escuela-los-loros-20260818-5";

const ARCHIVOS_BASE = [
    "./",
    "./index.html",
    "./style.css?v=20260818-5",
    "./script.js?v=20260818-5",
    "./manifest.webmanifest?v=20260818-5",
    "./imagenes/logo.png",
    "./icono192.png",
    "./icono512.png",
    "./iconomaskable512.png",
    "./apple-touch-icon.png"
];

self.addEventListener("install", function (evento) {
    evento.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                return cache.addAll(ARCHIVOS_BASE);
            })
    );
    self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
    evento.waitUntil(
        caches.keys().then(function (claves) {
            return Promise.all(
                claves
                    .filter(function (clave) {
                        return clave !== CACHE_VERSION;
                    })
                    .map(function (clave) {
                        return caches.delete(clave);
                    })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", function (evento) {
    const solicitud = evento.request;

    if (solicitud.method !== "GET") {
        return;
    }

    const url = new URL(solicitud.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    if (url.pathname.toLowerCase().endsWith(".pdf")) {
        return;
    }

    evento.respondWith(
        fetch(solicitud, { cache: "no-store" })
            .then(function (respuesta) {
                const copia = respuesta.clone();

                caches.open(CACHE_VERSION)
                    .then(function (cache) {
                        cache.put(solicitud, copia);
                    });

                return respuesta;
            })
            .catch(function () {
                return caches.match(solicitud);
            })
    );
});
