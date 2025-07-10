//Carrito
// Recupera el carrito desde localStorage al cargar la página.
// Si no hay nada guardado, inicializa el carrito como un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Busca si el producto ya existe en el carrito
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        // Si ya existe, incrementa la cantidad
        producto.cantidad++;
    } else {
        // Si no existe, lo agrega como nuevo objeto
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    guardarYMostrar(); // Actualiza localStorage y vuelve a renderizar el carrito
}

// Función para eliminar un producto del carrito por índice
function eliminarProducto(index) {
    carrito.splice(index, 1); // Elimina 1 elemento en la posición indicada
    guardarYMostrar();       // Guarda y actualiza vista
}

// Función para aumentar o disminuir la cantidad de un producto
function cambiarCantidad(index, delta) {
    carrito[index].cantidad += delta; // Suma o resta 1 según delta

    // Si la cantidad queda en 0 o menos, se elimina el producto
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);

    guardarYMostrar(); // Guarda los cambios y actualiza la vista
}

// Función que guarda el carrito en localStorage y muestra los cambios
function guardarYMostrar() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda como string
    mostrarCarrito(); // Refresca la vista del carrito
}

// Función para mostrar el carrito en pantalla
function mostrarCarrito() {
    const lista = document.getElementById("carrito"); // Lista de productos
    const totalSpan = document.getElementById("total"); // Muestra total en $
    lista.innerHTML = ""; // Limpia el contenido previo
    let total = 0;        // Acumulador del total

    // Recorre cada ítem del carrito
    carrito.forEach((item, index) => {
        // Crea un elemento <li> con los datos del producto
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
            <button onclick="cambiarCantidad(${index}, 1)">+</button>
            <button onclick="cambiarCantidad(${index}, -1)">-</button>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;

        lista.appendChild(li); // Lo agrega a la lista del carrito
        total += item.precio * item.cantidad; // Suma al total
    });

    // Actualiza el total en el DOM
    totalSpan.textContent = total;
}

// Llama a mostrarCarrito cuando se carga la página para mostrar lo que esté guardado
mostrarCarrito();
