import { eliminarCita, cargarEdicion } from '../funciones.js';
import { contenedorCitas } from "../selectores.js";

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de alerta
        divMensaje.textContent = mensaje;

        // Agregar el DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
    imprimirCitas({citas}) {

        this.limpiarHTML();
        
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefóno: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;  

            // Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>`;

            btnEliminar.onclick = () => eliminarCita(id);

            // Boton para eliminar esta cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>`;
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los parrafos del divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregar las citas del HTML
            contenedorCitas.appendChild(divCita);
            
        });
    }

    limpiarHTML() {
        if (contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild);
        }
    }
}

export default UI;