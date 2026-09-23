import { createContext, useEffect, useState } from 'react'

export const WishlistContext = createContext()

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([])
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)

    function openWishlist() {
        setIsWishlistOpen(true)
    }

    function closeWishlist() {
        setIsWishlistOpen(false)
    }

    function toggleWishlist(productId) {
        setWishlist(prevWishlist => {
            if (prevWishlist.includes(productId)) {
                return prevWishlist.filter(id => id !== productId)
            } else {
                return [...prevWishlist, productId]
            }
        })
    }

    useEffect(() => {
    try {
        const saved = localStorage.getItem("wishlist")

        if (saved) {
            setWishlist(JSON.parse(saved))
        }
    } catch (error) {
        setWishlist([])
    }
}, [])

useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
}, [wishlist])

    return (
        <WishlistContext.Provider value={{
            wishlist,
            toggleWishlist,
            isWishlistOpen,
            openWishlist,
            closeWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    )
}