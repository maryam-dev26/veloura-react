import { products } from "../data/product"
import  ProductCard from "../components/ProductCard"
import { useState } from "react"
import { Link } from "react-router-dom"
import CartDrawer from "../components/CartDrawer"


function Home() {
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
            <section id="home">
                <h1>Discover Your Style</h1>
                <p>Timeless fashion for every occasion.</p>
                <button>Shop Now</button>
            </section>

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
            
            <section id="shop">
                <h2>Featured Products</h2>
                <div id="product-grid">
                    {sortedProducts.length === 0 ? (
                        <p className="no-result">🔍<br/>No products found </p>
                    ) : (
                        sortedProducts.map(product => (

                            <Link to={`/product/${product.id}`} key={product.id} className="card-link">
                                <ProductCard product={product} />
                            </Link>
                        ))
                    )}            
                </div>
            </section>
            <CartDrawer />
        </>    
    )
}


export default Home