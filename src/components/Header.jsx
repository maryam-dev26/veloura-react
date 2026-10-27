import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect  } from 'react'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from "../context/WishlistContext"
import { useAuth } from "../context/AuthContext"

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { cart, openCart } = useContext(CartContext)
    const { wishlist, openWishlist } = useContext(WishlistContext)

    const {isAuthenticated, user, logout} = useAuth()
    const navigate = useNavigate()

    function handleLogOut () {
        logout()
        navigate('/')
    }

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    return (
        <header>
            <nav>
                <Link to="/" className="logo">Veloura</Link>
                <button 
                    id="hamburger-btn" 
                    className="hamburger" 
                    aria-expanded={isMenuOpen} 
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    ☰
                </button>

                <div 
                    id="nav-links" 
                    className={`nav-links ${isMenuOpen ? "open" : ""}`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            closeMenu()
                        }
                    }}
                >
                    <div className="nav-pages">
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <a href="#shop" onClick={closeMenu}>Shop</a>
                    </div>
                    <div className="nav-actions">
                        <button id="cart-button" onClick={() => { closeMenu(); openCart() }}>
                            🛒 <span>{totalQuantity}</span>
                        </button>
                        
                        <button 
                            id="wishlist-button" 
                            onClick={() => { closeMenu(); openWishlist() }}>
                            ♥ <span>{wishlist.length}</span>
                        </button>

                        {isAuthenticated ? (
                            <>
                                <span>Hi, {user?.name}</span>
                                <button onClick={() => { closeMenu(); handleLogOut() }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={closeMenu}>Login</Link>
                                <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header
