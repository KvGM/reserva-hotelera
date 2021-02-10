const maxHabitaciones = 4;

const minHabitaciones = 1;

const maxAdultos = 4;

const maxNinios = 3;

let totalHabitaciones = 1;
let agrupadorRooms = null;


function createNode(nodeType, nodeText, nodeClasess, nodeAttributtes) {
    let node = document.createElement(nodeType);
    if (nodeText != "" && nodeText != null) {
        node.appendChild(document.createTextNode(nodeText));
    }
    if (nodeClasess.length > 0) {
        nodeClasess.forEach(clss => node.classList.add(clss));
    }
    if (nodeAttributtes.length > 0) {
        nodeAttributtes.forEach(attributte => node.setAttribute(attributte.name, attributte.value));
    }
    return node;
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

function nochesPopulares() {
    const nochesComunes = [4, 7, 10, 14];
    const diasMax = 14;
    let selectNoches = document.getElementById('noches');
    let optGroupComunes = createNode('optgroup', '', [], [{
        name: 'label',
        value: 'COMUNES'
    }]);
    nochesComunes.forEach(noche => {
        optGroupComunes.appendChild(createNode('option', `${noche} Noches`, [], [{
            name: 'value',
            value: noche
        }]));
    });
    let optGroupDiarias = createNode('optgroup', '', [], [{
        name: 'label',
        value: 'DIARIAS'
    }]);
    for (let i = 1; i < diasMax + 1; i++) {
        if (i != 1) {
            optGroupDiarias.appendChild(createNode('option', `${i} Noches`, [], [{
                name: 'value',
                value: i
            }]));
        } else {
            optGroupDiarias.appendChild(createNode('option', `${i} Noche`, [], [{
                name: 'value',
                value: i
            }]));
        }
    }
    selectNoches.appendChild(optGroupComunes);
    selectNoches.appendChild(optGroupDiarias);
}

function addRoom() {
    if (agrupadorRooms != null) {
        if (totalHabitaciones <= maxHabitaciones) {
            agrupadorRooms.appendChild(crearRoom());
        }
    } else {
        agrupadorRooms = createNode('div', '', [], []);
        let btnCrear = createNode('button', '+', ['masRooms'], [{
            name: 'id',
            value: 'btnCrear'
        }]);
        let btnTerminar = createNode('button', 'Done', ['terminar'], [{
            name: 'id',
            value: 'btnTerminar'
        }]);
        let btnBorrar = createNode('button', '-', ['menosRooms'], [{
            name: 'id',
            value: 'btnBorrar'
        }]);
        btnCrear.addEventListener('click', addRoom);
        btnTerminar.addEventListener('click', cerrarPop);
        btnBorrar.addEventListener('click', borrarRoom);
        let agrupadorRoom = crearRoom();
        agrupadorRooms.append(btnCrear, btnTerminar, btnBorrar, agrupadorRoom);
    }
}

function crearRoom() {
    let totalRoomsCreadas = document.querySelectorAll('.room').length;
    if (totalRoomsCreadas < maxHabitaciones) {
        agrupadorRoom = createNode('div', '', ['room'], []);
        agrupadorRoom.appendChild(createNode('h4', `${totalHabitaciones} Habitación`, [], []));
        let agrupadorAdultos = createNode('div', '', [], []);
        agrupadorAdultos.appendChild(crearSelectorCantidad('Adultos', maxAdultos));
        let agrupadorNinios = createNode('div', '', [], []);
        agrupadorNinios.appendChild(crearSelectorCantidad('Ninos', maxNinios));
        agrupadorRoom.append(agrupadorAdultos, agrupadorNinios);
        totalHabitaciones++;
    }
    return agrupadorRoom;
}

function crearSelectorCantidad(label, max) {
    let agrupador = createNode('label', label, [], []);
    let selector = createNode('input', '', [label], [{
        name: 'size',
        value: 1
    }, {
        name: 'type',
        value: 'text'
    }, {
        name: 'value',
        value: '0'
    }]);
    selector.disabled = true;
    agrupador.appendChild(selector);
    let btnMenos = createNode('button', '-', [], []);
    let btnMas = createNode('button', '+', [], []);
    btnMas.addEventListener('click', (e) => sumarPersona(e, max));
    btnMenos.addEventListener('click', (e) => restarPersona(e, max));
    //Eventos
    agrupador.append(btnMenos, btnMas);
    return agrupador;
}

function sumarPersona(e, max) {
    let valor = e.target.parentNode.children[0].value;
    if (valor < max && valor >= 0) {
        let calculo = 0;
        calculo = parseInt(valor) + 1;
        e.target.parentNode.children[0].value = calculo;
    }
}

function restarPersona(e, max) {
    let valor = e.target.parentNode.children[0].value;
    if (valor <= max && valor > 0) {
        let calculo = 0;
        calculo = parseInt(valor) - 1;
        e.target.parentNode.children[0].value = calculo;
    }
}

function borrarRoom() {
    let habitaciones = document.querySelectorAll('.room');
    if ((habitaciones.length - 1) >= 1) {
        if (typeof habitaciones[habitaciones.length - 1] != undefined) {
            (habitaciones[habitaciones.length - 1]).remove();
            totalHabitaciones--;
        }
    }
}

function popoverRoom() {
    let popover = $('#popoverRoom').popover({
        content: agrupadorRooms,
        placement: "bottom",
        html: true
    });
    popover.on('hide.bs.popover', calcularPersonas);
}

function cerrarPop() {
    $("#popoverRoom").popover('hide');
}

function calcularPersonas() {
    let rooms = document.querySelectorAll('.room');
    let totalPersonas = 0;
    rooms.forEach(room => {
        let nPersonas = parseInt(room.querySelector('.Adultos').value) + parseInt(room.querySelector('.Ninos').value);
        totalPersonas += nPersonas;
    });
    let totalRooms = rooms.length;
    document.getElementById('popoverRoom').setAttribute('placeholder', `${totalRooms} habitaciones & ${totalPersonas} personas`)
}

function mostrarDatos() {
    console.log('-------------------------------------------------');
    console.log('----------RESERVA HOTELERA-----------------------');
    console.log('-------------------------------------------------');
    console.log(`Destino: ${document.getElementById('lugar').value}`);
    console.log(`Fecha: ${document.getElementById('fecha').value}`);
    console.log(`Noches: ${document.getElementById('noches').value}`);
    console.log(`Habitaciones: ${document.getElementById('popoverRoom').getAttribute('placeholder')}`);
    console.log('-------------------------------------------------');
}

fechaActual();
nochesPopulares();
addRoom();
popoverRoom();

document.getElementById('buscar').addEventListener('click', mostrarDatos);
