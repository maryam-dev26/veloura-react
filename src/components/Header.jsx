import { Link } from "react-router-dom"
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from "../context/WishlistContext"

function Header() {
    const { cart, openCart } = useContext(CartContext)
    const { wishlist, openWishlist } = useContext(WishlistContext)

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

    return (
        <header>
            <nav>
                <Link to="/" className="logo">Veloura</Link>
                <button 
                    id="hamburger-btn" 
                    className="hamburger" 
                    aria-expanded="false" 
                    aria-label="Toggle menu"
                >
                    ☰
                </button>

                <div id="nav-links" className="nav-links">
                    <div className="nav-pages">
                        <Link to="/">Home</Link>
                        <a href="#shop">Shop</a>
                    </div>
                    <div className="nav-actions">
                        <button id="cart-button" onClick={openCart}>
                            🛒 <span>{totalQuantity}</span>
                        </button>
                        
                        <button 
                            id="wishlist-button" 
                            onClick={openWishlist}>
                            ♥ <span>{wishlist.length}</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header