import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CartProvider>
            <WishlistProvider>
                <App />
            </WishlistProvider>
        </CartProvider>
    </BrowserRouter>
)
