const largoResultado = document.querySelector("#largo-resultado")
const inputLargo = document.querySelector("#input-largo");
const inputsCheckbox = document.querySelectorAll("input[type=checkbox]");

const contraseñaResultadoContainer = document.querySelector("#contraseña-resultado-container");
contraseñaResultadoContainer.addEventListener("click", copiarAlPortapapeles);

const contraseñaResultado = document.querySelector("#contraseña-resultado");

datosEntrada = {
    largo: 15,
    mayusculas: true,
    minusculas: true,
    numeros: true,
    simbolos: true
}

inputLargo.addEventListener("input", mostrarValueLargo);
inputLargo.addEventListener("input", leerValueLargo);
inputsCheckbox.forEach(checkbox => {
    checkbox.addEventListener("input", leerValueCheckbox);
})

function mostrarValueLargo() {
    largoResultado.textContent = Math.trunc(inputLargo.value);
}

function leerValueLargo(e) {
    datosEntrada[e.target.name] = Number(e.target.value);
    actualizarBarras();
}

function leerValueCheckbox(e) {
    if(e.target.checked) {
        datosEntrada[e.target.name] = true;
    } else {
        datosEntrada[e.target.name] = false;
    }
}


const fuerzaNombre = document.querySelector("#fuerza-nombre");
const barrasSpan = document.querySelectorAll("#barras-container span");
actualizarBarras();
function actualizarBarras() {
    barrasSpan.forEach(barra => {
        barra.classList.add("barra-vacia");
        barra.classList.remove("verde");
        barra.classList.remove("amarillo");
        barra.classList.remove("rojo");
    });
    for(i = 0;i < Math.ceil(datosEntrada.largo / 5); i++) {

        if(datosEntrada.largo < 6) {
            fuerzaNombre.textContent = "BAJA";
            barrasSpan[i].classList.remove("barra-vacia");
            barrasSpan[i].classList.add("rojo");
        } else if(datosEntrada.largo < 16) {
            fuerzaNombre.textContent = "MEDIA";
            barrasSpan[i].classList.remove("barra-vacia");
            barrasSpan[i].classList.add("amarillo");
        } else if(datosEntrada.largo < 21) {
            fuerzaNombre.textContent = "ALTA";
            barrasSpan[i].classList.remove("barra-vacia");
            barrasSpan[i].classList.add("verde");
        }
    };
}

const simbolos = `"¡!#$%&/<>@|()='¿?{}[]+-*,.-_`;
const numeros = "1234567890";
const letras = "abcdefghijklmnñopqrstuvwxyz";

let caracteres = [];

const btnGenerar = document.querySelector("#btn-generar");
btnGenerar.addEventListener("click", generarContraseña);

function generarContraseña(e) {
    e.preventDefault();
    if(validarCheckbox()) {
        let contraseña = "";
        for(i = 0; i < datosEntrada.largo; i++) {
            const stringCaracteres = caracteres[generarNumeroAleatorio(0, caracteres.length)];
            let caracterActual = stringCaracteres[generarNumeroAleatorio(0, stringCaracteres.length)];
            if(letras.includes(caracterActual)) {
                if(datosEntrada.mayusculas && datosEntrada.minusculas) {
                    if(generarNumeroAleatorio(1, 3) === 1) {
                        contraseña += caracterActual;
                    } else {
                        contraseña += caracterActual.toUpperCase();
                    }
                } else if (datosEntrada.mayusculas && !datosEntrada.minusculas) {
                    contraseña += caracterActual.toUpperCase();
                } else if (!datosEntrada.mayusculas && datosEntrada.minusculas) {
                    contraseña += caracterActual;
                }
            } else {
                contraseña += caracterActual;
            }
        }
        contraseñaResultado.style.color = "var(--fuente-resaltado)";
        contraseñaResultado.textContent = contraseña;
    }
}

function generarNumeroAleatorio(min, max) {
    let numeroAleatorio = Math.floor((Math.random() * max) + min);
    while(numeroAleatorio > max) {
        let numeroAleatorio = Math.floor((Math.random() * max) + min);
    }
    return numeroAleatorio;
}

function validarCheckbox() {

    if(!datosEntrada.mayusculas && !datosEntrada.minusculas && !datosEntrada.numeros && !datosEntrada.simbolos) {
        console.log("todos los campos vacios");
        mostrarAlerta("Selecciona una opcion", "rojo");
        return false;
    } else {
        caracteres = [];
        if(datosEntrada.mayusculas || datosEntrada.minusculas) {
            caracteres.push(letras);
        }
        if(datosEntrada.numeros) {
            caracteres.push(numeros);
        }
        if(datosEntrada.simbolos) {
            caracteres.push(simbolos);
        }
        return true;
    }
}

function copiarAlPortapapeles() {
    console.log(contraseñaResultado.textContent);
    navigator.clipboard.writeText(contraseñaResultado.textContent)
        .then(()=> {
            mostrarAlerta('<span class="simbolo">¡</span>Copiado<span class="simbolo">!</span>', "verde");
        })
        .catch(err => {
            mostrarAlerta("Error :/", "rojo");
        })
    
}

const main = document.querySelector("main");
function mostrarAlerta(mensaje, tipo) {
    if(main.querySelector("#alerta")) {
        main.removeChild(main.querySelector("#alerta"));
    }
    const alerta = document.createElement("span");
    alerta.innerHTML = mensaje;
    alerta.setAttribute("id", "alerta")
    alerta.classList.add(`${tipo}`);
    main.append(alerta);

    setTimeout(function() {
        alerta.style.opacity = 0;
        alerta.style.transition = "all 1s ease";
    }, 2000);
}

const labelCheckboxArray = document.querySelectorAll(".label-checkbox");
labelCheckboxArray.forEach(label => {
    label.addEventListener("mouseover", (e)=> {
        e.target.parentElement.querySelector(".checkbox-personalizado").classList.add("checkbox-borde-hover");
    })
});

labelCheckboxArray.forEach(label => {
    label.addEventListener("mouseout", (e)=> {
        e.target.parentElement.querySelector(".checkbox-personalizado").classList.remove("checkbox-borde-hover");
    })
});

