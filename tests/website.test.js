const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

assert(html.includes('ShopEasy'), 'Website title should contain ShopEasy');
assert(html.includes('Our Products'), 'Product section should exist');
assert(css.length > 0, 'CSS file should not be empty');
assert(js.length > 0, 'JavaScript file should not be empty');

console.log('PASS: Website HTML exists');
console.log('PASS: Product section exists');
console.log('PASS: CSS file exists');
console.log('PASS: JavaScript file exists');
console.log('All website tests passed!');
