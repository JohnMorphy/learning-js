import { updateCartQuantity } from "../scripts/amazon/loadProducts.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { addToCart } from "./cart.js";
import { fetchProducts, productGetter } from "./products.js"
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); // add order to the fron
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrderById(orderId) {
  let matchingOrder;

  orders.forEach(order => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

export async function renderOrders() {

  let html = '';
  await fetchProducts();
  orders.forEach(order => {
    const orderDate = dayjs(order.orderTime).format('MMMM DD');
    const totalCost = formatCurrency(order.totalCostCents);

    html += `
      <div class="order-container">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${totalCost}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        
        <div class="order-details-grid">`;

    order.products.forEach(product => {
      const productDB = productGetter.getProductById(product.productId);
      const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime).format('MMMM DD');

      html += `
            <div class="product-image-container">
                <img src="${productDB.image}">
            </div>
            <div class="product-details">
              <div class="product-name">
              ${productDB.name}
              </div>
              <div class="product-delivery-date">
              Arriving on: ${estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
              Quantity: ${product.quantity}
              </div>
                
              <button class="js-buy-again-button buy-again-button button-primary" data-product-id="${productDB.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?order-id=${order.id}&product-id=${productDB.id}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
              </a>
            </div>`
    })

    html += `</div></div>`;
  });

  document.querySelector('.js-orders-grid').innerHTML = html;


  document.querySelectorAll('.js-buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId, 1);
      updateCartQuantity();
    });
  });


}