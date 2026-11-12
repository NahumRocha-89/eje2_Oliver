const inputLote = document.getElementById("loteInput");
const inputTemp = document.getElementById("tempInput");
const btn = document.getElementById("agregarBtn");
const gridLecturas = document.getElementById("gridLecturas");

// 1. Clase LecturaBiologica (lote, temperatura, estado)
class LecturaBiologica {
    constructor(lote, temperatura) {
        this.lote = lote;
        this.temperatura = parseFloat(temperatura);
        // 2. Lógica de control: Si es < 2 o > 8 -> COMPROMETIDO, si no -> ÓPTIMO
        this.estado = (this.temperatura < 2 || this.temperatura > 8) ? "COMPROMETIDO" : "ÓPTIMO";
    }
}

// Cargar lecturas al iniciar
document.addEventListener("DOMContentLoaded", () => {
    cargarLecturas();
});

// Agregar nuevas lecturas
btn.addEventListener("click", agregarLectura);

// Función para agregar lectura
function agregarLectura() {
    const lote = inputLote.value.trim();
    const temperatura = inputTemp.value.trim();

    if (lote === "" || temperatura === "") {
        return alert("Por favor ingrese el lote y la temperatura");
    }

    // Instanciar la clase
    const nuevaLectura = new LecturaBiologica(lote, temperatura);

    const lecturas = obtenerLecturas();
    lecturas.push(nuevaLectura);
    
    // 3. Uso de LocalStorage con JSON.stringify
    localStorage.setItem("lecturas", JSON.stringify(lecturas));
    
    mostrarLecturas();
    
    inputLote.value = "";
    inputTemp.value = "";
    inputLote.focus();
}

function obtenerLecturas() {
    // 3. Uso de LocalStorage con JSON.parse
    return JSON.parse(localStorage.getItem("lecturas")) || [];
}

function mostrarLecturas() {
    const lecturas = obtenerLecturas();
    gridLecturas.innerHTML = "";

    lecturas.forEach((lectura) => {
        const col = document.createElement("div");
        col.className = "col-md-6 mb-3";

        // Aplicar clase CSS roja o verde según el estado
        const claseBorde = lectura.estado === "COMPROMETIDO" ? "border-danger" : "border-success";
        const claseBadge = lectura.estado === "COMPROMETIDO" ? "bg-danger" : "bg-success";
        const claseTexto = lectura.estado === "COMPROMETIDO" ? "text-danger" : "text-success";

        col.innerHTML = `
            <div class="card shadow-sm border-2 ${claseBorde}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="card-title mb-0">Lote: ${lectura.lote}</h5>
                        <span class="badge ${claseBadge}">${lectura.estado}</span>
                    </div>
                    <p class="card-text fs-4 fw-bold ${claseTexto} mb-1">
                        ${lectura.temperatura.toFixed(1)} °C
                    </p>
                </div>
            </div>
        `;

        gridLecturas.appendChild(col);
    });
}

function cargarLecturas() {
    mostrarLecturas();
}