
/* =========================================================
   AVISOS IMPORTANTES CON VIGENCIA EN EL NOMBRE · 20260825-5
   Formato admitido:
   aviso02_desde_2026-08-21_hasta_2026-08-23
   También funciona si el nombre termina en .jpg/.png/.webp/etc.
========================================================= */

function obtenerVigenciaDesdeNombreAviso(valor) {
    const texto = String(valor || "");
    const coincidencia = texto.match(
        /_desde_(\d{4}-\d{2}-\d{2})_hasta_(\d{4}-\d{2}-\d{2})/i
    );

    if (!coincidencia) return null;

    const desde = new Date(coincidencia[1] + "T00:00:00");
    const hasta = new Date(coincidencia[2] + "T23:59:59.999");

    if (Number.isNaN(desde.getTime()) || Number.isNaN(hasta.getTime())) {
        return null;
    }

    return { desde, hasta };
}

function obtenerTextoIdentificadorAviso(aviso) {
    if (typeof aviso === "string") return aviso;
    if (!aviso || typeof aviso !== "object") return "";

    return [
        aviso.archivo,
        aviso.imagen,
        aviso.src,
        aviso.url,
        aviso.nombre,
        aviso.titulo
    ].filter(Boolean).join(" ");
}

function avisoEstaVigente(aviso, ahora = new Date()) {
    const vigencia = obtenerVigenciaDesdeNombreAviso(
        obtenerTextoIdentificadorAviso(aviso)
    );

    /* Los avisos antiguos sin fechas siguen funcionando como antes. */
    if (!vigencia) return true;

    return ahora >= vigencia.desde && ahora <= vigencia.hasta;
}

function seleccionarAvisoVigente(avisos) {
    if (!Array.isArray(avisos)) return null;
    return avisos.find(aviso => avisoEstaVigente(aviso)) || null;
}

/* =========================================================
   ESCUELA DE CONCENTRACIÓN LOS LOROS
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("=================================");
    console.log("ESCUELA DE CONCENTRACIÓN LOS LOROS");
    console.log("script.js cargado correctamente");
    console.log("=================================");




    /* =====================================================
       INSTALACIÓN UNIVERSAL - ANDROID / SAMSUNG / iOS
    ===================================================== */

    const botonInstalarUniversal =
        document.getElementById(
            "botonInstalarUniversal"
        );


    const modalInstalacionApp =
        document.getElementById(
            "modalInstalacionApp"
        );


    const cerrarModalInstalacion =
        document.getElementById(
            "cerrarModalInstalacion"
        );


    const botonInstalarAhora =
        document.getElementById(
            "botonInstalarAhora"
        );


    const mensajeDispositivoInstalacion =
        document.getElementById(
            "mensajeDispositivoInstalacion"
        );


    const instruccionRecomendada =
        document.getElementById(
            "instruccionRecomendada"
        );


    let eventoInstalacionPWA =
        null;


    const agenteUsuario =
        navigator.userAgent || "";


    const esIOSInstalacion =
        /iphone|ipad|ipod/i.test(
            agenteUsuario
        );


    const esAndroidInstalacion =
        /android/i.test(
            agenteUsuario
        );


    const esSamsungInternet =
        /samsungbrowser/i.test(
            agenteUsuario
        );


    const esChromeAndroid =
        esAndroidInstalacion &&
        /chrome|crios/i.test(
            agenteUsuario
        ) &&
        !esSamsungInternet;


    const estaInstaladaComoApp =
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches ||
        window.navigator.standalone === true;


    const esPantallaMovilOTablet =
        window.matchMedia(
            "(max-width: 1024px)"
        ).matches;

    const esDispositivoMovilOTablet =
        esIOSInstalacion ||
        esAndroidInstalacion ||
        esPantallaMovilOTablet;

    if (botonInstalarUniversal) {

        if (
            esDispositivoMovilOTablet &&
            !estaInstaladaComoApp
        ) {
            /*
             * El acceso a instalación debe permanecer visible
             * en teléfonos y tablets aunque el navegador todavía
             * no haya disparado beforeinstallprompt.
             */
            botonInstalarUniversal.hidden = false;
            botonInstalarUniversal.setAttribute(
                "aria-hidden",
                "false"
            );
        } else {
            botonInstalarUniversal.hidden = true;
        }

    }



    function abrirModalInstalacion() {

        if (
            !modalInstalacionApp ||
            !esDispositivoMovilOTablet
        ) {
            return;
        }


        modalInstalacionApp.hidden =
            false;


        document.body.classList.add(
            "modal-instalacion-abierto"
        );


        actualizarGuiaInstalacion();


        if (cerrarModalInstalacion) {

            cerrarModalInstalacion.focus();

        }

    }


    function cerrarGuiaInstalacion() {

        if (!modalInstalacionApp) {
            return;
        }


        modalInstalacionApp.hidden =
            true;


        document.body.classList.remove(
            "modal-instalacion-abierto"
        );


        if (botonInstalarUniversal) {

            botonInstalarUniversal.focus();

        }

    }


    function actualizarGuiaInstalacion() {

        if (
            !mensajeDispositivoInstalacion ||
            !instruccionRecomendada
        ) {
            return;
        }


        if (estaInstaladaComoApp) {

            mensajeDispositivoInstalacion.textContent =
                "✅ La aplicación ya está instalada en este dispositivo.";


            instruccionRecomendada.innerHTML =
                "<h3>Aplicación instalada</h3>" +
                "<p>Puedes abrirla directamente desde la pantalla de inicio o desde tus aplicaciones.</p>";


            if (botonInstalarAhora) {

                botonInstalarAhora.hidden =
                    true;

            }


            return;

        }


        if (eventoInstalacionPWA) {

            mensajeDispositivoInstalacion.textContent =
                "✅ Este navegador permite instalar la aplicación directamente.";


            instruccionRecomendada.innerHTML =
                "<h3>Instalación directa disponible</h3>" +
                "<p>Presiona <strong>Instalar ahora</strong> y confirma la instalación cuando el navegador lo solicite.</p>";


            if (botonInstalarAhora) {

                botonInstalarAhora.hidden =
                    false;

            }


            return;

        }


        if (botonInstalarAhora) {

            botonInstalarAhora.hidden =
                true;

        }


        if (esIOSInstalacion) {

            mensajeDispositivoInstalacion.textContent =
                "🍎 Detectamos un iPhone o iPad.";


            instruccionRecomendada.innerHTML =
                "<h3>Instalar en iPhone / iPad</h3>" +
                "<ol>" +
                    "<li>Abre esta página en <strong>Safari</strong>.</li>" +
                    "<li>Toca el botón <strong>Compartir</strong>.</li>" +
                    "<li>Selecciona <strong>Agregar a pantalla de inicio</strong>.</li>" +
                    "<li>Toca <strong>Agregar</strong>.</li>" +
                "</ol>";


            return;

        }


        if (esSamsungInternet) {

            mensajeDispositivoInstalacion.textContent =
                "📱 Detectamos Samsung Internet.";


            instruccionRecomendada.innerHTML =
                "<h3>Agregar en Samsung Internet</h3>" +
                "<ol>" +
                    "<li>Toca el menú <strong>☰</strong>.</li>" +
                    "<li>Selecciona <strong>Agregar página a</strong>.</li>" +
                    "<li>Elige <strong>Pantalla de inicio</strong> o <strong>Pantalla de aplicaciones</strong>, si aparece.</li>" +
                    "<li>Confirma para guardar Escuela Los Loros.</li>" +
                "</ol>";


            return;

        }


        if (esChromeAndroid) {

            mensajeDispositivoInstalacion.textContent =
                "🤖 Detectamos Android con Google Chrome.";


            instruccionRecomendada.innerHTML =
                "<h3>Agregar en Android con Chrome</h3>" +
                "<ol>" +
                    "<li>Toca el menú <strong>⋮</strong>.</li>" +
                    "<li>Busca <strong>Instalar aplicación</strong> o <strong>Agregar a pantalla principal</strong>.</li>" +
                    "<li>Si aparece <strong>Instalar aplicación</strong>, confirma.</li>" +
                    "<li>Si no aparece, usa <strong>Agregar a pantalla principal</strong>.</li>" +
                "</ol>";


            return;

        }


        if (esAndroidInstalacion) {

            mensajeDispositivoInstalacion.textContent =
                "🤖 Detectamos un teléfono Android.";


            instruccionRecomendada.innerHTML =
                "<h3>Instalar en Android</h3>" +
                "<p>Recomendamos abrir esta página en <strong>Google Chrome</strong> o <strong>Samsung Internet</strong> y buscar en el menú la opción <strong>Instalar aplicación</strong> o <strong>Agregar a pantalla principal</strong>.</p>";


            return;

        }


        mensajeDispositivoInstalacion.textContent =
            "💻 Consulta las instrucciones para instalar la aplicación en tu teléfono.";


        instruccionRecomendada.innerHTML =
            "<h3>Instalar en un teléfono</h3>" +
            "<p>Abre esta misma página desde tu teléfono y sigue las instrucciones correspondientes a Android, Samsung o iPhone.</p>";

    }


    if (botonInstalarUniversal) {

        botonInstalarUniversal.addEventListener(
            "click",
            abrirModalInstalacion
        );

    }


    if (cerrarModalInstalacion) {

        cerrarModalInstalacion.addEventListener(
            "click",
            cerrarGuiaInstalacion
        );

    }


    document.querySelectorAll(
        "[data-cerrar-instalacion]"
    ).forEach(
        function (elemento) {

            elemento.addEventListener(
                "click",
                cerrarGuiaInstalacion
            );

        }
    );


    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key ===
                    "Escape" &&
                modalInstalacionApp &&
                !modalInstalacionApp.hidden
            ) {

                cerrarGuiaInstalacion();

            }

        }
    );


    window.addEventListener(
        "beforeinstallprompt",
        function (evento) {

            /*
             * Guardamos el evento para que el usuario pueda
             * iniciar la instalación desde nuestro botón.
             */

            evento.preventDefault();


            eventoInstalacionPWA =
                evento;


            if (botonInstalarUniversal) {
                botonInstalarUniversal.hidden = false;
                const textoBoton =
                    botonInstalarUniversal.querySelector(
                        "span:last-child"
                    );
                if (textoBoton) {
                    textoBoton.textContent =
                        "Instalar aplicación";
                }
            }


            actualizarGuiaInstalacion();


            console.log(
                "Instalación PWA disponible en este navegador."
            );

        }
    );


    if (botonInstalarAhora) {

        botonInstalarAhora.addEventListener(
            "click",
            async function () {

                if (!eventoInstalacionPWA) {

                    actualizarGuiaInstalacion();

                    return;

                }


                eventoInstalacionPWA.prompt();


                const eleccion =
                    await eventoInstalacionPWA
                        .userChoice;


                console.log(
                    "Resultado de instalación:",
                    eleccion.outcome
                );


                eventoInstalacionPWA =
                    null;


                actualizarGuiaInstalacion();

            }
        );

    }


    window.addEventListener(
        "appinstalled",
        function () {

            eventoInstalacionPWA =
                null;


            if (botonInstalarUniversal) {

                botonInstalarUniversal.hidden =
                    true;

            }


            if (modalInstalacionApp) {

                modalInstalacionApp.hidden =
                    true;

            }


            document.body.classList.remove(
                "modal-instalacion-abierto"
            );


            console.log(
                "Escuela Los Loros instalada correctamente."
            );

        }
    );


    /*
     * Registrar Service Worker para habilitar
     * funcionamiento como PWA.
     */

    if ("serviceWorker" in navigator) {

        window.addEventListener(
            "load",
            function () {

                navigator.serviceWorker
                    .register(
                        "sw.js"
                    )
                    .then(
                        function (registro) {

                            console.log(
                                "Service Worker registrado:",
                                registro.scope
                            );

                        }
                    )
                    .catch(
                        function (error) {

                            console.warn(
                                "No fue posible registrar el Service Worker:",
                                error
                            );

                        }
                    );

            }
        );

    }


    if (
        estaInstaladaComoApp &&
        botonInstalarUniversal
    ) {

        botonInstalarUniversal.hidden =
            true;

    }



    /* =====================================================
       ELEMENTOS DEL MENÚ
    ===================================================== */

    const botonesMenu =
        document.querySelectorAll(".boton-menu");

    const paginas =
        document.querySelectorAll(".pagina");
/* =====================================================
       FUNCIÓN PARA MOSTRAR UNA PÁGINA
    ===================================================== */

    function mostrarPagina(nombrePagina) {

        paginas.forEach(function (pagina) {

            pagina.classList.remove("activa");

        });


        botonesMenu.forEach(function (boton) {

            boton.classList.remove("activo");

        });


        const paginaSeleccionada =
            document.getElementById(nombrePagina);


        if (paginaSeleccionada) {

            paginaSeleccionada.classList.add("activa");

        } else {

            console.warn(
                "No se encontró la página:",
                nombrePagina
            );

            return;

        }


        const botonSeleccionado =
            document.querySelector(
                '.boton-menu[data-pagina="' +
                nombrePagina +
                '"]'
            );


        if (botonSeleccionado) {

            botonSeleccionado.classList.add("activo");

            botonSeleccionado.setAttribute(
                "aria-current",
                "page"
            );

        }


        botonesMenu.forEach(function (boton) {

            if (boton !== botonSeleccionado) {

                boton.removeAttribute(
                    "aria-current"
                );

            }

        });


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    /* =====================================================
       EVENTOS DE LOS BOTONES DEL MENÚ
    ===================================================== */

    botonesMenu.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const nombrePagina =
                boton.getAttribute("data-pagina");


            if (nombrePagina) {

                mostrarPagina(nombrePagina);

                actualizarMigaPagina(
                    nombrePagina
                );

                actualizarHashPagina(
                    nombrePagina
                );

            }

        });

    });



    /* =====================================================
       PORTAL COMUNIDAD EDUCATIVA - ACCESOS POR PERFIL
    ===================================================== */

    const botonesPerfilComunidad =
        document.querySelectorAll(".portal-perfil-boton");

    botonesPerfilComunidad.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const idPanel =
                boton.getAttribute("aria-controls");

            const panel =
                document.getElementById(idPanel);

            if (!panel) {
                return;
            }

            const abrir =
                boton.getAttribute("aria-expanded") !== "true";

            botonesPerfilComunidad.forEach(function (otroBoton) {

                const otroPanel =
                    document.getElementById(
                        otroBoton.getAttribute("aria-controls")
                    );

                otroBoton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (otroPanel) {
                    otroPanel.hidden = true;
                }

            });

            if (abrir) {
                boton.setAttribute("aria-expanded", "true");
                panel.hidden = false;
            }

        });

    });


    document.querySelectorAll(
        "#comunidad [data-ir-pagina]"
    ).forEach(function (boton) {

        boton.addEventListener("click", function () {

            const pagina =
                boton.getAttribute("data-ir-pagina");

            const destinoComunidad =
                boton.getAttribute("data-destino-comunidad");

            if (!pagina) {
                return;
            }

            mostrarPagina(pagina);
            actualizarMigaPagina(pagina);
            actualizarHashPagina(pagina);

            if (destinoComunidad) {

                window.setTimeout(function () {

                    const destino =
                        document.getElementById(destinoComunidad);

                    if (destino) {
                        destino.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }

                }, 120);

            }

        });

    });


    document.querySelectorAll(
        "#comunidad [data-ir-inicio]"
    ).forEach(function (boton) {

        boton.addEventListener("click", function () {

            const idDestino =
                boton.getAttribute("data-ir-inicio");

            mostrarPagina("inicio");
            actualizarMigaPagina("inicio");
            actualizarHashPagina("inicio");

            window.setTimeout(function () {

                const destino =
                    document.getElementById(idDestino);

                if (destino) {
                    destino.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }, 120);

        });

    });



    /* =====================================================
       DESTINO INTERNO DESDE PORTAL COMUNIDAD
    ===================================================== */

    document.querySelectorAll(
        "#comunidad [data-destino-pagina]"
    ).forEach(function (boton) {

        boton.addEventListener("click", function () {

            const idDestino =
                boton.getAttribute("data-destino-pagina");

            window.setTimeout(function () {

                const destino =
                    document.getElementById(idDestino);

                if (destino) {
                    destino.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }, 150);

        });

    });


    /* =====================================================
       DOCUMENTOS ADICIONALES AUTOMÁTICOS
    ===================================================== */

    const listaDocumentosAutomaticos =
        document.getElementById(
            "listaDocumentosAutomaticos"
        );

    function iconoArchivoPorExtension(extension) {

        const ext =
            String(extension || "")
                .toLowerCase();

        if (["jpg","jpeg","png","webp","gif","svg"].includes(ext)) {
            return "🖼️";
        }

        if (ext === "pdf") {
            return "📕";
        }

        if (["doc","docx","odt","rtf"].includes(ext)) {
            return "📝";
        }

        if (["xls","xlsx","ods","csv"].includes(ext)) {
            return "📊";
        }

        if (["ppt","pptx","odp"].includes(ext)) {
            return "📽️";
        }

        if (["txt","md"].includes(ext)) {
            return "📄";
        }

        return "📎";
    }


    async function cargarDocumentosAutomaticos() {

        if (!listaDocumentosAutomaticos) {
            return;
        }

        try {

            const respuesta =
                await fetch(
                    "documentos/documentos.json?v=" +
                    Date.now(),
                    {
                        cache: "no-store"
                    }
                );

            if (!respuesta.ok) {
                throw new Error(
                    "No se encontró documentos.json"
                );
            }

            const archivos =
                await respuesta.json();

            const rutasYaEnlazadas =
                new Set(
                    Array.from(
                        document.querySelectorAll(
                            '#documentos a[href^="documentos/"]'
                        )
                    ).map(function (enlace) {
                        try {
                            return decodeURIComponent(
                                enlace.getAttribute("href")
                            ).toLowerCase();
                        } catch (_) {
                            return enlace.getAttribute("href").toLowerCase();
                        }
                    })
                );

            const adicionales =
                Array.isArray(archivos)
                    ? archivos.filter(function (archivo) {
                        const ruta =
                            String(archivo.ruta || "")
                                .toLowerCase();
                        return (
                            ruta &&
                            !rutasYaEnlazadas.has(ruta)
                        );
                    })
                    : [];

            listaDocumentosAutomaticos.innerHTML = "";
            listaDocumentosAutomaticos.setAttribute(
                "aria-busy",
                "false"
            );

            if (adicionales.length === 0) {

                const mensaje =
                    document.createElement("p");

                mensaje.className =
                    "estado-documentos-automaticos";

                mensaje.textContent =
                    "No hay archivos adicionales disponibles.";

                listaDocumentosAutomaticos.appendChild(
                    mensaje
                );

                return;
            }

            adicionales.forEach(function (archivo) {

                const item =
                    document.createElement("div");

                item.className =
                    "archivo-automatico";

                const icono =
                    document.createElement("span");

                icono.className =
                    "archivo-automatico-icono";

                icono.setAttribute(
                    "aria-hidden",
                    "true"
                );

                icono.textContent =
                    iconoArchivoPorExtension(
                        archivo.extension
                    );

                const datos =
                    document.createElement("span");

                datos.className =
                    "archivo-automatico-datos";

                const nombre =
                    document.createElement("span");

                nombre.className =
                    "archivo-automatico-nombre";

                nombre.textContent =
                    archivo.nombre;

                const tipo =
                    document.createElement("span");

                tipo.className =
                    "archivo-automatico-tipo";

                tipo.textContent =
                    String(
                        archivo.extension ||
                        "archivo"
                    ).toUpperCase();

                const enlace =
                    document.createElement("a");

                enlace.className =
                    "archivo-automatico-enlace";

                enlace.href =
                    archivo.ruta;

                enlace.target =
                    "_blank";

                enlace.rel =
                    "noopener noreferrer";

                enlace.textContent =
                    "Abrir archivo";

                datos.appendChild(nombre);
                datos.appendChild(tipo);

                item.appendChild(icono);
                item.appendChild(datos);
                item.appendChild(enlace);

                listaDocumentosAutomaticos.appendChild(
                    item
                );

            });

        } catch (error) {

            listaDocumentosAutomaticos.innerHTML =
                '<p class="estado-documentos-automaticos">' +
                'La lista automática de archivos estará disponible al publicar el sitio.' +
                '</p>';

            listaDocumentosAutomaticos.setAttribute(
                "aria-busy",
                "false"
            );

        }

    }


    cargarDocumentosAutomaticos();



    /* =====================================================
       GALERÍA AUTOMÁTICA DE SEGURIDAD
    ===================================================== */

    const galeriaSeguridad =
        document.getElementById(
            "galeriaSeguridad"
        );

    async function cargarGaleriaSeguridad() {

        if (!galeriaSeguridad) {
            return;
        }

        try {

            const respuesta =
                await fetch(
                    "seguridad/seguridad.json?v=" +
                    Date.now(),
                    {
                        cache: "no-store"
                    }
                );

            if (!respuesta.ok) {
                throw new Error(
                    "No se encontró seguridad.json"
                );
            }

            const imagenes =
                await respuesta.json();

            galeriaSeguridad.innerHTML = "";

            if (
                !Array.isArray(imagenes) ||
                imagenes.length === 0
            ) {

                const mensaje =
                    document.createElement("p");

                mensaje.className =
                    "estado-seguridad";

                mensaje.textContent =
                    "Aún no hay material gráfico de seguridad disponible.";

                galeriaSeguridad.appendChild(
                    mensaje
                );

                return;
            }

            imagenes.forEach(function (archivo) {

                const figura =
                    document.createElement("figure");

                figura.className =
                    "seguridad-item";

                const imagen =
                    document.createElement("img");

                imagen.src =
                    archivo.ruta;

                imagen.alt =
                    archivo.nombre
                        .replace(/\.[^.]+$/, "")
                        .replace(/[_]+/g, " ");

                imagen.loading =
                    "lazy";

                imagen.decoding =
                    "async";

                const pie =
                    document.createElement("figcaption");

                pie.textContent =
                    archivo.nombre
                        .replace(/\.[^.]+$/, "")
                        .replace(/[_]+/g, " ");

                figura.appendChild(imagen);
                figura.appendChild(pie);

                galeriaSeguridad.appendChild(
                    figura
                );

            });

        } catch (error) {

            galeriaSeguridad.innerHTML =
                '<p class="estado-seguridad">' +
                'La galería de seguridad estará disponible al publicar el sitio.' +
                '</p>';

        }

    }


    cargarGaleriaSeguridad();


    /* =====================================================
       MENÚ MÓVIL TIPO HAMBURGUESA
    ===================================================== */

    const botonMenuMovil =
        document.getElementById("botonMenuMovil");

    const menuPrincipalOpciones =
        document.getElementById("menuPrincipalOpciones");


    function cerrarMenuMovil() {

        if (!botonMenuMovil || !menuPrincipalOpciones) {
            return;
        }

        menuPrincipalOpciones.classList.remove("abierto");

        botonMenuMovil.setAttribute(
            "aria-expanded",
            "false"
        );

        const icono =
            botonMenuMovil.querySelector(
                ".icono-menu-movil"
            );

        if (icono) {
            icono.textContent = "☰";
        }

    }


    if (botonMenuMovil && menuPrincipalOpciones) {

        botonMenuMovil.addEventListener(
            "click",
            function () {

                const estaAbierto =
                    menuPrincipalOpciones.classList.toggle(
                        "abierto"
                    );

                botonMenuMovil.setAttribute(
                    "aria-expanded",
                    estaAbierto ? "true" : "false"
                );

                const icono =
                    botonMenuMovil.querySelector(
                        ".icono-menu-movil"
                    );

                if (icono) {

                    icono.textContent =
                        estaAbierto ? "✕" : "☰";

                }

            }
        );


        botonesMenu.forEach(function (boton) {

            boton.addEventListener(
                "click",
                cerrarMenuMovil
            );

        });


        document.addEventListener(
            "click",
            function (evento) {

                const menuPrincipal =
                    document.querySelector(
                        ".menu-principal"
                    );

                if (
                    menuPrincipal &&
                    !menuPrincipal.contains(evento.target)
                ) {

                    cerrarMenuMovil();

                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 768) {

                    cerrarMenuMovil();

                }

            }
        );

    }


    /* =====================================================
       NAVEGACIÓN CON URL, HISTORIAL Y MIGA DE PAN
    ===================================================== */

    const nombreSeccionActual =
        document.getElementById(
            "nombreSeccionActual"
        );

    const volverInicioDesdeMiga =
        document.getElementById(
            "volverInicioDesdeMiga"
        );


    function obtenerNombreVisiblePagina(nombrePagina) {

        const boton =
            document.querySelector(
                '.boton-menu[data-pagina="' +
                nombrePagina +
                '"]'
            );


        if (boton) {

            return boton.textContent.trim();

        }


        return "Inicio";

    }


    function actualizarMigaPagina(nombrePagina) {

        if (!nombreSeccionActual) {

            return;

        }


        nombreSeccionActual.textContent =
            obtenerNombreVisiblePagina(
                nombrePagina
            );

    }


    function actualizarHashPagina(nombrePagina) {

        const hashNuevo =
            nombrePagina === "inicio"
                ? "#inicio"
                : "#" + nombrePagina;


        if (
            window.location.hash !== hashNuevo
        ) {

            history.pushState(
                {
                    pagina: nombrePagina
                },
                "",
                hashNuevo
            );

        }

    }


    if (volverInicioDesdeMiga) {

        volverInicioDesdeMiga.addEventListener(
            "click",
            function () {

                mostrarPagina(
                    "inicio"
                );

                actualizarMigaPagina(
                    "inicio"
                );

                actualizarHashPagina(
                    "inicio"
                );

            }
        );

    }


    window.addEventListener(
        "popstate",
        function () {

            const paginaHash =
                window.location.hash
                    .replace("#", "")
                    .trim();


            const paginaValida =
                document.getElementById(
                    paginaHash
                );


            if (
                paginaHash &&
                paginaValida &&
                paginaValida.classList.contains(
                    "pagina"
                )
            ) {

                mostrarPagina(
                    paginaHash
                );

                actualizarMigaPagina(
                    paginaHash
                );

            } else {

                mostrarPagina(
                    "inicio"
                );

                actualizarMigaPagina(
                    "inicio"
                );

                history.replaceState(
                    {
                        pagina: "inicio"
                    },
                    "",
                    "#inicio"
                );

            }

        }
    );


    /* =====================================================
       NAVEGACIÓN INTERNA DESPLEGABLE
    ===================================================== */

    const navegacionesInternas =
        document.querySelectorAll(
            ".navegacion-interna"
        );


    /* =====================================================
       ACCESIBILIDAD - TECLA ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key !== "Escape") {
                return;
            }

            cerrarMenuMovil();

            navegacionesInternas.forEach(
                function (navegacion) {

                    navegacion.classList.remove(
                        "abierta"
                    );

                    const boton =
                        navegacion.querySelector(
                            ".boton-navegacion-interna"
                        );

                    if (boton) {
                        boton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }
            );

        }
    );


    navegacionesInternas.forEach(
        function (navegacion) {

            const boton =
                navegacion.querySelector(
                    ".boton-navegacion-interna"
                );


            if (!boton) {

                return;

            }


            boton.addEventListener(
                "click",
                function () {

                    const estabaAbierta =
                        navegacion.classList.contains(
                            "abierta"
                        );


                    navegacionesInternas.forEach(
                        function (otra) {

                            otra.classList.remove(
                                "abierta"
                            );


                            const otroBoton =
                                otra.querySelector(
                                    ".boton-navegacion-interna"
                                );


                            if (otroBoton) {

                                otroBoton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }
                    );


                    if (!estabaAbierta) {

                        navegacion.classList.add(
                            "abierta"
                        );

                        boton.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    const botonesDestinoInterno =
        document.querySelectorAll(
            ".opciones-navegacion-interna [data-destino]"
        );


    botonesDestinoInterno.forEach(
        function (botonDestino) {

            botonDestino.addEventListener(
                "click",
                function () {

                    const destino =
                        document.getElementById(
                            botonDestino.getAttribute(
                                "data-destino"
                            )
                        );


                    if (!destino) {

                        return;

                    }


                    const navegacion =
                        botonDestino.closest(
                            ".navegacion-interna"
                        );


                    if (navegacion) {

                        navegacion.classList.remove(
                            "abierta"
                        );


                        const boton =
                            navegacion.querySelector(
                                ".boton-navegacion-interna"
                            );


                        if (boton) {

                            boton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }


                    destino.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });

                }
            );

        }
    );


    /* =====================================================
       CERRAR NAVEGACIONES AL HACER CLIC FUERA
    ===================================================== */

    document.addEventListener(
        "click",
        function (evento) {

            navegacionesInternas.forEach(
                function (navegacion) {

                    if (
                        !navegacion.contains(
                            evento.target
                        )
                    ) {

                        navegacion.classList.remove(
                            "abierta"
                        );


                        const boton =
                            navegacion.querySelector(
                                ".boton-navegacion-interna"
                            );


                        if (boton) {

                            boton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                }
            );

        }
    );




    /* =====================================================
       DESTINOS INTERNOS DE INICIO - RESALTADO SUAVE
    ===================================================== */

    const destinosInicio =
        document.querySelectorAll(
            "#avisoImportanteInicio, #inicioEspecialidades, #inicioNoticias, #inicioUltimoComunicado, #inicioCuentaPublica, #inicioMatricula"
        );


    destinosInicio.forEach(
        function (destinoInicio) {

            destinoInicio.addEventListener(
                "animationend",
                function () {

                    destinoInicio.classList.remove(
                        "destino-inicio-activo"
                    );

                }
            );

        }
    );


    document.querySelectorAll(
        '.navegacion-inicio [data-destino]'
    ).forEach(
        function (botonInicio) {

            botonInicio.addEventListener(
                "click",
                function () {

                    const destino =
                        document.getElementById(
                            botonInicio.getAttribute(
                                "data-destino"
                            )
                        );


                    if (destino) {

                        destino.classList.remove(
                            "destino-inicio-activo"
                        );


                        void destino.offsetWidth;


                        destino.classList.add(
                            "destino-inicio-activo"
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       TARJETAS GIRATORIAS - ESPECIALIDADES DE INICIO
    ===================================================== */
    const tarjetasEspecialidad =
        document.querySelectorAll(".tarjeta-especialidad");

    tarjetasEspecialidad.forEach(function (tarjeta) {
        tarjeta.addEventListener("click", function () {
            const estaGirada =
                tarjeta.classList.toggle("girada");

            tarjeta.setAttribute(
                "aria-pressed",
                estaGirada ? "true" : "false"
            );
        });
    });


    /* =====================================================
       FOTOS GIRATORIAS - EQUIPO DIRECTIVO
    ===================================================== */

    const fotosDirectivos =
        document.querySelectorAll(
            ".foto-directivo-giratoria"
        );


    fotosDirectivos.forEach(
        function (fotoDirectivo) {

            fotoDirectivo.addEventListener(
                "click",
                function () {

                    const girada =
                        fotoDirectivo.classList.toggle(
                            "girada"
                        );

                    fotoDirectivo.setAttribute(
                        "aria-pressed",
                        girada ? "true" : "false"
                    );

                }
            );

        }
    );


    /* =====================================================
       BUSCADORES DE DOCUMENTOS Y PROTOCOLOS
    ===================================================== */

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );

    }


    function configurarBuscadorListado(
        configuracion
    ) {

        const input =
            document.getElementById(
                configuracion.inputId
            );


        const botonLimpiar =
            document.getElementById(
                configuracion.botonLimpiarId
            );


        const resultado =
            document.getElementById(
                configuracion.resultadoId
            );


        const seccion =
            document.getElementById(
                configuracion.seccionId
            );


        if (!input || !seccion) {

            return;

        }


        const elementos =
            Array.from(
                seccion.querySelectorAll(
                    configuracion.selectorElementos
                )
            );


        function aplicarFiltro() {

            const termino =
                normalizarTexto(
                    input.value.trim()
                );


            let visibles = 0;


            elementos.forEach(
                function (elemento) {

                    const coincide =
                        termino === "" ||
                        normalizarTexto(
                            elemento.textContent
                        ).includes(
                            termino
                        );


                    elemento.style.display =
                        coincide
                            ? ""
                            : "none";


                    if (coincide) {

                        visibles++;

                    }

                }
            );


            if (
                configuracion.selectorCategorias
            ) {

                const categorias =
                    seccion.querySelectorAll(
                        configuracion.selectorCategorias
                    );


                categorias.forEach(
                    function (categoria) {

                        const elementosCategoria =
                            categoria.querySelectorAll(
                                configuracion.selectorElementos
                            );


                        const tieneVisible =
                            Array.from(
                                elementosCategoria
                            ).some(
                                function (elemento) {

                                    return (
                                        elemento.style.display !==
                                        "none"
                                    );

                                }
                            );


                        categoria.style.display =
                            tieneVisible
                                ? ""
                                : "none";

                    }
                );

            }


            if (resultado) {

                if (termino === "") {

                    resultado.textContent =
                        "";

                } else if (
                    visibles === 0
                ) {

                    resultado.textContent =
                        "No se encontraron resultados.";

                } else if (
                    visibles === 1
                ) {

                    resultado.textContent =
                        "Se encontró 1 resultado.";

                } else {

                    resultado.textContent =
                        "Se encontraron " +
                        visibles +
                        " resultados.";

                }

            }


            if (botonLimpiar) {

                botonLimpiar.classList.toggle(
                    "visible",
                    input.value.length > 0
                );

            }

        }
        input.addEventListener(
            "input",
            aplicarFiltro
        );


        if (botonLimpiar) {

            botonLimpiar.addEventListener(
                "click",
                function () {

                    input.value =
                        "";

                    aplicarFiltro();

                    input.focus();

                }
            );

        }


        aplicarFiltro();

    }


    configurarBuscadorListado({

        inputId:
            "buscarDocumentos",

        botonLimpiarId:
            "limpiarBuscarDocumentos",

        resultadoId:
            "resultadoBuscarDocumentos",

        seccionId:
            "documentos",

        selectorElementos:
            ".categoria-documentos .documento",

        selectorCategorias:
            ".categoria-documentos"

    });


    configurarBuscadorListado({

        inputId:
            "buscarProtocolos",

        botonLimpiarId:
            "limpiarBuscarProtocolos",

        resultadoId:
            "resultadoBuscarProtocolos",

        seccionId:
            "protocolos",

        selectorElementos:
            ".documentos-lista .documento"

    });




    /* =====================================================
       LUPAS FUNCIONALES DE LOS BUSCADORES
    ===================================================== */

    const botonesLupaBuscador =
        document.querySelectorAll(
            "[data-enfocar-buscador]"
        );


    botonesLupaBuscador.forEach(
        function (botonLupa) {

            botonLupa.addEventListener(
                "click",
                function () {

                    const idBuscador =
                        botonLupa.getAttribute(
                            "data-enfocar-buscador"
                        );


                    const inputBuscador =
                        document.getElementById(
                            idBuscador
                        );


                    if (!inputBuscador) {
                        return;
                    }


                    inputBuscador.focus();


                    /*
                     * Si ya hay texto escrito, disparamos el evento
                     * input para ejecutar inmediatamente el filtro
                     * correspondiente.
                     */
                    if (
                        inputBuscador.value.trim() !== ""
                    ) {

                        inputBuscador.dispatchEvent(
                            new Event(
                                "input",
                                {
                                    bubbles: true
                                }
                            )
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       PROTOCOLOS - VER TODOS / MOSTRAR MENOS
    ===================================================== */

    const botonVerMasProtocolos =
        document.getElementById(
            "botonVerMasProtocolos"
        );

    const buscarProtocolosControl =
        document.getElementById(
            "buscarProtocolos"
        );

    let mostrarTodosProtocolos =
        false;

    const CANTIDAD_INICIAL_PROTOCOLOS =
        6;


    function actualizarVistaProtocolos() {

        const seccionProtocolos =
            document.getElementById(
                "protocolos"
            );


        if (!seccionProtocolos) {

            return;

        }


        const protocolos =
            Array.from(
                seccionProtocolos.querySelectorAll(
                    ".documentos-lista .documento"
                )
            );


        const hayBusqueda =
            buscarProtocolosControl &&
            buscarProtocolosControl.value.trim() !== "";


        protocolos.forEach(
            function (protocolo, indice) {

                if (
                    hayBusqueda ||
                    mostrarTodosProtocolos ||
                    indice < CANTIDAD_INICIAL_PROTOCOLOS
                ) {

                    protocolo.classList.remove(
                        "oculto-por-limite"
                    );

                } else {

                    protocolo.classList.add(
                        "oculto-por-limite"
                    );

                }

            }
        );


        if (!botonVerMasProtocolos) {

            return;

        }


        if (
            hayBusqueda ||
            protocolos.length <=
                CANTIDAD_INICIAL_PROTOCOLOS
        ) {

            botonVerMasProtocolos.style.display =
                "none";

        } else {

            botonVerMasProtocolos.style.display =
                "";


            botonVerMasProtocolos.textContent =
                mostrarTodosProtocolos
                    ? "Mostrar menos protocolos"
                    : "Ver todos los protocolos";


            botonVerMasProtocolos.setAttribute(
                "aria-expanded",
                mostrarTodosProtocolos
                    ? "true"
                    : "false"
            );

        }

    }


    if (botonVerMasProtocolos) {

        botonVerMasProtocolos.addEventListener(
            "click",
            function () {

                mostrarTodosProtocolos =
                    !mostrarTodosProtocolos;


                actualizarVistaProtocolos();


                if (!mostrarTodosProtocolos) {

                    const protocolosInicio =
                        document.getElementById(
                            "protocolosInicio"
                        );


                    if (protocolosInicio) {

                        protocolosInicio.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                }

            }
        );

    }


    if (buscarProtocolosControl) {

        buscarProtocolosControl.addEventListener(
            "input",
            function () {

                actualizarVistaProtocolos();

            }
        );

    }


    actualizarVistaProtocolos();


    /* =====================================================
       BOTONES PARA VOLVER AL INICIO DE CADA SECCIÓN
    ===================================================== */

    const botonesVolverSeccion =
        document.querySelectorAll(
            ".boton-volver-seccion[data-destino]"
        );


    botonesVolverSeccion.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    const destino =
                        document.getElementById(
                            boton.getAttribute(
                                "data-destino"
                            )
                        );


                    if (!destino) {

                        return;

                    }


                    destino.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );


    /* =====================================================
       PÁGINA INICIAL SEGÚN HASH
    ===================================================== */

    const paginaInicialDesdeHash =
        window.location.hash
            .replace("#", "")
            .trim();


    const elementoHashInicial =
        paginaInicialDesdeHash
            ? document.getElementById(
                paginaInicialDesdeHash
            )
            : null;


    const paginaInicialValida =
        elementoHashInicial &&
        elementoHashInicial.classList.contains(
            "pagina"
        );


    if (paginaInicialValida) {

        mostrarPagina(
            paginaInicialDesdeHash
        );


        actualizarMigaPagina(
            paginaInicialDesdeHash
        );

    } else {

        mostrarPagina(
            "inicio"
        );


        actualizarMigaPagina(
            "inicio"
        );


        history.replaceState(
            {
                pagina:
                    "inicio"
            },
            "",
            "#inicio"
        );

    }


    /* =====================================================
       ACCESOS RÁPIDOS DEL PIE DE PÁGINA
    ===================================================== */

    const enlacesPie =
        document.querySelectorAll(
            ".enlace-pie[data-pagina]"
        );


    enlacesPie.forEach(
        function (enlacePie) {

            enlacePie.addEventListener(
                "click",
                function () {

                    const pagina =
                        enlacePie.getAttribute(
                            "data-pagina"
                        );


                    if (!pagina) {

                        return;

                    }


                    mostrarPagina(
                        pagina
                    );


                    actualizarMigaPagina(
                        pagina
                    );


                    actualizarHashPagina(
                        pagina
                    );

                }
            );

        }
    );
/* =====================================================
       CONTROL DE ENLACES SIN DESTINO
    ===================================================== */

    const enlacesPendientes =
        document.querySelectorAll(
            'a[href="#"]'
        );


    enlacesPendientes.forEach(
        function (enlace) {

            if (
                enlace.id ===
                    "botonUltimoComunicado" ||
                enlace.id ===
                    "botonUltimoComunicadoInicio"
            ) {

                return;

            }


            enlace.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();


                    console.log(
                        "Este documento o enlace todavía está pendiente."
                    );

                }
            );

        }
    );


    /* =====================================================
       INDICADORES PARA DOCUMENTOS PDF
    ===================================================== */

    const enlacesPDF =
        document.querySelectorAll(
            'a[href*=".pdf"]'
        );


    enlacesPDF.forEach(
        function (enlacePDF) {

            enlacePDF.classList.add(
                "enlace-pdf"
            );


            if (
                !enlacePDF.getAttribute(
                    "title"
                )
            ) {

                enlacePDF.setAttribute(
                    "title",
                    "Abrir PDF en una pestaña nueva"
                );

            }


            if (
                !enlacePDF.getAttribute(
                    "aria-label"
                )
            ) {

                const texto =
                    enlacePDF.textContent.trim();


                enlacePDF.setAttribute(
                    "aria-label",
                    texto +
                    " - PDF, se abre en una pestaña nueva"
                );

            }

        }
    );


    /* =====================================================
       COMPROBACIÓN DE IMÁGENES
    ===================================================== */

    const imagenes =
        document.querySelectorAll(
            "img"
        );


    imagenes.forEach(
        function (imagen) {

            imagen.addEventListener(
                "error",
                function () {

                    console.warn(
                        "No se pudo cargar la imagen:",
                        imagen.getAttribute(
                            "src"
                        )
                    );

                }
            );

        }
    );


    /* =====================================================
       ICONO REALISTA DE INSTAGRAM
    ===================================================== */

    const enlacesInstagram =
        document.querySelectorAll(
            '.redes-sociales a[href*="instagram"]'
        );


    enlacesInstagram.forEach(
        function (enlaceInstagram) {

            enlaceInstagram.classList.add(
                "instagram"
            );


            enlaceInstagram.innerHTML = `
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >

                    <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                        ry="5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    />

                    <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    />

                    <circle
                        cx="17.5"
                        cy="6.5"
                        r="1.2"
                        fill="currentColor"
                    />

                </svg>
            `;

        }
    );



    /* =====================================================
       FECHAS DE PUBLICACIÓN E INDICADOR NUEVO
    ===================================================== */

    const DIAS_ETIQUETA_NUEVO =
        7;


    function formatearFechaPublicacion(
        fecha
    ) {

        if (!fecha) {
            return "";
        }

        const objetoFecha =
            new Date(fecha);

        if (
            Number.isNaN(
                objetoFecha.getTime()
            )
        ) {
            return "";
        }

        return objetoFecha.toLocaleDateString(
            "es-CL",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    }


    function publicacionEsNueva(
        fecha,
        esUltima
    ) {

        if (!fecha || !esUltima) {
            return false;
        }

        const objetoFecha =
            new Date(fecha);

        if (
            Number.isNaN(
                objetoFecha.getTime()
            )
        ) {
            return false;
        }

        const dias =
            (
                Date.now() -
                objetoFecha.getTime()
            ) /
            (
                1000 *
                60 *
                60 *
                24
            );

        return (
            dias >= 0 &&
            dias <= DIAS_ETIQUETA_NUEVO
        );

    }


    function crearEtiquetaNuevo() {

        const etiqueta =
            document.createElement(
                "span"
            );

        etiqueta.className =
            "etiqueta-nuevo";

        etiqueta.textContent =
            "NUEVO";

        return etiqueta;

    }




    /* =====================================================
       AVISO IMPORTANTE TEMPORAL - AUTOMÁTICO
    ===================================================== */

    const ARCHIVO_LISTA_AVISOS =
        "avisos/avisos.json";


    const seccionAvisoImportante =
        document.getElementById(
            "avisoImportanteInicio"
        );


    const botonIrAvisoImportante =
        document.getElementById(
            "botonIrAvisoImportante"
        );


    const tituloAvisoImportante =
        document.getElementById(
            "tituloAvisoImportante"
        );


    const textoAvisoImportante =
        document.getElementById(
            "textoAvisoImportante"
        );


    const fechaAvisoImportante =
        document.getElementById(
            "fechaAvisoImportante"
        );


    const contenidoAvisoImportante =
        document.getElementById(
            "contenidoAvisoImportante"
        );


    const botonAvisoImportante =
        document.getElementById(
            "botonAvisoImportante"
        );


    function ocultarAvisoImportante() {

        if (seccionAvisoImportante) {
            seccionAvisoImportante.hidden =
                true;
        }


        if (botonIrAvisoImportante) {
            botonIrAvisoImportante.hidden =
                true;
        }

    }


    function mostrarAvisoImportante(
        aviso
    ) {

        if (
            !seccionAvisoImportante ||
            !aviso
        ) {
            return;
        }


        seccionAvisoImportante.hidden =
            false;


        if (botonIrAvisoImportante) {
            botonIrAvisoImportante.hidden =
                false;
        }


        if (tituloAvisoImportante) {

            tituloAvisoImportante.textContent =
                aviso.titulo ||
                (
                    "Aviso N.º " +
                    aviso.numero
                );

        }


        if (textoAvisoImportante) {

            textoAvisoImportante.textContent =
                aviso.texto ||
                "";

        }


        if (fechaAvisoImportante) {

            const fechaVisible =
                formatearFechaPublicacion(
                    aviso.fecha
                );


            fechaAvisoImportante.textContent =
                fechaVisible
                    ? "Publicado el " +
                      fechaVisible
                    : "";

        }


        if (contenidoAvisoImportante) {

            contenidoAvisoImportante.innerHTML =
                "";


            if (
                aviso.tipo ===
                    "imagen" &&
                typeof aviso.ruta ===
                    "string"
            ) {

                const imagen =
                    document.createElement(
                        "img"
                    );


                imagen.src =
                    aviso.ruta;


                imagen.alt =
                    aviso.titulo ||
                    (
                        "Aviso N.º " +
                        aviso.numero
                    );


                imagen.className =
                    "imagen-aviso-importante";

                imagen.tabIndex =
                    0;

                imagen.setAttribute(
                    "role",
                    "button"
                );

                imagen.setAttribute(
                    "aria-label",
                    "Ampliar " + imagen.alt
                );


                imagen.loading =
                    "lazy";


                imagen.decoding =
                    "async";


                contenidoAvisoImportante.appendChild(
                    imagen
                );

            } else if (
                aviso.tipo ===
                    "pdf" &&
                typeof aviso.preview ===
                    "string" &&
                aviso.preview
            ) {

                const imagen =
                    document.createElement(
                        "img"
                    );


                imagen.src =
                    aviso.preview;


                imagen.alt =
                    "Vista previa del Aviso N.º " +
                    aviso.numero;


                imagen.className =
                    "imagen-aviso-importante";

                imagen.tabIndex =
                    0;

                imagen.setAttribute(
                    "role",
                    "button"
                );

                imagen.setAttribute(
                    "aria-label",
                    "Ampliar " + imagen.alt
                );


                imagen.loading =
                    "lazy";


                imagen.decoding =
                    "async";


                contenidoAvisoImportante.appendChild(
                    imagen
                );

            }

        }


        if (botonAvisoImportante) {

            const tieneArchivo =
                typeof aviso.ruta ===
                    "string" &&
                aviso.ruta.trim() !== "" &&
                aviso.tipo !==
                    "texto";


            botonAvisoImportante.hidden =
                !tieneArchivo;


            if (tieneArchivo) {

                botonAvisoImportante.href =
                    aviso.ruta;

                botonAvisoImportante.dataset.rutaAviso =
                    aviso.ruta;

                botonAvisoImportante.dataset.tipoAviso =
                    aviso.tipo;

                botonAvisoImportante.removeAttribute(
                    "target"
                );

                botonAvisoImportante.textContent =
                    aviso.tipo === "pdf"
                        ? "🔎 Ver aviso ampliado"
                        : "🔎 Presiona para ampliar";

            }

        }

    }


    async function cargarAvisoImportante() {

        if (!seccionAvisoImportante) {
            return;
        }


        try {

            const separador =
                ARCHIVO_LISTA_AVISOS.includes(
                    "?"
                )
                    ? "&"
                    : "?";


            const respuesta =
                await fetch(
                    ARCHIVO_LISTA_AVISOS +
                    separador +
                    "v=" +
                    Date.now(),
                    {
                        cache:
                            "no-store"
                    }
                );


            if (!respuesta.ok) {

                ocultarAvisoImportante();

                return;

            }


            const avisos =
                await respuesta.json();


            if (
                !Array.isArray(
                    avisos
                ) ||
                avisos.length === 0
            ) {

                ocultarAvisoImportante();

                return;

            }


            const avisoVigente = seleccionarAvisoVigente(avisos);
        if (avisoVigente) {
            mostrarAvisoImportante(avisoVigente);
        } else {
            const avisoContenedor = document.getElementById("avisoImportante");
            if (avisoContenedor) {
                avisoContenedor.hidden = true;
                avisoContenedor.style.display = "none";
            }
        }


            console.log(
                "Aviso importante cargado:",
                avisos[0].nombre
            );

        } catch (error) {

            ocultarAvisoImportante();


            console.warn(
                "No hay aviso importante disponible:",
                error
            );

        }

    }


    cargarAvisoImportante();



    /* =====================================================
       SISTEMA AUTOMÁTICO DE COMUNICADOS

       La lista se genera automáticamente con GitHub Actions
       en: comunicados/comunicados.json

       Para publicar un nuevo comunicado solamente debes subir:
       comunicados/COMUNICADO XX.pdf
    ===================================================== */

    const ARCHIVO_LISTA_COMUNICADOS =
        "comunicados/comunicados.json";


    /* =====================================================
       ELEMENTOS DE COMUNICADOS
    ===================================================== */

    const listaComunicados =
        document.getElementById(
            "listaComunicados"
        );


    const mensajeComunicados =
        document.getElementById(
            "mensajeComunicados"
        );


    const textoUltimoComunicado =
        document.getElementById(
            "textoUltimoComunicado"
        );


    const botonUltimoComunicado =
        document.getElementById(
            "botonUltimoComunicado"
        );


    const fechaUltimoComunicado =
        document.getElementById(
            "fechaUltimoComunicado"
        );

    const nuevoUltimoComunicado =
        document.getElementById(
            "nuevoUltimoComunicado"
        );

    const tituloUltimoComunicadoInicio =
        document.getElementById(
            "tituloUltimoComunicadoInicio"
        );

    const textoUltimoComunicadoInicio =
        document.getElementById(
            "textoUltimoComunicadoInicio"
        );

    const fechaUltimoComunicadoInicio =
        document.getElementById(
            "fechaUltimoComunicadoInicio"
        );

    const botonUltimoComunicadoInicio =
        document.getElementById(
            "botonUltimoComunicadoInicio"
        );

    const nuevoUltimoComunicadoInicio =
        document.getElementById(
            "nuevoUltimoComunicadoInicio"
        );


    const tituloUltimoComunicado =
        document.getElementById(
            "tituloUltimoComunicado"
        );


    const buscarComunicados =
        document.getElementById(
            "buscarComunicados"
        );


    const limpiarBuscarComunicados =
        document.getElementById(
            "limpiarBuscarComunicados"
        );


    const resultadoBuscarComunicados =
        document.getElementById(
            "resultadoBuscarComunicados"
        );


    const contadorComunicados =
        document.getElementById(
            "contadorComunicados"
        );


    const contadorDocumentos =
        document.getElementById(
            "contadorDocumentos"
        );


    const contadorProtocolos =
        document.getElementById(
            "contadorProtocolos"
        );


    const botonVerMasComunicados =
        document.getElementById(
            "botonVerMasComunicados"
        );


    /* =====================================================
       ESTADO VISUAL DE CARGA DE COMUNICADOS
    ===================================================== */

    function mostrarEstadoCargaComunicados() {

        if (listaComunicados) {

            listaComunicados.setAttribute(
                "aria-busy",
                "true"
            );

        }


        if (mensajeComunicados) {

            mensajeComunicados.innerHTML = `
                <div class="estado-carga-comunicados">

                    <span
                        class="spinner-comunicados"
                        aria-hidden="true"
                    ></span>

                    <p>
                        Buscando comunicados disponibles...
                    </p>

                </div>
            `;

        }


        if (textoUltimoComunicado) {

            textoUltimoComunicado.textContent =
                "Buscando el último comunicado disponible...";

        }

    }


    /* =====================================================
       VALIDAR LISTA GENERADA POR GITHUB
    ===================================================== */

    function normalizarListaComunicados(
        datos
    ) {

        if (!Array.isArray(datos)) {

            return [];

        }


        return datos
            .filter(
                function (comunicado) {

                    return (
                        comunicado &&
                        Number.isInteger(
                            comunicado.numero
                        ) &&
                        comunicado.numero > 0 &&
                        typeof comunicado.nombre ===
                            "string" &&
                        typeof comunicado.ruta ===
                            "string"
                    );

                }
            )
            .sort(
                function (a, b) {

                    return (
                        b.numero -
                        a.numero
                    );

                }
            );

    }


    /* =====================================================
       CARGAR COMUNICADOS DESDE comunicados.json
    ===================================================== */

    async function cargarComunicados() {

        if (!listaComunicados) {

            console.warn(
                "No se encontró #listaComunicados."
            );

            return;

        }


        mostrarEstadoCargaComunicados();


        console.log(
            "================================="
        );

        console.log(
            "CARGANDO LISTA AUTOMÁTICA DE COMUNICADOS"
        );

        console.log(
            "Archivo:",
            ARCHIVO_LISTA_COMUNICADOS
        );

        console.log(
            "================================="
        );


        try {

            /*
             * Se agrega una marca de tiempo solamente a la
             * solicitud para impedir que el navegador muestre
             * una lista antigua después de publicar un PDF.
             */

            const separador =
                ARCHIVO_LISTA_COMUNICADOS.includes("?")
                    ? "&"
                    : "?";


            const urlLista =
                ARCHIVO_LISTA_COMUNICADOS +
                separador +
                "v=" +
                Date.now();


            const respuesta =
                await fetch(
                    urlLista,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!respuesta.ok) {

                throw new Error(
                    "No se pudo cargar comunicados.json. Estado HTTP: " +
                    respuesta.status
                );

            }


            const datos =
                await respuesta.json();


            const resultados =
                normalizarListaComunicados(
                    datos
                );


            console.log(
                "COMUNICADOS ENCONTRADOS:",
                resultados.length
            );


            if (
                resultados.length === 0
            ) {

                if (listaComunicados) {

                    listaComunicados.setAttribute(
                        "aria-busy",
                        "false"
                    );

                }


                mostrarSinComunicados();

                return;

            }


            const ultimo =
                resultados[0];


            mostrarUltimoComunicado(
                ultimo
            );


            mostrarComunicadosAnteriores(
                resultados
            );


            if (listaComunicados) {

                listaComunicados.setAttribute(
                    "aria-busy",
                    "false"
                );

            }

        } catch (error) {

            console.error(
                "Error al cargar comunicados:",
                error
            );


            if (listaComunicados) {

                listaComunicados.setAttribute(
                    "aria-busy",
                    "false"
                );

            }


            mostrarErrorComunicados();

        }

    }


    /* =====================================================
       MOSTRAR ERROR DE CARGA
    ===================================================== */

    function mostrarErrorComunicados() {

        if (contadorComunicados) {

            contadorComunicados.textContent =
                "0";

        }


        if (textoUltimoComunicado) {

            textoUltimoComunicado.textContent =
                "No fue posible comprobar los comunicados en este momento.";

        }


        if (botonUltimoComunicado) {

            botonUltimoComunicado.style.display =
                "none";

        }


        if (tituloUltimoComunicadoInicio) {
            tituloUltimoComunicadoInicio.textContent =
                "Aún no hay comunicados publicados";
        }

        if (textoUltimoComunicadoInicio) {
            textoUltimoComunicadoInicio.textContent =
                "Cuando se publique un comunicado, aparecerá automáticamente aquí.";
        }

        if (fechaUltimoComunicadoInicio) {
            fechaUltimoComunicadoInicio.textContent =
                "";
        }

        if (botonUltimoComunicadoInicio) {
            botonUltimoComunicadoInicio.style.display =
                "none";
        }

        if (nuevoUltimoComunicadoInicio) {
            nuevoUltimoComunicadoInicio.hidden =
                true;
        }


        if (botonVerMasComunicados) {

            botonVerMasComunicados.style.display =
                "none";

        }


        if (mensajeComunicados) {

            mensajeComunicados.innerHTML = `
                <div class="estado-error-comunicados">

                    <span
                        class="estado-error-icono"
                        aria-hidden="true"
                    >
                        ⚠️
                    </span>

                    <p>
                        No fue posible cargar los comunicados.
                        Intenta nuevamente más tarde.
                    </p>

                </div>
            `;

        }

    }


    /* =====================================================
       RUTA SEGURA PARA ABRIR COMUNICADOS
    ===================================================== */

    function obtenerRutaAbsolutaComunicado(
        ruta
    ) {

        if (
            typeof ruta !== "string" ||
            ruta.trim() === ""
        ) {

            return "";

        }


        try {

            return new URL(
                ruta,
                window.location.href
            ).href;

        } catch (error) {

            console.error(
                "No fue posible construir la ruta del comunicado:",
                ruta,
                error
            );


            return "";

        }

    }


    /* =====================================================
       MOSTRAR ÚLTIMO COMUNICADO
    ===================================================== */

    function mostrarUltimoComunicado(
        comunicado
    ) {

        const fechaVisible =
            formatearFechaPublicacion(
                comunicado.fecha
            );

        const esNuevo =
            publicacionEsNueva(
                comunicado.fecha,
                true
            );


        if (tituloUltimoComunicado) {
            tituloUltimoComunicado.textContent =
                "Comunicado N.º " +
                comunicado.numero;
        }

        if (textoUltimoComunicado) {
            textoUltimoComunicado.textContent =
                "Se encuentra disponible el Comunicado N.º " +
                comunicado.numero +
                " del establecimiento.";
        }

        if (fechaUltimoComunicado) {
            fechaUltimoComunicado.textContent =
                fechaVisible
                    ? "Publicado el " + fechaVisible
                    : "";
        }

        if (nuevoUltimoComunicado) {
            nuevoUltimoComunicado.hidden =
                !esNuevo;
        }

        if (botonUltimoComunicado) {
            const rutaComunicado =
                obtenerRutaAbsolutaComunicado(
                    comunicado.ruta
                );


            botonUltimoComunicado.href =
                rutaComunicado || "#";

            botonUltimoComunicado.target =
                "_blank";

            botonUltimoComunicado.rel =
                "noopener noreferrer";

            botonUltimoComunicado.textContent =
                "📄 Ver Comunicado N.º " +
                comunicado.numero;

            botonUltimoComunicado.style.display =
                "";
        }


        if (tituloUltimoComunicadoInicio) {
            tituloUltimoComunicadoInicio.textContent =
                "Comunicado N.º " +
                comunicado.numero;
        }

        if (textoUltimoComunicadoInicio) {
            textoUltimoComunicadoInicio.textContent =
                "Información reciente para nuestra comunidad educativa.";
        }

        if (fechaUltimoComunicadoInicio) {
            fechaUltimoComunicadoInicio.textContent =
                fechaVisible
                    ? "Publicado el " + fechaVisible
                    : "";
        }

        if (nuevoUltimoComunicadoInicio) {
            nuevoUltimoComunicadoInicio.hidden =
                !esNuevo;
        }

        if (botonUltimoComunicadoInicio) {
            const rutaComunicadoInicio =
                obtenerRutaAbsolutaComunicado(
                    comunicado.ruta
                );


            botonUltimoComunicadoInicio.href =
                rutaComunicadoInicio || "#";


            botonUltimoComunicadoInicio.dataset.rutaComunicado =
                rutaComunicadoInicio;

            botonUltimoComunicadoInicio.target =
                "_blank";

            botonUltimoComunicadoInicio.rel =
                "noopener noreferrer";

            botonUltimoComunicadoInicio.textContent =
                "📄 Ver Comunicado N.º " +
                comunicado.numero;

            botonUltimoComunicadoInicio.style.display =
                "";
        }

    }




    /* =====================================================
       BOTÓN ÚLTIMO COMUNICADO EN INICIO
       Apertura reforzada para PC y dispositivos móviles.
    ===================================================== */

    if (botonUltimoComunicadoInicio) {

        botonUltimoComunicadoInicio.addEventListener(
            "click",
            function (evento) {

                const ruta =
                    botonUltimoComunicadoInicio.dataset
                        .rutaComunicado ||
                    botonUltimoComunicadoInicio.href;


                if (
                    !ruta ||
                    ruta.endsWith("#")
                ) {

                    evento.preventDefault();

                    console.warn(
                        "El último comunicado todavía no tiene una ruta disponible."
                    );

                    return;

                }


                /*
                 * El enlace normal funciona en navegadores de escritorio
                 * y móviles. No usamos window.open aquí para evitar
                 * bloqueos de ventanas emergentes.
                 */

                botonUltimoComunicadoInicio.href =
                    ruta;

                botonUltimoComunicadoInicio.target =
                    "_blank";

                botonUltimoComunicadoInicio.rel =
                    "noopener noreferrer";

            }
        );

    }


    /* =====================================================
       MOSTRAR COMUNICADOS
       BUSCADOR + VER MÁS / VER MENOS
    ===================================================== */

    let comunicadosDisponibles =
        [];


    let mostrarTodosComunicados =
        false;


    const CANTIDAD_INICIAL_COMUNICADOS =
        6;


    function mostrarComunicadosAnteriores(
        comunicados
    ) {

        comunicadosDisponibles =
            comunicados.slice();


        if (contadorComunicados) {

            contadorComunicados.textContent =
                comunicadosDisponibles.length;

        }


        renderizarComunicados();

    }


    function renderizarComunicados() {

        if (!listaComunicados) {

            return;

        }


        if (mensajeComunicados) {

            mensajeComunicados.remove();

        }


        const tarjetasExistentes =
            listaComunicados.querySelectorAll(
                ".comunicado"
            );


        tarjetasExistentes.forEach(
            function (tarjeta) {

                tarjeta.remove();

            }
        );


        const termino =
            buscarComunicados
                ? buscarComunicados.value.trim()
                : "";


        let filtrados =
            comunicadosDisponibles.filter(
                function (comunicado) {

                    if (
                        termino === ""
                    ) {

                        return true;

                    }


                    return String(
                        comunicado.numero
                    ).includes(
                        termino
                    );

                }
            );


        const totalFiltrados =
            filtrados.length;


        if (
            termino === "" &&
            !mostrarTodosComunicados
        ) {

            filtrados =
                filtrados.slice(
                    0,
                    CANTIDAD_INICIAL_COMUNICADOS
                );

        }


        filtrados.forEach(
            function (comunicado) {

                const tarjeta =
                    document.createElement(
                        "div"
                    );


                tarjeta.className =
                    "documento comunicado";


                const titulo =
                    document.createElement(
                        "h3"
                    );


                titulo.textContent =
                    "Comunicado N.º " +
                    comunicado.numero;


                const meta =
                    document.createElement(
                        "div"
                    );

                meta.className =
                    "comunicado-meta";


                const fecha =
                    document.createElement(
                        "p"
                    );

                fecha.className =
                    "fecha-publicacion comunicado-fecha";

                const fechaVisible =
                    formatearFechaPublicacion(
                        comunicado.fecha
                    );

                fecha.textContent =
                    fechaVisible
                        ? "Publicado el " +
                          fechaVisible
                        : "";


                if (
                    publicacionEsNueva(
                        comunicado.fecha,
                        comunicado ===
                            comunicadosDisponibles[0]
                    )
                ) {
                    meta.appendChild(
                        crearEtiquetaNuevo()
                    );
                }


                const enlace =
                    document.createElement(
                        "a"
                    );


                enlace.href =
                    comunicado.ruta;


                enlace.target =
                    "_blank";


                enlace.rel =
                    "noopener noreferrer";


                enlace.className =
                    "boton-documento enlace-pdf";


                enlace.title =
                    "Abrir PDF en una pestaña nueva";


                enlace.setAttribute(
                    "aria-label",
                    "Ver Comunicado N.º " +
                    comunicado.numero +
                    " - PDF, se abre en una pestaña nueva"
                );


                enlace.textContent =
                    "📄 Ver comunicado";


                tarjeta.appendChild(
                    titulo
                );


                if (
                    meta.childElementCount > 0
                ) {
                    tarjeta.appendChild(
                        meta
                    );
                }


                if (fecha.textContent) {
                    tarjeta.appendChild(
                        fecha
                    );
                }


                tarjeta.appendChild(
                    enlace
                );


                listaComunicados.appendChild(
                    tarjeta
                );

            }
        );


        if (resultadoBuscarComunicados) {

            if (
                termino === ""
            ) {

                resultadoBuscarComunicados.textContent =
                    "";

            } else if (
                totalFiltrados === 0
            ) {

                resultadoBuscarComunicados.textContent =
                    "No se encontraron comunicados.";

            } else if (
                totalFiltrados === 1
            ) {

                resultadoBuscarComunicados.textContent =
                    "Se encontró 1 comunicado.";

            } else {

                resultadoBuscarComunicados.textContent =
                    "Se encontraron " +
                    totalFiltrados +
                    " comunicados.";

            }

        }


        if (limpiarBuscarComunicados) {

            limpiarBuscarComunicados.classList.toggle(
                "visible",
                termino.length > 0
            );

        }


        if (botonVerMasComunicados) {

            if (
                termino !== "" ||
                comunicadosDisponibles.length <=
                    CANTIDAD_INICIAL_COMUNICADOS
            ) {

                botonVerMasComunicados.style.display =
                    "none";

            } else {

                botonVerMasComunicados.style.display =
                    "";


                botonVerMasComunicados.textContent =
                    mostrarTodosComunicados
                        ? "Ver menos comunicados"
                        : "Ver más comunicados";

            }

        }

    }


    /* =====================================================
       BUSCADOR DE COMUNICADOS
    ===================================================== */

    if (buscarComunicados) {

        buscarComunicados.addEventListener(
            "input",
            function () {

                mostrarTodosComunicados =
                    false;


                renderizarComunicados();

            }
        );

    }


    /* =====================================================
       LIMPIAR BÚSQUEDA DE COMUNICADOS
    ===================================================== */

    if (limpiarBuscarComunicados) {

        limpiarBuscarComunicados.addEventListener(
            "click",
            function () {

                if (!buscarComunicados) {

                    return;

                }


                buscarComunicados.value =
                    "";


                mostrarTodosComunicados =
                    false;


                renderizarComunicados();


                buscarComunicados.focus();

            }
        );

    }


    /* =====================================================
       VER MÁS / VER MENOS COMUNICADOS
    ===================================================== */

    if (botonVerMasComunicados) {

        botonVerMasComunicados.addEventListener(
            "click",
            function () {

                mostrarTodosComunicados =
                    !mostrarTodosComunicados;


                renderizarComunicados();

            }
        );

    }


    /* =====================================================
       CUANDO NO HAY COMUNICADOS
    ===================================================== */

    function mostrarSinComunicados() {

        console.log(
            "No existen comunicados publicados."
        );


        if (contadorComunicados) {

            contadorComunicados.textContent =
                "0";

        }


        if (botonVerMasComunicados) {

            botonVerMasComunicados.style.display =
                "none";

        }


        if (tituloUltimoComunicado) {

            tituloUltimoComunicado.textContent =
                "Aún no hay comunicados publicados";

        }


        if (textoUltimoComunicado) {

            textoUltimoComunicado.textContent =
                "Cuando se publique un nuevo comunicado, aparecerá automáticamente en esta sección.";

        }


        if (botonUltimoComunicado) {

            botonUltimoComunicado.style.display =
                "none";

        }


        if (mensajeComunicados) {

            mensajeComunicados.innerHTML = `
                <p>
                    Actualmente no hay comunicados publicados.
                </p>
            `;

        }

    }


    /* =====================================================
       CONTADORES DE DOCUMENTOS Y PROTOCOLOS
    ===================================================== */

    function actualizarContadoresEstaticos() {

        if (contadorDocumentos) {

            const totalDocumentos =
                document.querySelectorAll(
                    "#documentos .categoria-documentos .documento"
                ).length;


            contadorDocumentos.textContent =
                totalDocumentos;

        }


        if (contadorProtocolos) {

            const totalProtocolos =
                document.querySelectorAll(
                    "#protocolos .documentos-lista .documento"
                ).length;


            contadorProtocolos.textContent =
                totalProtocolos;

        }

    }


    actualizarContadoresEstaticos();


    /* =====================================================
       INICIAR SISTEMA DE COMUNICADOS
    ===================================================== */

    cargarComunicados();




    /* =====================================================
       SISTEMA AUTOMÁTICO DE ÚLTIMAS NOTICIAS

       GitHub Actions genera:
       noticias/noticias.json

       Formatos aceptados:
       noticias01.jpg
       noticias02.jpeg
       noticias03.png
       noticias04.pdf

       Los PDF son convertidos automáticamente a imágenes
       por página durante la publicación, para que su
       contenido pueda verse directamente en Inicio.
    ===================================================== */

    const ARCHIVO_LISTA_NOTICIAS =
        "noticias/noticias.json";

    const CANTIDAD_INICIAL_NOTICIAS =
        3;

    const listaNoticias =
        document.getElementById(
            "listaNoticias"
        );

    const mensajeNoticias =
        document.getElementById(
            "mensajeNoticias"
        );

    const botonVerMasNoticias =
        document.getElementById(
            "botonVerMasNoticias"
        );

    let noticiasDisponibles =
        [];

    let mostrarTodasNoticias =
        false;


    function mostrarEstadoCargaNoticias() {

        if (!listaNoticias) {
            return;
        }


        listaNoticias.setAttribute(
            "aria-busy",
            "true"
        );


        if (mensajeNoticias) {

            mensajeNoticias.classList.remove(
                "vacio"
            );

            mensajeNoticias.innerHTML = `
                <p>
                    Cargando últimas noticias...
                </p>
            `;

        }

    }


    function mostrarSinNoticias() {

        if (!listaNoticias) {
            return;
        }


        listaNoticias.setAttribute(
            "aria-busy",
            "false"
        );


        listaNoticias
            .querySelectorAll(
                ".noticia-card"
            )
            .forEach(
                function (tarjeta) {

                    tarjeta.remove();

                }
            );


        if (mensajeNoticias) {

            mensajeNoticias.classList.add(
                "vacio"
            );

            mensajeNoticias.innerHTML = `
                <p>
                    <strong>
                        Aún no hay noticias disponibles.
                    </strong>
                </p>
            `;

        }


        if (botonVerMasNoticias) {

            botonVerMasNoticias.hidden =
                true;

        }

    }


    function crearImagenNoticia(
        ruta,
        textoAlternativo,
        clase
    ) {

        const imagen =
            document.createElement(
                "img"
            );


        imagen.src =
            ruta;

        imagen.alt =
            textoAlternativo;

        imagen.className =
            clase;

        imagen.loading =
            "lazy";

        imagen.decoding =
            "async";


        return imagen;

    }




    /* =====================================================
       COMPARTIR NOTICIAS POR WHATSAPP
    ===================================================== */

    function compartirNoticiaWhatsApp(
        noticia
    ) {

        const rutaCompartida =
            typeof noticia.ruta === "string"
                ? new URL(
                    noticia.ruta,
                    window.location.href
                ).href
                : window.location.href;


        const texto =
            "Noticia N.º " +
            noticia.numero +
            " - Escuela de Concentración Los Loros\n" +
            rutaCompartida;


        const urlWhatsApp =
            "https://wa.me/?text=" +
            encodeURIComponent(
                texto
            );


        window.open(
            urlWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    }


    function crearBotonCompartirNoticia(
        noticia
    ) {

        const contenedor =
            document.createElement(
                "div"
            );


        contenedor.className =
            "acciones-compartir-noticia";


        const boton =
            document.createElement(
                "button"
            );


        boton.type =
            "button";


        boton.className =
            "boton-compartir-noticia";


        boton.setAttribute(
            "aria-label",
            "Compartir Noticia N.º " +
            noticia.numero +
            " por WhatsApp"
        );


        boton.textContent =
            "💬 Compartir por WhatsApp";


        boton.addEventListener(
            "click",
            function () {

                compartirNoticiaWhatsApp(
                    noticia
                );

            }
        );


        contenedor.appendChild(
            boton
        );


        return contenedor;

    }


    function renderizarNoticias() {

        if (!listaNoticias) {
            return;
        }


        listaNoticias
            .querySelectorAll(
                ".noticia-card"
            )
            .forEach(
                function (tarjeta) {

                    tarjeta.remove();

                }
            );


        if (mensajeNoticias) {

            mensajeNoticias.style.display =
                "none";

        }


        let noticiasMostrar =
            noticiasDisponibles;


        if (!mostrarTodasNoticias) {

            noticiasMostrar =
                noticiasDisponibles.slice(
                    0,
                    CANTIDAD_INICIAL_NOTICIAS
                );

        }


        noticiasMostrar.forEach(
            function (noticia) {

                const tarjeta =
                    document.createElement(
                        "article"
                    );


                tarjeta.className =
                    "noticia-card";


                const encabezado =
                    document.createElement(
                        "div"
                    );


                encabezado.className =
                    "noticia-encabezado";


                const titulo =
                    document.createElement(
                        "h3"
                    );


                titulo.textContent =
                    "Noticia N.º " +
                    noticia.numero;


                const tituloBloque =
                    document.createElement(
                        "div"
                    );

                tituloBloque.className =
                    "noticia-titulo-bloque";

                tituloBloque.appendChild(
                    titulo
                );


                const fecha =
                    document.createElement(
                        "p"
                    );

                fecha.className =
                    "fecha-publicacion";

                const fechaVisible =
                    formatearFechaPublicacion(
                        noticia.fecha
                    );

                fecha.textContent =
                    fechaVisible
                        ? "Publicado el " +
                          fechaVisible
                        : "";

                if (fecha.textContent) {
                    tituloBloque.appendChild(
                        fecha
                    );
                }


                const etiqueta =
                    document.createElement(
                        "span"
                    );


                etiqueta.className =
                    "noticia-etiqueta";


                etiqueta.textContent =
                    noticia.tipo === "pdf"
                        ? "DOCUMENTO"
                        : "IMAGEN";


                encabezado.appendChild(
                    tituloBloque
                );


                const metaNoticia =
                    document.createElement(
                        "div"
                    );

                metaNoticia.className =
                    "noticia-meta";


                if (
                    publicacionEsNueva(
                        noticia.fecha,
                        noticia ===
                            noticiasDisponibles[0]
                    )
                ) {
                    metaNoticia.appendChild(
                        crearEtiquetaNuevo()
                    );
                }

                metaNoticia.appendChild(
                    etiqueta
                );

                encabezado.appendChild(
                    metaNoticia
                );


                const contenido =
                    document.createElement(
                        "div"
                    );


                contenido.className =
                    "noticia-contenido";


                if (
                    noticia.tipo === "pdf" &&
                    Array.isArray(
                        noticia.paginas
                    ) &&
                    noticia.paginas.length > 0
                ) {

                    const paginas =
                        document.createElement(
                            "div"
                        );


                    paginas.className =
                        "noticia-paginas-pdf";


                    noticia.paginas.forEach(
                        function (pagina, indice) {

                            const contenedorPagina =
                                document.createElement(
                                    "div"
                                );


                            const imagenPagina =
                                crearImagenNoticia(
                                    pagina,
                                    "Noticia N.º " +
                                    noticia.numero +
                                    ", página " +
                                    (indice + 1),
                                    "noticia-pagina-pdf"
                                );


                            contenedorPagina.appendChild(
                                imagenPagina
                            );


                            if (
                                noticia.paginas.length > 1
                            ) {

                                const indicador =
                                    document.createElement(
                                        "p"
                                    );


                                indicador.className =
                                    "noticia-pagina-indicador";


                                indicador.textContent =
                                    "Página " +
                                    (indice + 1) +
                                    " de " +
                                    noticia.paginas.length;


                                contenedorPagina.appendChild(
                                    indicador
                                );

                            }


                            paginas.appendChild(
                                contenedorPagina
                            );

                        }
                    );


                    contenido.appendChild(
                        paginas
                    );

                } else if (
                    typeof noticia.ruta ===
                    "string"
                ) {

                    contenido.appendChild(
                        crearImagenNoticia(
                            noticia.ruta,
                            "Noticia N.º " +
                            noticia.numero,
                            "noticia-imagen"
                        )
                    );

                }


                tarjeta.appendChild(
                    encabezado
                );


                tarjeta.appendChild(
                    contenido
                );


                tarjeta.appendChild(
                    crearBotonCompartirNoticia(
                        noticia
                    )
                );


                listaNoticias.appendChild(
                    tarjeta
                );

            }
        );


        listaNoticias.setAttribute(
            "aria-busy",
            "false"
        );


        if (botonVerMasNoticias) {

            if (
                noticiasDisponibles.length <=
                CANTIDAD_INICIAL_NOTICIAS
            ) {

                botonVerMasNoticias.hidden =
                    true;

            } else {

                botonVerMasNoticias.hidden =
                    false;


                botonVerMasNoticias.textContent =
                    mostrarTodasNoticias
                        ? "Mostrar menos noticias"
                        : "Ver más noticias";


                botonVerMasNoticias.setAttribute(
                    "aria-expanded",
                    mostrarTodasNoticias
                        ? "true"
                        : "false"
                );

            }

        }

    }


    async function cargarNoticias() {

        if (!listaNoticias) {
            return;
        }


        mostrarEstadoCargaNoticias();


        try {

            const separador =
                ARCHIVO_LISTA_NOTICIAS.includes("?")
                    ? "&"
                    : "?";


            const respuesta =
                await fetch(
                    ARCHIVO_LISTA_NOTICIAS +
                    separador +
                    "v=" +
                    Date.now(),
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!respuesta.ok) {

                /*
                 * Si todavía no existe noticias.json porque
                 * nunca se ha subido una noticia, se presenta
                 * el estado vacío solicitado.
                 */

                if (
                    respuesta.status === 404
                ) {

                    mostrarSinNoticias();

                    return;

                }


                throw new Error(
                    "No se pudo cargar noticias.json. Estado HTTP: " +
                    respuesta.status
                );

            }


            const datos =
                await respuesta.json();


            if (!Array.isArray(datos)) {

                mostrarSinNoticias();

                return;

            }


            noticiasDisponibles =
                datos
                    .filter(
                        function (noticia) {

                            return (
                                noticia &&
                                Number.isInteger(
                                    noticia.numero
                                ) &&
                                noticia.numero > 0 &&
                                (
                                    noticia.tipo ===
                                        "imagen" ||
                                    noticia.tipo ===
                                        "pdf"
                                )
                            );

                        }
                    )
                    .sort(
                        function (a, b) {

                            return (
                                b.numero -
                                a.numero
                            );

                        }
                    );


            if (
                noticiasDisponibles.length === 0
            ) {

                mostrarSinNoticias();

                return;

            }


            renderizarNoticias();

        } catch (error) {

            console.error(
                "Error al cargar noticias:",
                error
            );


            /*
             * Para el visitante se muestra un mensaje limpio.
             * El detalle técnico queda solamente en consola.
             */

            mostrarSinNoticias();

        }

    }


    if (botonVerMasNoticias) {

        botonVerMasNoticias.addEventListener(
            "click",
            function () {

                mostrarTodasNoticias =
                    !mostrarTodasNoticias;


                renderizarNoticias();


                if (!mostrarTodasNoticias) {

                    const tituloNoticias =
                        document.getElementById(
                            "tituloUltimasNoticias"
                        );


                    if (tituloNoticias) {

                        tituloNoticias.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    }


    cargarNoticias();



    /* =====================================================
       FINALIZACIÓN
    ===================================================== */

    console.log(
        "Sistema de navegación iniciado correctamente."
    );


    console.log(
        "Menú móvil iniciado correctamente."
    );


    console.log(
        "Navegación por historial iniciada correctamente."
    );


    console.log(
        "Accesibilidad con tecla Escape iniciada."
    );


    console.log(
        "Accesos rápidos del pie iniciados."
    );


    console.log(
        "Sistema Ver todos / Mostrar menos de Protocolos iniciado."
    );


    console.log(
        "Indicadores PDF iniciados."
    );


    console.log(
        "Botón volver arriba iniciado correctamente."
    );


    console.log(
        "Icono de Instagram iniciado correctamente."
    );


    console.log(
        "Sistema automático de comunicados iniciado."
    );


    console.log(
        "Sistema automático de noticias iniciado."
    );



    /* =====================================================
       CONTADORES AUTOMÁTICOS DEL CONTENIDO
    ===================================================== */

    async function actualizarContadoresContenido() {

        const contadorComunicados =
            document.getElementById("contadorInicioComunicados");

        const contadorNoticias =
            document.getElementById("contadorInicioNoticias");

        const contadorProtocolos =
            document.getElementById("contadorInicioProtocolos");


        try {

            const respuestaComunicados =
                await fetch(
                    "comunicados/comunicados.json?ts=" +
                    Date.now(),
                    { cache: "no-store" }
                );

            if (respuestaComunicados.ok) {

                const comunicados =
                    await respuestaComunicados.json();

                if (contadorComunicados) {
                    contadorComunicados.textContent =
                        Array.isArray(comunicados)
                            ? comunicados.length
                            : "0";
                }

            }

        } catch (error) {

            console.warn(
                "No fue posible actualizar el contador de comunicados.",
                error
            );

        }


        try {

            const respuestaNoticias =
                await fetch(
                    "noticias/noticias.json?ts=" +
                    Date.now(),
                    { cache: "no-store" }
                );

            if (respuestaNoticias.ok) {

                const noticias =
                    await respuestaNoticias.json();

                if (contadorNoticias) {
                    contadorNoticias.textContent =
                        Array.isArray(noticias)
                            ? noticias.length
                            : "0";
                }

            }

        } catch (error) {

            console.warn(
                "No fue posible actualizar el contador de noticias.",
                error
            );

        }


        if (contadorProtocolos) {

            const enlacesProtocolos =
                Array.from(
                    document.querySelectorAll(
                        '#protocolos a[href*="protocolos/"]'
                    )
                );

            const rutasUnicas =
                new Set(
                    enlacesProtocolos.map(
                        function (enlace) {
                            return enlace.getAttribute("href");
                        }
                    )
                );

            contadorProtocolos.textContent =
                rutasUnicas.size;

        }

    }


    actualizarContadoresContenido();



    /* VISOR AFICHE HORARIOS DE ATENCIÓN A APODERADOS */
    const abrirAficheApoderados=document.getElementById("abrirAficheApoderados");
    const visorAficheApoderados=document.getElementById("visorAficheApoderados");
    const cerrarVisorAficheApoderados=document.getElementById("cerrarVisorAficheApoderados");
    let focoAnteriorAfiche=null;
    function abrirVisorAfiche(){
        if(!visorAficheApoderados)return;
        focoAnteriorAfiche=document.activeElement;
        visorAficheApoderados.hidden=false;
        document.body.classList.add("visor-afiche-abierto");
        if(cerrarVisorAficheApoderados)cerrarVisorAficheApoderados.focus();
    }
    function cerrarVisorAfiche(){
        if(!visorAficheApoderados)return;
        visorAficheApoderados.hidden=true;
        document.body.classList.remove("visor-afiche-abierto");
        if(focoAnteriorAfiche&&typeof focoAnteriorAfiche.focus==="function")focoAnteriorAfiche.focus();
    }
    if(abrirAficheApoderados)abrirAficheApoderados.addEventListener("click",abrirVisorAfiche);
    if(cerrarVisorAficheApoderados)cerrarVisorAficheApoderados.addEventListener("click",cerrarVisorAfiche);
    if(visorAficheApoderados)visorAficheApoderados.addEventListener("click",function(e){if(e.target===visorAficheApoderados)cerrarVisorAfiche();});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&visorAficheApoderados&&!visorAficheApoderados.hidden)cerrarVisorAfiche();});


    /* ACCESIBILIDAD Y FUNCIONAMIENTO MULTIDISPOSITIVO */
    const anunciosAccesibilidad=document.getElementById("anunciosAccesibilidad");
    function anunciarAccesibilidad(mensaje){if(!anunciosAccesibilidad)return;anunciosAccesibilidad.textContent="";window.setTimeout(function(){anunciosAccesibilidad.textContent=mensaje;},30);}
    document.querySelectorAll(".tarjeta-especialidad").forEach(function(tarjeta){if(!tarjeta.hasAttribute("tabindex"))tarjeta.setAttribute("tabindex","0");tarjeta.setAttribute("aria-pressed",tarjeta.classList.contains("girada")?"true":"false");tarjeta.addEventListener("click",function(){window.setTimeout(function(){const girada=tarjeta.classList.contains("girada");tarjeta.setAttribute("aria-pressed",girada?"true":"false");anunciarAccesibilidad(girada?"Información de la especialidad abierta.":"Información de la especialidad cerrada.");},0);});tarjeta.addEventListener("keydown",function(e){if(e.key!=="Enter"&&e.key!==" ")return;e.preventDefault();tarjeta.click();});});
    document.querySelectorAll("img").forEach(function (imagen) {

        function debeIgnorarErrorImagen() {

            const src =
                (
                    imagen.getAttribute("src") ||
                    ""
                ).trim();

            return (
                imagen.dataset.ignorarErrorImagen === "true" ||
                src === "" ||
                imagen.closest(
                    "#visorImagenGeneral, " +
                    "#visorAficheApoderados, " +
                    ".visor-afiche-apoderados"
                ) !== null
            );

        }


        function limpiarEstadoImagenNoDisponible() {

            imagen.dataset.errorTratado =
                "0";

            imagen.classList.remove(
                "imagen-no-disponible"
            );

            const padre =
                imagen.parentElement;

            if (padre) {

                padre.classList.remove(
                    "contenedor-imagen-no-disponible"
                );

                const mensaje =
                    padre.querySelector(
                        ".mensaje-imagen-no-disponible"
                    );

                if (mensaje) {
                    mensaje.remove();
                }

            }

        }


        imagen.addEventListener(
            "load",
            limpiarEstadoImagenNoDisponible
        );


        imagen.addEventListener(
            "error",
            function () {

                if (debeIgnorarErrorImagen()) {
                    return;
                }

                if (
                    imagen.dataset.errorTratado ===
                    "1"
                ) {
                    return;
                }

                imagen.dataset.errorTratado =
                    "1";

                imagen.classList.add(
                    "imagen-no-disponible"
                );

                const padre =
                    imagen.parentElement;

                if (
                    padre &&
                    !padre.querySelector(
                        ".mensaje-imagen-no-disponible"
                    )
                ) {

                    padre.classList.add(
                        "contenedor-imagen-no-disponible"
                    );

                    const mensaje =
                        document.createElement(
                            "span"
                        );

                    mensaje.className =
                        "mensaje-imagen-no-disponible";

                    mensaje.setAttribute(
                        "role",
                        "status"
                    );

                    mensaje.textContent =
                        "🖼️ Imagen temporalmente no disponible";

                    padre.appendChild(
                        mensaje
                    );

                }

            }
        );


        if (
            !debeIgnorarErrorImagen() &&
            imagen.complete &&
            imagen.naturalWidth === 0
        ) {

            imagen.dispatchEvent(
                new Event("error")
            );

        }

    });


    /* =====================================================
       NUEVO + COMPARTIR EN COMUNICADOS Y NOTICIAS
    ===================================================== */
    function fechaDesdeTexto(texto) {
        if (!texto) return null;
        const iso = texto.match(/\b(20\d{2})[-\/](\d{1,2})[-\/](\d{1,2})\b/);
        if (iso) return new Date(Number(iso[1]), Number(iso[2])-1, Number(iso[3]));
        const lat = texto.match(/\b(\d{1,2})[-\/](\d{1,2})[-\/](20\d{2})\b/);
        if (lat) return new Date(Number(lat[3]), Number(lat[2])-1, Number(lat[1]));
        return null;
    }

    function esContenidoNuevo(elemento) {
        const candidatos = [
            elemento.getAttribute("data-fecha"),
            elemento.querySelector("time")?.getAttribute("datetime"),
            elemento.querySelector("time")?.textContent,
            elemento.textContent
        ];
        let fecha = null;
        for (const candidato of candidatos) {
            fecha = fechaDesdeTexto(candidato);
            if (fecha) break;
        }
        if (!fecha) return false;
        const ahora = new Date();
        ahora.setHours(0,0,0,0);
        fecha.setHours(0,0,0,0);
        const dias = (ahora-fecha)/86400000;
        return dias >= 0 && dias <= 7;
    }

    function prepararContenidoCompartible() {
        const selectores = [
            "#listaComunicados a",
            "#listaNoticias a",
            ".comunicado-item",
            ".noticia-item"
        ];
        const vistos = new Set();

        document.querySelectorAll(selectores.join(",")).forEach(function(item) {
            const tarjeta = item.closest("article,li,.comunicado-item,.noticia-item") || item;
            if (vistos.has(tarjeta)) return;
            vistos.add(tarjeta);

            if (esContenidoNuevo(tarjeta) && !tarjeta.querySelector(".etiqueta-nuevo")) {
                const titulo = tarjeta.querySelector("h2,h3,h4,strong,a") || tarjeta;
                const badge = document.createElement("span");
                badge.className = "etiqueta-nuevo";
                badge.textContent = "NUEVO";
                badge.setAttribute("aria-label","Contenido nuevo, publicado durante los últimos 7 días");
                titulo.appendChild(badge);
            }

            if (!tarjeta.querySelector(".boton-compartir-contenido")) {
                const enlace = tarjeta.matches("a[href]") ? tarjeta : tarjeta.querySelector("a[href]");
                if (!enlace) return;
                const boton = document.createElement("button");
                boton.type = "button";
                boton.className = "boton-compartir-contenido";
                boton.innerHTML = '<span aria-hidden="true">↗</span><span>Compartir</span>';
                boton.addEventListener("click", async function(e) {
                    e.preventDefault(); e.stopPropagation();
                    const url = new URL(enlace.getAttribute("href"), window.location.href).href;
                    const titulo = (tarjeta.querySelector("h2,h3,h4,strong,a")?.textContent || document.title).replace("NUEVO","").trim();
                    try {
                        if (navigator.share) {
                            await navigator.share({title:titulo,url:url});
                        } else if (navigator.clipboard) {
                            await navigator.clipboard.writeText(url);
                            anunciarAccesibilidad("Enlace copiado al portapapeles.");
                            boton.querySelector("span:last-child").textContent="Enlace copiado";
                            setTimeout(()=>boton.querySelector("span:last-child").textContent="Compartir",1800);
                        }
                    } catch(err) {
                        if (err && err.name !== "AbortError") console.warn("No fue posible compartir:",err);
                    }
                });
                tarjeta.appendChild(boton);
            }
        });
    }

    prepararContenidoCompartible();

    /* Las listas son automáticas, por lo que observamos sus cambios. */
    ["listaComunicados","listaNoticias"].forEach(function(id) {
        const lista=document.getElementById(id);
        if (!lista) return;
        new MutationObserver(function(){ prepararContenidoCompartible(); })
            .observe(lista,{childList:true,subtree:true});
    });




    /* =====================================================
       VISOR UNIFICADO - AVISO, PDF E IMÁGENES
    ===================================================== */

    const visorImagenGeneral =
        document.getElementById(
            "visorImagenGeneral"
        );

    const imagenVisorGeneral =
        document.getElementById(
            "imagenVisorGeneral"
        );

    const pdfVisorGeneral =
        document.getElementById(
            "pdfVisorGeneral"
        );

    const cerrarVisorImagenGeneral =
        document.getElementById(
            "cerrarVisorImagenGeneral"
        );

    let focoAnteriorVisorGeneral =
        null;


    function abrirVisorGeneral(
        ruta,
        tipo,
        textoAlternativo,
        elementoOrigen
    ) {

        if (
            !visorImagenGeneral ||
            !ruta
        ) {
            return;
        }

        focoAnteriorVisorGeneral =
            elementoOrigen ||
            document.activeElement;

        const esPdf =
            tipo === "pdf" ||
            /\.pdf(?:$|\?)/i.test(ruta);

        if (imagenVisorGeneral) {

            imagenVisorGeneral.hidden =
                esPdf;

            if (esPdf) {

                imagenVisorGeneral.removeAttribute(
                    "src"
                );

                imagenVisorGeneral.alt =
                    "";

            } else {

                imagenVisorGeneral.dataset.errorTratado =
                    "0";

                imagenVisorGeneral.classList.remove(
                    "imagen-no-disponible"
                );

                const contenedorVisor =
                    imagenVisorGeneral.parentElement;

                if (contenedorVisor) {

                    contenedorVisor.classList.remove(
                        "contenedor-imagen-no-disponible"
                    );

                    const mensajeAnterior =
                        contenedorVisor.querySelector(
                            ".mensaje-imagen-no-disponible"
                        );

                    if (mensajeAnterior) {
                        mensajeAnterior.remove();
                    }

                }

                imagenVisorGeneral.src =
                    ruta;

                imagenVisorGeneral.alt =
                    textoAlternativo ||
                    "Imagen ampliada";

            }

        }


        if (pdfVisorGeneral) {

            pdfVisorGeneral.hidden =
                !esPdf;

            if (esPdf) {

                pdfVisorGeneral.src =
                    ruta;

                pdfVisorGeneral.title =
                    textoAlternativo ||
                    "Documento ampliado";

            } else {

                pdfVisorGeneral.removeAttribute(
                    "src"
                );

            }

        }


        visorImagenGeneral.hidden =
            false;

        document.body.classList.add(
            "visor-afiche-abierto"
        );


        if (cerrarVisorImagenGeneral) {

            cerrarVisorImagenGeneral.focus();

        }

    }


    function cerrarVisorGeneral() {

        if (!visorImagenGeneral) {
            return;
        }

        visorImagenGeneral.hidden =
            true;

        document.body.classList.remove(
            "visor-afiche-abierto"
        );


        if (imagenVisorGeneral) {

            imagenVisorGeneral.removeAttribute(
                "src"
            );

            imagenVisorGeneral.alt =
                "";

            imagenVisorGeneral.hidden =
                true;

        }


        if (pdfVisorGeneral) {

            pdfVisorGeneral.removeAttribute(
                "src"
            );

            pdfVisorGeneral.hidden =
                true;

        }


        if (
            focoAnteriorVisorGeneral &&
            typeof focoAnteriorVisorGeneral.focus ===
                "function"
        ) {

            focoAnteriorVisorGeneral.focus();

        }

    }


    if (cerrarVisorImagenGeneral) {

        cerrarVisorImagenGeneral.addEventListener(
            "click",
            cerrarVisorGeneral
        );

    }


    if (visorImagenGeneral) {

        visorImagenGeneral.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target ===
                    visorImagenGeneral
                ) {

                    cerrarVisorGeneral();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                visorImagenGeneral &&
                !visorImagenGeneral.hidden
            ) {

                cerrarVisorGeneral();

            }

        }
    );


    /* Centro de Alumnos */
    const abrirImagenCentroAlumnos =
        document.getElementById(
            "abrirImagenCentroAlumnos"
        );

    if (abrirImagenCentroAlumnos) {

        abrirImagenCentroAlumnos.addEventListener(
            "click",
            function () {

                const imagen =
                    abrirImagenCentroAlumnos.querySelector(
                        "img"
                    );

                if (!imagen) {
                    return;
                }

                abrirVisorGeneral(
                    imagen.currentSrc ||
                    imagen.src,
                    "imagen",
                    imagen.alt,
                    abrirImagenCentroAlumnos
                );

            }
        );

    }


    /* Imagen/preview del aviso */
    if (contenidoAvisoImportante) {

        contenidoAvisoImportante.addEventListener(
            "click",
            function (evento) {

                const imagen =
                    evento.target.closest(
                        ".imagen-aviso-importante"
                    );

                if (!imagen) {
                    return;
                }

                abrirVisorGeneral(
                    imagen.currentSrc ||
                    imagen.src,
                    "imagen",
                    imagen.alt,
                    imagen
                );

            }
        );


        contenidoAvisoImportante.addEventListener(
            "keydown",
            function (evento) {

                const imagen =
                    evento.target.closest(
                        ".imagen-aviso-importante"
                    );

                if (
                    !imagen ||
                    (
                        evento.key !== "Enter" &&
                        evento.key !== " "
                    )
                ) {
                    return;
                }

                evento.preventDefault();

                abrirVisorGeneral(
                    imagen.currentSrc ||
                    imagen.src,
                    "imagen",
                    imagen.alt,
                    imagen
                );

            }
        );

    }


    /* Botón principal del aviso:
       abre siempre dentro del visor, tanto imágenes como PDF. */
    if (botonAvisoImportante) {

        botonAvisoImportante.addEventListener(
            "click",
            function (evento) {

                const ruta =
                    botonAvisoImportante.dataset.rutaAviso ||
                    botonAvisoImportante.getAttribute(
                        "href"
                    );

                const tipo =
                    botonAvisoImportante.dataset.tipoAviso ||
                    (
                        /\.pdf(?:$|\?)/i.test(
                            ruta || ""
                        )
                            ? "pdf"
                            : "imagen"
                    );

                if (!ruta || ruta === "#") {
                    return;
                }

                evento.preventDefault();

                abrirVisorGeneral(
                    ruta,
                    tipo,
                    tituloAvisoImportante
                        ? tituloAvisoImportante.textContent
                        : "Aviso Importante",
                    botonAvisoImportante
                );

            }
        );

    }



    /* =====================================================
       MEJORAS INTEGRALES: BUSCADOR, RUTA, HORARIOS Y ARCHIVOS
    ===================================================== */

    const mejoraAbrirBusqueda = document.getElementById("abrirBuscadorGlobal");
    const mejoraModalBusqueda = document.getElementById("buscadorGlobal");
    const mejoraCerrarBusqueda = document.getElementById("cerrarBuscadorGlobal");
    const mejoraEntradaBusqueda = document.getElementById("entradaBuscadorGlobal");
    const mejoraResultadosBusqueda = document.getElementById("resultadosBuscadorGlobal");
    const mejoraRuta = document.getElementById("rutaContextual");
    const mejoraModalArchivo = document.getElementById("mensajeArchivoNoDisponible");
    const mejoraCerrarArchivo = document.getElementById("cerrarArchivoNoDisponible");
    const mejoraVolverArchivo = document.getElementById("volverArchivoNoDisponible");

    function mejoraTexto(elemento) {
        return (elemento && elemento.textContent ? elemento.textContent : "")
            .replace(/\s+/g, " ").trim();
    }

    function mejoraNormalizar(texto) {
        return (texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .toLowerCase().trim();
    }

    function mejoraAbrirPagina(idPagina, idDestino) {
        const control = document.querySelector('[data-pagina="' + idPagina + '"]');
        if (control) control.click();
        window.setTimeout(function () {
            const destino = idDestino ? document.getElementById(idDestino) : document.getElementById(idPagina);
            if (destino) destino.scrollIntoView({behavior:"smooth", block:"start"});
        }, 80);
    }

    /* Buscador general */
    function mejoraConstruirIndice() {
        const items = [];
        document.querySelectorAll("section.pagina, section[id]").forEach(function(sec) {
            if (!sec.id) return;
            const titulo = sec.querySelector("h1,h2,h3");
            if (!titulo) return;
            items.push({titulo:mejoraTexto(titulo), detalle:"Sección del sitio", pagina:sec.id, destino:sec.id});
        });
        document.querySelectorAll(".documento, .horario-curso-card, .categoria-documentos, [id^='academica']").forEach(function(el) {
            const titulo = el.querySelector("h2,h3,h4,strong") || el;
            const texto = mejoraTexto(titulo);
            if (!texto || texto.length > 120) return;
            const pagina = el.closest(".pagina");
            items.push({titulo:texto, detalle:mejoraTexto(el).slice(0,150), pagina:pagina ? pagina.id : "inicio", destino:el.id || (pagina ? pagina.id : "inicio")});
        });
        return items.filter(function(item, i, arr) {
            return arr.findIndex(function(x){return x.titulo===item.titulo && x.destino===item.destino;})===i;
        });
    }
    const mejoraIndice = mejoraConstruirIndice();

    function mejoraRenderBusqueda(valor) {
        if (!mejoraResultadosBusqueda) return;
        const q = mejoraNormalizar(valor);
        mejoraResultadosBusqueda.innerHTML = "";
        if (q.length < 2) {
            mejoraResultadosBusqueda.innerHTML = '<p>Escribe al menos 2 caracteres.</p>';
            return;
        }
        const encontrados = mejoraIndice.filter(function(item) {
            return mejoraNormalizar(item.titulo + " " + item.detalle).includes(q);
        }).slice(0,20);
        if (!encontrados.length) {
            mejoraResultadosBusqueda.innerHTML = '<p>No encontramos resultados para esa búsqueda.</p>';
            return;
        }
        encontrados.forEach(function(item) {
            const b=document.createElement("button");
            b.type="button"; b.className="resultado-global";
            b.innerHTML="<strong></strong><small></small>";
            b.querySelector("strong").textContent=item.titulo;
            b.querySelector("small").textContent=item.detalle;
            b.addEventListener("click",function(){
                mejoraModalBusqueda.hidden=true;
                mejoraAbrirPagina(item.pagina,item.destino);
            });
            mejoraResultadosBusqueda.appendChild(b);
        });
    }
    if (mejoraAbrirBusqueda) mejoraAbrirBusqueda.addEventListener("click",function(){
        mejoraModalBusqueda.hidden=false;
        mejoraEntradaBusqueda.value="";
        mejoraRenderBusqueda("");
        window.setTimeout(function(){mejoraEntradaBusqueda.focus();},30);
    });
    if (mejoraCerrarBusqueda) mejoraCerrarBusqueda.addEventListener("click",function(){mejoraModalBusqueda.hidden=true;});
    if (mejoraEntradaBusqueda) mejoraEntradaBusqueda.addEventListener("input",function(){mejoraRenderBusqueda(this.value);});
    if (mejoraModalBusqueda) mejoraModalBusqueda.addEventListener("click",function(e){if(e.target===mejoraModalBusqueda)mejoraModalBusqueda.hidden=true;});

    /* Ruta contextual + botón volver */
    function mejoraActualizarRuta() {
        if (!mejoraRuta) return;
        const activa=document.querySelector(".pagina.activa") || document.querySelector(".pagina:not([hidden])");
        const nombre=activa ? (mejoraTexto(activa.querySelector(".titulo-pagina h2,h1")) || activa.id) : "Inicio";
        mejoraRuta.textContent = nombre==="Inicio" ? "Inicio" : "Inicio  ›  "+nombre;
    }
    document.addEventListener("click",function(e){
        if(e.target.closest("[data-pagina],[data-ir-pagina],[data-destino]")) window.setTimeout(mejoraActualizarRuta,100);
    });
    mejoraActualizarRuta();

    document.querySelectorAll(".pagina").forEach(function(pagina){
        if(pagina.id==="inicio") return;
        const titulo=pagina.querySelector(".titulo-pagina");
        if(!titulo || titulo.querySelector(".boton-volver-contextual")) return;
        const b=document.createElement("button");
        b.type="button"; b.className="boton-volver-contextual";
        b.textContent="← Volver a Inicio";
        b.addEventListener("click",function(){mejoraAbrirPagina("inicio","inicio");});
        titulo.insertAdjacentElement("afterend",b);
    });

    /* Selector de grupos de horarios + compartir */
    const mejoraHorarios=document.querySelector(".horarios-cursos-detallados");
    if(mejoraHorarios) {
        const selector=document.createElement("div");
        selector.className="selector-horarios";
        selector.setAttribute("aria-label","Filtrar horarios por nivel");
        const grupos=[
            ["todos","Todos"],
            ["parvularia","Educación Parvularia"],
            ["basica","Educación Básica"],
            ["opcion","Opción 4"],
            ["media","Educación Media TP"]
        ];
        grupos.forEach(function(g){
            const b=document.createElement("button"); b.type="button"; b.dataset.grupo=g[0]; b.textContent=g[1];
            if(g[0]==="todos") b.classList.add("activo");
            b.addEventListener("click",function(){
                selector.querySelectorAll("button").forEach(function(x){x.classList.toggle("activo",x===b);});
                mejoraHorarios.querySelectorAll(".horario-curso-card").forEach(function(card){
                    const n=mejoraNormalizar(mejoraTexto(card.querySelector("h3")));
                    let tipo=n.includes("kinder")?"parvularia":n.includes("opcion")?"opcion":n.includes("medio")?"media":"basica";
                    card.hidden = g[0]!=="todos" && tipo!==g[0];
                });
            });
            selector.appendChild(b);
        });
        mejoraHorarios.parentNode.insertBefore(selector,mejoraHorarios);

        mejoraHorarios.querySelectorAll(".horario-curso-card").forEach(function(card){
            const titulo=mejoraTexto(card.querySelector("h3"));
            const compartir=document.createElement("button");
            compartir.type="button"; compartir.className="compartir-horario";
            compartir.textContent="↗ Compartir horario";
            compartir.addEventListener("click",async function(){
                const url=location.href.split("#")[0]+"#academicaHorarios";
                const texto="Horario de "+titulo+" - Escuela de Concentración Los Loros";
                try {
                    if(navigator.share) await navigator.share({title:titulo,text:texto,url:url});
                    else { await navigator.clipboard.writeText(texto+" "+url); alert("Enlace del horario copiado."); }
                } catch(e) {}
            });
            card.appendChild(compartir);
        });
    }

    /* Tipos de archivo + descarga */
    document.querySelectorAll('a[href]').forEach(function(a){
        let href=a.getAttribute("href")||"";
        const m=href.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i);
        if(!m) return;
        const ext=m[1].toLowerCase();
        if(!["pdf","doc","docx","ppt","pptx","xls","xlsx","jpg","jpeg","png","webp","txt","csv"].includes(ext)) return;
        if(a.querySelector(".tipo-archivo")) return;
        const badge=document.createElement("span"); badge.className="tipo-archivo"; badge.textContent=ext;
        a.appendChild(badge);
        const cont=a.closest(".documento,.bloque-documento,.horario-clases-accion");
        if(cont && !cont.querySelector(".acciones-archivo-extra")) {
            const acciones=document.createElement("div"); acciones.className="acciones-archivo-extra";
            const descargar=document.createElement("a"); descargar.href=href; descargar.download=""; descargar.textContent="⬇ Descargar";
            acciones.appendChild(descargar); cont.appendChild(acciones);
        }
    });

    /* Error amigable para archivos locales que no existen */
    function mejoraCerrarModalArchivo(){ if(mejoraModalArchivo) mejoraModalArchivo.hidden=true; }
    if(mejoraCerrarArchivo) mejoraCerrarArchivo.addEventListener("click",mejoraCerrarModalArchivo);
    if(mejoraVolverArchivo) mejoraVolverArchivo.addEventListener("click",mejoraCerrarModalArchivo);
    if(mejoraModalArchivo) mejoraModalArchivo.addEventListener("click",function(e){if(e.target===mejoraModalArchivo)mejoraCerrarModalArchivo();});

    document.addEventListener("click",async function(e){
        const a=e.target.closest('a[href]');
        if(!a || a.hasAttribute("download")) return;
        const href=a.getAttribute("href")||"";
        if(!/\.(pdf|docx?|pptx?|xlsx?|jpg|jpeg|png|webp)(?:[?#]|$)/i.test(href)) return;
        if(/^https?:\/\//i.test(href) && !href.startsWith(location.origin)) return;
        if(a.id==="botonAvisoImportante") return;
        e.preventDefault();
        try {
            const r=await fetch(href,{method:"HEAD",cache:"no-store"});
            if(!r.ok) throw new Error("missing");
            if(a.target==="_blank") window.open(href,"_blank","noopener");
            else location.href=href;
        } catch(err) {
            if(mejoraModalArchivo) mejoraModalArchivo.hidden=false;
        }
    });

    /* Etiqueta NUEVO: elementos con fecha disponible en data-fecha o texto */
    const ahoraNuevo=Date.now();
    document.querySelectorAll("[data-fecha], .documento").forEach(function(el){
        const fecha=el.dataset ? el.dataset.fecha : "";
        if(!fecha) return;
        const t=Date.parse(fecha);
        if(!Number.isFinite(t) || ahoraNuevo-t > 14*86400000 || ahoraNuevo<t) return;
        const titulo=el.querySelector("h3,h4,strong,a");
        if(titulo && !titulo.querySelector(".etiqueta-nuevo")) {
            const n=document.createElement("span"); n.className="etiqueta-nuevo"; n.textContent="NUEVO"; titulo.appendChild(n);
        }
    });

    /* Escape para modales nuevos */
    document.addEventListener("keydown",function(e){
        if(e.key!=="Escape") return;
        if(mejoraModalBusqueda && !mejoraModalBusqueda.hidden) mejoraModalBusqueda.hidden=true;
        if(mejoraModalArchivo && !mejoraModalArchivo.hidden) mejoraModalArchivo.hidden=true;
    });



    /* =====================================================
       PULIDO FINAL DE ACCESIBILIDAD Y RENDIMIENTO
    ===================================================== */

    /* Carga diferida: no retrasar logos visibles al inicio. */
    document.querySelectorAll("img").forEach(function (imagen) {

        const esPrioritaria =
            imagen.closest(
                ".encabezado, .logo-inicio"
            ) !== null;

        if (esPrioritaria) {

            imagen.loading =
                "eager";

            imagen.fetchPriority =
                "high";

        } else {

            if (!imagen.hasAttribute("loading")) {
                imagen.loading = "lazy";
            }

            if (!imagen.hasAttribute("decoding")) {
                imagen.decoding = "async";
            }

        }

    });


    /* Mantener el foco dentro de los diálogos abiertos. */
    function gestionarTrampaFocoModal(
        modal,
        evento
    ) {

        if (
            !modal ||
            modal.hidden ||
            evento.key !== "Tab"
        ) {
            return;
        }

        const elementos =
            Array.from(
                modal.querySelectorAll(
                    'button:not([disabled]),' +
                    'a[href],' +
                    'input:not([disabled]),' +
                    'select:not([disabled]),' +
                    'textarea:not([disabled]),' +
                    '[tabindex]:not([tabindex="-1"])'
                )
            ).filter(function (elemento) {
                return (
                    elemento.offsetWidth > 0 ||
                    elemento.offsetHeight > 0
                );
            });

        if (elementos.length === 0) {
            return;
        }

        const primero =
            elementos[0];

        const ultimo =
            elementos[
                elementos.length - 1
            ];

        if (
            evento.shiftKey &&
            document.activeElement ===
                primero
        ) {

            evento.preventDefault();
            ultimo.focus();

        } else if (
            !evento.shiftKey &&
            document.activeElement ===
                ultimo
        ) {

            evento.preventDefault();
            primero.focus();

        }

    }


    document.addEventListener(
        "keydown",
        function (evento) {

            [
                document.getElementById(
                    "buscadorGlobal"
                ),
                document.getElementById(
                    "mensajeArchivoNoDisponible"
                ),
                document.getElementById(
                    "visorImagenGeneral"
                ),
                document.getElementById(
                    "visorAficheApoderados"
                )
            ].forEach(function (modal) {

                gestionarTrampaFocoModal(
                    modal,
                    evento
                );

            });

        }
    );


    /* Enlaces externos: anunciarlos sin alterar el texto visible. */
    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(function (enlace) {

        if (
            !enlace.getAttribute(
                "aria-label"
            )
        ) {

            const texto =
                (
                    enlace.textContent ||
                    "Enlace"
                ).trim();

            enlace.setAttribute(
                "aria-label",
                texto +
                " (se abre en una nueva pestaña)"
            );

        }

    });



    /* =====================================================
       PROPUESTA PREMIUM OFFLINE 20260821-17
    ===================================================== */
    document.addEventListener("keydown",function(e){
        if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
            e.preventDefault();
            const b=document.getElementById("abrirBuscadorGlobal");
            if(b)b.click();
        }
    });

    const indicePremiumDinamico=[];

    function agregarPremium(titulo,categoria,pagina,detalle,url){
        if(!titulo)return;
        const clave=[titulo,categoria,pagina,url].join("|");
        if(indicePremiumDinamico.some(x=>x.clave===clave))return;
        indicePremiumDinamico.push({clave,titulo,categoria,pagina,detalle:detalle||"",url:url||""});
    }

    async function cargarPremium(ruta,categoria,pagina){
        try{
            const r=await fetch(ruta,{cache:"no-store"});
            if(!r.ok)return;
            const datos=await r.json();
            if(!Array.isArray(datos))return;
            datos.forEach(item=>{
                agregarPremium(
                    item.titulo||item.nombre||item.texto||item.archivo||"",
                    categoria,pagina,
                    [item.fecha||"",item.descripcion||""].filter(Boolean).join(" · "),
                    item.ruta||item.url||item.archivo||""
                );
            });
        }catch(error){}
    }

    Promise.all([
        cargarPremium("comunicados/comunicados.json","comunicado","comunicados"),
        cargarPremium("noticias/noticias.json","noticia","inicio"),
        cargarPremium("documentos/documentos.json","documento","documentos"),
        cargarPremium("protocolos/protocolos.json","documento","protocolos"),
        cargarPremium("seguridad/seguridad.json","documento","seguridad"),
        cargarPremium("horarios/horarios.json","horario","academica")
    ]);

    const listaPremium=document.getElementById("listaComunicados");
    if(listaPremium&&!document.querySelector(".archivo-comunicados-filtros")){
        const f=document.createElement("div");
        f.className="archivo-comunicados-filtros";
        f.setAttribute("aria-label","Filtrar comunicados");
        [["todos","Todos"],["recientes","Recientes"],["anteriores","Anteriores"]].forEach(op=>{
            const b=document.createElement("button");
            b.type="button";b.dataset.filtroComunicado=op[0];b.textContent=op[1];
            if(op[0]==="todos")b.classList.add("activo");
            b.addEventListener("click",function(){
                f.querySelectorAll("button").forEach(x=>x.classList.toggle("activo",x===b));
                Array.from(listaPremium.querySelectorAll(".comunicado")).forEach((card,i)=>{
                    card.hidden=op[0]==="recientes"?i>=6:op[0]==="anteriores"?i<6:false;
                });
            });
            f.appendChild(b);
        });
        listaPremium.parentNode.insertBefore(f,listaPremium);
    }


    /* =====================================================
       REDISEÑO PREMIUM VISIBLE · OFFLINE 20260821-18
    ===================================================== */

    function premiumIrA(pagina, destino) {

        const botonMenu =
            document.querySelector(
                '.boton-menu[data-pagina="' +
                pagina +
                '"]'
            );

        if (botonMenu) {
            botonMenu.click();
        } else if (
            typeof mostrarPagina ===
            "function"
        ) {
            mostrarPagina(pagina);
        }

        if (destino) {

            window.setTimeout(function () {

                const elemento =
                    document.getElementById(
                        destino
                    );

                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }, 120);

        }

    }


    document.querySelectorAll(
        "[data-premium-pagina]"
    ).forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                premiumIrA(
                    boton.dataset.premiumPagina,
                    boton.dataset.premiumDestino ||
                        ""
                );

            }
        );

    });


    const premiumAbrirBusqueda =
        document.getElementById(
            "premiumAbrirBusqueda"
        );

    if (premiumAbrirBusqueda) {

        premiumAbrirBusqueda.addEventListener(
            "click",
            function () {

                const lupa =
                    document.getElementById(
                        "abrirBuscadorGlobal"
                    );

                if (lupa) {
                    lupa.click();
                }

            }
        );

    }


    /* Ctrl/Cmd + K abre Spotlight */
    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                (
                    evento.ctrlKey ||
                    evento.metaKey
                ) &&
                evento.key.toLowerCase() ===
                    "k"
            ) {

                evento.preventDefault();

                const lupa =
                    document.getElementById(
                        "abrirBuscadorGlobal"
                    );

                if (lupa) {
                    lupa.click();
                }

            }

        }
    );


    /*
       Índice extra: incorpora contenido dinámico ya cargado
       en Comunicados, Noticias, Documentos, Protocolos y Horarios.
    */
    function premiumResultadosDinamicos(
        termino
    ) {

        const q =
            mejoraNormalizar(
                termino
            );

        if (q.length < 2) {
            return [];
        }

        const selectores = [
            [
                "#listaComunicados .comunicado",
                "comunicado",
                "comunicados"
            ],
            [
                "#listaNoticias .noticia",
                "noticia",
                "inicio"
            ],
            [
                "#documentos .documento",
                "documento",
                "documentos"
            ],
            [
                "#protocolos .documento",
                "documento",
                "protocolos"
            ],
            [
                ".horario-curso-card",
                "horario",
                "academica"
            ]
        ];

        const resultados = [];

        selectores.forEach(
            function (config) {

                document
                    .querySelectorAll(
                        config[0]
                    )
                    .forEach(
                        function (elemento) {

                            const texto =
                                mejoraTexto(
                                    elemento
                                );

                            if (
                                !mejoraNormalizar(
                                    texto
                                ).includes(q)
                            ) {
                                return;
                            }

                            const titulo =
                                elemento.querySelector(
                                    "h2,h3,h4,strong"
                                );

                            resultados.push({
                                titulo:
                                    mejoraTexto(
                                        titulo ||
                                        elemento
                                    ).slice(
                                        0,
                                        100
                                    ),
                                detalle:
                                    texto.slice(
                                        0,
                                        150
                                    ),
                                pagina:
                                    config[2],
                                destino:
                                    elemento.id ||
                                    config[2],
                                categoria:
                                    config[1]
                            });

                        }
                    );

            }
        );

        return resultados;

    }


    /* Mejora visual del filtro de búsqueda. */
    const premiumFiltrosBusqueda =
        document.getElementById(
            "filtrosBuscadorGlobal"
        );

    let premiumFiltroActivo =
        "todos";

    if (premiumFiltrosBusqueda) {

        premiumFiltrosBusqueda
            .querySelectorAll(
                "[data-filtro-busqueda]"
            )
            .forEach(
                function (boton) {

                    boton.addEventListener(
                        "click",
                        function () {

                            premiumFiltroActivo =
                                boton.dataset
                                    .filtroBusqueda;

                            premiumFiltrosBusqueda
                                .querySelectorAll(
                                    "button"
                                )
                                .forEach(
                                    function (
                                        otro
                                    ) {

                                        otro.classList
                                            .toggle(
                                                "activo",
                                                otro ===
                                                    boton
                                            );

                                    }
                                );

                            const entrada =
                                document.getElementById(
                                    "entradaBuscadorGlobal"
                                );

                            if (
                                entrada &&
                                typeof mejoraRenderBusqueda ===
                                    "function"
                            ) {
                                mejoraRenderBusqueda(
                                    entrada.value
                                );
                            }

                        }
                    );

                }
            );

    }


    /*
       Re-render adicional después del buscador existente:
       agrega resultados dinámicos que no estaban presentes al cargar.
    */
    const premiumEntrada =
        document.getElementById(
            "entradaBuscadorGlobal"
        );

    const premiumResultados =
        document.getElementById(
            "resultadosBuscadorGlobal"
        );

    if (
        premiumEntrada &&
        premiumResultados
    ) {

        premiumEntrada.addEventListener(
            "input",
            function () {

                const termino =
                    premiumEntrada.value;

                window.setTimeout(
                    function () {

                        const dinamicos =
                            premiumResultadosDinamicos(
                                termino
                            );

                        dinamicos
                            .filter(
                                function (item) {

                                    return (
                                        premiumFiltroActivo ===
                                            "todos" ||
                                        premiumFiltroActivo ===
                                            item.categoria ||
                                        (
                                            premiumFiltroActivo ===
                                                "seccion" &&
                                            item.categoria ===
                                                "seccion"
                                        )
                                    );

                                }
                            )
                            .slice(
                                0,
                                12
                            )
                            .forEach(
                                function (item) {

                                    const existe =
                                        Array.from(
                                            premiumResultados
                                                .querySelectorAll(
                                                    ".resultado-global strong"
                                                )
                                        ).some(
                                            function (
                                                strong
                                            ) {
                                                return (
                                                    strong.textContent ===
                                                    item.titulo
                                                );
                                            }
                                        );

                                    if (existe) {
                                        return;
                                    }

                                    const boton =
                                        document.createElement(
                                            "button"
                                        );

                                    boton.type =
                                        "button";

                                    boton.className =
                                        "resultado-global";

                                    boton.innerHTML =
                                        "<strong></strong><small></small>";

                                    boton
                                        .querySelector(
                                            "strong"
                                        )
                                        .textContent =
                                            item.titulo;

                                    boton
                                        .querySelector(
                                            "small"
                                        )
                                        .textContent =
                                            item.categoria
                                                .toUpperCase() +
                                            " · " +
                                            item.detalle;

                                    boton.addEventListener(
                                        "click",
                                        function () {

                                            const modal =
                                                document.getElementById(
                                                    "buscadorGlobal"
                                                );

                                            if (modal) {
                                                modal.hidden =
                                                    true;
                                            }

                                            premiumIrA(
                                                item.pagina,
                                                item.destino
                                            );

                                        }
                                    );

                                    premiumResultados
                                        .appendChild(
                                            boton
                                        );

                                }
                            );

                    },
                    0
                );

            }
        );

    }


    /* Filtros de archivo de comunicados: si ya existen, los respetamos;
       si no, los creamos sin tocar el cargador automático. */
    const premiumListaComunicados =
        document.getElementById(
            "listaComunicados"
        );

    if (
        premiumListaComunicados &&
        !document.querySelector(
            ".archivo-comunicados-filtros"
        )
    ) {

        const filtros =
            document.createElement(
                "div"
            );

        filtros.className =
            "archivo-comunicados-filtros";

        [
            [
                "todos",
                "Todos"
            ],
            [
                "recientes",
                "Recientes"
            ],
            [
                "anteriores",
                "Anteriores"
            ]
        ].forEach(
            function (opcion) {

                const boton =
                    document.createElement(
                        "button"
                    );

                boton.type =
                    "button";

                boton.textContent =
                    opcion[1];

                if (
                    opcion[0] ===
                    "todos"
                ) {
                    boton.classList.add(
                        "activo"
                    );
                }

                boton.addEventListener(
                    "click",
                    function () {

                        filtros
                            .querySelectorAll(
                                "button"
                            )
                            .forEach(
                                function (
                                    otro
                                ) {
                                    otro.classList
                                        .toggle(
                                            "activo",
                                            otro ===
                                                boton
                                        );
                                }
                            );

                        Array.from(
                            premiumListaComunicados
                                .querySelectorAll(
                                    ".comunicado"
                                )
                        ).forEach(
                            function (
                                tarjeta,
                                indice
                            ) {

                                if (
                                    opcion[0] ===
                                    "todos"
                                ) {
                                    tarjeta.hidden =
                                        false;
                                } else if (
                                    opcion[0] ===
                                    "recientes"
                                ) {
                                    tarjeta.hidden =
                                        indice >= 6;
                                } else {
                                    tarjeta.hidden =
                                        indice < 6;
                                }

                            }
                        );

                    }
                );

                filtros.appendChild(
                    boton
                );

            }
        );

        premiumListaComunicados
            .parentNode
            .insertBefore(
                filtros,
                premiumListaComunicados
            );

    }



    /* =====================================================
       EXPERIENCIA UNIVERSAL · OFFLINE 20260821-20
    ===================================================== */

    /* Acceso directo por perfil */
    const perfilesDirectos = {
        alumnos: {
            pagina: "comunidad",
            destino: "perfilAlumnos",
            panel: "accesosAlumnos"
        },
        apoderados: {
            pagina: "comunidad",
            destino: "perfilApoderados",
            panel: "accesosApoderados"
        },
        funcionarios: {
            pagina: "comunidad",
            destino: "perfilFuncionarios",
            panel: "accesosFuncionarios"
        }
    };

    document.querySelectorAll(
        "[data-perfil-directo]"
    ).forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const perfil =
                    perfilesDirectos[
                        boton.dataset.perfilDirecto
                    ];

                if (!perfil) {
                    return;
                }

                premiumIrA(
                    perfil.pagina,
                    perfil.destino
                );

                window.setTimeout(
                    function () {

                        const tarjeta =
                            document.getElementById(
                                perfil.destino
                            );

                        const panel =
                            document.getElementById(
                                perfil.panel
                            );

                        const control =
                            tarjeta
                                ? tarjeta.querySelector(
                                    ".portal-perfil-boton"
                                )
                                : null;

                        if (
                            panel &&
                            control &&
                            panel.hidden
                        ) {
                            control.click();
                        }

                    },
                    220
                );

            }
        );

    });


    /* -----------------------------------------------------
       HORARIOS: selección guiada por nivel y curso
    ----------------------------------------------------- */

    const selectorNivelHorario =
        document.getElementById(
            "nivelHorarioPremium"
        );

    const selectorCursoHorario =
        document.getElementById(
            "cursoHorarioPremium"
        );

    const estadoHorarioPremium =
        document.getElementById(
            "estadoHorarioPremium"
        );

    const botonTodosHorarios =
        document.getElementById(
            "mostrarTodosHorariosPremium"
        );

    const botonLimpiarHorario =
        document.getElementById(
            "limpiarHorarioPremium"
        );

    const tarjetasHorario =
        Array.from(
            document.querySelectorAll(
                ".horario-curso-card"
            )
        );


    function clasificarHorario(
        nombre
    ) {

        const texto =
            mejoraNormalizar(
                nombre
            );

        if (
            texto.includes(
                "kinder"
            )
        ) {
            return "parvularia";
        }

        if (
            texto.includes(
                "opcion"
            )
        ) {
            return "opcion";
        }

        if (
            texto.includes(
                "medio"
            )
        ) {
            return "media";
        }

        return "basica";

    }


    const cursosPorNivel = {
        parvularia: [],
        basica: [],
        opcion: [],
        media: []
    };


    tarjetasHorario.forEach(
        function (tarjeta) {

            const titulo =
                tarjeta.querySelector(
                    "h3"
                );

            const nombre =
                mejoraTexto(
                    titulo
                );

            const nivel =
                clasificarHorario(
                    nombre
                );

            tarjeta.dataset.nivelHorario =
                nivel;

            tarjeta.dataset.nombreHorario =
                nombre;

            cursosPorNivel[nivel].push({
                nombre: nombre,
                tarjeta: tarjeta
            });

        }
    );


    function ocultarTodosHorarios() {

        tarjetasHorario.forEach(
            function (tarjeta) {

                tarjeta.hidden =
                    true;

                tarjeta.classList.remove(
                    "horario-seleccionado"
                );

            }
        );

    }


    function mostrarTodosLosHorarios() {

        tarjetasHorario.forEach(
            function (tarjeta) {
                tarjeta.hidden =
                    false;
            }
        );

        if (estadoHorarioPremium) {
            estadoHorarioPremium.textContent =
                "Mostrando todos los cursos.";
        }

    }


    if (
        selectorNivelHorario &&
        selectorCursoHorario
    ) {

        /* En la experiencia guiada no saturamos inicialmente con 17 cursos. */
        ocultarTodosHorarios();

        selectorNivelHorario.addEventListener(
            "change",
            function () {

                const nivel =
                    selectorNivelHorario.value;

                selectorCursoHorario.innerHTML =
                    "";

                if (!nivel) {

                    selectorCursoHorario.disabled =
                        true;

                    const opcion =
                        document.createElement(
                            "option"
                        );

                    opcion.value =
                        "";

                    opcion.textContent =
                        "Primero selecciona un nivel";

                    selectorCursoHorario.appendChild(
                        opcion
                    );

                    ocultarTodosHorarios();

                    if (estadoHorarioPremium) {
                        estadoHorarioPremium.textContent =
                            "Selecciona un nivel para comenzar.";
                    }

                    return;

                }

                selectorCursoHorario.disabled =
                    false;

                const inicial =
                    document.createElement(
                        "option"
                    );

                inicial.value =
                    "";

                inicial.textContent =
                    "Selecciona un curso";

                selectorCursoHorario.appendChild(
                    inicial
                );

                cursosPorNivel[nivel]
                    .forEach(
                        function (curso) {

                            const opcion =
                                document.createElement(
                                    "option"
                                );

                            opcion.value =
                                curso.nombre;

                            opcion.textContent =
                                curso.nombre;

                            selectorCursoHorario
                                .appendChild(
                                    opcion
                                );

                        }
                    );

                ocultarTodosHorarios();

                if (estadoHorarioPremium) {
                    estadoHorarioPremium.textContent =
                        "Ahora selecciona tu curso.";
                }

            }
        );


        selectorCursoHorario.addEventListener(
            "change",
            function () {

                const curso =
                    selectorCursoHorario.value;

                ocultarTodosHorarios();

                if (!curso) {

                    if (estadoHorarioPremium) {
                        estadoHorarioPremium.textContent =
                            "Selecciona un curso para ver su horario.";
                    }

                    return;

                }

                const tarjeta =
                    tarjetasHorario.find(
                        function (item) {
                            return (
                                item.dataset.nombreHorario ===
                                curso
                            );
                        }
                    );

                if (!tarjeta) {
                    return;
                }

                tarjeta.hidden =
                    false;

                tarjeta.classList.add(
                    "horario-seleccionado"
                );

                if (estadoHorarioPremium) {
                    estadoHorarioPremium.textContent =
                        "Mostrando el horario de " +
                        curso +
                        ".";
                }

                window.setTimeout(
                    function () {

                        tarjeta.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    },
                    80
                );

            }
        );

    }


    if (botonTodosHorarios) {

        botonTodosHorarios.addEventListener(
            "click",
            function () {

                mostrarTodosLosHorarios();

            }
        );

    }


    if (botonLimpiarHorario) {

        botonLimpiarHorario.addEventListener(
            "click",
            function () {

                if (selectorNivelHorario) {
                    selectorNivelHorario.value =
                        "";
                }

                if (selectorCursoHorario) {

                    selectorCursoHorario.innerHTML =
                        '<option value="">' +
                        'Primero selecciona un nivel' +
                        '</option>';

                    selectorCursoHorario.disabled =
                        true;

                }

                ocultarTodosHorarios();

                if (estadoHorarioPremium) {
                    estadoHorarioPremium.textContent =
                        "Selecciona un nivel para comenzar.";
                }

            }
        );

    }




    /* OPERATIVIDAD + ACCESIBILIDAD FINAL · OFFLINE 20260821-21 */
    if(typeof window.mejoraTexto!=="function"){window.mejoraTexto=function(el){if(!el)return "";return(el.textContent||"").replace(/\s+/g," ").trim();};}
    if(typeof window.mejoraNormalizar!=="function"){window.mejoraNormalizar=function(t){return String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();};}
    if(typeof window.anunciarAccesibilidad!=="function"){
        let viva=document.getElementById("regionVivaAccesibilidad");
        if(!viva){viva=document.createElement("div");viva.id="regionVivaAccesibilidad";viva.className="solo-lectores";viva.setAttribute("aria-live","polite");viva.setAttribute("aria-atomic","true");document.body.appendChild(viva);}
        window.anunciarAccesibilidad=function(m){viva.textContent="";setTimeout(function(){viva.textContent=m||"";},20);};
    }
    const volverArriba=document.getElementById("volverArriba");
    if(volverArriba){
        const actualizar=function(){volverArriba.hidden=window.scrollY<700;};
        window.addEventListener("scroll",actualizar,{passive:true});actualizar();
        volverArriba.addEventListener("click",function(){window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});});
    }
    document.addEventListener("keydown",function(e){
        if(e.key!=="Escape")return;
        const buscador=document.getElementById("buscadorGlobal");
        if(buscador&&!buscador.hidden){buscador.hidden=true;const abrir=document.getElementById("abrirBuscadorGlobal");if(abrir)abrir.focus();}
    });
    document.querySelectorAll('a[target="_blank"]').forEach(function(a){
        if(!a.getAttribute("aria-label")){const t=(a.textContent||"").replace(/\s+/g," ").trim();if(t)a.setAttribute("aria-label",t+" (abre en una pestaña nueva)");}
        const rel=new Set((a.getAttribute("rel")||"").split(/\s+/).filter(Boolean));rel.add("noopener");rel.add("noreferrer");a.setAttribute("rel",Array.from(rel).join(" "));
    });
    document.querySelectorAll(".horario-curso-card").forEach(function(t){t.setAttribute("tabindex","-1");});


    /* =====================================================
       OPERACIÓN PREMIUM + PERSONALIZACIÓN · OFFLINE 20260821-22
    ===================================================== */

    function mostrarToastSitio(mensaje){
        const toast=document.getElementById("toastSitio");
        if(!toast||!mensaje)return;
        toast.textContent=mensaje;toast.hidden=false;
        clearTimeout(window.__toastSitioTimer);
        window.__toastSitioTimer=setTimeout(function(){toast.hidden=true;},2400);
    }

    /* Enrutador de respaldo para que todos los accesos internos sigan funcionando. */
    function navegarSeguro(pagina,destino){
        if(!pagina)return;
        try{
            if(typeof mostrarPagina==="function"){
                mostrarPagina(pagina);
                if(typeof actualizarMigaPagina==="function")actualizarMigaPagina(pagina);
                if(typeof actualizarHashPagina==="function")actualizarHashPagina(pagina);
            }else{
                const seccion=document.getElementById(pagina);
                if(seccion){
                    document.querySelectorAll(".pagina").forEach(function(p){p.classList.remove("activa");});
                    seccion.classList.add("activa");
                }
            }
            window.setTimeout(function(){
                const objetivo=document.getElementById(destino||pagina);
                if(objetivo){
                    objetivo.scrollIntoView({
                        behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",
                        block:"start"
                    });
                    if(objetivo.matches("button,a,input,select,[tabindex]"))objetivo.focus({preventScroll:true});
                }
            },90);
        }catch(error){
            console.warn("Navegación segura:",error);
        }
    }

    /* Delegación para botones nuevos y antiguos; no elimina listeners existentes. */
    document.addEventListener("click",function(e){
        const b=e.target.closest("button");
        if(!b)return;

        if(b.dataset.pagina){
            navegarSeguro(b.dataset.pagina,b.dataset.destino||"");
            return;
        }
        if(b.dataset.irPagina){
            navegarSeguro(b.dataset.irPagina,b.dataset.destinoPagina||b.dataset.destinoComunidad||"");
            return;
        }
        if(b.dataset.irInicio){
            navegarSeguro("inicio",b.dataset.irInicio);
            return;
        }
    });

    /* Barra de progreso */
    const progreso=document.querySelector("#progresoLecturaSitio span");
    if(progreso){
        const actualizarProgreso=function(){
            const total=document.documentElement.scrollHeight-window.innerHeight;
            const porcentaje=total>0?Math.min(100,Math.max(0,(window.scrollY/total)*100)):0;
            progreso.style.width=porcentaje+"%";
        };
        window.addEventListener("scroll",actualizarProgreso,{passive:true});
        window.addEventListener("resize",actualizarProgreso,{passive:true});
        actualizarProgreso();
    }

    /* Mi acceso: preferencia guardada solo en este navegador */
    const perfilesAcceso={
        alumnos:{
            nombre:"Estudiante",
            accesos:[
                ["academica","academicaHorarios","Horarios","Consulta ingreso, salida y horario de clases"],
                ["academica","academicaInicio","Académica","Niveles, modalidades y especialidades"],
                ["documentos","","Documentos","Documentación disponible"],
                ["protocolos","","Protocolos","Protocolos institucionales"]
            ]
        },
        apoderados:{
            nombre:"Apoderado/a",
            accesos:[
                ["academica","academicaHorarios","Horarios","Consulta el horario de cada curso"],
                ["inicio","inicioMatricula","Matrícula","Postulación y admisión"],
                ["validacion","","Validación de Estudios","Información para validación"],
                ["comunicados","","Comunicados","Información oficial reciente"]
            ]
        },
        funcionarios:{
            nombre:"Funcionario/a",
            accesos:[
                ["documentos","","Documentos","Documentación institucional"],
                ["protocolos","","Protocolos","Protocolos vigentes"],
                ["seguridad","","Seguridad / PISE","Material preventivo y PISE"],
                ["gestion","","Equipo de Gestión","Información de gestión"]
            ]
        }
    };

    const selectorMiPerfil=document.getElementById("selectorMiPerfil");
    const contenidoMiPerfil=document.getElementById("contenidoMiPerfil");
    const cambiarMiPerfil=document.getElementById("cambiarMiPerfil");

    function obtenerPerfilGuardado(){
        try{return localStorage.getItem("perfilEscuelaLosLoros")||"";}catch(e){return "";}
    }
    function guardarPerfil(perfil){
        try{localStorage.setItem("perfilEscuelaLosLoros",perfil);}catch(e){}
    }
    function borrarPerfil(){
        try{localStorage.removeItem("perfilEscuelaLosLoros");}catch(e){}
    }
    function renderMiPerfil(perfil){
        const config=perfilesAcceso[perfil];
        if(!config||!selectorMiPerfil||!contenidoMiPerfil)return;
        selectorMiPerfil.hidden=true;contenidoMiPerfil.hidden=false;
        if(cambiarMiPerfil)cambiarMiPerfil.hidden=false;
        contenidoMiPerfil.innerHTML="";
        config.accesos.forEach(function(a){
            const b=document.createElement("button");b.type="button";
            const strong=document.createElement("strong");strong.textContent=a[2];
            const small=document.createElement("small");small.textContent=a[3];
            b.appendChild(strong);b.appendChild(small);
            b.addEventListener("click",function(){navegarSeguro(a[0],a[1]);});
            contenidoMiPerfil.appendChild(b);
        });
        const titulo=document.getElementById("tituloMiAcceso");
        if(titulo)titulo.textContent="Mi acceso · "+config.nombre;
    }

    document.querySelectorAll("[data-guardar-perfil]").forEach(function(b){
        b.addEventListener("click",function(){
            const p=b.dataset.guardarPerfil;guardarPerfil(p);renderMiPerfil(p);
            mostrarToastSitio("Perfil guardado en este dispositivo.");
        });
    });
    if(cambiarMiPerfil){
        cambiarMiPerfil.addEventListener("click",function(){
            borrarPerfil();
            if(selectorMiPerfil)selectorMiPerfil.hidden=false;
            if(contenidoMiPerfil){contenidoMiPerfil.hidden=true;contenidoMiPerfil.innerHTML="";}
            cambiarMiPerfil.hidden=true;
            const titulo=document.getElementById("tituloMiAcceso");if(titulo)titulo.textContent="Mi acceso";
        });
    }
    const perfilInicial=obtenerPerfilGuardado();
    if(perfilInicial)renderMiPerfil(perfilInicial);

    /* Navegación móvil inferior */
    document.querySelectorAll("[data-nav-movil]").forEach(function(b){
        b.addEventListener("click",function(){
            const accion=b.dataset.navMovil;
            if(accion==="inicio")navegarSeguro("inicio","");
            else if(accion==="buscar"){
                const x=document.getElementById("abrirBuscadorGlobal");if(x)x.click();
            }else if(accion==="comunidad")navegarSeguro("comunidad","comunidadInicio");
            else if(accion==="horarios")navegarSeguro("academica","academicaHorarios");
            else if(accion==="menu"){
                const m=document.getElementById("botonMenuMovil");if(m)m.click();
            }
        });
    });

    /* Estado activo de navegación móvil según sección visible */
    document.addEventListener("click",function(e){
        const paginaBtn=e.target.closest("[data-pagina],[data-ir-pagina],[data-premium-pagina]");
        if(!paginaBtn)return;
        const pagina=paginaBtn.dataset.pagina||paginaBtn.dataset.irPagina||paginaBtn.dataset.premiumPagina||"";
        document.querySelectorAll("[data-nav-movil]").forEach(function(b){
            const a=b.dataset.navMovil;
            b.classList.toggle("activo",
                (a==="inicio"&&pagina==="inicio")||
                (a==="comunidad"&&pagina==="comunidad")||
                (a==="horarios"&&pagina==="academica")
            );
        });
    });



    /* =====================================================
       POSICIÓN DINÁMICA DE LUPA + FLECHA NUEVA EN MÓVIL
    ===================================================== */

    function posicionarFlotantesNuevos() {

        if (
            !window.matchMedia(
                "(max-width: 768px)"
            ).matches
        ) {
            return;
        }

        const barra =
            document.getElementById(
                "navegacionMovilPremium"
            );

        const lupa =
            document.getElementById(
                "abrirBuscadorGlobal"
            );

        const flecha =
            document.getElementById(
                "volverArriba"
            );

        const altoBarra =
            barra
                ? Math.ceil(
                    barra.getBoundingClientRect()
                        .height
                )
                : 72;

        const base =
            altoBarra + 22;

        if (lupa) {

            lupa.style.setProperty(
                "bottom",
                base + "px",
                "important"
            );

        }

        if (flecha) {

            flecha.style.setProperty(
                "bottom",
                (base + 62) + "px",
                "important"
            );

        }

    }


    window.addEventListener(
        "load",
        posicionarFlotantesNuevos
    );

    window.addEventListener(
        "resize",
        posicionarFlotantesNuevos,
        {
            passive: true
        }
    );

    window.addEventListener(
        "orientationchange",
        function () {

            window.setTimeout(
                posicionarFlotantesNuevos,
                150
            );

        }
    );


    posicionarFlotantesNuevos();




    /* =====================================================
       PERSONAS QUE DEJARON HUELLA + BANDA ESCOLAR
    ===================================================== */

    document.querySelectorAll(
        ".persona-historia-boton"
    ).forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const idPanel =
                    boton.getAttribute(
                        "aria-controls"
                    );

                const panel =
                    idPanel
                        ? document.getElementById(
                            idPanel
                        )
                        : null;

                if (!panel) {
                    return;
                }

                const abierto =
                    boton.getAttribute(
                        "aria-expanded"
                    ) === "true";

                boton.setAttribute(
                    "aria-expanded",
                    abierto
                        ? "false"
                        : "true"
                );

                panel.hidden =
                    abierto;

                boton.textContent =
                    abierto
                        ? "Conocer su historia"
                        : "Cerrar historia";

            }
        );

    });


});
