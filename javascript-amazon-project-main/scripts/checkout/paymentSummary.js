import { cart, calculateCartQuantity } from '../../data/cart.js'
import { getDeliveryOptionById } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js'
import { productGetter } from '../../data/products.js'
import { addOrder } from '../../data/orders.js';

function getProductCostInCents() {
  let sumPriceCents = 0;

  cart.forEach(item => {
    const product = productGetter.getProductById(item.productId);
    sumPriceCents = Number(sumPriceCents) + Number(product.priceCents) * Number(item.quantity);
  });

  return sumPriceCents;
}

function getDeliveryCostInCents() {
  let sumPriceCents = 0;

  cart.forEach(item => {
    const deliveryOption = getDeliveryOptionById(item.deliveryOptionId);
    sumPriceCents = Number(sumPriceCents) + Number(deliveryOption.priceCents);
  });

  return sumPriceCents;
}

export default function renderPaymentSummary() {

  const productCostInCents = getProductCostInCents();

  const deliveryCostInCents = getDeliveryCostInCents();

  const totalBeforeTax = productCostInCents + deliveryCostInCents;
  const taxCents = totalBeforeTax * 0.1;

  const totalCents = totalBeforeTax + taxCents;

  const cartQuantity = calculateCartQuantity();

  const paymentSummaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (<span class='js-product-count'>${cartQuantity}</span>):</div>
          <div class="payment-summary-money">$${formatCurrency(productCostInCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(deliveryCostInCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="js-place-order-button place-order-button button-primary">
          Place your order
        </button>
    `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  const orderButton = document.querySelector('.js-place-order-button');

  orderButton.addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();

      addOrder(order);

    } catch (error) {
      console.log('Unexpected error, failed to place an order')
    }

    window.location.href = 'orders.html';

  });

}

