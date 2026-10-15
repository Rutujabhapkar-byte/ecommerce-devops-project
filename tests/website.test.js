const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');
const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
const products = require('../products.js');

assert(html.includes('ShopEasy'), 'Website title should contain ShopEasy');
assert(html.includes('Our Products'), 'Product section should exist');
assert(css.length > 0, 'CSS file should not be empty');
assert(js.length > 0, 'JavaScript file should not be empty');

assert(html.includes('products.js'), 'index.html should load products.js');
assert(dockerfile.includes('products.js'), 'Dockerfile should copy products.js');

assert(products.length >= 70, 'Store should list at least 70 products');
const ids = new Set(products.map(p => p.id));
assert.strictEqual(ids.size, products.length, 'Product ids should be unique');
assert(products.every(p => p.name && p.price > 0), 'Every product needs a name and a positive price');
const categories = new Set(products.map(p => p.category));
assert(categories.size >= 5, 'Store should have at least 5 categories');

console.log('PASS: Website HTML exists');
console.log('PASS: Product section exists');
console.log('PASS: CSS file exists');
console.log('PASS: JavaScript file exists');
console.log('PASS: ' + products.length + ' products in ' + categories.size + ' categories');
console.log('All website tests passed!');
