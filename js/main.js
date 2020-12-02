document.getElementById('buscar').addEventListener('click', datosObtenidos);

let datos = [];

function datosObtenidos() {
    let lugar = document.getElementById('lugar').value;
    let fecha = document.getElementById('fecha').value;
    let noches = document.getElementById('noches').value;
    if (lugar != "" && fecha != "" && noches != "") {
        datos.push(lugar, fecha, noches);
        imprimirConsola();
        crearNuevaRoom(3);

    }
}

function imprimirConsola() {
    datos.forEach(dato => {
        console.log('Dato: ' + dato);
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

$("#habitaciones").popover({
    placement: "bottom",
    html: true,
    content: crearNuevaRoom(0)
});
document.getElementById('habitaciones').addEventListener('click', function () {
    crearNuevaRoom(0)
});

function crearNuevaRoom(nHabitacion) {
    let bloque = document.createElement('div');
    let nombreH = document.createElement('p');
    let nombre = document.createTextNode(nHabitacion + ' Habitación');
    nombreH.appendChild(nombre);

    let opcionesAdultos = crearOpcionesNum(4);
    let grupoAdultos = document.createElement('div');
    let adultosTxt = document.createElement('p');
    let adultosTexto = document.createTextNode('Adultos');
    adultosTxt.appendChild(adultosTexto);
    grupoAdultos.appendChild(adultosTxt);
    grupoAdultos.appendChild(opcionesAdultos);

    let opcionesNinios = crearOpcionesNum(4);
    let grupoNinios = document.createElement('div');
    let niniosTxt = document.createElement('p');
    let niniosTexto = document.createTextNode('Niños');
    niniosTxt.appendChild(niniosTexto);
    grupoNinios.appendChild(niniosTxt);
    grupoNinios.appendChild(opcionesNinios);


    bloque.appendChild(nombreH);
    bloque.appendChild(grupoAdultos);
    bloque.appendChild(grupoNinios);
    // document.body.appendChild(bloque);
    return bloque;
    console.log(bloque);
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