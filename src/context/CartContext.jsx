import { createContext, useState, useEffect, useReducer } from 'react'

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD": {
            const existingItem = state.find(item => item.productId === action.payload)
            if (existingItem) {
                return state.map(item =>
                    item.productId === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { productId: action.payload, quantity: 1 }]
            }
        }
        case "INCREASE":
            return state.map(item =>
                item.productId === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        case "DECREASE":
            return state
                .map(item =>
                    item.productId === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        case "REMOVE":
            return state.filter(item => item.productId !== action.payload)

        case "LOAD":
            return action.payload
        default:
            return state
    }
}

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [])
    const [isCartOpen, setIsCartOpen] = useState(false)

    function addToCart(productId) {
        dispatch({ type: "ADD", payload: productId })
    }

    function increaseQuantity(productId) {
        dispatch({ type: "INCREASE", payload: productId })
    }

    function decreaseQuantity(productId) {
        dispatch({ type: "DECREASE", payload: productId })
    }

    function removeFromCart(productId) {
        dispatch({ type: "REMOVE", payload: productId })
    }
    function openCart() {
        setIsCartOpen(true)
    }

    function closeCart() {
        setIsCartOpen(false)
    }

useEffect(() => {
    try {
        const saved = localStorage.getItem("cart")
        if (saved) {
            dispatch({ type: "LOAD", payload: JSON.parse(saved) })
        }
    } catch (error) {
       dispatch({ type: "LOAD", payload: [] })
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