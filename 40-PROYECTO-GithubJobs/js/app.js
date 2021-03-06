const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda);
    
})

function validarBusqueda(e) {
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;

    if (busqueda.length < 3) {
        mostrarMensaje('Búsqueda muy corta... Añade más información');
        return;
    }

    consultarAPI(busqueda);
}

function consultarAPI(busqueda) {
    const githubURL = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(githubURL)}`;

    axios.get(url)
        .then( respuesta => console.log(respuesta));
}

function mostrarMensaje(msj) {

    const alertaPrevia = document.querySelector('.alerta');

    if (!alertaPrevia) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        alerta.textContent = msj;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);        
    }
}