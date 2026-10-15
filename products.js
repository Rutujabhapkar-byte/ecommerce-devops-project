// ShopEasy product catalogue: [name, price in INR, emoji]
const products = (() => {
    const catalogue = {
        Electronics: [
            ["Wireless Headphones", 1499, "🎧"], ["Smart Watch", 1999, "⌚"],
            ["Bluetooth Speaker", 1299, "🔊"], ["Power Bank 10000mAh", 999, "🔋"],
            ["Wireless Mouse", 499, "🖱️"], ["Mechanical Keyboard", 2499, "⌨️"],
            ["HD Webcam", 1799, "📷"], ["USB-C Fast Charger", 799, "🔌"],
            ["Laptop Stand", 899, "💻"], ["Tablet 10-inch", 12999, "📱"],
            ["Smart LED Bulb", 399, "💡"], ["Earbuds Pro", 2199, "🎵"]
        ],
        Fashion: [
            ["Running Shoes", 2499, "👟"], ["Denim Jacket", 2199, "🧥"],
            ["Cotton T-Shirt", 499, "👕"], ["Everyday Backpack", 999, "🎒"],
            ["Sunglasses", 799, "🕶️"], ["Leather Wallet", 699, "👛"],
            ["Baseball Cap", 349, "🧢"], ["Formal Shirt", 1199, "👔"],
            ["White Sneakers", 1899, "👟"], ["Handbag", 1599, "👜"],
            ["Classic Wrist Watch", 2999, "⌚"], ["Woollen Scarf", 599, "🧣"]
        ],
        Home: [
            ["Ceramic Mug Set", 599, "☕"], ["Cotton Bedsheet", 1299, "🛏️"],
            ["Scented Candle", 349, "🕯️"], ["Wall Clock", 749, "🕰️"],
            ["Storage Box", 449, "📦"], ["Non-stick Pan", 1199, "🍳"],
            ["Steel Water Bottle", 549, "🥛"], ["Indoor Plant Pot", 299, "🪴"],
            ["Throw Pillow", 399, "🛋️"], ["Dinner Plate Set", 1499, "🍽️"],
            ["Curtain Pair", 999, "🪟"], ["Chopping Board", 349, "🔪"]
        ],
        Books: [
            ["Python Programming Guide", 599, "📘"], ["Cloud Computing Essentials", 749, "📗"],
            ["DevOps in Practice", 849, "📙"], ["Data Science Handbook", 899, "📘"],
            ["Machine Learning Basics", 799, "📗"], ["Web Development Guide", 649, "📙"],
            ["Marathi Short Stories", 299, "📖"], ["Business Strategy", 499, "📕"],
            ["Mindful Living Journal", 349, "📓"], ["A4 Sketchbook", 249, "🎨"],
            ["Notebook Set of 3", 199, "📒"], ["Fountain Pen", 399, "🖋️"]
        ],
        Beauty: [
            ["Gentle Face Wash", 249, "🧴"], ["Daily Moisturizer", 399, "🧴"],
            ["Sunscreen SPF 50", 449, "☀️"], ["Lip Balm", 149, "💄"],
            ["Argan Hair Oil", 299, "💧"], ["Herbal Shampoo", 349, "🧴"],
            ["Floral Perfume", 999, "🌸"], ["Vitamin C Serum", 699, "✨"],
            ["Kajal Pencil", 179, "🖊️"], ["Hair Dryer", 1299, "💇"],
            ["Body Lotion", 329, "🧴"], ["Nail Polish Set", 399, "💅"]
        ],
        Sports: [
            ["Yoga Mat", 699, "🧘"], ["Dumbbell Set", 1499, "🏋️"],
            ["Cricket Bat", 1799, "🏏"], ["Football", 599, "⚽"],
            ["Badminton Racket", 899, "🏸"], ["Skipping Rope", 199, "➰"],
            ["Sports Sipper Bottle", 399, "🥤"], ["Fitness Band", 1599, "🏃"],
            ["Cycling Helmet", 1199, "⛑️"], ["Resistance Bands", 449, "🎽"],
            ["Gym Bag", 899, "👝"], ["Tennis Ball Pack", 299, "🎾"]
        ]
    };

    const list = [];
    let id = 1;
    for (const [category, items] of Object.entries(catalogue)) {
        for (const [name, price, icon] of items) {
            list.push({ id: id++, name, category, price, icon });
        }
    }
    return list;
})();

if (typeof module !== "undefined") {
    module.exports = products;
}
