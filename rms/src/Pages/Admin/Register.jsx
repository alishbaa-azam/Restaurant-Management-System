import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaUser, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const isAdminSetup = location.pathname.startsWith('/admin');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { name, email, password } = formData;
      // If on admin path, try setup-admin (only allowed once)
      const data = isAdminSetup
        ? await api.auth.setupAdmin(name, email, password)
        : await api.auth.register(name, email, password);
      // data: { token, user }
      login(data.user, data.token);
      // After creating an account, navigate appropriately
      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#ffc22e] mb-8">
            {isAdminSetup ? 'Create Admin Account' : 'Create Account'}
          </h1>

          {isAdminSetup && (
            <div className="mb-4 text-sm text-[#ffdca8] text-center">Only use this to create the first administrator. If an admin already exists, use <strong>Admin Login</strong>.</div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-700/50 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name input */}
            <div>
              <label className="block text-[#ffc22e] font-semibold mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffc76b] text-lg" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full bg-[#3a2414]/60 border border-[#6b3a25] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#9a7555] focus:outline-none focus:border-[#ffc76b] focus:ring-1 focus:ring-[#ffc76b]/30 transition"
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div>
              <label className="block text-[#ffc22e] font-semibold mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffc76b] text-lg" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full bg-[#3a2414]/60 border border-[#6b3a25] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#9a7555] focus:outline-none focus:border-[#ffc76b] focus:ring-1 focus:ring-[#ffc76b]/30 transition"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label className="block text-[#ffc22e] font-semibold mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffc76b] text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=""
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
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ffa500] to-[#ff7a1a] hover:from-[#ffb333] hover:to-[#ff8c33] text-[#3a2414] font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center mt-8">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/admin/login'); }} className="text-[#ffc22e] hover:text-[#ffce5a] font-semibold">
              Back To Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
