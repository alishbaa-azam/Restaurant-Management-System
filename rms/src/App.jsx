import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import {Cart} from "./pages/Cart";
import Product from "./pages/Product";
import Specials from "./components/Specials";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [cart, setCart] = useState([]);

  // Add item or increase quantity
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p._id === product._id);
      if (found) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Decrease quantity
  const decreaseCart = (productId) => {
    setCart((prev) => {
      const found = prev.find((p) => p._id === productId);
      if (!found) return prev;
      if (found.qty === 1)
        return prev.filter((p) => p._id !== productId);
      return prev.map((p) =>
        p._id === productId ? { ...p, qty: p.qty - 1 } : p
      );
    });
  };

  // Remove item completely
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cart.reduce((sum, i) => sum + i.qty, 0)} />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                cart={cart}
                decreaseCart={decreaseCart}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                addToCart={addToCart}
                cart={cart}
                decreaseCart={decreaseCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <Product
                addToCart={addToCart}
                cart={cart}
                decreaseCart={decreaseCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                addToCart={addToCart}
                decreaseCart={decreaseCart}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/specials"
            element={
              <Specials
                addToCart={addToCart}
                cart={cart}
                decreaseCart={decreaseCart}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
