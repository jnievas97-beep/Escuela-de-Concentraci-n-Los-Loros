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

        }


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


    /* =====================================================
       VOLVER A INICIO DESDE MIGA DE PAN
    ===================================================== */

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


    /* =====================================================
       BOTONES ATRÁS / ADELANTE DEL NAVEGADOR
    ===================================================== */

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

                /*
                 * Si llega un hash que no corresponde
                 * a una página del menú, por ejemplo:
                 *
                 * #contenidoPrincipal
                 *
                 * volvemos de forma segura a Inicio.
                 */

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


    /* =====================================================
       DESTINOS DE NAVEGACIÓN INTERNA
    ===================================================== */

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

                        behavior: "smooth",

                        block: "start"

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

        /*
         * Aquí también protegemos hashes que no
         * corresponden a páginas, por ejemplo:
         *
         * #contenidoPrincipal
         */

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
            passive: true
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

                    top: 0,

                    behavior: "smooth"

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

            /*
             * El botón del último comunicado
             * utiliza href="#" inicialmente.
             *
             * No debemos bloquearlo.
             */

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

       CARPETA:
       comunicados/

       NOMBRES ESPERADOS:

       COMUNICADO 01.pdf
       COMUNICADO 02.pdf
       COMUNICADO 03.pdf
       ...
       COMUNICADO 48.pdf

       IMPORTANTE:
       "COMUNICADO" VA EN SINGULAR.
    ===================================================== */

    const MAX_COMUNICADOS =
        48;


    const CARPETA_COMUNICADOS =
        "comunicados/";


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
       GENERAR NOMBRE DEL COMUNICADO

       CORRECCIÓN:
       antes estaba "COMUNICADOS".
       ahora queda "COMUNICADO".
    ===================================================== */

    function obtenerNombreComunicado(
        numero
    ) {

        return (
            "COMUNICADO " +
            String(numero).padStart(
                2,
                "0"
            ) +
            ".pdf"
        );

    }


    /* =====================================================
       GENERAR RUTA DEL COMUNICADO
    ===================================================== */

    function obtenerRutaComunicado(
        numero
    ) {

        const nombreArchivo =
            obtenerNombreComunicado(
                numero
            );


        return (
            CARPETA_COMUNICADOS +
            encodeURIComponent(
                nombreArchivo
            )
        );

    }


    /* =====================================================
       COMPROBAR SI EXISTE EL PDF
    ===================================================== */

    async function comprobarComunicado(
        numero
    ) {

        const nombreArchivo =
            obtenerNombreComunicado(
                numero
            );


        const ruta =
            obtenerRutaComunicado(
                numero
            );


        try {

            const respuesta =
                await fetch(
                    ruta,
                    {
                        method: "HEAD",
                        cache: "no-store"
                    }
                );


            if (respuesta.ok) {

                return {

                    numero:
                        numero,

                    nombre:
                        nombreArchivo,

                    ruta:
                        ruta

                };

            }

        } catch (error) {

            /*
             * Es normal que algunos números
             * no tengan un archivo publicado.
             */

        }


        return null;

    }


    /* =====================================================
       CARGAR COMUNICADOS DISPONIBLES
    ===================================================== */

    async function cargarComunicados() {

        if (!listaComunicados) {

            console.warn(
                "No se encontró #listaComunicados."
            );

            return;

        }


        console.log(
            "================================="
        );

        console.log(
            "BUSCANDO COMUNICADOS"
        );

        console.log(
            "Carpeta:",
            CARPETA_COMUNICADOS
        );

        console.log(
            "Máximo:",
            MAX_COMUNICADOS
        );

        console.log(
            "================================="
        );


        const promesas =
            [];


        for (
            let numero = 1;
            numero <= MAX_COMUNICADOS;
            numero++
        ) {

            promesas.push(
                comprobarComunicado(
                    numero
                )
            );

        }


        const respuestas =
            await Promise.all(
                promesas
            );


        const resultados =
            respuestas.filter(
                function (resultado) {

                    return Boolean(
                        resultado
                    );

                }
            );


        resultados.sort(
            function (a, b) {

                return (
                    b.numero -
                    a.numero
                );

            }
        );


        console.log(
            "COMUNICADOS ENCONTRADOS:",
            resultados.length
        );


        if (
            resultados.length === 0
        ) {

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
                    "boton-documento";


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
        "Botón volver arriba iniciado correctamente."
    );


    console.log(
        "Icono de Instagram iniciado correctamente."
    );


    console.log(
        "Sistema automático de comunicados iniciado."
    );

});
