const CACHE_VERSION = "escuela-los-loros-20260821-30";

const ARCHIVOS_BASE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.webmanifest",
    "./imagenes/logo.png",
    "./imagenes/frontis-colegio.jpg",
    "./icono192.png",
    "./icono512.png",
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
