
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import { motion } from "framer-motion";
// import { FaHeart, FaStar } from "react-icons/fa";

// import ChickenTikka from "../assets/ChickenTikka.png";
// import ChickenChargha from "../assets/ChickenChargha.png";
// import DesiChowmein from "../assets/DesiChowmein.png";

// // ORIGINAL ITEMS
// const baseSpecials = [
//   {
//     name: "Chicken Tikka",
//     description: "Tender chicken marinated in exotic spices",
//     price: 140,
//     rating: 4.8,
//     likes: 165,
//     image: ChickenTikka
//   },
//   {
//     name: "Chicken Chargha",
//     description: "Crispy spiced chicken grilled to perfection",
//     price: 200,
//     rating: 4.7,
//     likes: 225,
//     image: ChickenChargha
//   },
//   {
//     name: "Desi Chowmein",
//     description: "Spicy Asian noodles with local vegetables",
//     price: 60,
//     rating: 4.2,
//     likes: 88,
//     image: DesiChowmein
//   }
// ];

// // Duplicate to make 6 items
// const specials = [...baseSpecials, ...baseSpecials];

// export default function SpecialOffers() {
//   const [visibleCount, setVisibleCount] = useState(4);
//   const navigate = useNavigate();

//   // ADD TO CART FUNCTION
//   const handleAddToCart = async (item) => {
//     try {
//       await axios.post("http://localhost:5000/api/cart/add", {
//         name: item.name,
//         price: item.price,
//         image: item.image,
//       });

//       navigate("/cart"); 
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleShowMore = () => {
//     setVisibleCount(prev => prev + 4);
//   };

//   return (
//     <section className="bg-[#0f0b07] py-24 px-6">
//       <div className="max-w-7xl mx-auto">

//         {/* TITLE */}
//         <h2 className="text-5xl font-bold text-center text-[#ffb74a] font-serif mb-5">
//           Today’s Special Offers
//         </h2>
//         <p className="text-center text-gray-300 mb-16 text-base">
//           A delicious collection handpicked just for you.
//         </p>

//         {/* CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {specials.slice(0, visibleCount).map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05, y: -8 }}
//               className="bg-[#1a1410] border border-[#4b372a] rounded-2xl shadow-[0_0_18px_rgba(255,150,50,0.2)] hover:shadow-[0_0_30px_rgba(255,160,60,0.4)] transition-all duration-300 overflow-hidden"
//             >
//               <div className="w-full bg-[#2b1e15] rounded-t-2xl">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-contain p-4"
//                 />
//               </div>

//               <div className="p-5 space-y-3">
//                 <h3 className="text-xl font-semibold text-[#ffca6b]">
//                   {item.name}
//                 </h3>

//                 <p className="text-gray-300 text-sm leading-relaxed">
//                   {item.description}
//                 </p>

//                 <div className="flex items-center gap-4 mt-2">
//                   <span className="flex items-center gap-1 text-[#ffb74a] text-sm">
//                     <FaStar className="text-yellow-400" /> {item.rating}
//                   </span>

//                   <span className="flex items-center gap-1 text-red-400 text-sm">
//                     <FaHeart className="text-red-500" /> {item.likes}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-[#ffb74a] font-bold text-lg tracking-wide">
//                     Rs {item.price}
//                   </span>

//                   {/* ADD TO CART BUTTON */}
//                   <button
//                     onClick={() => handleAddToCart(item)}
//                     className="bg-gradient-to-r from-[#ff8f1f] to-[#ff5200] text-white px-5 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* SHOW MORE BUTTON */}
//         {visibleCount < specials.length && (
//           <div className="flex justify-center mt-14">
//             <button
//               onClick={handleShowMore}
//               className="bg-gradient-to-r from-[#ff8f1f] to-[#ff5200] text-white px-10 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition shadow-lg tracking-wide"
//             >
//               Show More
//             </button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaMinus, FaPlus } from "react-icons/fa";

import ChickenTikka from "../assets/ChickenTikka.png";
import ChickenChargha from "../assets/ChickenChargha.png";
import DesiChowmein from "../assets/DesiChowmein.png";

// Base items
const baseSpecials = [
  { _id: 1, name: "Chicken Tikka", description: "Tender chicken marinated in exotic spices", price: 140, rating: 4.8, likes: 165, image: ChickenTikka },
  { _id: 2, name: "Chicken Chargha", description: "Crispy spiced chicken grilled to perfection", price: 200, rating: 4.7, likes: 225, image: ChickenChargha },
  { _id: 3, name: "Desi Chowmein", description: "Spicy Asian noodles with local vegetables", price: 60, rating: 4.2, likes: 88, image: DesiChowmein }
];

// Generate multiple unique items
const TOTAL_ITEMS = 16;
const specials = Array(TOTAL_ITEMS).fill(null).map((_, index) => {
  const baseItem = baseSpecials[index % baseSpecials.length];
  return { ...baseItem, _id: `${baseItem._id}_${index + 1}` };
});

export default function Specials({ addToCart, cart = [], decreaseCart }) {
  const [visibleCount, setVisibleCount] = useState(4);

  const getQuantity = (id) => {
    const item = cart.find(p => p._id === id);
    return item ? item.qty : 0;
  };

  const handleIncrement = (item) => addToCart(item);
  const handleDecrement = (item) => decreaseCart(item._id);
  const handleShowMore = () => setVisibleCount(prev => prev + 4);

  return (
    <section className="bg-[#0f0b07] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-[#ffb74a] font-serif mb-5">
          Today’s Special Offers
        </h2>
        <p className="text-center text-gray-300 mb-16 text-base">
          A delicious collection handpicked just for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {specials.slice(0, visibleCount).map((item, index) => {
            const quantity = getQuantity(item._id);

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-[#1a1410] border border-[#4b372a] rounded-2xl shadow-[0_0_18px_rgba(255,150,50,0.2)] hover:shadow-[0_0_30px_rgba(255,160,60,0.4)] transition-all duration-300 overflow-hidden"
              >
                <div className="w-full bg-[#2b1e15] rounded-t-2xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4" />
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-[#ffca6b]">{item.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-[#ffb74a] text-sm">
                      <FaStar className="text-yellow-400" /> {item.rating}
                    </span>
                    <span className="flex items-center gap-1 text-red-400 text-sm">
                      <FaHeart className="text-red-500" /> {item.likes}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4b372a] text-white hover:bg-[#6b4b3a]"
                    >
                      <FaMinus size={14} />
                    </button>

                    <span className="mx-4 text-2xl font-bold text-white">{quantity}</span>

                    <button
                      onClick={() => handleIncrement(item)}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-[#ffb74a] text-white hover:bg-[#ffca6b]"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => handleIncrement(item)}
                    className="mt-3 w-full bg-[#ffb74a] text-black py-2 rounded-full font-semibold hover:bg-[#ffca6b] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {visibleCount < specials.length && (
          <div className="flex justify-center mt-14">
            <button
              onClick={handleShowMore}
              className="bg-gradient-to-r from-[#ff8f1f] to-[#ff5200] text-white px-10 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition shadow-lg tracking-wide"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
