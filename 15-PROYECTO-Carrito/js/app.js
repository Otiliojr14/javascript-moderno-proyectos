// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // Agregar curso apretando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
    // Eliminar elementos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Extraer el LocalStorage del carrito
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
    // Vaciar lista del carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}

// Funciones

// Agregar curso desde botón
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eleminar curso desde botón X del menu
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }

    


}

// Extraer datos del curso desde DOM
function leerDatosCurso(curso){

    // Información del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Verificar si existe el curso agregado en el arreglo
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if (existe) {
        
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // Agregando cursos a comprar en un arreglo  

    console.log(infoCurso);

    carritoHTML();
}

// Imprimir en HTML el arreglo carrito de compras  
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, id, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agregar HTML a la tabla carrito tbody
        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();

}

// Guardar en memoria el arreglo de carrito de compras 
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Limpiar los elementos HTML cada vez que se actulice el arreglo carrito de compras
function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}