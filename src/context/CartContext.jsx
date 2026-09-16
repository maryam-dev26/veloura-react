import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    function addToCart(productId) {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId)
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { productId, quantity: 1 }]
            }
        })
    }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}