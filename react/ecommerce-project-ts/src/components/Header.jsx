import './Header.css';

import { NavLink, useNavigate, useSearchParams } from 'react-router';

import logoWhite from '../assets/images/logo-white.png'
import mobileLogoWhite from '../assets/images/mobile-logo-white.png'
import searchIcon from '../assets/images/icons/search-icon.png'
import cartIcon from '../assets/images/icons/cart-icon.png'
import { useState } from 'react';

export default function Header({ cart }) {

    const [searchParams] = useSearchParams();

    const [searchInput, setSearchInput] = useState(searchParams.get('search') || "");
    const navigate = useNavigate();

    let totalQuantity = 0;
    cart.forEach(cartItem => {
        totalQuantity += Number(cartItem.quantity);
    });

    const changeSearch = (event) => {
        setSearchInput(event.target.value);
    }

    const search = () => {
        navigate(`/?search=${searchInput}`);
    }

    const searchOnEnter = (event) => {
        if (event.key === "Enter") {
            search();
        }
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={logoWhite} />
                    <img className="mobile-logo"
                        src={mobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input
                    onChange={changeSearch}
                    onKeyDown={searchOnEnter}
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                />

                <button
                    className="search-button"
                    onClick={search}
                >
                    <img className="search-icon" src={searchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={cartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}