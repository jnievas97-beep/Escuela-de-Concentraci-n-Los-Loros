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

    const botonesMenu = document.querySelectorAll(".boton-menu");

    const paginas = document.querySelectorAll(".pagina");


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
       EVENTOS DE LOS BOTONES
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
       CONTROL DE ENLACES SIN DESTINO
    ===================================================== */

    const enlacesPendientes =
        document.querySelectorAll(
            'a[href="#"]'
        );


    enlacesPendientes.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            evento.preventDefault();

            console.log(
                "Este documento o enlace todavía está pendiente."
            );

        });

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
       FINALIZACIÓN
    ===================================================== */

    console.log(
        "Sistema de navegación iniciado correctamente."
    );

});