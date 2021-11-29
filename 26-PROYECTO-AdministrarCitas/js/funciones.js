import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";
import { 
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from "./selectores.js";

const ui = new UI();
const administrarCitas = new Citas();

let editando;

// Objeto con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Agrega y valida una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto cita
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        // Regresar el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // Quitar modo edición
        
        editando = false;        
    } else {
        // Generar un id único
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        ui.imprimirAlerta('Se agregó correctamente');
    }
    

    // Reiniciar el objeto para la validación
    reiniciarObjeto();

    // Reiniciar el formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
    
}



export function reiniciarObjeto() {
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}

export function eliminarCita(id) {
    // Eliminar citas
    administrarCitas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    ui.limpiarHTML();

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el formulario
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';


    editando = true;
}