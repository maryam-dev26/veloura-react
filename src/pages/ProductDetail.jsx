import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import { useProducts } from '../hooks/useProducts'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'


function ProductDetail() {
    const { id } = useParams()
    const { products, loading, error } = useProducts()
    const { addToCart } = useContext(CartContext)
    const { wishlist, toggleWishlist } = useContext(WishlistContext)

    if (loading) {
            return (
                <div className="loading-state">
                    <div className="spinner"></div>
                </div>
            )
        }
    if (error) return <p>{error}</p>
 
    const product = products.find(p => p.id === Number(id))
    if (!product) {
        return <p>Product not found.</p>
    }

    const isWishlisted = wishlist.includes(product.id)

    return (
        <div className="product-detail">
            <button className="wishlist-btn" 
                onClick={() => toggleWishlist(product.id)}>
                {isWishlisted ? "♥" : "♡"}
            </button>
            
            <div className="product-detail-image">
                <img src={product.image} alt={product.name} />
                <button 
                    className="wishlist-btn"   
                    onClick={() => toggleWishlist(product.id)}>
                    {isWishlisted ? "♥" : "♡"}
                </button>
            </div>

            <div className="product-detail-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">৳ {product.price}</p>
                <button 
                    onClick={() => addToCart(product.id)}>
                        Add to Cart
                </button>
                <Link to="/">← Back to shop</Link>
            </div>
        </div>
    )
}

export default ProductDetail