import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Menu from "./Pages/menu";
import Cart from "./Pages/Cart";
import Specials from "./components/Specials";
import Booking from "./components/TableBooking";
import { CartProvider } from "./Context/cartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scrollTop"; 

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <ScrollToTop />  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/specials" element={<Specials />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
