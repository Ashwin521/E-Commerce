import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartProvider } from "./context/CartContext";

// Pages
import ProtectedRoute from "./components/ProtectedRoute"; // adjust the path accordingly

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layout
import MainLayout from "./Layout/MainLayout";

export default function App() {
  // Example: check login status from localStorage or your auth context
  const isAuthenticated = Boolean(localStorage.getItem("token")); // or use context state

  return (
    <CartProvider>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "INR",
        }}
      >
        <Router>
          <Routes>
            {/* Protect all routes inside MainLayout */}
            <Route
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </CartProvider>
  );
}
