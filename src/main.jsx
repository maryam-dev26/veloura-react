import { ProductsProvider } from './context/ProductsContext.jsx'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ProductsProvider>
            <CartProvider>
                <WishlistProvider>
                    <App />
                </WishlistProvider>
            </CartProvider>
        </ProductsProvider>
    </BrowserRouter>
)
