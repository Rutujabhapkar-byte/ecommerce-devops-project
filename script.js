const CART_KEY = "shopeasy-cart";
const categories = [...new Set(products.map(p => p.category))];
const state = { category: "All", query: "", sort: "featured", cart: loadCart() };

const $ = id => document.getElementById(id);
const money = n => "₹" + n.toLocaleString("en-IN");
const rating = p => (3.8 + ((p.id * 7) % 11) / 10).toFixed(1);
const isSale = p => p.id % 5 === 0;
const oldPrice = p => Math.round(p.price * 1.25);

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    } catch (e) { /* storage unavailable: cart works for this visit only */ }
}

function visibleProducts() {
    const list = products.filter(p =>
        (state.category === "All" || p.category === state.category) &&
        p.name.toLowerCase().includes(state.query));
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
}

function displayProducts() {
    const list = visibleProducts();
    $("result-count").textContent = list.length + " of " + products.length + " products";
    $("product-list").innerHTML = list.length ? list.map(p => `
        <article class="product-card">
            <div class="thumb c-${p.category}">
                <span aria-hidden="true">${p.icon}</span>
                ${isSale(p) ? '<span class="sale">Save 20%</span>' : ""}
            </div>
            <div class="card-body">
                <span class="cat">${p.category}</span>
                <h3>${p.name}</h3>
                <span class="rating">★ ${rating(p)}</span>
                <p class="price">${money(p.price)}${isSale(p) ? "<s>" + money(oldPrice(p)) + "</s>" : ""}</p>
                <button class="add" data-add="${p.id}">Add to Cart</button>
            </div>
        </article>`).join("")
        : '<p class="empty">No products match your search. Try a different word or choose All.</p>';
}

function displayChips() {
    $("chips").innerHTML = ["All", ...categories].map(c =>
        `<button class="chip" data-cat="${c}" aria-pressed="${c === state.category}">${c}</button>`).join("");
}

function displayTiles() {
    $("hero-tiles").innerHTML = categories.map(c => {
        const items = products.filter(p => p.category === c);
        return `<button class="tile c-${c}" data-cat="${c}">
            <span class="icon" aria-hidden="true">${items[0].icon}</span>
            <strong>${c}</strong><small>${items.length} items</small></button>`;
    }).join("");
}

function setCategory(category) {
    state.category = category;
    displayChips();
    displayProducts();
}

function changeQty(id, delta) {
    const next = (state.cart[id] || 0) + delta;
    if (next <= 0) delete state.cart[id];
    else state.cart[id] = next;
    saveCart();
    updateCart();
}

function updateCart() {
    const entries = Object.entries(state.cart)
        .map(([id, qty]) => ({ p: products.find(x => x.id === Number(id)), qty }))
        .filter(e => e.p);
    $("cart-items").innerHTML = entries.length ? entries.map(({ p, qty }) => `
        <li>
            <span class="ci-icon c-${p.category}" aria-hidden="true">${p.icon}</span>
            <span class="ci-name">${p.name}</span>
            <span class="ci-price">${money(p.price * qty)}</span>
            <span class="qty">
                <button data-dec="${p.id}" aria-label="Decrease quantity of ${p.name}">−</button>
                ${qty}
                <button data-inc="${p.id}" aria-label="Increase quantity of ${p.name}">+</button>
            </span>
            <button class="ci-remove" data-remove="${p.id}">Remove</button>
        </li>`).join("")
        : '<li class="cart-empty">Your cart is empty. Add a product to get started.</li>';
    $("cart-count").textContent = entries.reduce((n, e) => n + e.qty, 0);
    $("cart-total").textContent = entries.reduce((n, e) => n + e.p.price * e.qty, 0).toLocaleString("en-IN");
}

function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

function toggleCart(open) {
    document.body.classList.toggle("cart-open", open);
}

document.addEventListener("click", e => {
    const t = e.target.closest("[data-add],[data-cat],[data-inc],[data-dec],[data-remove]");
    if (!t) return;
    if (t.dataset.add) {
        changeQty(Number(t.dataset.add), 1);
        toast("Added to cart");
    } else if (t.dataset.cat) {
        setCategory(t.dataset.cat);
        if (t.classList.contains("tile")) $("products").scrollIntoView();
    } else if (t.dataset.inc) changeQty(Number(t.dataset.inc), 1);
    else if (t.dataset.dec) changeQty(Number(t.dataset.dec), -1);
    else if (t.dataset.remove) {
        delete state.cart[t.dataset.remove];
        saveCart();
        updateCart();
    }
});

$("search").addEventListener("input", e => {
    state.query = e.target.value.trim().toLowerCase();
    displayProducts();
});
$("sort").addEventListener("change", e => {
    state.sort = e.target.value;
    displayProducts();
});
$("cart-button").addEventListener("click", () => toggleCart(true));
$("cart-close").addEventListener("click", () => toggleCart(false));
$("overlay").addEventListener("click", () => toggleCart(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleCart(false); });
$("checkout").addEventListener("click", () => {
    toast(Object.keys(state.cart).length ? "Checkout is not connected yet. This is a demo store." : "Your cart is empty");
});

displayTiles();
displayChips();
displayProducts();
updateCart();
