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
            "#inicioEspecialidades, #inicioNoticias, #inicioCuentaPublica, #inicioMatricula"
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
                "botonUltimoComunicado"
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
       MOSTRAR ÚLTIMO COMUNICADO
    ===================================================== */

    function mostrarUltimoComunicado(
        comunicado
    ) {

        if (!textoUltimoComunicado) {

            return;

        }


        if (tituloUltimoComunicado) {

            tituloUltimoComunicado.textContent =
                "Comunicado N.º " +
                comunicado.numero;

        }


        textoUltimoComunicado.textContent =
            "Se encuentra disponible el Comunicado N.º " +
            comunicado.numero +
            " del establecimiento.";


        if (botonUltimoComunicado) {

            botonUltimoComunicado.href =
                comunicado.ruta;


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


        console.log(
            "Último comunicado:",
            comunicado.nombre
        );


        console.log(
            "Ruta:",
            comunicado.ruta
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
                    titulo
                );


                encabezado.appendChild(
                    etiqueta
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

});
