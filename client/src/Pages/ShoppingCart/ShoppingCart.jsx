import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { CartItem } from '../../Components/CartItem/CartItem'
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import './ShoppingCart.css'



export const ShoppingCart = () => {
  const { userAuth } = useContext(AuthContext)
  // const { setCartSize } = useContext(CartContext)
  const [cartItem, setCartItem] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/cart/'+userAuth.id, {method:'GET'})
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCartItem(data)
      data.map((i)=>console.log(i.productId))
    })
  }, []);

  useEffect(()=>{
    // setCartSize(cartItem.length)
  }, [cartItem])

  const checkStock = async (productId, quantity) => {
    console.log("Checking stock for product: ", productId, " with quantity: ", quantity)
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/product/'+productId, {method:'GET'});
    const data = await res.json();


    if (data.data.stock < quantity) {
      return [false, data.data.name, data.data.price * data.data.discount];
    }
    else {
      return [true, data.data.name, data.data.price * data.data.discount];
    }
  }

  const handleCheckout = async () => {
    // check stock and get real time price
    let checkoutItems = []
    let outOfStockItems = []

    setError('')
    if (cartItem.length === 0) {
      setError("Cart is empty")
      return;
    }

    await Promise.all(cartItem.map(async (i)=>{
      let [instock, name, price] = await checkStock(i.productId, i.quantity);
      console.log(instock, name, price)
      if (instock) {
        checkoutItems.push({
          productId: i.productId,
          quantity: i.quantity,
          price: price
        })
      }
      else {
        outOfStockItems.push(name)
      }
    }))

    if (outOfStockItems.length > 0) {
      alert("Some items are out of stock: "+outOfStockItems.join(", "))
      return;
    }
    console.log(checkoutItems)

    fetch(process.env.REACT_APP_BACKEND_URL + '/api/order/create', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userAuth.id,
        products: checkoutItems
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      // set local storage for order id
      localStorage.setItem('orderId', data.id)
      setRedirect(true)
    })
  }

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
            <button onClick={handleCheckout} class="check-out-button">CHECKOUT</button>
        </div>
        {error && <p class="check-out-error">{error}</p>}
        {redirect && <Navigate to="/checkout" />}
      </div>
    </div>
  )
}
