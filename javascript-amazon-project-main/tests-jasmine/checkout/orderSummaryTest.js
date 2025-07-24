import renderItemCart from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { fetchProducts, fetchProductsXHR } from '../../data/products.js';



describe('test suite: renderItemCart', () => {


    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll(async () => {
        await fetchProducts();
        /*
        fetchProductsXHR(() => {
            done();
        });*/
    });

    beforeEach(() => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1',
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2',
            }]);
        });
        console.log('cart: ' + localStorage.getItem('cart'));

        document.querySelector('.js-test-container')
            .innerHTML = `
            <div class = "js-checkout-header-middle-section"></div>
            <div class = "js-payment-summary"></div>
            <div class = "js-order-summary"></div>`;

        loadFromStorage();
        renderItemCart();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })

    it('display the cart', () => {

        console.log();

        expect(document.querySelector(`.js-quantity-label-${productId1}`).innerHTML).toBe('2');
        expect(document.querySelector(`.js-quantity-label-${productId2}`).innerHTML).toBe('1');
    })

    it('removes a product', () => {

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    })
})