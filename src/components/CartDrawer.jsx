import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useProducts } from '../hooks/useProducts'


export function CartDrawer() {
    const { products} = useProducts()
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart,  isCartOpen, closeCart} = useContext(CartContext)

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId)
        return sum + (product.price * item.quantity)
    }, 0)

    return (
        <>
         <aside id="cart-drawer" className={isCartOpen ? "open" : ""}>
            
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button onClick={closeCart}>✕</button>
            </div>

            <div id="cart-items">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map(item => {
                        const product = products.find(p => p.id === item.productId)
                        return (
                            <div className="cart-item" key={item.productId}>
                                <img src={product.image} alt={product.name} />
                                <div className="cart-item-info">
                                    <h4>{product.name}</h4>
                                    <p>৳ {product.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decreaseQuantity(item.productId)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.productId)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>🗑</button>
                            </div>
                        )
                    })
                )}
            </div>

            <div className="cart-footer">
                <p>Total: <span>৳ {total}</span></p>
            </div>
        </aside>
        
        <div id="cart-overlay" className={isCartOpen ? "active" : ""} onClick={closeCart}></div>
    </>   
    )
    
}

export default CartDrawer