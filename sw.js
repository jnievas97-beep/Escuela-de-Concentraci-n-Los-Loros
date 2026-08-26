const CACHE_VERSION = "escuela-los-loros-20260826-15";

const ARCHIVOS_BASE = [
    "./",
    "./index.html",
    "./style.css?v=20260825-11",
    "./script.js?v=20260825-11",
    "./manifest.webmanifest?v=20260825-11",
    "./imagenes/logo.png",
    "./imagenes/logoespecialidad1.png",
    "./imagenes/logoespecialidad2.png",
    "./imagenes/logosostenedor.png",
    "./imagenes/frontis-colegio.jpg",
    "./icono192.png",
    "./icono512.png",
    "./apple-touch-icon.png"
];

self.addEventListener("install", function (evento) {
    evento.waitUntil(
        caches.open(CACHE_VERSION).then(async function (cache) {
            await Promise.allSettled(
                ARCHIVOS_BASE.map(async function (ruta) {
                    try {
                        const respuesta = await fetch(ruta, { cache: "reload" });
                        if (respuesta && respuesta.ok) {
                            await cache.put(ruta, respuesta.clone());
                        }
                    } catch (error) {
                        console.warn("No se pudo precargar:", ruta);
                    }
                })
            );
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

    if (solicitud.method !== "GET") return;

    const url = new URL(solicitud.url);
    if (url.origin !== self.location.origin) return;

    const esDocumento =
        /\.(pdf|doc|docx|ppt|pptx|xls|xlsx)(?:$|\?)/i.test(url.pathname + url.search);

    if (esDocumento) {
        evento.respondWith(
            fetch(solicitud, { cache: "no-store" })
                .catch(function () { return caches.match(solicitud); })
        );
        return;
    }

    const esActualizable =
        solicitud.mode === "navigate" ||
        /\.(html|css|js|json|webmanifest)(?:$|\?)/i.test(url.pathname + url.search);

    if (esActualizable) {
        evento.respondWith(
            fetch(solicitud, { cache: "no-store" })
                .then(function (respuesta) {
                    if (respuesta && respuesta.ok) {
                        const copia = respuesta.clone();
                        caches.open(CACHE_VERSION).then(function (cache) {
                            cache.put(solicitud, copia);
                        });
                    }
                    return respuesta;
                })
                .catch(function () {
                    return caches.match(solicitud);
                })
        );
        return;
    }

    const esImagen =
        solicitud.destination === "image" ||
        /\.(png|jpe?g|webp|gif|svg|ico)(?:$|\?)/i.test(url.pathname + url.search);

    if (esImagen) {
        /* Red primero: evita que el teléfono conserve logos/fotos antiguas o incompletas. */
        evento.respondWith(
            fetch(solicitud, { cache: "no-store" })
                .then(function (respuesta) {
                    if (respuesta && respuesta.ok) {
                        const copia = respuesta.clone();
                        caches.open(CACHE_VERSION).then(function (cache) {
                            cache.put(solicitud, copia);
                        });
                    }
                    return respuesta;
                })
                .catch(function () {
                    return caches.match(solicitud);
                })
        );
        return;
    }

    evento.respondWith(
        fetch(solicitud)
            .then(function (respuesta) {
                if (respuesta && respuesta.ok) {
                    const copia = respuesta.clone();
                    caches.open(CACHE_VERSION).then(function (cache) {
                        cache.put(solicitud, copia);
                    });
                }
                return respuesta;
            })
            .catch(function () {
                return caches.match(solicitud);
            })
    );
});
