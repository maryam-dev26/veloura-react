import { useContext } from 'react';
import { CartContext } from '../context/CartContext'

export default function ProductCard ({product}) {
    const { addToCart } = useContext(CartContext)
      return (
        <article className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">৳ {product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </article>
    )
}

