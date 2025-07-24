import { renderOrders } from "../data/orders.js";
import { updateCartQuantity } from "./amazon/loadProducts.js";

renderOrders();
updateCartQuantity();