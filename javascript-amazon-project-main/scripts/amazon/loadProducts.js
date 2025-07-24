// products --> products.json
import { calculateCartQuantity, addToCart } from '../../data/cart.js';
import { productGetter } from '../../data/products.js';

let addedToEventId;

export function renderProductGrid() {

  let html = '';
  productGetter.getProducts().forEach((product) => {
    html += loadProduct(product);
  });
  document.querySelector('.js-products-grid').innerHTML = html;

  document.querySelectorAll('.js-add-to-cart').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      addToCart(productId, quantity);

      const addedTo = document.querySelector(`.js-added-to-cart-${productId}`);
      clearTimeout(addedToEventId);
      addedTo.classList.add('added-to-cart-selected');
      addedToEventId = setTimeout(() => {
        addedTo.classList.remove('added-to-cart-selected');
      }, 2000);

      updateCartQuantity();

    })
  })
}

export function updateCartQuantity() {
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = '' + cartQuantity;
}


function loadProduct(product) {
  return `<div class="product-container js-product-container-${product.id}">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="js-added-to-cart-${product.id} added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="js-add-to-cart add-to-cart-button button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div > `;
};