import { createContext, useState } from 'react'

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