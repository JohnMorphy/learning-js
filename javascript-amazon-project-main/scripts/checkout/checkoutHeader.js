import { calculateCartQuantity } from '../../data/cart.js';

export default function renderHeader() {

    const headerHTML = `
        Checkout (<a class="return-to-home-link" href="amazon.html">${calculateCartQuantity()} items</a>)
    `;

    document.querySelector('.js-checkout-header-middle-section').innerHTML = headerHTML;
}
