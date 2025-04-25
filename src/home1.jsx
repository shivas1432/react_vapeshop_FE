import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home1.css';

const Home1 = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);

  // Sample product data
  const productData = {
    'pod-systems': [
      { name: 'SMOK Nord 4', price: 29.99, id: 'ps1' },
      { name: 'Vaporesso XROS', price: 25.99, id: 'ps2' },
      { name: 'GeekVape Aegis Pod', price: 32.99, id: 'ps3' },
      { name: 'Uwell Caliburn G', price: 27.99, id: 'ps4' },
      { name: 'Suorin Air Pro', price: 23.99, id: 'ps5' },
    ],
    'box-mods': [
      { name: 'Voopoo Drag 3', price: 49.99, id: 'bm1' },
      { name: 'SMOK Morph 2', price: 45.99, id: 'bm2' },
      { name: 'GeekVape Aegis Legend 2', price: 52.99, id: 'bm3' },
      { name: 'Vaporesso GEN S', price: 47.99, id: 'bm4' },
      { name: 'Lost Vape Thelema Quest', price: 54.99, id: 'bm5' },
    ],
    'disposable-vapes': [
      { name: 'Puff Bar Plus', price: 14.99, id: 'dv1' },
      { name: 'ELF Bar 5000', price: 16.99, id: 'dv2' },
      { name: 'Bang XXL', price: 18.99, id: 'dv3' },
      { name: 'Vaporlax Mesh', price: 15.99, id: 'dv4' },
      { name: 'Hyde Edge Recharge', price: 17.99, id: 'dv5' },
    ],
    'vape-pens': [
      { name: 'SMOK Stick N18', price: 21.99, id: 'vp1' },
      { name: 'Freemax Twister 30W', price: 24.99, id: 'vp2' },
      { name: 'Innokin Endura T18 II', price: 19.99, id: 'vp3' },
      { name: 'Vaporesso Sky Solo', price: 22.99, id: 'vp4' },
      { name: 'Joyetech eGo AIO', price: 20.99, id: 'vp5' },
    ],
    'rebuildable-atomizers': [
      { name: 'GeekVape Zeus X RTA', price: 29.99, id: 'ra1' },
      { name: 'Vandy Vape Kylin Mini V2', price: 32.99, id: 'ra2' },
      { name: 'Wotofo Profile RDA', price: 27.99, id: 'ra3' },
      { name: 'Dovpo Blotto RTA', price: 30.99, id: 'ra4' },
      { name: 'Hellvape Dead Rabbit V2 RDA', price: 33.99, id: 'ra5' },
    ],
  };

  // Update cart item count whenever cart changes
  useEffect(() => {
    const count = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  }, [cart]);

  // Animate elements on initial load
  useEffect(() => {
    const header = document.querySelector('.home1-header');
    const categories = document.querySelectorAll('.vape-type');
    const info = document.querySelector('.home1-info');
    
    if (header) header.classList.add('animate-in');
    if (info) setTimeout(() => info.classList.add('animate-in'), 200);
    
    categories.forEach((category, index) => {
      setTimeout(() => {
        category.classList.add('animate-in');
      }, 300 + (index * 100));
    });
  }, []);

  // Animate products when category is selected
  useEffect(() => {
    if (selectedType) {
      // First reset animations by removing the animate-in class
      const products = document.querySelectorAll('.product-item');
      products.forEach(product => {
        product.classList.remove('animate-in');
      });
      
      // Force a reflow before adding the animation class again
      setTimeout(() => {
        products.forEach((product, index) => {
          setTimeout(() => {
            product.classList.add('animate-in');
          }, 50 + (index * 80));
        });
      }, 10);
    }
  }, [selectedType]);

  const handleVapeTypeClick = (type) => {
    // If the same type is clicked again, don't change anything
    // If a new type is clicked, set it as the selected type
    setSelectedType(currentType => currentType === type ? currentType : type);
  };

  const handleAddToCart = (productName, price, productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId].quantity++;
      } else {
        newCart[productId] = { name: productName, quantity: 1, price };
      }
      return newCart;
    });
    
    // Trigger cart animation
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 500);
  };

  const handleQuantityChange = (productId, action) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (action === 'increase') {
        newCart[productId].quantity++;
      } else if (action === 'decrease') {
        if (newCart[productId].quantity > 1) {
          newCart[productId].quantity--;
        } else {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  const handleLogout = () => {
    navigate('/home');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Format cart items for display
  const cartItems = Object.entries(cart).map(([productId, item]) => (
    <li key={productId} className="cart-item">
      <div className="cart-item-details">
        <span className="cart-product-name">{item.name}</span>
        <span className="price-display">£{(item.quantity * item.price).toFixed(2)}</span>
      </div>
      <div className="quantity-controls">
        <button
          className="quantity-btn decrease"
          onClick={() => handleQuantityChange(productId, 'decrease')}
        >
          −
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button
          className="quantity-btn increase"
          onClick={() => handleQuantityChange(productId, 'increase')}
        >
          +
        </button>
      </div>
    </li>
  ));

  // Calculate total price
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <div className="home1-container">
      {/* Animated top edge design */}
      <div className="animated-top-edge">
        <div className="wave wave"></div>
        <div className="wave wave"></div>
        <div className="wave wave"></div>
      </div>

      <header className="home1-header">
        <div className="header-content">
          <h1>VapeShop</h1>
          <div className="header-actions">
            <button className={`cart-button ${animateCart ? 'pulse' : ''}`} onClick={toggleCart}>
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </button>
            <button className="logout-button1" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="home1-info">
        <h2>Premium Vaping Products</h2>
        <p>Explore our extensive collection of high-quality vaping devices and accessories.</p>
      </section>

      <section className="categories-section">
        <h2>Browse Categories</h2>
        <div className="vape-types">
          {Object.keys(productData).map((type) => (
            <div 
              key={type} 
              className={`vape-type ${selectedType === type ? 'active' : ''}`} 
              onClick={() => handleVapeTypeClick(type)}
            >
              <h3>{type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
            </div>
          ))}
        </div>
      </section>

      {selectedType && (
        <section className="product-section">
          <h2>{selectedType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
          <div className="product-grid">
            {productData[selectedType].map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image-placeholder"></div>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">£{product.price.toFixed(2)}</span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product.name, product.price, product.id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating Cart Panel */}
      <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={toggleCart}>×</button>
        </div>
        
        <div className="cart-content">
          {Object.keys(cart).length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p className="empty-cart-message">Start adding products to see them here.</p>
            </div>
          ) : (
            <>
              <ul className="cart-items">{cartItems}</ul>
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-price">£{totalPrice}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Overlay for when cart is open */}
      {isCartOpen && <div className="overlay" onClick={toggleCart}></div>}
    </div>
  );
};

export default Home1;