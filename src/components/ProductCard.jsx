import { useContext } from 'react';
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext';

export default function ProductCard ({product}) {
    const { addToCart } = useContext(CartContext)
     const { wishlist, toggleWishlist } = useContext(WishlistContext)

    const isWishlisted = wishlist.includes(product.id)

      return (
        <article className="card">
            <button
                className="wishlist-btn"
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    toggleWishlist(product.id)
                }}
            >
                {isWishlisted ? "♥" : "♡"}
            </button>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">৳ {product.price}</p>
            <button
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    addToCart(product.id)
                }}
            >
                Add to Cart
            </button>
        </article>
    )
}

