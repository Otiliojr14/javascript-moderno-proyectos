import * as UI from "./interfaz.js";
import API from "./api.js";

UI.formularioBuscar.addEventListener('submit', buscarCancion);

function buscarCancion(e) {
    e.preventDefault();
    
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    if (artista === '' || cancion === '') {
        // Si hay un campo vacio se muestra el error
        UI.divMensaje.textContent = 'Error... Todos los campos son obligatorios';
        UI.divMensaje.classList.add('error');

        setTimeout(() => {
            UI.divMensaje.textContent = '';
            UI.divMensaje.classList.remove('error');
        }, 3000);

        return;
    }

    // Consultar nuestra API
    const busqueda = new API(artista, cancion);
    busqueda.consultarAPI();
}

