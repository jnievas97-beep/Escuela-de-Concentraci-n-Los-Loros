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

    if (
        botonInstalarUniversal &&
        !esDispositivoMovilOTablet
    ) {
        botonInstalarUniversal.hidden = true;
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
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    const btnArriba =
        document.getElementById("btnArriba");


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
       CONTROL DEL BOTÓN VOLVER ARRIBA
    ===================================================== */

    function controlarBotonArriba() {

        if (!btnArriba) {

            return;

        }


        if (
            window.scrollY > 300
        ) {

            btnArriba.classList.add(
                "visible"
            );

        } else {

            btnArriba.classList.remove(
                "visible"
            );

        }

    }


    /* =====================================================
       CONTROL DEL SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        controlarBotonArriba,
        {
            passive:
                true
        }
    );


    /* =====================================================
       EVENTO BOTÓN VOLVER ARRIBA
    ===================================================== */

    if (btnArriba) {

        btnArriba.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    /* =====================================================
       COMPROBAR ESTADO INICIAL
    ===================================================== */

    controlarBotonArriba();


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


                botonAvisoImportante.textContent =
                    aviso.tipo === "pdf"
                        ? "📄 Ver aviso completo"
                        : "🔎 Abrir imagen del aviso";

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


            mostrarAvisoImportante(
                avisos[0]
            );


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
    document.querySelectorAll("img").forEach(function(imagen){imagen.addEventListener("error",function(){if(imagen.dataset.errorTratado==="1")return;imagen.dataset.errorTratado="1";imagen.classList.add("imagen-no-disponible");const padre=imagen.parentElement;if(padre&&!padre.querySelector(".mensaje-imagen-no-disponible")){padre.classList.add("contenedor-imagen-no-disponible");const mensaje=document.createElement("span");mensaje.className="mensaje-imagen-no-disponible";mensaje.setAttribute("role","status");mensaje.textContent="🖼️ Imagen temporalmente no disponible";padre.appendChild(mensaje);}});if(imagen.complete&&imagen.naturalWidth===0)imagen.dispatchEvent(new Event("error"));});

});
