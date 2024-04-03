const api = fetch('https://content.newtonschool.co/v1/pr/65f821a4f6a42e24cda7e50c/productsData');
const returned = api.then((resp) => {
    return resp.json();
})
returned.then((result) => {
    console.log(result);
    display_my_prd(result);
})
var cart = [];

function display_my_prd(result) {
    let productcontainer = document.querySelector('.productscontainer')
    result.forEach((e) => {
        let productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
        <img class='pimage' width="250px" height="350px" src="${e.image}" alt="">
        <p class='ptitle'>${e.title}</p>
        <div class="priceandaddtocart">
            <p class="pprice">${e.price} DH</p>
            <button class="addtocart" data-productid="${e.id}">
            </button>
        </div>`
        productcontainer.appendChild(productDiv)
        productDiv.querySelector('.addtocart').addEventListener('click', function () {
            addToCart(e);
        });
    })
}

function addToCart(product) {
    let existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
        updateCartUI();
    } else {
        product.quantity = 1;
        cart.push(product);
        displayProductInCart(product);
    }
}

function updateCartUI() {
    let cartContainer = document.querySelector('.pccontainer');
    cartContainer.innerHTML = ''; // Clear cart container before updating
    cart.forEach(product => {
        displayProductInCart(product);
    });
    cartButton.setAttribute('items', getTotalItems());
}

function getTotalItems() {
    let totalItems = 0;
    cart.forEach(product => {
        totalItems += product.quantity;
    });
    return totalItems;
}

function displayProductInCart(product) {
    let cartContainer = document.querySelector('.pccontainer');
    let productDiv = document.createElement('div');
    productDiv.classList.add('cartproduct');
    productDiv.innerHTML = `
        <div class="pnp">
            <img class='pimage' width="100px" height="150px" src="${product.image}">
            <div class="nameandprice">
                <p>${product.title}</p>
                <p>${product.price}</p>
                <div class='qtt'>
                    <p>Qty: </p>
                    <button class="minusqtt">-</button>
                    <p class="counter">${product.quantity}</p>
                    <button class="addqtt">+</button>
                </div>
            </div>
        </div>
        <button class="delete" productid="${product.id}">X</button>
        `;
    cartContainer.appendChild(productDiv);
    productDiv.querySelector('.delete').addEventListener('click', function () {
        productDiv.remove();
        cart = cart.filter((item) => item.id !== product.id);
        cartButton.setAttribute('items', getTotalItems());
    });
    productDiv.querySelector('.addqtt').addEventListener('click', function () {
        product.quantity += 1;
        productDiv.querySelector('.counter').textContent = product.quantity;
        cartButton.setAttribute('items', getTotalItems());
    });
    productDiv.querySelector('.minusqtt').addEventListener('click', function () {
        if (product.quantity > 1) {
            product.quantity -= 1;
            productDiv.querySelector('.counter').textContent = product.quantity;
            cartButton.setAttribute('items', getTotalItems());
        }
    });
}

let header = document.querySelector('header')
header.style.position = 'sticky'
header.style.top = 0
const cartUI = document.querySelector('.cartui');
const cartButton = document.querySelector('.carticon');
cartButton.addEventListener('click', () => {
    cartUI.classList.toggle('cartopened');
});
const closeButton = document.querySelector('.closecart');
closeButton.addEventListener('click', () => {
    cartUI.classList.toggle('cartopened');
});
