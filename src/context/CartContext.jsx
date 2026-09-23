import { createContext,  useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

     function openCart() {
        setIsCartOpen(true)
    }

    function closeCart() {
        setIsCartOpen(false)
    }

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

    function increaseQuantity(productId) {
    setCart(prevCart =>
        prevCart.map(item =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    )
}

function decreaseQuantity(productId) {
    setCart(prevCart =>
        prevCart
            .map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0)
    )
}

function removeFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId))
}

useEffect(() => {
    try {
        const saved = localStorage.getItem("cart")
        if (saved) {
            setCart(JSON.parse(saved))
        }
    } catch (error) {
        setCart([])
    }
}, [])

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
}, [cart])

    return (
        <CartContext.Provider value={{
            cart, 
            addToCart, 
            increaseQuantity, 
            decreaseQuantity, 
            removeFromCart, 
            isCartOpen,
            openCart,
            closeCart
            }}>
                {children}
        </CartContext.Provider>
    )
}