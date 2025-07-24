import { updateDeliveryOption } from "../data/cart.js";
import { getOrderById } from "../data/orders.js";
import { fetchProducts, productGetter } from "../data/products.js";
import { updateCartQuantity } from "./amazon/loadProducts.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';


fetchProducts().then(() => {
    renderTracking();
    updateCartQuantity();
});

async function renderTracking() {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product-id');
    const orderId = urlParams.get('order-id');

    const order = getOrderById(orderId);
    const orderPosition = order.products.filter(product => {
        return product.productId === productId;
    })[0];
    const product = productGetter.getProductById(productId);

    console.log(order);
    console.log(orderPosition);
    console.log(product);

    let html = `<a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${dayjs(orderPosition.estimatedDeliveryTime).format("MMMM DD")}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${orderPosition.quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="js-preparing-status progress-label">
          Preparing
        </div>
        <div class="js-shipped-status progress-label">
          Shipped
        </div>
        <div class="js-delivered-status progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="js-progress-bar progress-bar"></div>
      </div>`;

    document.querySelector('.js-order-tracking').innerHTML = html;
    updateProgressBar(order.orderTime, orderPosition.estimatedDeliveryTime);
}


function updateProgressBar(orderStartDate, deliveryDate) {
    // calculate % progress
    orderStartDate = dayjs(orderStartDate);
    const currentDate = dayjs();
    deliveryDate = dayjs(deliveryDate);

    let progress = Math.round((currentDate - orderStartDate) / (deliveryDate - orderStartDate) * 100);

    // based on progress, select correct status
    if (progress < 50) {
        document.querySelector('.js-preparing-status').classList.add('current-status');
    } else if (progress >= 50 && progress < 100) {
        document.querySelector('.js-shipped-status').classList.add('current-status');
    } else {
        document.querySelector('.js-delivered-status').classList.add('current-status');
    }

    progress = (progress > 100) ? 100 : progress;

    document.querySelector('.js-progress-bar').style.width = `${progress}%`
    console.log(document.querySelector('.js-progress-bar').style);
}
