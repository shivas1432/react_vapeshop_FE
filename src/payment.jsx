import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './payment.css'; 

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || '0.00';
  const cart = location.state?.cart || []; // Extract cart from state

  const [paymentType] = useState('debit'); // Set default to debit

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      orderNumber: '12345',
      totalPrice: totalPrice,
      cart: cart, // Include actual cart data if available
      address: {
        name: formData.get('name'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
      },
      paymentType: paymentType,
      cardNumber: formData.get('cardNumber'),
      expiryDate: formData.get('expiryDate'),
      cvv: formData.get('cvv'),
    };

    console.log('Form data submitted:', data);
    navigate('/orderplaced', { state: data });
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      <div className="total-price">
        <h2>Total Price: £{totalPrice}</h2>
      </div>

      <form id="checkout-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Shipping Address</legend>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />

          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" required />

          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" required />

          <label htmlFor="zip">ZIP Code:</label>
          <input type="text" id="zip" name="zip" required />
        </fieldset>

        <fieldset>
          <legend>Payment Type</legend>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="debit"
              checked={paymentType === 'debit'}
              onChange={() => {}}
            />
            Debit Card
          </label>
        </fieldset>

        <div id="card-details">
          <fieldset>
            <legend>Card Details</legend>
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
            />

            <label htmlFor="expiry-date">Expiry Date:</label>
            <input
              type="text"
              id="expiry-date"
              name="expiryDate"
              placeholder="MM/YY"
              required
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              required
            />
          </fieldset>
        </div>

        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Payment;
