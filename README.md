# VapeShop_react  Frontend

Welcome to the VapeShop Frontend! This is a React-based frontend for an e-commerce website that sells vaping products. This project is built using React, React Router, Axios, and other modern web technologies. It communicates with a backend server to handle user registration, login, checkout, payment, and order placement.

## Features

- **User Registration**: Users can create an account to shop on the website.
- **User Login**: Registered users can log in to access their profile.
- **Product Browse**: Users can browse and view vaping products.
- **Shopping Cart**: Users can add products to the shopping cart and proceed to checkout.
- **Checkout**: Users can input their shipping details and proceed with payment.
- **Order Confirmation**: After successful payment, users will be shown an order confirmation screen.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For client-side routing and navigation.
- **Axios**: For making HTTP requests to the backend API.
- **CSS**: For styling the components.
- **React Hooks**: `useState`, `useEffect`, etc., to manage state and side effects in the components.

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** and **npm**: [Download and install Node.js], which includes npm (Node Package Manager).
- **Git**: [Download and install Git].

### Clone the Repository

Clone the repository to your local machine using the following command:

git clone https://github.com/shivas1432/react_vapeshop_FE.git
Install Dependencies
Navigate to the project directory and install the required dependencies:

cd vapeshop cd frontend cd client

npm install
Run the Frontend
Once the dependencies are installed, you can start the development server:

npm start
This will start the React development server, and you can access the application by opening http://localhost:3000 in your web browser.

Backend Setup
To run the full application with a connected backend, follow these steps:

Clone the backend repository ( backend project running on a separate repository).

Navigate to the backend project directory and run the following command:

npm run dev
Ensure your backend API is running on http://localhost:8081 or adjust the API URL in the frontend if needed.

Available Routes
/: Home page with product details, login, and register options.
/RegistrationPage: User registration page.
/login: User login page.
/home1: After successful login, a homepage for authenticated users.
/checkout: Shopping cart and checkout page.
/payment: Payment form for users to complete their purchase.
/orderplaced: Order confirmation page after the payment

Contributing
We welcome contributions to this project! If you have any improvements, bug fixes, or new features in mind, feel free to fork this repository, create a new branch, and submit a pull request.
