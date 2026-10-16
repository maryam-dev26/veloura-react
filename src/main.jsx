import { ProductsProvider } from './context/ProductsContext.jsx'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import './style.css'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <ProductsProvider>
                <CartProvider>
                    <WishlistProvider>
                        <App />
                    </WishlistProvider>
                </CartProvider>
            </ProductsProvider>
        </AuthProvider>
    </BrowserRouter>
)
