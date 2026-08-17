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
