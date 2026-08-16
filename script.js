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

        /* Ocultar todas las páginas */

        paginas.forEach(function (pagina) {

            pagina.classList.remove("activa");

        });


        /* Quitar estado activo de todos los botones */

        botonesMenu.forEach(function (boton) {

            boton.classList.remove("activo");

        });


        /* Buscar la página correspondiente */

        const paginaSeleccionada =
            document.getElementById(nombrePagina);


        /* Mostrar la página */

        if (paginaSeleccionada) {

            paginaSeleccionada.classList.add("activa");

        } else {

            console.warn(
                "No se encontró la página:",
                nombrePagina
            );

            return;

        }


        /* Marcar el botón correspondiente */

        const botonSeleccionado =
            document.querySelector(
                '.boton-menu[data-pagina="' +
                nombrePagina +
                '"]'
            );


        if (botonSeleccionado) {

            botonSeleccionado.classList.add("activo");

        }


        /* Volver al comienzo */

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
       BOTÓN VOLVER ARRIBA
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
       COMPROBAR ESTADO INICIAL DEL BOTÓN
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
       
       Se busca automáticamente cualquier enlace cuyo
       destino contenga "instagram".

       No necesita Font Awesome ni ninguna biblioteca externa.
    ===================================================== */

    const enlacesInstagram =
        document.querySelectorAll(
            '.redes-sociales a[href*="instagram"]'
        );


    enlacesInstagram.forEach(function (enlaceInstagram) {

        /* Identificar el enlace como Instagram */

        enlaceInstagram.classList.add("instagram");


        /* Crear SVG */

        enlaceInstagram.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
            >

                <!-- Contorno exterior de la cámara -->

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

                <!-- Lente central -->

                <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                />

                <!-- Punto superior derecho -->

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

});
