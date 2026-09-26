import { createContext, useState, useEffect } from 'react'

export const ProductsContext = createContext()

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch("https://dummyjson.com/products")

                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await response.json()
                const mapped = data.products.map(item => ({
                    id: item.id,
                    name: item.title,
                    category: item.category,
                    price: item.price,
                    description: item.description,
                    image: item.thumbnail,
                    rating: item.rating
                }))
                setProducts(mapped)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductsContext.Provider>
    )
}