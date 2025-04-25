import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get cart data from location state
    if (location.state && location.state.cart) {
      const cartData = location.state.cart;
      const cartItems = Object.entries(cartData).map(([id, item]) => ({
        id,
        name: item.name || id, // Use name if available, otherwise use ID
        price: item.price,
        quantity: item.quantity,
      }));

      setCart(cartItems);

      // Calculate total price
      const total = Object.values(cartData).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total.toFixed(2));
      
      // Set loaded after a short delay to trigger animations
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, [location.state]);

  const handleBackToShopping = () => {
    navigate('/home1');
  };

  const handleProceedToPayment = () => {
    // Navigate to the payment page with totalPrice and cart as state
    navigate('/payment', { state: { totalPrice, cart } });
  };

  return (
    <div className="checkout-container">
      {/* Animated top edge design */}
      <div className="animated-top-edge">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <header className={`checkout-header ${isLoaded ? 'animate-in' : ''}`}>
        <h1>Checkout</h1>
        <p>Review your order before proceeding to payment</p>
      </header>

      <div className="checkout-content">
        <section className={`order-summary ${isLoaded ? 'animate-in' : ''}`}>
          <h2>Order Summary</h2>
          
          {cart.length > 0 ? (
            <ul className="cart-items-list">
              {cart.map((item, index) => (
                <li 
                  key={item.id || index} 
                  className="cart-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">× {item.quantity}</span>
                  </div>
                  <span className="item-price">£{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-cart-message">
              <p>Your basket is empty.</p>
              <button 
                onClick={handleBackToShopping} 
                className="back-button"
              >
                Back to Shopping
              </button>
            </div>
          )}
        </section>
        
        {cart.length > 0 && (
          <section className={`checkout-summary ${isLoaded ? 'animate-in' : ''}`}>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>£{totalPrice}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="price-row">
                <span>Tax</span>
                <span>Included</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>£{totalPrice}</span>
              </div>
            </div>
            
            <div className="checkout-actions">
              <button 
                onClick={handleBackToShopping} 
                className="back-button"
              >
                Continue Shopping
              </button>
              <button 
                onClick={handleProceedToPayment} 
                className="checkout-button"
              >
                Proceed to Payment
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Checkout;