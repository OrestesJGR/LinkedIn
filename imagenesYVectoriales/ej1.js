document.addEventListener("DOMContentLoaded", recargaImagenes)

const tablaImagenes = document.getElementById("tablaImagenes");
const selFilas = document.getElementById("selFilas");

function recargaImagenes() {
    tablaImagenes.innerHTML = "";
    const numRows = parseInt(selFilas.value);

    for (let i = 1; i <= numRows; i++) {
        const imgId = Math.floor(Math.random() * 1000);
        const row = document.createElement("tr");
        const imgCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = `https://picsum.photos/50/50?random=${imgId}&${Date.now()}`;
        img.alt = `Imagen ${imgId}`;
        img.className = "rounded-circle";
        img.loading = "lazy"; 
        img.width = 50; 
        img.height = 50;
        imgCell.appendChild(img);

        const idCell = document.createElement("td");
        idCell.textContent = `#${i}`;

        const descCell = document.createElement("td");
        descCell.textContent = `Descripción del elemento ${i}`;

        row.appendChild(imgCell);
        row.appendChild(idCell);
        row.appendChild(descCell);

        tablaImagenes.appendChild(row);
    }
}