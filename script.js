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

            }

        });

    });


    /* =====================================================
       PÁGINA INICIAL
    ===================================================== */

    mostrarPagina("inicio");


    /* =====================================================
       CONTROL DEL BOTÓN VOLVER ARRIBA
    ===================================================== */

    function controlarBotonArriba() {

        if (!btnArriba) {

            return;

        }


        if (window.scrollY > 300) {

            btnArriba.classList.add("visible");

        } else {

            btnArriba.classList.remove("visible");

        }

    }


    /* =====================================================
       CONTROL DEL SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        controlarBotonArriba,
        { passive: true }
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


    enlacesPendientes.forEach(function (enlace) {

        /*
         * El botón del último comunicado
         * utiliza href="#" inicialmente.
         *
         * NO debemos bloquearlo.
         */

        if (
            enlace.id === "botonUltimoComunicado"
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

    });


    /* =====================================================
       COMPROBACIÓN DE IMÁGENES
    ===================================================== */

    const imagenes =
        document.querySelectorAll("img");


    imagenes.forEach(function (imagen) {

        imagen.addEventListener(
            "error",
            function () {

                console.warn(
                    "No se pudo cargar la imagen:",
                    imagen.getAttribute("src")
                );

            }
        );

    });


    /* =====================================================
       ICONO REALISTA DE INSTAGRAM
    ===================================================== */

    const enlacesInstagram =
        document.querySelectorAll(
            '.redes-sociales a[href*="instagram"]'
        );


    enlacesInstagram.forEach(function (enlaceInstagram) {

        enlaceInstagram.classList.add("instagram");


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

    });


    /* =====================================================
       SISTEMA AUTOMÁTICO DE COMUNICADOS
       
       PREPARADO PARA GITHUB PAGES
       
       CARPETA:
       
       comunicados/
       
       ARCHIVOS:
       
       COMUNICADOS 01.pdf
       COMUNICADOS 02.pdf
       COMUNICADOS 03.pdf
       ...
       COMUNICADOS 48.pdf
       ...
       COMUNICADOS 200.pdf
    ===================================================== */


    const MAX_COMUNICADOS = 48;


    /* =====================================================
       CARPETA
    ===================================================== */

    const CARPETA_COMUNICADOS =
        "comunicados/";


    /* =====================================================
       ELEMENTOS DEL INDEX.HTML
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


    /* =====================================================
       GENERAR NOMBRE DEL ARCHIVO
    ===================================================== */

    function obtenerNombreComunicado(numero) {

        return (
            "COMUNICADOS " +
            String(numero).padStart(2, "0") +
            ".pdf"
        );

    }


    /* =====================================================
       GENERAR RUTA DEL ARCHIVO
       
       IMPORTANTE:
       encodeURIComponent mantiene correctamente
       el espacio del nombre del archivo.
    ===================================================== */

    function obtenerRutaComunicado(numero) {

        const nombreArchivo =
            obtenerNombreComunicado(numero);


        return (
            CARPETA_COMUNICADOS +
            encodeURIComponent(nombreArchivo)
        );

    }


    /* =====================================================
       COMPROBAR SI EXISTE UN COMUNICADO
       
       EN GITHUB PAGES:
       
       Se utiliza HEAD para comprobar solamente
       si el archivo existe sin descargar el PDF.
    ===================================================== */

    async function comprobarComunicado(numero) {

        const nombreArchivo =
            obtenerNombreComunicado(numero);


        const ruta =
            obtenerRutaComunicado(numero);


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

                    numero: numero,

                    nombre: nombreArchivo,

                    ruta: ruta

                };

            }


        } catch (error) {

            /*
             * No mostramos cada error individual.
             *
             * Es normal que no existan todos los números.
             */

        }


        return null;

    }


    /* =====================================================
       BUSCAR TODOS LOS COMUNICADOS
    ===================================================== */

    async function cargarComunicados() {

        if (!listaComunicados) {

            console.warn(
                "No se encontró el elemento #listaComunicados."
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


        const resultados = [];


        /* =================================================
           CREAR COMPROBACIONES
        ================================================== */

        const promesas = [];


        for (
            let numero = 1;
            numero <= MAX_COMUNICADOS;
            numero++
        ) {

            promesas.push(
                comprobarComunicado(numero)
            );

        }


        /* =================================================
           ESPERAR TODAS LAS COMPROBACIONES
        ================================================== */

        const respuestas =
            await Promise.all(
                promesas
            );


        /* =================================================
           GUARDAR SOLO LOS EXISTENTES
        ================================================== */

        respuestas.forEach(
            function (resultado) {

                if (resultado) {

                    resultados.push(
                        resultado
                    );

                }

            }
        );


        /* =================================================
           ORDENAR
           
           MAYOR → MENOR
           
           Por ejemplo:
           
           48
           47
           46
           ...
           01
        ================================================== */

        resultados.sort(
            function (a, b) {

                return b.numero - a.numero;

            }
        );


        console.log(
            "================================="
        );

        console.log(
            "COMUNICADOS ENCONTRADOS:",
            resultados.length
        );

        console.log(
            resultados
        );

        console.log(
            "================================="
        );


        /* =================================================
           SI NO HAY NINGUNO
        ================================================== */

        if (
            resultados.length === 0
        ) {

            mostrarSinComunicados();

            return;

        }


        /* =================================================
           MOSTRAR EL MÁS RECIENTE
        ================================================= */

        const ultimo =
            resultados[0];


        mostrarUltimoComunicado(
            ultimo
        );


        /* =================================================
           MOSTRAR LISTA
        ================================================= */

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


        /* =================================================
           TÍTULO
        ================================================== */

        if (tituloUltimoComunicado) {

            tituloUltimoComunicado.textContent =
                "Comunicado N.º " +
                comunicado.numero;

        }


        /* =================================================
           DESCRIPCIÓN
        ================================================== */

        textoUltimoComunicado.textContent =
            "Se encuentra disponible el Comunicado N.º " +
            comunicado.numero +
            " del establecimiento.";


        /* =================================================
           BOTÓN
        ================================================== */

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
    ===================================================== */

    function mostrarComunicadosAnteriores(
        comunicados
    ) {

        /* =================================================
           ELIMINAR MENSAJE INICIAL
        ================================================== */

        if (mensajeComunicados) {

            mensajeComunicados.remove();

        }


        /* =================================================
           ELIMINAR TARJETAS ANTERIORES
        ================================================== */

        const tarjetasExistentes =
            listaComunicados.querySelectorAll(
                ".comunicado"
            );


        tarjetasExistentes.forEach(
            function (tarjeta) {

                tarjeta.remove();

            }
        );


        /* =================================================
           CREAR TARJETAS
        ================================================== */

        comunicados.forEach(
            function (comunicado) {

                const tarjeta =
                    document.createElement(
                        "div"
                    );


                tarjeta.className =
                    "documento comunicado";


                /* =========================================
                   TÍTULO
                ========================================== */

                const titulo =
                    document.createElement(
                        "h3"
                    );


                titulo.textContent =
                    "Comunicado N.º " +
                    comunicado.numero;


                /* =========================================
                   ENLACE
                ========================================== */

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


                /* =========================================
                   AGREGAR TÍTULO
                ========================================== */

                tarjeta.appendChild(
                    titulo
                );


                /* =========================================
                   AGREGAR BOTÓN
                ========================================== */

                tarjeta.appendChild(
                    enlace
                );


                /* =========================================
                   AGREGAR TARJETA
                ========================================== */

                listaComunicados.appendChild(
                    tarjeta
                );

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


        /* =================================================
           TÍTULO
        ================================================== */

        if (tituloUltimoComunicado) {

            tituloUltimoComunicado.textContent =
                "Aún no hay comunicados publicados";

        }


        /* =================================================
           TEXTO
        ================================================== */

        if (textoUltimoComunicado) {

            textoUltimoComunicado.textContent =
                "Cuando se publique un nuevo comunicado, aparecerá automáticamente en esta sección.";

        }


        /* =================================================
           BOTÓN
        ================================================== */

        if (botonUltimoComunicado) {

            botonUltimoComunicado.style.display =
                "none";

        }


        /* =================================================
           MENSAJE
        ================================================== */

        if (mensajeComunicados) {

            mensajeComunicados.innerHTML = `
                <p>
                    Actualmente no hay comunicados publicados.
                </p>
            `;

        }

    }


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
        "Botón volver arriba iniciado correctamente."
    );

    console.log(
        "Icono de Instagram iniciado correctamente."
    );

    console.log(
        "Sistema automático de comunicados iniciado."
    );

});
