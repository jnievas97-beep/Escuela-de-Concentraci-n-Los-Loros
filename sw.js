const CACHE_VERSION = "escuela-los-loros-20260821-33";

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

self.addEventListener("fetch", function (evento) {
    const solicitud = evento.request;

    if (solicitud.method !== "GET") {
        return;
    }

    const url = new URL(solicitud.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    /* PDF y archivos editables siempre se solicitan a la red.
       Evita que un documento actualizado quede atrapado en caché. */
    if (/\.(pdf|doc|docx|ppt|pptx|xls|xlsx)(?:$|\?)/i.test(url.pathname + url.search)) {
        return;
    }

    /* HTML/CSS/JS/JSON: network-first para recibir mejoras rápidamente. */
    const esActualizable =
        solicitud.mode === "navigate" ||
        /\.(html|css|js|json|webmanifest)(?:$|\?)/i.test(url.pathname + url.search);

    if (esActualizable) {
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
        return;
    }

    /* Imágenes y recursos estáticos: caché primero, red como respaldo. */
    evento.respondWith(
        caches.match(solicitud)
            .then(function (enCache) {
                if (enCache) {
                    return enCache;
                }

                return fetch(solicitud)
                    .then(function (respuesta) {
                        const copia = respuesta.clone();
                        caches.open(CACHE_VERSION)
                            .then(function (cache) {
                                cache.put(solicitud, copia);
                            });
                        return respuesta;
                    });
            })
    );
});
