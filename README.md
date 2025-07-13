#  VapeShop React Frontend

A modern React-based e-commerce frontend for vaping products with user authentication, shopping cart, and payment integration.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/shivas1432/react_vapeshop_FE.git

# Navigate to project
cd vapeshop/frontend/client

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` to view the application.

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **React Router DOM v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hooks** - State management (useState, useEffect)
- **CSS** - Custom styling

## ✨ Features

### 🔐 User Management
- User registration and login
- Profile management
- Session handling

### 🛒 Shopping Experience
- Product browsing and viewing
- Shopping cart functionality
- Add/remove items

### 💳 Checkout Process
- Secure checkout flow
- Shipping details form
- Payment processing
- Order confirmation

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with products |
| `/RegistrationPage` | User registration |
| `/login` | User login |
| `/home1` | Authenticated user homepage |
| `/checkout` | Shopping cart & checkout |
| `/payment` | Payment form |
| `/orderplaced` | Order confirmation |

## 🔧 Setup

### Prerequisites
- Node.js and npm
- Git

### Backend Integration
Ensure your backend API is running on `http://localhost:8081` or update the API URL in the frontend configuration.

### Installation Steps
1. Clone the repository
2. Navigate to `vapeshop/frontend/client`
3. Run `npm install`
4. Start with `npm start`

## 📁 Project Structure

```
src/
├── components/          # React components
├── App.js              # Main application component
├── App.css             # Global styles
└── index.js            # Entry point
```

## 🔗 Backend Connection

This frontend connects to a separate backend repository for:
- User authentication
- Product data
- Order processing
- Payment handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Note**: Make sure the backend server is running for full functionality.
