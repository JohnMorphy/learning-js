import dayjs from "dayjs";
import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";

export default function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && cart.map((cartItem) => {

        const selectDeliveryOption = deliveryOptions.find(deliveryOption => {
          return cartItem.deliveryOptionId === deliveryOption.id;
        });

        const deliveryDate = dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {deliveryDate}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />

              <CartItemDetails cartItem={cartItem} />

              <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
            </div>
          </div>
        )
      })}
    </div>
  );
}