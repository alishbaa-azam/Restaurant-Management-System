import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Specials from "./components/Specials";
import Booking from "./components/TableBooking";
import Contact from "./Pages/Contact";
import About from "./Pages/about";
// Admin pages
import AdminLogin from "./Pages/Admin/Login";
import AdminRegister from "./Pages/Admin/Register";
import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminAnalytics from "./Pages/Admin/Analytics";
import AdminMenu from "./Pages/Admin/Menu";
import AdminOrders from "./Pages/Admin/Orders";
import AdminSettings from "./Pages/Admin/Settings";
import AdminRoute from "./components/AdminRoute";
import AdminAudits from "./Pages/Admin/Audits";
import { CartProvider } from "./context/cartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scrollTop"; 

export default function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
            <Route path="/admin/menu" element={<AdminRoute><AdminMenu /></AdminRoute>} />
            <Route path="/admin/menu/categories" element={<AdminRoute><AdminMenu /></AdminRoute>} />
            <Route path="/admin/menu/specials" element={<AdminRoute><AdminMenu /></AdminRoute>} />

            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/orders/pending" element={<AdminRoute><AdminOrders initialFilterStatus="pending" /></AdminRoute>} />
            <Route path="/admin/orders/completed" element={<AdminRoute><AdminOrders initialFilterStatus="completed" /></AdminRoute>} />

            <Route path="/admin/audits" element={<AdminRoute><AdminAudits /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </CartProvider>
  );
}