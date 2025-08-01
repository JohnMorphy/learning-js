import { beforeEach, describe, expect, it, vi } from "vitest";
import Product from "./Product";
import { render, screen } from '@testing-library/react';
import axios from "axios";
import userEvent from '@testing-library/user-event'

// create fake axios - that will not contact the backend
vi.mock('axios');

describe('Product component', () => {

    let product;
    let loadCart;

    // test hook
    beforeEach(() => {
        product = {
            "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
            "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
            "rating": {
                "stars": 4.5,
                "count": 87
            },
            "priceCents": 1090,
            "keywords": ["socks", "sports", "apparel"]
        };

        loadCart = vi.fn();
    })

    it('displays the product details correctly', () => {


        render(<Product loadCart={loadCart} product={product} />);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png');

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    })

    it('adds a product to a cart', async () => {
        {
            const product = {
                "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
                "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
                "rating": {
                    "stars": 4.5,
                    "count": 87
                },
                "priceCents": 1090,
                "keywords": ["socks", "sports", "apparel"]
            };

            const loadCart = vi.fn();

            render(<Product loadCart={loadCart} product={product} />);

            const user = userEvent.setup();
            user.click();

            // need to mock the add to cart button onClick
            const addToCartButton = screen.getByTestId('add-to-cart-button');
            await user.click(addToCartButton);

            expect(axios.post).toHaveBeenCalledWith('api/cart-items',
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                }
            );

            expect(loadCart).toHaveBeenCalled();
        }
    })

})