var btnNuevaPalabra = document.getElementById("btn-nueva_palabra");
eventoTecla = document.addEventListener("keydown", letraEscritas);
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var popupContainer = document.getElementById("popup-container");
var btnPopup = document.getElementById("btn-popup");
var btnMeRindo = document.getElementById("btn-me_rindo");

/* Local storage */
palabrasSecretas = ["MEXICO", "ARGENTINA", "BOLIVIA", "CHILE", "COLOMBIA", "PERU", "CANADA", "FRANCIA", "RUSIA"];
localStorage.setItem("palabrasSecretas", JSON.stringify(palabrasSecretas)); 
palabrasSecretasAlmacenadas = JSON.parse(localStorage.getItem("palabrasSecretas"));



/* variables globales */
tamanhoArreglo = palabrasSecretasAlmacenadas.length - 1;
numeroAleatorio = Math.round(Math.random()*tamanhoArreglo);
contador = 0;
contadorHorca = 0;
puntos = 0;
letraDibujada = [];

/* Acciones de botones */
btnNuevaPalabra.onclick = recargarPagina;
btnMeRindo.onclick = meRindo;





/* Deja pasar solo letras */
function letraEscritas(evento){
    /* console.log("letra escrita"); */
    var letraEscrita = evento.key;
    if (evento.keyCode >= 65 && evento.keyCode <= 90){
        
        if(letraDibujada.includes(letraEscrita.toUpperCase())){
            alert("Letra repetida");
        }else{
            palabraCorrecta(letraEscrita.toUpperCase());
            letraDibujada.push(letraEscrita.toUpperCase());
        }
        
    }else{
        alert("Solo letras");
    }
    
}

/* Recargo la pagina para seleccionar una nueva palabra*/
function recargarPagina(){
    location.reload();      
}

/* Dibuja los guiones para el ahorcado */
function dibujarGuion(){
    
    /* var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d"); */
    var numeroDeLetras = palabrasSecretasAlmacenadas[numeroAleatorio].length + 1;
    
    for (var i = 1; i < numeroDeLetras; i++){
        
        var x = 50 * i;
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(x, 400); /* pocisionar el pincel (x,y)*/
        pincel.lineTo((x+40), 400); /* dibujar la linea */
        pincel.stroke();
    }

} 
dibujarGuion();

/* Funcion para dibujar letra */
function dibujarLetra(l, x){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "#000000";
    pincel.font = "30px arial";
    pincel.fillText(l, x, 395);
}

/* Funcion para dibujar letra */
function dibujarLetraEquivocada(l, x){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "#000000";
    pincel.font = "20px arial";
    pincel.fillText(l, x, 500);
}

/* Funcion para dibujar la letra correcta */
function palabraCorrecta(l){
    var palabraSeleccionada = palabrasSecretasAlmacenadas[numeroAleatorio];
    /* console.log("dibujando letra") */
    var esLetra = false;
    
    for (var i = 0; i<palabraSeleccionada.length; i++){
        if(l === palabraSeleccionada[i]){
            var esLetra = true;
            if (i === 0){
                dibujarLetra(palabraSeleccionada[i], 65);
                puntos = puntos + 1;            
            } 
            if (i === 1){
                dibujarLetra(palabraSeleccionada[i], 110);
                puntos = puntos + 1;    
            } 
            if (i === 2){
                dibujarLetra(palabraSeleccionada[i], 160);
                puntos = puntos + 1;    
            } 
            if (i === 3){
                dibujarLetra(palabraSeleccionada[i], 210);
                puntos = puntos + 1;    
            } 
            if (i === 4){
                dibujarLetra(palabraSeleccionada[i], 260);
                puntos = puntos + 1;    
            } 
            if (i === 5){
                dibujarLetra(palabraSeleccionada[i], 310);
                puntos = puntos + 1;    
            } 
        }
    }
     
    if (esLetra == false){
        /* console.log("letra incorrecta"); */
        palabraIncorrecta(l);
    }
    if(puntos === palabraSeleccionada.length){
        alert("Eres un ganador");
    }

}

/* Funcion para dibujar la palabra incorrecta */
function palabraIncorrecta(l){
    
    contador = contador + 20;
    /* console.log(contador); */
    dibujarLetraEquivocada(l, contador);
    dibujarHorca();
}

/* Funcion que dibuja la horca cada vez que no acertan una letra */
function dibujarHorca(){
    /* console.log("dibujarHorca"); */
    contadorHorca = contadorHorca + 1;
    /* console.log(contadorHorca); */
/* Horca */
    if (contadorHorca === 1){
        /* console.log("Entrando para dibujar horca"); */
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(30, 350); /* pocisionar el pincel */
        pincel.lineTo(300, 350); /* dibujar la linea */
        pincel.moveTo(50, 350); /* pocisionar el pincel */
        pincel.lineTo(50, 50); /* dibujar la linea */
        pincel.lineTo(150, 50); /* dibujar la linea */
        pincel.lineTo(150, 80); /* dibujar la linea */
        pincel.stroke();
    }
/* Cabeza */
    if(contadorHorca === 2){
        pincel.fillStyle = "#000000";
        pincel.beginPath(); /* comenzar camino */
        pincel.arc(150,110,30,0,2*3.14);
        pincel.fill();
    }
/* Tronco */
    if(contadorHorca === 3){
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(150, 110);
        pincel.lineTo(150,230);
        pincel.stroke();
    }
/* Pierna izquierda */
    if(contadorHorca === 4){
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(150, 230);
        pincel.lineTo(120, 290);
        pincel.stroke();
    }
/* Pierna derecha */
    if(contadorHorca === 5){
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(150, 230);
        pincel.lineTo(170, 290);
        pincel.stroke();
    }
/* Brazo izquierdo */
    if(contadorHorca === 6){
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(150, 140);
        pincel.lineTo(120, 190);
        pincel.stroke();
    }
/* Brazo derecho */
    if(contadorHorca === 7){
        pincel.strokeStyle = "#000000";
        pincel.lineWidth = 2;
        pincel.beginPath(); /* comenzar camino */
        pincel.moveTo(150, 140);
        pincel.lineTo(175, 190);
        pincel.stroke();

        alert("Acabas de perder, intentalo de nuevo");
    }
}

function meRindo(){
    alert("Los verdaderos perdedores son los que se rinden. ¡Intentalo de nuevo!");
    recargarPagina();
}