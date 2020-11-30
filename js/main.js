document.getElementById('search').addEventListener('click', datosObtenidos);

let fechaActual = document.getElementById('fecha').valueAsDate = new Date();


let datos = [];

function datosObtenidos(event) {
    let lugar = document.getElementById('lugar').value;
    let fecha = document.getElementById('fecha').value;
    let noches = document.getElementById('noches').value;
    if (lugar != "" && fecha != "" && noches != "") {
        event.preventDefault();
        datos.push(lugar, fecha, noches);
        imprimirConsola();
    }
}

function imprimirConsola() {
    datos.forEach(dato => {
        console.log('Dato: ' + dato);
    });
}


//* Comprobar que la fecha no sea inferior a la actual
//* Generar bloque prueba
//*
//*
//*
//*
//*