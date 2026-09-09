/* Firebase Cloud Messaging · PUSH FONDO Fase 1 + Fase 2 · 20260908-8 */
importScripts("https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCeurKQXNecTg3panlLFRUXbkLli1FPwZ8",
    authDomain: "escuela-los-loros.firebaseapp.com",
    projectId: "escuela-los-loros",
    storageBucket: "escuela-los-loros.firebasestorage.app",
    messagingSenderId: "946353006014",
    appId: "1:946353006014:web:3e5d5523a171cd33ba85ef",
    measurementId: "G-4RDL3QZBWN"
});

const firebaseMessaging = firebase.messaging();

/* =========================================================
   PUSH EN SEGUNDO PLANO / PWA CERRADA
   Los mensajes se envían como data-only desde Apps Script.
   Así este Service Worker controla explícitamente cuándo y
   cómo se muestra la notificación, tanto Fase 1 como Fase 2.
========================================================= */
firebaseMessaging.onBackgroundMessage(function (payload) {
    const datos = payload && payload.data ? payload.data : {};

    const titulo =
        datos.titulo ||
        "Escuela de Concentración Los Loros";

    const cuerpo =
        datos.cuerpo ||
        "Hay una nueva información disponible.";

    const enlace =
        datos.enlace ||
        self.location.origin + self.location.pathname.replace(/sw\.js$/, "");

    const tipo =
        datos.tipo ||
        "general";

    const tag =
        datos.tag ||
        ("escuela-los-loros-" + String(tipo).toLowerCase().replace(/\s+/g, "-"));

    return self.registration.showNotification(titulo, {
        body: cuerpo,
        icon: "./icono192.png",
        badge: "./icononotificacion.png",
        tag: tag,
        renotify: true,
        data: {
            enlace: enlace,
            tipo: tipo
        }
    });
});

/* Abre o enfoca la PWA al tocar la notificación. */
self.addEventListener("notificationclick", function (evento) {
    evento.notification.close();

    const destino =
        evento.notification &&
        evento.notification.data &&
        evento.notification.data.enlace
            ? evento.notification.data.enlace
            : self.location.origin + "/";

    evento.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function (ventanas) {
            for (const ventana of ventanas) {
                if ("focus" in ventana) {
                    try {
                        if ("navigate" in ventana) {
                            ventana.navigate(destino);
                        }
                    } catch (e) {}
                    return ventana.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(destino);
            }
        })
    );
});


const CACHE_VERSION = "escuela-los-loros-20260908-8";

const ARCHIVOS_BASE = [
    "./",
    "./index.html",
    "./style.css?v=20260908-8",
    "./script.js?v=20260908-8",
    "./notificaciones-config.js?v=20260908-8",
    "./manifest.webmanifest?v=20260908-8",
    "./imagenes/logo.png",
    "./imagenes/logoespecialidad1.png",
    "./imagenes/logoespecialidad2.png",
    "./imagenes/logosostenedor.png",
    "./imagenes/frontis-colegio.jpg",
    "./icono192.png",
    "./icononotificacion.png",
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
