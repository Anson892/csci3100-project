import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartContextProvider = ( {children} ) => {
    const [cartSize, setCartSize] = useState(0)
        
    return (
        <CartContext.Provider value={{cartSize, setCartSize}}>
            {children}
        </CartContext.Provider>
    )
}