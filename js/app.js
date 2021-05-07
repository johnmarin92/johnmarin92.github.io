// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
 // Cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritobtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el areglo

        limpiaHTML(); // Eliminamos todo el HTML
    });
}

//Funciones
function agregarCurso(e) {
        e.preventDefault();


    if(e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement; 
        leerDatosCurso(cursoSeleccionado );
    }
}
 // Elimina un curso del carrito
 function eliminarCurso(e) {
     if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); // iterar sobre el carrito y mostrar su html
     }
 }

// Lee el contenido del html al que le dimos clic y extrae info del curso
function leerDatosCurso(curso) {
    // console.log(curso)

    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que  no son los duplicados
            }
        } );
         articulosCarrito = [...cursos];
    } else {
      // Agrega elementos al areglo del carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
    }




   console.log(articulosCarrito)

    carritoHTML();
}

// muetsra el carrito de comprs en el html
function carritoHTML() {

    // Limpiar el HTML
    limpiaHTML()

    // Recorre el carrtio y genere el html
    articulosCarrito.forEach( curso  => {
        const { imagen, titulo, precio, cantidad, id} = curso;
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

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
}

//Elimina los cursos del tbody
function limpiaHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    //FORMAS MAS LIMPIA
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}