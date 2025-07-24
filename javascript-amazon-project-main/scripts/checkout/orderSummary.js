import { updateDeliveryOption, updateItemQuantity, cart, deleteFromCart, getCartItemById } from '../../data/cart.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';
import { deliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import renderPaymentSummary from './paymentSummary.js';
import renderHeader from './checkoutHeader.js';
import { productGetter } from '../../data/products.js';

export default function renderItemCart() {

  renderHeader();

  let cartSummaryHTML = ''

  cart.forEach((item) => {

    const productId = item.productId;

    const matchingProduct = productGetter.getProductById(productId)
    const deliveryOptionId = item.deliveryOptionId;

    const today = dayjs();
    const deliveryDate = calculateDeliveryDate(deliveryOptionId, today);

    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="js-cart-item-container-${productId} cart-item-container">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${matchingProduct.getPrice()} 
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="js-quantity-label-${productId} quantity-label">${item.quantity}</span>
                </span>
                <span class="js-update-quantity-link js-update-quantity-link-${productId} update-quantity-link link-primary" data-product-id=${productId}>
                  Update
                </span>
                <input type='number' class="js-quantity-input-${productId} quantity-input">
                <span class="js-quantity-save-link js-quantity-save-link-${productId} quantity-save-link link-primary" data-product-id=${productId}>
                    Save
                </span>
                <span class="js-delete-link-${productId} js-delete-product-link delete-quantity-link link-primary" data-product-id=${productId}>
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(item)}
            </div>
          </div>
        </div>
    `;
  });

  function deliveryOptionsHTML(item) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = calculateDeliveryDate(deliveryOption.id, today);

      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = (deliveryOption.id === item.deliveryOptionId);
      const checkedAtribute = isChecked ? 'checked' : '';

      html += `<div class="js-delivery-option delivery-option"
              data-product-id=${item.productId} data-delivery-option-id=${deliveryOption.id}>
                
              <input type="radio" ${checkedAtribute} class="delivery-option-input" name="delivery-option-${item.productId}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
            </div>`
    })

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-product-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        deleteFromCart(productId);

        renderItemCart();

        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const quantityCountElement = document.querySelector(`.js-quantity-label-${productId}`);
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const saveLink = document.querySelector(`.js-quantity-save-link-${productId}`);

        quantityInput.value = getCartItemById(productId).quantity;

        element.classList.add('hide-update-button');
        quantityCountElement.classList.add('hide-update-button');
        quantityInput.classList.add('is-editing-quanity');
        saveLink.classList.add('is-editing-quanity');
      });
    });

  document.querySelectorAll('.js-quantity-save-link')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        const newQuantity = quantityInput.value;
        updateItemQuantity(productId, newQuantity);

        renderItemCart();
        renderPaymentSummary();
      })
    });

  document.querySelectorAll('.js-delivery-option').forEach(
    (element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderItemCart();
        renderPaymentSummary();

      })
    }
  )
}

