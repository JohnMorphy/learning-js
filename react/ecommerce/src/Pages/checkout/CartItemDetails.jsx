import axios from "axios"
import { formatMoney } from "../../utils/money"
import { useState } from "react";

export default function CartItemDetails({ cartItem, loadCart }) {

  const [updatingQuantity, setUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateButtonClicked = async () => {

    if (updatingQuantity && updatingQuantity != '') {
      await axios.put(`api/cart-items/${cartItem.product.id}`, {
        quantity: Number(quantity)
      })
      await loadCart();
    }

    setUpdatingQuantity(!updatingQuantity);
  }

  const inputKeyPressed = async (event) => {
    if (event.key === "Enter") {
      updateButtonClicked();
    } else if (event.key === "Escape") {
      event.target.value = cartItem.quantity;
      setQuantity(cartItem.quantity);
      setUpdatingQuantity(!updatingQuantity);
    }
  }

  return (
    <div className="cart-item-details">
      <div className="product-name">
        {cartItem.product.name}
      </div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        {updatingQuantity ?
          <input
            className="quantity-textbox"
            type="number"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            onKeyDown={inputKeyPressed}
          />
          :
          <span>
            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
          </span>}
        <span onClick={updateButtonClicked} className="update-quantity-link link-primary">
          Update
        </span>
        <span
          className="delete-quantity-link link-primary"
          onClick={deleteCartItem}>
          Delete
        </span>
      </div>
    </div>
  )

}