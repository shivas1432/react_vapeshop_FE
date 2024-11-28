import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import RegistrationPage from './RegistrationPage';
import Login from './login';  
import Home1 from './home1';   
import Checkout from './checkout';
import Payment from './payment';
import OrderPlaced from './orderplaced'; // Import OrderPlaced component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home1" element={<Home1 userName="User" />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orderplaced" element={<OrderPlaced />} /> {/* Add route for OrderPlaced */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
