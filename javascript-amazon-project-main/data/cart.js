export let cart;
loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function getCartItemById(productId) {

    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    return matchingItem;
}

export function updateItemQuantity(productId, newQuantity) {
    if (newQuantity > 0 && newQuantity < 1000) {
        getCartItemById(productId).quantity = newQuantity;
        saveToStorage();
    }
}

export function addToCart(productId, selectedQuantity) {
    let matchingItem = getCartItemById(productId);

    let quantity = selectedQuantity || 1;

    if (matchingItem) {
        matchingItem.quantity = Number(quantity) + Number(matchingItem.quantity);
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity = Number(cartQuantity) + Number(item.quantity);
    });

    return cartQuantity;
}

export function deleteFromCart(productId) {
    let matchingItem;
    let removeItemIndex = -1;

    cart.forEach((item, index) => {
        if (item.productId === productId) {
            matchingItem = item;
            removeItemIndex = index;
        }
    })

    cart.splice(removeItemIndex, 1);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = getCartItemById(productId);

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function fetchCart(fun) {
    const productRequest = new XMLHttpRequest();

    productRequest.addEventListener('load', () => {
        console.log(productRequest.responseText);
        fun();
    });

    productRequest.open('GET', 'https://supersimplebackend.dev/cart');
    productRequest.send();
}

export async function asyncFetchCart() {

    const response = await fetch('https://supersimplebackend.dev/cart');
    const responseText = await response.text();

    console.log(responseText);
}

