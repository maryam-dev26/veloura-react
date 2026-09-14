import { products } from "./data/product"
import ProductCard from "./components/ProductCard"
import { useState } from "react"

function App() {
    const [activeCategory, setActiveCategory] = useState("all")
    const categories = ["all", "Bags", "Clothing", "Jewelry", "Shoes"]
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOption, setSortOption] = useState("default")

     const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
        })

    const sortedProducts = [...filteredProducts]
        if (sortOption === "price-low") {
            sortedProducts.sort((a, b) => a.price - b.price)
        } else if (sortOption === "price-high") {
            sortedProducts.sort((a, b) => b.price - a.price)
        } else if (sortOption === "name-az") {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortOption === "name-za") {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        }
    
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

            <select id="sort-select" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
            </select>

        <div id="product-grid">
            {sortedProducts.length === 0 ? (
                <p className="no-result">🔍<br/>No products found </p>
            ) : (
                sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))
        )}            
        </div>
        </>    
    )
}


export default App
