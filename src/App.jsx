import { products } from "./data/product"
import ProductCard from "./components/ProductCard"
import { useState } from "react"

function App() {
    const [activeCategory, setActiveCategory] = useState("all")
    const categories = ["all", "Bags", "Clothing", "Jewelry", "Shoes"]
    const [searchQuery, setSearchQuery] = useState("")

     const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
        })

    return (
        <>
        <div className="search-box" >
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
        </div>
            <div className="filters">
                {categories.map(category => (
                    <button
                        key={category}
                        className ={activeCategory === category? "active": ""}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

        <div id="product-grid">
            {filteredProducts.length === 0 ? (
                <p className="no-result">No products found </p>
            ) : (
                filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))
        )}            
        </div>
        </>    
    )
}


export default App
