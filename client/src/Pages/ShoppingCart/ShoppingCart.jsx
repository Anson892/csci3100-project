import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { CartItem } from '../../Components/CartItem/CartItem'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './ShoppingCart.css'



export const ShoppingCart = () => {
  const { userAuth } = useContext(AuthContext)
  const [cartItem, setCartItem] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/cart/'+userAuth.id, {method:'GET'})
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCartItem(data)
      data.map((i)=>console.log(i.productId))
    })
  }, []);

  return (
    <div class="shopping-cart">
      <Navbar/>
      <div class="cart-container">
        <div class="cart-header">
          <p class="cart-title">MY CART</p>
          <p class="cart-count">{cartItem.length} {cartItem.length > 1 ? "items" : "item"}</p>
        </div>
        <div class="cart-list">
          {cartItem.length ? cartItem.map((i)=><CartItem id={i.productId} quantity={i.quantity} />) : <p>Cart is empty</p>}
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
