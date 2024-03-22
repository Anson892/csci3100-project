import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ProductImage from '../../Assets/Images/ButterflyChair.jpg'
import add_icon from '../../Assets/Icons/add-icon.svg'
import minus_icon from '../../Assets/Icons/minus-icon.svg'
import './CartItem.css'

export const CartItem = () => {

    // const [count, setCount]=useState(0);
    // const decrement = () => {
    //     if( count > 0)
    //     setCount(count-1);
    // };
    // const increment = () => {
    //     setCount(count+1);
    // };

    return (
        
      <div class="cart-item">
        <div class="cart-product-box">
            <img class="cart-product-img" src={ ProductImage } alt="product img"></img>
            <div class="cart-product-description">
                <div class="cart-product-status">ON SALE</div>
                <div class="cart-product-name">looooooooooooooong product name</div>
            </div>
        </div>
        <div className='ProductAmountBox'>
            {/* <button>
                <img className = 'ProductAmountContainer_add' src = {add_icon} alt="add" onClick={increment}/>
            </button>
            <button>
                <img className = 'ProductAmountContainer_minus' src = {minus_icon} alt="minus" onClick={decrement}/>
            </button> */}
        </div>
        <div class="item-price">$30</div>
        <div class="subtotal">$150</div>
        <button class="cart-cancel-button">X</button>
      </div>
    )
  }