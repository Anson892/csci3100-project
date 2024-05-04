import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const addToCartUrl = process.env.REACT_APP_BACKEND_URL + "/api/cart/add";
    fetch(addToCartUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: item.userid,
        productId: item.id,
        quantity: item.count,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        var text = JSON.stringify(response);
        var array1 = JSON.parse(text);
        if (array1.success == true) {
          if (array1.message == "Product added to cart") {
            // new product in cart
            setCartItems([...cartItems, item]);
          }
          else {
            // product already in cart
            for (let i = 0; i < cartItems.length; i++) {
              if (cartItems[i].id === item.id) {
                cartItems[i].count += item.count;
                setCartItems([...cartItems]);
              }
            }
          }
        }
        else {
          // not enough stock available
          alert(array1.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
