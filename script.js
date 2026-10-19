
const navegacion = document.getElementById("navegacion-obras");
const detalle = document.getElementById("detalle-obra");

let obras = [];

// 1. CARGAR LOS DATOS DESDE JSON

async function cargarObras() {
    try {
        const respuesta = await fetch("obras.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el JSON");
        }

        obras = await respuesta.json();

        crearNavegacion();

        if (obras.length > 0) {
            mostrarObra(obras[0].id);
        }

    } catch (error) {
        console.error("Error:", error);
        detalle.textContent = "No se pudieron cargar las obras.";
    }
}

// 2. CREAR LOS BOTONES DE NAVEGACIÓN

function crearNavegacion() {
    navegacion.innerHTML = "";

    obras.forEach((obra) => {
        const boton = document.createElement("button");

        boton.classList.add("boton-obra");
        boton.textContent = obra.titulo;
        boton.type = "button";
        boton.dataset.id = obra.id;

        boton.addEventListener("click", () => {
            mostrarObra(obra.id);
        });

        navegacion.appendChild(boton);
    });
}

// 3. MOSTRAR LA OBRA SELECCIONADA

function mostrarObra(id) {
    const obra = obras.find((item) => item.id === id);

    if (!obra) return;

    // Actualizar botones activos
    const botones = document.querySelectorAll(".boton-obra");

    botones.forEach((boton) => {
        const activo = Number(boton.dataset.id) === id;
        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
    });

    // Actualizar información
    detalle.innerHTML = `
        <img
            src="${obra.imagen}"
            alt="Portada de ${obra.titulo}"
            class="portada-obra"
        >

        <div class="informacion-obra">
            <p class="anio-obra">
                ${obra.anio} / ${obra.genero}
            </p>

            <h2 class="titulo-obra">
                ${obra.titulo}
            </h2>

            <p class="sinopsis-obra">
                ${obra.sinopsis}
            </p>
        </div>
    `;
}

// 4. INICIAR LA PÁGINA

cargarObras();
