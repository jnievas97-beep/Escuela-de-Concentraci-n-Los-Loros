const CACHE_VERSION = "escuela-los-loros-20260820-3";

const ARCHIVOS_BASE = [
    "./",
    "./index.html",
    "./style.css?v=20260820-3",
    "./script.js?v=20260820-3",
    "./manifest.webmanifest",
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

                return Promise.allSettled(

                    ARCHIVOS_BASE.map(function (archivo) {

                        return cache.add(archivo);

                    })

                );

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", function (evento) {

    evento.waitUntil(

        caches.keys()

            .then(function (claves) {

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


    /*
     * Los PDF no se guardan automáticamente
     * porque pueden ser archivos grandes.
     */

    if (
        url.pathname
            .toLowerCase()
            .endsWith(".pdf")
    ) {

        return;

    }


    evento.respondWith(

        fetch(
            solicitud,
            {
                cache: "no-store"
            }
        )

            .then(function (respuesta) {

                /*
                 * Si conseguimos una respuesta correcta
                 * desde Internet, guardamos una copia
                 * actualizada.
                 */

                if (
                    respuesta &&
                    respuesta.ok
                ) {

                    const copia =
                        respuesta.clone();


                    caches.open(CACHE_VERSION)

                        .then(function (cache) {

                            cache.put(
                                solicitud,
                                copia
                            );

                        });

                }


                return respuesta;

            })

            .catch(function () {

                /*
                 * Si no hay conexión,
                 * intentamos recuperar el recurso
                 * desde la caché.
                 */

                return caches.match(solicitud)

                    .then(function (guardada) {

                        if (guardada) {

                            return guardada;

                        }


                        /*
                         * Si la persona está navegando
                         * por el sitio y no existe conexión,
                         * mostramos la copia almacenada
                         * del inicio en vez del error
                         * del navegador.
                         */

                        if (
                            solicitud.mode ===
                            "navigate"
                        ) {

                            return caches
                                .match("./index.html")

                                .then(function (inicio) {

                                    return (
                                        inicio ||
                                        caches.match("./")
                                    );

                                });

                        }


                        return Response.error();

                    });

            })

    );

});
