import { fetchProducts } from "../data/products.js";
import { renderProductGrid, updateCartQuantity } from "./amazon/loadProducts.js";

const searchValue = new URLSearchParams(window.location.search).get('search');
console.log(searchValue);

fetchProducts(searchValue).then(() => {
    renderProductGrid();
    updateCartQuantity();
})