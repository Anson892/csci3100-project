import React from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { CartItem } from '../../Components/CartItem/CartItem'
import { Link } from 'react-router-dom';
import './ShoppingCart.css'

export const ShoppingCart = () => {
  return (
    <div class="shopping-cart">
      <Navbar/>
      <div class="cart-container">
        <div class="cart-header">
          <p class="cart-title">MY CART</p>
          <p class="cart-count">5 items</p>
        </div>
        <div class="cart-list">
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
        </div>
        <div class="cart-footer">
          <Link to={'/checkout'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
            <button class="check-out-button">CHECKOUT</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
