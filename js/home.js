document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products?limit=9')
        .then(res => res.json())
        .then(products => {
            const bestSellerItems = document.getElementById('best-seller-items');
            
            products.forEach((product, index) => {
                const itemHTML = `
                    <div class="best-item">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>$${product.price}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                bestSellerItems.innerHTML += itemHTML;
            });

            setupAddToCartButtons(); 
        })
        .catch(err => console.error(err));
        
    const upArrow = document.getElementById('up-arrow');
    upArrow.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const userName = document.getElementById('user-nav');
    userName.innerHTML = storedUserData.name;


});

function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartHandler);
    });
}

function addToCartHandler(event) {
    const productId = event.target.dataset.id;
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            addToCart(product);
        })
        .catch(err => console.error(err));
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} has been added to your cart.`);
}
