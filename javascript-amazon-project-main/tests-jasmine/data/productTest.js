import * as productBundle from '../../data/products.js';
import { mappingService } from '../../data/products.js';
import { productGetter } from '../../data/products.js';
import { Product, Appliance, Clothing } from '../../data/products.js';
import { renderProductGrid, updateCartQuantity } from '../../scripts/amazon/loadProducts.js';

describe("testing suite fo products", () => {

    let products = [];

    const regularProductId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const clothingProductId = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    const applianceProductId = "54e0eccd-8f36-462b-b68a-8182611d9add";

    beforeEach(() => {
        products = [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ]
        },
        {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
                stars: 4,
                count: 127
            },
            priceCents: 2095,
            keywords: [
                "sports",
                "basketballs"
            ]
        },
        {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        },
        {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        }];

        spyOn(productGetter, "getProducts").and.callFake(() => products);
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it("correctly maps products", () => {
        products = mappingService.mapProducts(products);
        expect(productBundle.productGetter.getProducts().length).toBe(4);

        expect(products[0]).toBeInstanceOf(Product);
        expect(products[2]).toBeInstanceOf(Clothing);
        expect(products[3]).toBeInstanceOf(Appliance);

        document.querySelector('.js-test-container').innerHTML = `
        <div class = 'js-cart-quantity'></div>
        <div class = 'js-products-grid'></div>`;

        productBundle.fetchProductsXHR(renderProductGrid());
        updateCartQuantity();

        expect(document.querySelector(`.js-product-container-${clothingProductId}`).innerHTML).toContain('Size chart');
        expect(document.querySelector(`.js-product-container-${applianceProductId}`).innerHTML).toContain('Warranty');
    });
});