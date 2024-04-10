import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const url5 = "http://localhost:8080/api/cart/add";
    fetch(url5, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: item.userid, // !!!! to be filled after login system !!!!
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
          // redirect to cart page
          if (array1.message == "Product added to cart") {
            setCartItems([...cartItems, item]);
          }
          else {
            for (let i = 0; i < cartItems.length; i++) {
              if (cartItems[i].id === item.id) {
                cartItems[i].count += item.count;
                setCartItems([...cartItems]);
              }
            }
          }
        }
      });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
