import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './orderplaced.css'; 

const OrderPlaced = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Make sure this is defined

  const {
    totalPrice,
    cart = [],
    address = {},
    paymentType = 'N/A',
  } = location.state || {};

  // Use a function to generate the order number if not provided
  const generateOrderNumber = () => {
    return `ORD${Math.floor(10000 + Math.random() * 90000).toString()}`;
  };

  const orderNumber =generateOrderNumber(); // Use the passed order number or generate one

  const {
    name = 'N/A',
    address: addr = 'N/A',
    city = 'N/A',
    state = 'N/A',
    zip = 'N/A'
  } = address;

  const handleLogout = () => {
    navigate('/home'); // Navigate to home when logout is clicked
  };

  return (
    <div className="order-confirmation-container">
      <header className="header">
        <h1>Thank You for Your Order 🥳🙌🏽🎉</h1>
      </header>

      <div className="order-summary">
        <h2>Order Confirmation</h2>
        <p>Your order has been successfully placed. Below are the details of your order:</p>
        
        <div className="order-details">
          <h3>Order Number: {orderNumber}</h3>
          <h4>Total Price: £{totalPrice}</h4>
          
          <h3>Items Ordered:</h3>
          <ul>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} @ £{item.price.toFixed(2)} each
                </li>
              ))
            ) : (
              <li>No items</li>
            )}
          </ul>
        </div>
        
        <h3>Shipping Address</h3>
        <p>{name}</p>
        <p>{addr}, {city}, {state}, {zip}</p>

        <h3>Payment Method</h3>
        <p>{paymentType}</p>
        
        <div className="next-steps">
          <p>You will receive an email confirmation with your order details shortly.</p>
          <p>Thank you for shopping with us!</p>
          <a href="/home1" className="btn btn-primary">Return to Basket</a>
          <a href="/" className="btn btn-secondary">Continue Shopping</a>
        </div>
        
        {/* Logout Button */}
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      </div>
    </div>
  );
};

export default OrderPlaced;
