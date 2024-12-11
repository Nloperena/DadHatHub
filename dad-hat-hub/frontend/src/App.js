import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import SuccessPage from './pages/SuccessPage'; // Import the SuccessPage component
import FailurePage from './pages/FailurePage'; // Import the FailurePage component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<SuccessPage />} /> {/* Add SuccessPage */}
          <Route path="/failure" element={<FailurePage />} /> {/* Add FailurePage */}
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for undefined routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
