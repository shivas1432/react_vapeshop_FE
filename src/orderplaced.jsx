import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './orderplaced.css'; 

const OrderPlaced = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  // Set loaded state after a short delay to trigger animations
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const {
    orderNumber = generateOrderNumber(),
    totalPrice = '0.00',
    cart = [],
    address = {},
    paymentType = 'N/A',
  } = location.state || {};

  // Function to generate the order number if not provided
  function generateOrderNumber() {
    return `ORD-${Math.floor(10000 + Math.random() * 90000).toString()}`;
  }

  const {
    name = 'N/A',
    address: addr = 'N/A',
    city = 'N/A',
    state = 'N/A',
    zip = 'N/A'
  } = address;

  const handleReturnToShop = () => {
    navigate('/home1');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/home');
  };

  return (
    <div className="orderplaced-container">
      {/* Animated top edge design */}
      <div className="animated-top-edge">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Confetti overlay */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, index) => (
            <div 
              key={index} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor: getRandomColor()
              }}
            ></div>
          ))}
        </div>
      )}

      <div className={`order-content ${isLoaded ? 'animate-in' : ''}`}>
        <header className="orderplaced-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </header>

        <div className="order-card">
          <div className="order-info">
            <div className="order-number">
              <span>Order Number</span>
              <h3>{orderNumber}</h3>
            </div>
            <div className="order-total">
              <span>Total</span>
              <h3>£{totalPrice}</h3>
            </div>
          </div>
          
          <div className="section items-section">
            <h2>Items Ordered</h2>
            {cart.length > 0 ? (
              <ul className="items-list">
                {cart.map((item, index) => (
                  <li key={index} className="order-item">
                    <div className="item-name-qty">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">×{item.quantity}</span>
                    </div>
                    <span className="item-price">£{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-items">No items in order</p>
            )}
          </div>
          
          <div className="section shipping-section">
            <h2>Shipping Address</h2>
            <div className="address-details">
              <p className="customer-name">{name}</p>
              <p className="address-line">{addr}</p>
              <p className="address-line">{city}, {state} {zip}</p>
            </div>
          </div>
          
          <div className="section payment-section">
            <h2>Payment Method</h2>
            <p className="payment-type">{paymentType.charAt(0).toUpperCase() + paymentType.slice(1)} Card</p>
          </div>
          
          <div className="section confirmation-section">
            <p>A confirmation email has been sent to your email address.</p>
            <p className="thank-you">Thank you for shopping with VapeShop!</p>
          </div>
        </div>
        
        <div className="action-buttons">
          <button onClick={handleReturnToShop} className="shop-button">
            Return to Shop
          </button>
          <button onClick={handleContinueShopping} className="continue-button">
            Continue Shopping
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get random confetti colors
function getRandomColor() {
  const colors = ['#FF6A3D', '#1A2238', '#38526E', '#9EADBA', '#F6F6F6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default OrderPlaced;