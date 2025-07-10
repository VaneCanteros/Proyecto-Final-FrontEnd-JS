// Esperamos a que todo el DOM se haya cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

  // Obtenemos el formulario de búsqueda por su ID
    let form = document.getElementById('form-busqueda');

  // Seleccionamos el input de búsqueda dentro del formulario
    let searchInput = form.querySelector('input[name="search"]');

  // Seleccionamos el botón ✖️ para limpiar el campo de búsqueda
    let limpiarBtn = document.getElementById('limpiar-busqueda');

  // Seleccionamos todos los productos mostrados en la página
    let productos = document.querySelectorAll('.producto');

  // Contenedor donde se mostrarán los resultados de la búsqueda
    let contenedorResultados = document.getElementById('resultados-busqueda');

  // Evitamos que el formulario recargue la página al hacer submit
    form.addEventListener('submit', e => e.preventDefault());

  // Cada vez que el usuario escribe en el campo de búsqueda...
    searchInput.addEventListener('input', () => {
    let texto = searchInput.value.toLowerCase(); // Convertimos lo escrito a minúsculas
    contenedorResultados.innerHTML = '';         // Limpiamos resultados anteriores
    limpiarBtn.style.display = texto ? 'inline' : 'none'; // Mostramos ✖️ si hay texto

    let resultados = 0; // Contador de coincidencias

    // Recorremos todos los productos disponibles
    productos.forEach(producto => {
      // Obtenemos el texto del título y descripción del producto
        let titulo = producto.querySelector('h3')?.textContent.toLowerCase();
        let descripcion = producto.querySelector('p')?.textContent.toLowerCase();

      // Verificamos si el texto buscado está presente
        if (titulo.includes(texto) || descripcion.includes(texto)) {
        let nombre = producto.querySelector('h3')?.textContent;
        let precio = producto.querySelector('h4')?.textContent;
        let id = producto.id; // Usamos el ID para poder hacer scroll hacia el producto

        // Creamos un nuevo item en la lista de resultados
        const item = document.createElement('div');
        item.classList.add('resultado-item');
        item.textContent = `${nombre} - ${precio}`;

        // Si se hace clic en el resultado...
        item.addEventListener('click', () => {
          let destino = document.getElementById(id); // Seleccionamos el producto
            if (destino) {
            destino.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Hacemos scroll
            destino.classList.add('destacado'); // Lo resaltamos visualmente

            // Quitamos el efecto de resaltado luego de un tiempo
            setTimeout(() => {
                destino.classList.remove('destacado');
            }, 1600);
        }
        });

        // Agregamos el resultado al contenedor de resultados
        contenedorResultados.appendChild(item);
        resultados++; // Sumamos una coincidencia
    }
    });

    // Mostramos u ocultamos el contenedor según si hubo resultados
    contenedorResultados.style.display = resultados > 0 ? 'block' : 'none';

    // Si no hubo coincidencias y el usuario escribió algo
    if (resultados === 0 && texto) {
        contenedorResultados.innerHTML = '<p>No se encontraron productos.</p>';
    }
});

  // Cuando el usuario hace clic en ✖️
    limpiarBtn.addEventListener('click', () => {
    searchInput.value = '';                       // Borramos el texto del input
    contenedorResultados.innerHTML = '';          // Limpiamos los resultados
    contenedorResultados.style.display = 'none';  // Ocultamos la lista de resultados
    limpiarBtn.style.display = 'none';            // Ocultamos el botón ✖️
    searchInput.focus();                          // Llevamos el cursor de vuelta al input
});
});
