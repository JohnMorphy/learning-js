import './HomePage.css'

import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import HomePage from './HomePage';
import userEvent from '@testing-library/user-event'


// memory router --> specifically for testing
import { MemoryRouter } from 'react-router';

vi.mock('axios');

describe('HomePage component', () => {

    let loadCart;
    let user;

    beforeEach(() => {
        loadCart = vi.fn();
        user = userEvent.setup();

        // mock implementation should directly mock the real response
        // use async --> has to return a promise the be the same as real response
        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
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
                        keywords: ["sports", "basketballs"]
                    }]
                }
            }
        })
    })

    it('displays the products correctly', async () => {

        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />)
            </MemoryRouter>
        )

        // findByTestId as opposed to getByTestId is asynchronous and returns a promise
        const productContainers = await screen.findAllByTestId('product-container');

        expect(productContainers.length).toBe(2);

        expect(
            within(productContainers[0])
                .getByText(
                    "Black and Gray Athletic Cotton Socks - 6 Pairs"
                )).toBeInTheDocument();


        expect(
            within(productContainers[1])
                .getByText(
                    "Intermediate Size Basketball"
                )).toBeInTheDocument();
    })

    it('add to cart buttons', async () => {

        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        )

        const productContainers = await screen.findAllByTestId('product-container');
        const addToCartFirst = within(productContainers[0]).getByTestId('add-to-cart-button');
        const selectorFirst = within(productContainers[0]).getByTestId('quantity-selector');
        await user.selectOptions(selectorFirst, "2");

        const addToCartSecond = within(productContainers[1]).getByTestId('add-to-cart-button');
        const selectorSecond = within(productContainers[1]).getByTestId('quantity-selector');
        await user.selectOptions(selectorSecond, "3");

        await user.click(addToCartFirst);
        await user.click(addToCartSecond);

        expect(axios.post).toHaveBeenNthCalledWith(1, 'api/cart-items', {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
        });

        expect(axios.post).toHaveBeenNthCalledWith(2, 'api/cart-items', {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 3,
        });

        expect(loadCart).toHaveBeenCalledTimes(2);
    })

})