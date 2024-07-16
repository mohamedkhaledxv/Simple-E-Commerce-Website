document.addEventListener('DOMContentLoaded', () => {
    let limit = 9; 
    let offset = 0; 
    const productList = document.getElementById('product-list');
    const showMoreButton = document.getElementById('show-more');

    function loadProducts(limit, offset) {
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`)
            .then(res => res.json())
            .then(data => {
                data.products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');

                    productItem.innerHTML = `
                        <img src="${product.thumbnail}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p><span>Price</span>: $${product.price}</p>
                        <p><span>Rating</span>: ${product.rating}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    `;

                    productList.appendChild(productItem);
                });

                if (data.products.length < limit) {
                    showMoreButton.style.display = 'none';
                } else {
                    showMoreButton.style.display = 'block';
                }
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    const product = data.products.find(p => p.id == productId);
                    addToCart(product);
                });
            });
            })
            .catch(err => console.error(err));
    }

    loadProducts(limit, offset);
    showMoreButton.addEventListener('click', () => {
        offset += limit;
        loadProducts(limit, offset);
    });
    const upArrow = document.getElementById('up-arrow');
    upArrow.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const userName = document.getElementById('user-nav');
    userName.innerHTML = storedUserData.name;

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} has been added to your cart.`);
    }
});


