// import React, { useState } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     address: "",
//     dishName: "",
//     query: "",
//   });
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setSuccess("Query submitted successfully!");
//         setFormData({
//           fullName: "",
//           phone: "",
//           email: "",
//           address: "",
//           dishName: "",
//           query: "",
//         });
//       } else {
//         setSuccess(data.message || "Error submitting query");
//       }
//     } catch (err) {
//       console.log(err);
//       setSuccess("Network error, try again");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-r from-[#7a3f0f] to-[#1e0e0e] py-16 px-6 flex flex-col items-center md:flex-row md:justify-center gap-10">
//       {/* Left Panel */}
//       <div className="flex flex-col gap-6 md:w-1/3">
//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-[#ff8f1f] text-left">
//           <h3 className="text-orange-400 font-semibold mb-1">Our Headquarter</h3>
//           <p className="text-gray-300">Lucknow, UP</p>
//         </div>
//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-green-500 text-left">
//           <h3 className="text-green-400 font-semibold mb-1">Contact Number</h3>
//           <p className="text-gray-300">+91 8299431275</p>
//         </div>
//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-orange-500 text-left">
//           <h3 className="text-orange-500 font-semibold mb-1">Email Address</h3>
//           <p className="text-gray-300">hexagonservices@gmail.com</p>
//         </div>
//       </div>

//       {/* Right Panel - Form */}
//       <form
//         className="bg-[#3d1f0f] md:w-1/2 p-8 rounded-xl shadow-lg flex flex-col gap-4 border border-[#ff8f1f]"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl text-orange-400 font-bold mb-4">Connect With Us</h2>

//         <input
//           type="text"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email Address"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none"
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none"
//         />
//         <input
//           type="text"
//           name="dishName"
//           value={formData.dishName}
//           onChange={handleChange}
//           placeholder="Dish Name (e.g., Butter Chicken)"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none"
//         />
//         <textarea
//           name="query"
//           value={formData.query}
//           onChange={handleChange}
//           placeholder="Your Query"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none resize-none"
//           rows={5}
//           required
//         ></textarea>

//         <button
//           type="submit"
//           className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 mt-2 rounded-md font-semibold hover:opacity-90 transition"
//         >
//           Submit Query
//         </button>

//         {success && <p className="text-green-400 mt-2">{success}</p>}
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
// import React, { useState, useEffect } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     address: "",
//     dishName: "",
//     query: "",
//   });
//   const [success, setSuccess] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setSuccess("Query submitted successfully!");
//         setFormData({
//           fullName: "",
//           phone: "",
//           email: "",
//           address: "",
//           dishName: "",
//           query: "",
//         });
        
//         // 2 सेकंड के बाद पेज रिफ्रेश करें
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       } else {
//         setSuccess(data.message || "Error submitting query");
//       }
//     } catch (err) {
//       console.log(err);
//       setSuccess("Network error, try again");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // पेज रिफ्रेश के लिए एफेक्ट
//   useEffect(() => {
//     if (success === "Query submitted successfully!") {
//       const timer = setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [success]);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-r from-[#7a3f0f] to-[#1e0e0e] py-16 px-6 flex flex-col items-center md:flex-row md:justify-center gap-10">
//       {/* Left Panel */}
//       <div className="flex flex-col gap-6 md:w-1/3">
//         {/* Heading moved to left panel */}
//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-[#ff8f1f] text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
//           <h2 className="text-3xl text-orange-400 font-bold mb-2">Connect With Us</h2>
//           <p className="text-gray-300">We'd love to hear from you!</p>
//         </div>

//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-[#ff8f1f] text-left transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
//           <h3 className="text-orange-400 font-semibold mb-1">Our Headquarter</h3>
//           <p className="text-gray-300">Lucknow, UP</p>
//         </div>
//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-green-500 text-left transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
//           <h3 className="text-green-400 font-semibold mb-1">Contact Number</h3>
//           <p className="text-gray-300">+91 8299431275</p>
//         </div>
//         <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-orange-500 text-left transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
//           <h3 className="text-orange-500 font-semibold mb-1">Email Address</h3>
//           <p className="text-gray-300">hexagonservices@gmail.com</p>
//         </div>
//       </div>

//       {/* Right Panel - Form */}
//       <form
//         className="bg-[#3d1f0f] md:w-1/2 p-8 rounded-xl shadow-lg flex flex-col gap-4 border border-[#ff8f1f]"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl text-orange-400 font-bold mb-4 text-center md:text-left">Send Your Query</h2>

//         <input
//           type="text"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email Address"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
//         />
//         <input
//           type="text"
//           name="dishName"
//           value={formData.dishName}
//           onChange={handleChange}
//           placeholder="Dish Name (e.g., Butter Chicken)"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
//         />
//         <textarea
//           name="query"
//           value={formData.query}
//           onChange={handleChange}
//           placeholder="Your Query"
//           className="p-3 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none"
//           rows={5}
//           required
//         ></textarea>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 mt-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
//             isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
//           }`}
//         >
//           {isSubmitting ? "Submitting..." : "Submit Query"}
//         </button>

//         {success && (
//           <div className={`mt-4 p-3 rounded-md text-center transition-all duration-500 ${
//             success.includes("successfully") 
//               ? "bg-green-900/30 text-green-400 border border-green-500" 
//               : "bg-red-900/30 text-red-400 border border-red-500"
//           }`}>
//             {success}
//             {success.includes("successfully") && (
//               <p className="text-sm text-gray-300 mt-1">Page will refresh in 2 seconds...</p>
//             )}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
import React, { useState, useEffect } from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaUser, 
  FaPhone, 
  FaEnvelopeOpen, 
  FaHome, 
  FaUtensils, 
  FaQuestionCircle, 
  FaPaperPlane,
  FaHandshake 
} from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    dishName: "",
    query: "",
  });
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Query submitted successfully!");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          address: "",
          dishName: "",
          query: "",
        });
        
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setSuccess(data.message || "Error submitting query");
      }
    } catch (err) {
      console.log(err);
      setSuccess("Network error, try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  
  useEffect(() => {
    if (success === "Query submitted successfully!") {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#7a3f0f] to-[#1e0e0e] py-16 px-6 flex flex-col items-center md:flex-row md:justify-center gap-10">
      {/* Left Panel */}
      <div className="flex flex-col gap-8 md:w-1/2 ">
        {/* "Connect With Us" header box with icon */}
        <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-[#ff8f1f] text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaHandshake className="text-3xl text-orange-400" />
            <h2 className="text-5xl text-orange-400 font-bold">Connect With Us</h2>
          </div>
          <p className="text-gray-300">We'd love to hear from you!</p>
        </div>

        <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-[#ff8f1f] text-left transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <FaMapMarkerAlt className="text-orange-400 text-xl" />
            <h3 className="text-orange-400 font-semibold">Our Headquarter</h3>
          </div>
          <p className="text-gray-300 ml-9">Lahore, PK</p>
        </div>
        
        <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-green-500 text-left transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <FaPhoneAlt className="text-green-400 text-xl" />
            <h3 className="text-green-400 font-semibold">Contact Number</h3>
          </div>
          <p className="text-gray-300 ml-9">+91 8299431275</p>
        </div>
        
        <div className="bg-[#3d1f0f] rounded-xl p-6 shadow-lg border-l-4 border-orange-500 text-left transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <FaEnvelope className="text-orange-500 text-xl" />
            <h3 className="text-orange-500 font-semibold">Email Address</h3>
          </div>
          <p className="text-gray-300 ml-9">duaali345345@gmail.com</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <form
        className="bg-[#3d1f0f] md:w-130 mt-35 p-8 rounded-xl shadow-lg flex flex-col gap-4 border border-[#ff8f1f]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-orange-400 font-bold mb-4 text-center md:text-left flex items-center gap-2">
          <FaPaperPlane /> Send Your Query
        </h2>

        {/* Full Name with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaUser />
          </div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 pl-10 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            required
          />
        </div>

        {/* Phone Number with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaPhone />
          </div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 pl-10 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            required
          />
        </div>

        {/* Email with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaEnvelopeOpen />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 pl-10 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            required
          />
        </div>

        {/* Address with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaHome />
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 pl-10 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        {/* Dish Name with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaUtensils />
          </div>
          <input
            type="text"
            name="dishName"
            value={formData.dishName}
            onChange={handleChange}
            placeholder="Dish Name (e.g., Butter Chicken)"
            className="w-full p-3 pl-10 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        {/* Query with icon */}
        <div className="relative">
          <div className="absolute left-3 top-4 text-gray-400">
            <FaQuestionCircle />
          </div>
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Your Query"
            className="w-full p-3 pl-10 rounded-md bg-[#2b1e15] border border-[#ff8f1f] placeholder-gray-400 text-white focus:outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Submit Button with icon */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center w-50 justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 mt-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          <FaPaperPlane className="transform transition-transform duration-300 group-hover:translate-x-1" />
          {isSubmitting ? "Submitting..." : "Submit Query"}
        </button>

        {success && (
          <div className={`mt-4 p-3 rounded-md text-center transition-all duration-500 ${
            success.includes("successfully") 
              ? "bg-green-900/30 text-green-400 border border-green-500" 
              : "bg-red-900/30 text-red-400 border border-red-500"
          }`}>
            <div className="flex items-center justify-center gap-2">
              {success.includes("successfully") ? (
                <FaHandshake className="text-green-400" />
              ) : (
                <FaQuestionCircle className="text-red-400" />
              )}
              <span>{success}</span>
            </div>
            {success.includes("successfully") && (
              <p className="text-sm text-gray-300 mt-1">Page will refresh in 2 seconds...</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;