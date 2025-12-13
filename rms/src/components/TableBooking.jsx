import React, { useState, useEffect } from 'react';
import { MapPin, Users, Calendar, Clock, Phone, Mail, Check, Star, Shield, Award, Loader2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

const TableBookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    tableType: 'indoor',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Calculate navbar height on mount and resize
  useEffect(() => {
    const calculateNavbarHeight = () => {
      const navbar = document.querySelector('nav, header, .navbar, [role="navigation"]');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      } else {
        setNavbarHeight(64);
      }
    };

    calculateNavbarHeight();
    window.addEventListener('resize', calculateNavbarHeight);
    
    return () => window.removeEventListener('resize', calculateNavbarHeight);
  }, []);

  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
    setFormData(prev => ({ 
      ...prev, 
      date: formattedDate,
      time: '6:00 PM'
    }));
  }, []);

  // Check availability when date, time, or tableType changes
  useEffect(() => {
    const checkAvailability = async () => {
      if (formData.date && formData.time && formData.tableType) {
        setCheckingAvailability(true);
        try {
          const response = await axios.post(`${API_BASE_URL}/bookings/check-availability`, {
            date: formData.date,
            time: formData.time,
            tableType: formData.tableType
          });
          setAvailability(response.data);
        } catch (err) {
          console.error('Availability check failed:', err);
          setAvailability(null);
        } finally {
          setCheckingAvailability(false);
        }
      }
    };

    const timer = setTimeout(() => {
      checkAvailability();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.date, formData.time, formData.tableType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleTableTypeChange = (typeId) => {
    setFormData(prev => ({
      ...prev,
      tableType: typeId
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (!formData.date) {
      setError('Please select a date');
      return false;
    }
    if (!formData.time) {
      setError('Please select a time');
      return false;
    }
    if (availability && !availability.available) {
      setError('This time slot is no longer available. Please choose another time.');
      return false;
    }
    return true;
  };

  const showSuccessAlert = (bookingDetails) => {
    Swal.fire({
      title: '🎉 Reservation Confirmed!',
      html: `
        <div class="text-left p-2">
          <p class="mb-3 font-bold text-lg text-amber-100">Booking Details:</p>
          <div class="space-y-2 mb-4">
            <p class="flex items-center gap-2"><span class="text-amber-300">👤</span> <span class="font-medium">Name:</span> ${bookingDetails.name}</p>
            <p class="flex items-center gap-2"><span class="text-amber-300">📅</span> <span class="font-medium">Date:</span> ${new Date(bookingDetails.date).toLocaleDateString()}</p>
            <p class="flex items-center gap-2"><span class="text-amber-300">🕒</span> <span class="font-medium">Time:</span> ${bookingDetails.time}</p>
            <p class="flex items-center gap-2"><span class="text-amber-300">👥</span> <span class="font-medium">Guests:</span> ${bookingDetails.guests}</p>
            <p class="flex items-center gap-2"><span class="text-amber-300">🍽️</span> <span class="font-medium">Table:</span> ${bookingDetails.tableType}</p>
          </div>
          <hr class="my-4 border-amber-900/50">
          <p class="mb-2 text-green-300">✅ A confirmation email has been sent to <strong>${bookingDetails.email}</strong></p>
          <p class="text-sm text-gray-300 mt-3">
            We look forward to serving you at The Golden Oak!
          </p>
        </div>
      `,
      icon: 'success',
      iconColor: '#fbbf24',
      confirmButtonColor: '#f59e0b',
      confirmButtonText: 'Got it!',
      background: '#1a1410',
      color: '#ffffff',
      customClass: {
        popup: 'border-2 border-amber-500 rounded-xl shadow-2xl shadow-amber-500/30',
        title: 'text-amber-200 text-2xl',
        confirmButton: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-200'
      },
      width: '500px',
      padding: '2rem',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      timer: 8000,
      timerProgressBar: true,
      timerProgressBarColor: '#f59e0b',
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      title: '❌ Booking Failed',
      text: errorMessage,
      icon: 'error',
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Try Again',
      background: '#1a1410',
      color: '#ffffff',
      customClass: {
        popup: 'border-2 border-red-500 rounded-xl',
        title: 'text-red-300',
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg'
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        ...formData,
        guests: parseInt(formData.guests),
        date: formData.date
      };

      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      
      if (response.data.success) {
        showSuccessAlert({
          ...formData,
          bookingId: response.data.bookingId || 'N/A'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: currentDate,
          time: '',
          guests: '2',
          tableType: 'indoor',
          specialRequests: ''
        });
        setAvailability(null);
      } else {
        showErrorAlert(response.data.message || 'Failed to submit booking');
      }
    } catch (err) {
      console.error('Booking error:', err);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.error || 
                       err.message || 
                       'Failed to submit booking. Please try again.';
      
      // Show SweetAlert for specific error types
      if (err.response?.status === 409) {
        showErrorAlert('⏰ This time slot is already booked. Please choose another time.');
      } else if (err.response?.status === 400) {
        showErrorAlert('📋 Invalid booking details. Please check your information.');
      } else if (err.response?.status === 503) {
        showErrorAlert('🔄 Service temporarily unavailable. Please try again in a few moments.');
      } else {
        showErrorAlert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const restaurantInfo = {
    name: "The Golden Oak",
    address: "123 Gourmet Street, Culinary District",
    phone: "(555) 123-4567",
    email: "reservations@goldenoak.com",
    hours: "Mon-Sun: 11:00 AM - 11:00 PM"
  };

  const tableTypes = [
    { id: 'indoor', label: 'Indoor Dining', description: 'Cozy indoor seating', icon: '🏠' },
    { id: 'outdoor', label: 'Outdoor Patio', description: 'Garden view seating', icon: '🌿' },
    { id: 'private', label: 'Private Room', description: 'For special occasions', icon: '👑' },
    { id: 'chef', label: "Chef's Table", description: 'Kitchen view experience', icon: '👨‍🍳' }
  ];

  const timeSlots = [
    '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  const getPaddingTop = () => {
    if (navbarHeight === 0) return 'pt-16';
    const rem = navbarHeight / 16;
    return `pt-[${rem}rem]`;
  };

  return (
    <div 
      className={`min-h-screen ${getPaddingTop()} px-4 sm:px-6 lg:px-8 transition-all duration-300 bg-[#0f0b07]`}
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      <header className="py-6 px-4 sm:px-6 lg:px-8 shadow-2xl ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-amber-200">
            Table Reservations
          </h1>
          <p className="text-lg text-center text-amber-300">
            Reserve your perfect dining experience
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        {/* Error Message (Optional - you can remove this if using only SweetAlert) */}
        {error && (
          <div className="mb-8 p-4 rounded-lg shadow-lg bg-red-800 border border-red-600">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Availability Indicator */}
        {formData.time && availability !== null && (
          <div className={`mb-8 p-4 rounded-lg shadow-lg ${availability.available ? 'bg-green-900 border border-green-700' : 'bg-red-900 border border-red-700'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {checkingAvailability ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  ) : availability.available ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <Check className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">
                    {checkingAvailability 
                      ? 'Checking availability...' 
                      : availability.available 
                        ? `${formData.time} is available for ${formData.tableType} seating`
                        : `${formData.time} is not available for ${formData.tableType} seating`
                    }
                  </p>
                </div>
              </div>
              {!availability.available && !checkingAvailability && (
                <button
                  onClick={() => setFormData(prev => ({ ...prev, time: '' }))}
                  className="text-sm px-3 py-1 rounded bg-white text-red-800 hover:bg-gray-100 transition-colors"
                >
                  Change Time
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Information & Gallery */}
          <div className="space-y-8">
            {/* Restaurant Info Card */}
            <div className="rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-[#1a1410] border border-amber-900/30">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg mr-4 bg-amber-900/30">
                  <Award className="h-6 w-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-amber-200">
                  About Our Restaurant
                </h2>
              </div>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                Experience fine dining in an elegant atmosphere. Our restaurant offers a unique blend of traditional and contemporary cuisine, served in a beautifully designed space.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg transition-all duration-200 hover:shadow-md bg-[#2a1a12] border-l-4 border-amber-500">
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-amber-400" />
                  <span className="text-white">{restaurantInfo.address}</span>
                </div>
                <div className="flex items-center p-3 rounded-lg transition-all duration-200 hover:shadow-md bg-[#2a1a12] border-l-4 border-amber-500">
                  <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-amber-400" />
                  <span className="text-white">{restaurantInfo.phone}</span>
                </div>
                <div className="flex items-center p-3 rounded-lg transition-all duration-200 hover:shadow-md bg-[#2a1a12] border-l-4 border-amber-500">
                  <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-amber-400" />
                  <span className="text-white">{restaurantInfo.email}</span>
                </div>
                <div className="flex items-center p-3 rounded-lg transition-all duration-200 hover:shadow-md bg-[#2a1a12] border-l-4 border-amber-500">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0 text-amber-400" />
                  <span className="text-white">{restaurantInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Dining Area Gallery */}
            <div className="rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl bg-[#1a1410] border border-amber-900/30">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg mr-4 bg-amber-900/30">
                    <Star className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-200">
                    Our Dining Areas
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500', alt: 'Main Dining Room' },
                    { src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=500', alt: 'Outdoor Patio' },
                    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500', alt: 'Private Dining' },
                    { src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=500', alt: 'Bar Area' }
                  ].map((img, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300">
                      <img 
                        src={img.src} 
                        alt={img.alt}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-medium">{img.alt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-xl bg-[#1a1410] border border-amber-900/30">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg mr-4 bg-amber-900/30">
                    <MapPin className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-200">
                    Find Us
                  </h3>
                </div>
                <div className="h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316b11ab25%3A0x8b964c6d3364f1c0!2sGourmet%20Street%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1648661234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Restaurant Location"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="rounded-xl p-6 shadow-xl bg-[#1a1410] border border-amber-900/30">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg mr-4 bg-amber-900/30">
                <Calendar className="h-6 w-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-amber-200">
                Make a Reservation
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-300">
                    Full Name *
                  </label>
                  <div className="rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent outline-none placeholder-gray-500 text-white"
                      placeholder="John Doe"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-300">
                    Email Address *
                  </label>
                  <div className="rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent outline-none placeholder-gray-500 text-white"
                      placeholder="john@example.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-300">
                    Phone Number *
                  </label>
                  <div className="rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent outline-none placeholder-gray-500 text-white"
                      placeholder="(555) 123-4567"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-300">
                    Number of Guests *
                  </label>
                  <div className="relative rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 bg-transparent outline-none appearance-none text-white"
                      disabled={loading}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num} className="bg-[#2a1a12] text-white">
                          {num} {num === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-300">
                    Date *
                  </label>
                  <div className="relative rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={currentDate}
                      className="w-full px-4 py-3 pl-12 bg-transparent outline-none text-white [color-scheme:dark]"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-300">
                    Time *
                  </label>
                  <div className="relative rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 bg-transparent outline-none appearance-none text-white"
                      disabled={loading}
                    >
                      <option value="" className="bg-[#2a1a12] text-white">
                        Select a time
                      </option>
                      {timeSlots.map(time => (
                        <option 
                          key={time} 
                          value={time}
                          className="bg-[#2a1a12] text-white"
                        >
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-4 text-amber-300">
                  Preferred Table Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tableTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTableTypeChange(type.id)}
                      className={`relative cursor-pointer rounded-lg p-4 transition-all duration-200 ${
                        formData.tableType === type.id 
                          ? 'shadow-lg scale-[1.02] border-2 border-amber-500 bg-amber-900/20' 
                          : 'border border-amber-900/30 bg-[#2a1a12]'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:border-amber-400/50'}`}
                      style={{ 
                        color: formData.tableType === type.id ? '#ffffff' : '#d1d5db',
                      }}
                      disabled={loading}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-medium mb-1">{type.label}</div>
                        <div className="text-xs opacity-75">{type.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-300">
                  Special Requests
                </label>
                <div className="rounded-md border border-amber-900/50 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#2a1a12]">
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-transparent outline-none resize-none placeholder-gray-500 text-white"
                    placeholder="Any special occasions or dietary requirements?"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || (availability && !availability.available)}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl focus:outline-none flex items-center justify-center
                    ${loading || (availability && !availability.available) 
                      ? 'opacity-50 cursor-not-allowed bg-gray-500' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-2xl hover:shadow-amber-500/30'
                    }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Reservation'
                  )}
                </button>
                <div className="flex items-center justify-center mt-4">
                  <Shield className="h-4 w-4 mr-2 text-gray-400" />
                  <p className="text-sm text-gray-400">
                    * Required fields. We'll confirm your reservation via email.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-[#1a1410] border border-amber-900/30">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg bg-amber-900/30 shadow-amber-500/20">
              <Users className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-amber-200">Group Bookings</h3>
            <p className="text-gray-300">For parties of 10+ guests, please call us directly</p>
          </div>

          <div className="text-center p-6 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-[#1a1410] border border-amber-900/30">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg bg-amber-900/30 shadow-amber-500/20">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-amber-200">Cancellation Policy</h3>
            <p className="text-gray-300">Cancel at least 24 hours in advance to avoid charges</p>
          </div>

          <div className="text-center p-6 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-[#1a1410] border border-amber-900/30">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg bg-amber-900/30 shadow-amber-500/20">
              <Check className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-amber-200">Special Occasions</h3>
            <p className="text-gray-300">Birthdays, anniversaries, and corporate events welcome</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TableBookingPage;