var btnAgregar = document.getElementById("btn-nueva-palabra");
var palabraNueva = document.getElementById("nueva-palabra");



btnAgregar.onclick = agregar;


function agregar(){
    palabrasSecretas = ["MEXICO", "BELICE", "SUECIA", "GRECIA", "CHIPRE", "KOSOVO", "SERBIA", "MONACO", "RUSIA",];
    palabrasSecretas[palabrasSecretas.length] = palabraNueva.value.toUpperCase();
    localStorage.setItem("palabrasSecretas", JSON.stringify(palabrasSecretas));
    palabrasSecretasAlmacenadas = JSON.parse(localStorage.getItem("palabrasSecretas"));
    console.log(palabrasSecretas);
}

