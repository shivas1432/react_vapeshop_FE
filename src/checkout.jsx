import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './checkout.css'; 

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To access the passed state
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');

  useEffect(() => {
    // Get cart data from location state
    if (location.state && location.state.cart) {
      const cartData = location.state.cart;
      setCart(Object.entries(cartData).map(([name, item]) => ({
        name,
        price: item.price,
        quantity: item.quantity,
      })));

      // Calculate total price
      const total = Object.values(cartData).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total.toFixed(2));
    }
  }, [location.state]);

  const handleProceedToPayment = () => {
    // Navigate to the payment page with totalPrice and cart as state
    navigate('/payment', { state: { totalPrice, cart } });
  };
  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      <section className="checkout-cart">
        <h2>Your Basket</h2>
        <ul id="cart-items">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index}>
                {item.name} <span className="price">£{item.price.toFixed(2)}</span> x {item.quantity}
              </li>
            ))
          ) : (
            <li>Your basket is empty.</li>
          )}
        </ul>
        <div className="total-price">
          <strong>Total Price: £{totalPrice}</strong>
        </div>
        <button onClick={handleProceedToPayment} className="checkout-button">
          Proceed to Payment
        </button>
      </section>
    </div>
  );
};

export default Checkout;
