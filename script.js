const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://placehold.co/300x200?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        image: "https://placehold.co/300x200?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2499,
        image: "https://placehold.co/300x200?text=Shoes"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://placehold.co/300x200?text=Backpack"
    }
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </article>
    `).join("");
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = cart.map((item, index) => `
        <li>
            ${item.name} - ₹${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        </li>
    `).join("");

    document.getElementById("cart-count").textContent = cart.length;

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    document.getElementById("cart-total").textContent =
        total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("cart-button").addEventListener("click", () => {
    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
});

displayProducts();
