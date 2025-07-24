import renderItemCart from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import { fetchProductsXHR, fetchProducts } from '../data/products.js';
import { fetchCart, asyncFetchCart } from '../data/cart.js';
// import '../data/car.js';
// import '../data/backend-practise.js'


async function loadPage() {
    try {
        await Promise.all([
            fetchProducts(),
            asyncFetchCart(),
        ]);

        renderItemCart();
        renderPaymentSummary();
    } catch (error) {
        console.log(error);
    }
}

loadPage();

/*
function loadPageLong() {
    return new Promise((resolve) => {
        console.log('load page - long');
        resolve('value LONG');
    }).then(() => {
        return fetchProducts();
    }).then(() => {
        return new Promise((resolve) => {
            resolve('value LONG');
        })
    });
}
*/

/*
Promise.all([
    loadPage(),
    loadPageLong(),
]).then((values) => {
    console.log(values);
    console.log('both function loaded, am i right?')
});*/

/*
Promise.all([
    fetchProducts(),
    new Promise((resolve) => {
        fetchCart(() => {
            resolve();
        })
    }),

]).then((values) => {
    console.log(values);
    renderItemCart();
    renderPaymentSummary();
});
*/

// value --> used for sharing values between the steps

/*
new Promise((resolve) => {
    fetchProductsXHR(() => {
        resolve("value1");
    });

}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        fetchCart(() => {
            resolve("value2");
        })
    })

}).then(() => {
    renderItemCart();
    renderPaymentSummary();
});
*/


/*
fetchProductsXHR(() => {
    fetchCart(() => {
        renderItemCart();
        renderPaymentSummary();
    });
});
*/