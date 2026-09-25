import { useContext } from 'react'
import { WishlistContext } from '../context/WishlistContext'
import { CartContext } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'


function WishlistDrawer() {
    const { products} = useProducts()
    const { wishlist, toggleWishlist, isWishlistOpen, closeWishlist } = useContext(WishlistContext)
    const { addToCart } = useContext(CartContext)

function handleMoveToCart(productId) {
    addToCart(productId)
    toggleWishlist(productId)
}

    return (
        <>
        <aside id="wishlist-drawer" className={isWishlistOpen ? "open" : ""}>
            <div className="cart-header">
                <h2>Your Wishlist</h2>
                <button onClick={closeWishlist}>✕</button>
            </div>

            <div id="wishlist-items">
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlist.map(id => {
                        const product = products.find(p => p.id === id)
                        return (
                            <div className="wishlist-item" key={id}>
                                <img src={product.image} alt={product.name} />
                                <div>
                                    <h4>{product.name}</h4>
                                    <p>৳ {product.price}</p>
                                    <button onClick={() => handleMoveToCart(id)}>Move to Cart</button>
                                </div>
                                <button className="remove-wishlist-btn" onClick={() => toggleWishlist(id)}>✕</button>
                            </div>
                        )
                    })
                )}
            </div>
        </aside>
        <div id="wishlist-overlay" className={isWishlistOpen ? "active" : ""} onClick={closeWishlist}></div>
        </>
    )
}

export default WishlistDrawer