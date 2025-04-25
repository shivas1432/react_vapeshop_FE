import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || '0.00';
  const cart = location.state?.cart || [];
  
  const [paymentType, setPaymentType] = useState('debit');
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Set loaded state after a short delay to trigger animations
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleBackToCheckout = () => {
    navigate(-1);
  };

  const moveToNextStep = (e) => {
    e.preventDefault();
    setFormStep(2);
    
    // Scroll to top of form with animation
    document.querySelector('.payment-content').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const data = {
      orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      totalPrice: totalPrice,
      cart: cart,
      address: {
        name: formData.get('name'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
      },
      paymentType: paymentType,
      cardNumber: formData.get('cardNumber')?.replace(/\s/g, '').slice(-4) || '', // Only store last 4 digits
      expiryDate: formData.get('expiryDate'),
    };

    console.log('Form data submitted:', data);
    navigate('/orderplaced', { state: data });
  };

  // Format credit card number with spaces
  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = formattedValue;
  };

  // Format expiry date
  const formatExpiryDate = (e) => {
    let value = e.target.value.replace(/\//g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    e.target.value = value;
  };

  // Limit CVV to 3 digits
  const formatCVV = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    e.target.value = value;
  };

  return (
    <div className="payment-container">
      {/* Animated top edge design */}
      <div className="animated-top-edge">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <header className={`payment-header ${isLoaded ? 'animate-in' : ''}`}>
        <h1>Secure Payment</h1>
        <p>Complete your purchase securely</p>
      </header>

      <div className="payment-content">
        <div className={`payment-summary ${isLoaded ? 'animate-in' : ''}`}>
          <h2>Order Summary</h2>
          <div className="order-details">
            <div className="items-count">
              <span>{cart.length} items</span>
            </div>
            <div className="total-amount">
              <span>Total:</span>
              <span className="amount">£{totalPrice}</span>
            </div>
          </div>
        </div>

        <form id="payment-form" onSubmit={handleSubmit} className={`${isLoaded ? 'animate-in' : ''}`}>
          {formStep === 1 ? (
            <div className="form-step shipping-step">
              <h2>Shipping Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  placeholder="123 Main St"
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    placeholder="London"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">County/State</label>
                  <input 
                    type="text" 
                    id="state" 
                    name="state" 
                    placeholder="Greater London"
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="zip">Postal Code</label>
                <input 
                  type="text" 
                  id="zip" 
                  name="zip" 
                  placeholder="SW1A 1AA"
                  required 
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={handleBackToCheckout}
                >
                  Back to Cart
                </button>
                <button 
                  type="button" 
                  className="continue-button1"
                  onClick={moveToNextStep}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="form-step payment-step">
              <h2>Payment Details</h2>
              
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="debit"
                    name="paymentType"
                    value="debit"
                    checked={paymentType === 'debit'}
                    onChange={handlePaymentTypeChange}
                  />
                  <label htmlFor="debit">Debit Card</label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentType"
                    value="credit"
                    checked={paymentType === 'credit'}
                    onChange={handlePaymentTypeChange}
                  />
                  <label htmlFor="credit">Credit Card</label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  onInput={formatCardNumber}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    onInput={formatExpiryDate}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    onInput={formatCVV}
                    required
                  />
                </div>
              </div>
              
              <div className="secure-notice">
                <div className="lock-icon">🔒</div>
                <p>Your payment information is secure and encrypted</p>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setFormStep(1)}
                >
                  Back to Shipping
                </button>
                <button type="submit" className="complete-button">
                  Complete Purchase
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Payment;