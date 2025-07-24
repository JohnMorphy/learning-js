function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        },
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productId, selectedQuantity) {
            let matchingItem = this.getCartItemById(productId);

            let quantity = selectedQuantity || 1;

            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }

            this.saveToStorage();
        },
        getCartItemById(productId) {

            let matchingItem;

            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });

            return matchingItem;
        },

        deleteFromCart(productId) {
            let matchingItem;
            let removeItemIndex = -1;

            this, cartItems.forEach((item, index) => {
                if (item.productId === productId) {
                    matchingItem = item;
                    removeItemIndex = index;
                }
            })

            this.cartItems.splice(removeItemIndex, 1);
            this.saveToStorage();
        },
        updateItemQuantity(productId, newQuantity) {
            if (newQuantity > 0 && newQuantity < 1000) {
                this.getCartItemById(productId).quantity = newQuantity;
                this.saveToStorage();
            }
        },

        calculateCartQuantity() {
            let cartQuantity = 0;

            this.cartItems.forEach((item) => {
                cartQuantity = Number(cartQuantity) + Number(item.quantity);
            });

            return cartQuantity;
        },
        updateDeliveryOption(productId, deliveryOptionId) {
            const matchingItem = this.getCartItemById(productId);

            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);