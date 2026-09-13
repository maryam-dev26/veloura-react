import { products } from "./data/product"
import ProductCard from "./components/ProductCard"
import { useState } from "react"

function App() {
    const [activeCategory, setActiveCategory] = useState("all")
    const categories = ["all", "Bags", "Clothing", "Jewelry", "Shoes"]

        const filteredProducts = activeCategory === "all"
        ? products
        : products.filter(product => product.category === activeCategory)

    return (
        <>
            <div className="filters">
                {categories.map(category => (
                    <button
                        className ={activeCategory === category? "active": ""}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

        <div id="product-grid">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}            
        </div>
        </>    
    )
}


export default App
