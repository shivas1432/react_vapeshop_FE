import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home1.css'; // Make sure your styles are defined here

const Home1 = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State to keep track of cart items
  const [cart, setCart] = useState({});
  // State to keep track of the selected vape type
  const [selectedType, setSelectedType] = useState('');

  // Sample product data
  const productData = {
    'pod-systems': [
      { name: 'SMOK Nord 4', price: 29.99 },
      { name: 'Vaporesso XROS', price: 25.99 },
      { name: 'GeekVape Aegis Pod', price: 32.99 },
      { name: 'Uwell Caliburn G', price: 27.99 },
      { name: 'Suorin Air Pro', price: 23.99 },
    ],
    'box-mods': [
      { name: 'Voopoo Drag 3', price: 49.99 },
      { name: 'SMOK Morph 2', price: 45.99 },
      { name: 'GeekVape Aegis Legend 2', price: 52.99 },
      { name: 'Vaporesso GEN S', price: 47.99 },
      { name: 'Lost Vape Thelema Quest', price: 54.99 },
    ],
    'disposable-vapes': [
      { name: 'Puff Bar Plus', price: 14.99 },
      { name: 'ELF Bar 5000', price: 16.99 },
      { name: 'Bang XXL', price: 18.99 },
      { name: 'Vaporlax Mesh', price: 15.99 },
      { name: 'Hyde Edge Recharge', price: 17.99 },
    ],
    'vape-pens': [
      { name: 'SMOK Stick N18', price: 21.99 },
      { name: 'Freemax Twister 30W', price: 24.99 },
      { name: 'Innokin Endura T18 II', price: 19.99 },
      { name: 'Vaporesso Sky Solo', price: 22.99 },
      { name: 'Joyetech eGo AIO', price: 20.99 },
    ],
    'rebuildable-atomizers': [
      { name: 'GeekVape Zeus X RTA', price: 29.99 },
      { name: 'Vandy Vape Kylin Mini V2', price: 32.99 },
      { name: 'Wotofo Profile RDA', price: 27.99 },
      { name: 'Dovpo Blotto RTA', price: 30.99 },
      { name: 'Hellvape Dead Rabbit V2 RDA', price: 33.99 },
    ],
  };

  // Handle vape type clicks to show products
  const handleVapeTypeClick = (type) => {
    setSelectedType(type);
  };

  // Handle "Add to Cart" button clicks
  const handleAddToCart = (productName, price) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productName]) {
        newCart[productName].quantity++;
      } else {
        newCart[productName] = { quantity: 1, price };
      }
      return newCart;
    });
  };

  // Handle quantity change
  const handleQuantityChange = (productName, action) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (action === 'increase') {
        newCart[productName].quantity++;
      } else if (action === 'decrease') {
        if (newCart[productName].quantity > 1) {
          newCart[productName].quantity--;
        } else {
          delete newCart[productName];
        }
      }
      return newCart;
    });
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cart } }); // Pass cart data to Checkout page
  };

  // Handle Logout and redirect to Home page
  const handleLogout = () => {
    navigate('/home'); // Navigate to Home page
  };

  // Compute cart items
  const cartItems = Object.entries(cart).map(([productName, item]) => (
    <li key={productName}>
      <span className="cart-product-name">{productName}</span>
      <div className="price-quantity-container">
        <span className="quantity-display">{item.quantity}</span>
        <span className="price-display">£{(item.quantity * item.price).toFixed(2)}</span>
        <div className="buttons-container">
          <button
            className="change-quantity"
            onClick={() => handleQuantityChange(productName, 'increase')}
          >
            +
          </button>
          <button
            className="change-quantity"
            onClick={() => handleQuantityChange(productName, 'decrease')}
          >
            -
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="home1-container">
      <header className="home1-header">
        <h1>Welcome to VapeShop!</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="home1-info">
        <p>We’re glad to have you back. Explore our latest products and offers just for you!</p>
        <p>If you need any assistance or have questions, feel free to contact our support team.</p>
      </section>

      <section className="vape-types">
        {Object.keys(productData).map((type) => (
          <div key={type} className="vape-type" onClick={() => handleVapeTypeClick(type)}>
            <h3>{type.replace('-', ' ').toUpperCase()}</h3>
          </div>
        ))}
      </section>

      <section className="product-list">
        {selectedType && (
          <div id={selectedType}>
            <ul>
              {productData[selectedType].map((product) => (
                <li key={product.name} className="product-item">
                  <span className="name">{product.name}</span>
                  <span className="price">£{product.price}</span>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product.name, product.price)}
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section id="cart">
        <h3>Shopping Cart ({Object.keys(cart).length} items)</h3>
        <ul id="cart-items">
          {cartItems.length > 0 ? cartItems : <li>Your cart is empty</li>}
        </ul>
        {Object.keys(cart).length > 0 && (
          <button
            id="proceed-to-checkout"
            className="home1-button"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </section>
    </div>
  );
};

export default Home1;
