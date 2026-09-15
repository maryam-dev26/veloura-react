import { useParams, Link } from 'react-router-dom'
import { products } from '../data/product'

function ProductDetail() {
    const { id } = useParams()
    const product = products.find(p => p.id === Number(id))

    if (!product) {
        return <p>Product not found.</p>
    }

    return (
        <div className="product-detail">
            <img src={product.image} alt={product.name} />
            <div className="product-detail-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">৳ {product.price}</p>
                <button>Add to Cart</button>
                <Link to="/">← Back to shop</Link>
            </div>
        </div>
    )
}

export default ProductDetail