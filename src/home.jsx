// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Ensure this file includes styles for the new elements

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/RegistrationPage');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to VapeShop</h1>
        <p>Your one-stop shop for all your vaping needs!</p>
      </header>

      <section className="home-info">
        <h2>About Us</h2>
        <p>At VapeShop, we offer a wide range of high-quality vape products, including e-liquids, mods, tanks, and accessories. Whether you're a seasoned vaper or just starting out, we have everything you need to enhance your vaping experience.</p>
        <p>Our products are sourced from reputable brands and come with a satisfaction guarantee. Explore our collection and find your perfect vape setup today!</p>
      </section>

      <section className="home-actions">
        <button onClick={handleLoginClick} className="home-button">Login</button>
        <button onClick={handleRegisterClick} className="home-button">Register</button>
      </section>

      <section className="advertisement">
        <h2>Advertisement</h2>
        <div className="video-container">
          <video width="1200" height="400" autoPlay muted loop>
            <source src="/assets/8209260-uhd_4096_2160_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="image-slider">
        <h2>Featured Products</h2>
        <div className="slider-container">
          <div className="slider">
            <img src="/assets/img1.jpeg" alt="Product 1" />
            <img src="/assets/img2.jpeg" alt="Product 2" />
            <img src="/assets/img3.jpeg" alt="Product 3" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
