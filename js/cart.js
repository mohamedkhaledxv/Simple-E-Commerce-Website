document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const upArrow = document.getElementById('up-arrow');

    
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const userName = document.getElementById('user-nav');
    userName.innerHTML = storedUserData.name;

    loadCartItems(cartList);
    setupUpArrow(upArrow);
});

function loadCartItems(cartList) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let subtotal = 0;

        cart.forEach((product, index) => {
            const cartItem = createCartItem(product, index);
            cartList.appendChild(cartItem);
            subtotal += product.price;
        });

        const subtotalElement = createSubtotalElement(subtotal);
        cartList.appendChild(subtotalElement);

        setupDeleteIcons();
    }
}

function createCartItem(product, index) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    cartItem.innerHTML = `
        <img src="${product.thumbnail||product.image}" alt="${product.title}" class="cart-item-img">
        <div class="cart-item-details">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button class="delete-button" data-index="${index}">Delete</button>
        </div>
    `;
    
    return cartItem;
}

function createSubtotalElement(subtotal) {
    const subtotalElement = document.createElement('div');
    subtotalElement.classList.add('subtotal');
    subtotalElement.innerHTML = `<h3>Subtotal: $${subtotal.toFixed(2)}</h3>`;
    
    return subtotalElement;
}

function setupDeleteIcons() {
    const deleteIcons = document.querySelectorAll('.delete-button');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            removeFromCart(index);
        });
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.location.reload(); 
}

function setupUpArrow(upArrow) {
    upArrow.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
