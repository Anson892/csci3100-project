import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar'
import logo from '../../Assets/logo.svg';
import shopping_cart_icon from '../../Assets/Icons/shopping_cart_icon.svg'

export const Navbar = () => {

    return (
        <div className="navbar">
            <Link to={'/'}>
                <div className="nav-logo">
                    <img src={logo} alt="" />
                </div>
            </Link>
            <div className="search-bar-container">
                <SearchBar/>
            </div>
            <div className="nav-right">
                <Link to={'/shopping-cart'}>
                    <img src={shopping_cart_icon} alt="" />
                </Link>
                <Link to={'/login'}>
                    <button>
                        <p>Login</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}
