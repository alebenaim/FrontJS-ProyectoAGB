// Archivo Script para el trabajo integrador Talento Tech

// Crear una funcion que genere un array de Productos del tipo json y los muestre en la consola
// Cada producto debe tener ID, Name, Description, Amount

const productos = []  //arreglo vacio - variable global

function crearProducto(id, name, description, amount, category) {
	return { id, name, description, amount, category };
}

function agregarProductoAlArreglo(producto) {
	productos.push(producto);
}

function generarProductosJSON() {
	let prod = crearProducto(1, "Almendra Guara", "Origen: España - Cascara: dura - Tamaño: medio - Color: medio - Contenido Oleico: alto - Contenido proteico: alto", 1000, "Almendra");
	agregarProductoAlArreglo(prod);

	prod = crearProducto(2, "Almendra Non Pareil", "Origen: California EEUU - Cascara: blanda - Tamaño: medio - Color: claro - Contenido Oleico: bajo - Contenido proteico: alto", 1025, "Almendra");
	agregarProductoAlArreglo(prod);

	prod = crearProducto(3, "Almendra Marinada", "Origen: España - Cascara: dura - Tamaño: grande - Color: medio - Contenido Oleico: alto - Contenido proteico: alto", 1100, "Almendra");
	agregarProductoAlArreglo(prod);

	prod = crearProducto(4, "Almendra Sonora", "Origen: California EEUU - Cascara: blanda - Tamaño: medio - Color: medio - Contenido Oleico: bajo - Contenido proteico: alto", 1080, "Almendra");
	agregarProductoAlArreglo(prod);

	prod = crearProducto(5, "Almendra Vairo", "Origen: España - Cascara: dura - Tamaño: medio a grande - Color: medio - Contenido Oleico: alto - Contenido proteico: alto", 989, "Almendra");
	agregarProductoAlArreglo(prod);

	prod = crearProducto(6, "Pistacho", "Origen: Asia Occidental - Cascara: dura blanquecina - Semilla: verde, sabor ligeramente dulce y textura crujiente - Rico en nutrientes, contiene minerales y vitaminas", 4300, "Pistacho");
	agregarProductoAlArreglo(prod);

	const productosJSON = JSON.stringify(productos, null, 2); // null y 2 para formato legible

	console.log(productosJSON);
}

function mostrarProductos(productos) {
	console.log("Muestra Productos");
	productos.forEach(item => {
		console.log(`ID ${item.id} - Nombre: ${item.name} - Precio: ${item.amount}`);
	});
}
////////////////////////////////////////////////////////////////

generarProductosJSON();

mostrarProductos(productos);



///////////////////////////////////////////////////////////////////////////
// funcionalidad carrito

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

const btnIrCart = document.querySelector('.ir-carrito');
btnIrCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

const btnCerrarCart = document.querySelector('.cerrar-carrito');
btnCerrarCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.productos');


// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const cantidadTotal = document.querySelector('.total-kg');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {

	if (e.target.classList.contains('comprar')) {

		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h3').textContent,
			price: product.querySelector('.price').textContent.slice(16),
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}

});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('plus')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		const exits = allProducts.some(
			product => product.title === title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === title) {
					product.quantity++;
					return product;
				}
			});
			showHTML();
		}
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('minus')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		const exits = allProducts.some(
			product => product.title === title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === title) {
					if (product.quantity > 1) {
						product.quantity--;
						return product;
					}
					else {

						allProducts = allProducts.filter(
							product => product.title !== title
						);
					}
				}
			});
			showHTML();
		}
	}
});




// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;
	let totalLinea = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');
		totalLinea = parseInt(product.quantity * product.price);
		console.log(totalLinea, product.quantity, product.price)
		containerProduct.innerHTML = `
            <div class="info-cart-product">
              <p class="titulo-producto-carrito">${product.title}</p>
              <span class="cantidad-producto-carrito">${product.quantity}</span>
              <span class="precio-producto-carrito">${product.price}</span>
               <span class="precio-total-producto-carrito">$${totalLinea}</span>
            </div>
			 <i class="fa-solid fa-trash icon-close"></i>
			<span class="plus">+</span>
			<span class="minus">-</span>
           
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price);
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	cantidadTotal.innerText = `${totalOfProducts}`;
	countProducts.innerText = totalOfProducts;
};



/////////////////////////////////////////////////////////////////
// Menu hamburguesa
function funcionMenu() {
	var x = document.getElementById("miNavegacion");
	if (x.className === "navegacion") {
		x.className += " responsive";
	} else {
		x.className = "navegacion";
	}
}


////////////////////////////////////////////////////////////
//Boton volver arriba
window.onscroll = function () {
	const backToTopButton = document.querySelector('.back-to-top');

	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTopButton.classList.add("show");
	} else {
		backToTopButton.classList.remove("show");
	}
};

document.querySelector('.back-to-top').addEventListener('click', function (e) {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});


//////////////////////////////////////////////
// volver arriba cuando compra
document.querySelector('.ir-carrito').addEventListener('click', function (e) {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

