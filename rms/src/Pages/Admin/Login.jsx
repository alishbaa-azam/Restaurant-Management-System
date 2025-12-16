import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.auth.login(formData.email, formData.password);
      // Persist auth in context
      login(data.user, data.token);
      if (rememberMe) localStorage.setItem('rememberAdmin', formData.email);
      // Redirect to where the user was headed (or admin dashboard / home)
      const from = location.state?.from?.pathname || (data.user?.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7a2b0d] via-[#7a2b0d] to-[#071227] p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#b84f1f] opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#00c176] opacity-10 rounded-full blur-3xl"></div>

      {/* Modal */}
      <div className="relative w-full max-w-sm">
        
        <div className="relative bg-[#5a2812]/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-[#6b3a25]/30">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 text-[#ffc22e] hover:text-white text-2xl"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#ffc22e] mb-8">
            Foodies
          </h1>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-700/50 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffc76b] text-lg" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-[#3a2414]/60 border border-[#6b3a25] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#9a7555] focus:outline-none focus:border-[#ffc76b] focus:ring-1 focus:ring-[#ffc76b]/30 transition"
                required
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffc76b] text-lg" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full bg-[#3a2414]/60 border border-[#6b3a25] rounded-xl pl-12 pr-12 py-3 text-white placeholder-[#9a7555] focus:outline-none focus:border-[#ffc76b] focus:ring-1 focus:ring-[#ffc76b]/30 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ffc76b] hover:text-white text-lg transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember me checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 accent-[#ffc22e] cursor-pointer"
              />
              <span className="text-white font-medium">Remember me</span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ffa500] to-[#ff7a1a] hover:from-[#ffb333] hover:to-[#ff8c33] text-[#3a2414] font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              {!loading && <FaEye />}
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center mt-8">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/admin/register'); }} className="text-[#ffc22e] hover:text-[#ffce5a] font-semibold text-lg flex items-center justify-center gap-2">
              👤 Create New Account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;
