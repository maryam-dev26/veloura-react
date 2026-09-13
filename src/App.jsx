import { products } from "./data/product"
import ProductCard from "./components/ProductCard"

function App() {
    return (
        <div id="product-grid">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}            
        </div>
    )
}


export default App
