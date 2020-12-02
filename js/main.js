document.getElementById('buscar').addEventListener('click', datosObtenidos);

let datos = [];

const hotel = { //Especie de constructor
    nombre: false,
    fecha: false,
    dias: false,
    habitaciones: {
        habitacion0: false
    }
}

let reservas = [];


function datosObtenidos() {
    let lugar = document.getElementById('lugar').value;
    let fecha = document.getElementById('fecha').value;
    let noches = document.getElementById('noches').value;
    if (lugar != "" && fecha != "" && noches != "") {
        datos.push(lugar, fecha, noches);
        let reserva = Object.create(hotel);
        reserva.nombre = lugar;
        reserva.fecha = fecha;
        reserva.dias = noches;
        reservas.push(reserva);
        imprimirConsola();
    }
}

function imprimirConsola() {
    console.log(reservas);
    reservas.forEach(dato => {
        console.log('Dato: ' + dato.toString());
    });
}


function fechaActual() {
    let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear();
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    today = year + '-' + month + '-' + day;
    document.getElementById("fecha").setAttribute("min", today);
    document.getElementById("fecha").setAttribute("value", today);
}
fechaActual();

//Variable local para content para
//saber si esta vació
$("#habitaciones").popover({
    placement: "bottom",
    html: true,
    content: crearNuevaRoom(0)
});

//Probar a poner en un función global que compruebe si existe contenido
//Si existe contenido lo imprimo, si no crea otra además de esa.

//Eventos de bootstrap al final de la documentación de los popovers.


function crearNuevaRoom(nHabitacion) {
    let bloque = document.createElement('div');
    let nombreH = document.createElement('p');
    let nombre = document.createTextNode(nHabitacion + ' Habitación');
    nombreH.appendChild(nombre);

    let opcionesAdultos = crearOpcionesNum(4);
    let grupoAdultos = document.createElement('div');
    grupoAdultos.id="adultos";
    let adultosTxt = document.createElement('p');
    let adultosTexto = document.createTextNode('Adultos');
    adultosTxt.appendChild(adultosTexto);
    grupoAdultos.appendChild(adultosTxt);
    grupoAdultos.appendChild(opcionesAdultos);

    let opcionesNinios = crearOpcionesNum(4);
    let grupoNinios = document.createElement('div');
    grupoNinios.id="ninios";
    let niniosTxt = document.createElement('p');
    let niniosTexto = document.createTextNode('Niños');
    niniosTxt.appendChild(niniosTexto);
    grupoNinios.appendChild(niniosTxt);
    grupoNinios.appendChild(opcionesNinios);


    bloque.appendChild(nombreH);
    bloque.appendChild(grupoAdultos);
    bloque.appendChild(grupoNinios);
    return bloque;
}

function crearOpcionesNum(nOpciones) {
    let agrupador = document.createElement('select');
    let option, optionTxt;
    for (let cont = 0; cont < nOpciones; cont++) {
        option = document.createElement('option');
        optionTxt = document.createTextNode(cont);
        option.appendChild(optionTxt);
        option.setAttribute("value", cont);
        agrupador.appendChild(option);
    }
    return agrupador;
}

//* Comprobar que la fecha no sea inferior a la actual Done
//* Generar bloque prueba Done
//* Crear divs
//*
//*
//*
//*