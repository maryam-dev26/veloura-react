export default function ProductCard ({product}) {
      return (
        <article className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">৳ {product.price}</p>
        </article>
    )
}

