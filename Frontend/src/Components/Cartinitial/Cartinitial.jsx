
import React from 'react';
import './Cartinitial.css';

const Cartinitial = ({ itemsInCart }) => {
    if (itemsInCart.length === 0) {
        return <p className="empty-cart-message">Your cart is empty.</p>;
    }

    const totalItems = itemsInCart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = itemsInCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const shippingCost = 5.0;
    const totalCost = (parseFloat(subtotal) + shippingCost).toFixed(2);

    return (
        <div className="cart-container">
            <div className="cart-widget">
                <h2 className="header">Shopping Cart</h2>
                <div className="product-row header-row">
                    <span>Product Details</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Total</span>
                </div>
                {itemsInCart.map((item, index) => (
                    <div key={index} className="product-row">
                        <div>
                            <span className="product-name">{item.name}</span><br />
                            <span className="product-platform">{item.platform}</span>
                        </div>
                        <div className="quantity-controls">
                            <button className="button">-</button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button className="button">+</button>
                        </div>
                        <span className="price">Rs.{item.price}</span>
                        <span className="total">Rs.{(item.price * item.quantity).toFixed(2)}</span>
                        <button className="button-remove">Remove</button>
                    </div>
                ))}
                <a href="#" className="link">Continue Shopping</a>
                <span className="item-count">{totalItems} Items</span>
            </div>
            <div className="order-summary">
                <h2 className="header">Order Summary</h2>
                <div className="product-row">
                    <span>Items</span>
                    <span>£{subtotal}</span>
                </div>
                <div className="product-row">
                    <span>Shipping</span>
                    <span>Standard Delivery - £{shippingCost.toFixed(2)}</span>
                </div>
                <div className="promo-code">
                    <label htmlFor="promo-code">Promo Code</label>
                    <input type="text" id="promo-code" placeholder="Enter your code" className="input" />
                    <button className="button">Apply</button>
                </div>
                <div className="product-row total-cost">
                    <span>Total Cost</span>
                    <span>£{totalCost}</span>
                </div>
                <button className="button-primary">Checkout</button>
            </div>
        </div>
    );
};

export default Cartinitial;