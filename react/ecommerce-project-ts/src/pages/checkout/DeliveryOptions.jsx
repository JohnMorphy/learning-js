import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

import axios from "axios";

export default function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {

        let priceString = 'FREE shipping';

        if (deliveryOption.priceCents > 0) {
          priceString = formatMoney(deliveryOption.priceCents);
        }

        const updateDeliveryOption = async () => {
          await axios.put(`api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id
          });
          await loadCart();
        }

        return (
          <div key={deliveryOption.id} className="delivery-option"
            onClick={updateDeliveryOption}>
            <input
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => { }}
              type="radio"
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {`${priceString} - shipping`}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}