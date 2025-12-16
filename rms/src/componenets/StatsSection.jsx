// import React, { useEffect, useState } from "react";
// import { FaTruck, FaHeart, FaLeaf, FaClock } from "react-icons/fa";

// const iconMap = {
//   delivery: <FaTruck className="text-[#ff8f1f] text-4xl" />,
//   heart: <FaHeart className="text-[#ff8f1f] text-4xl" />,
//   leaf: <FaLeaf className="text-[#ff8f1f] text-4xl" />,
//   clock: <FaClock className="text-[#ff8f1f] text-4xl" />,
// };

// const StatsSection = () => {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data));
//   }, []);

//   return (
//     <div className="bg-[#2b1e15] py-16 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
//         {stats.map((item) => (
//           <div
//             key={item._id}
//             className="
//               relative overflow-hidden 
//               rounded-2xl p-10 text-center border border-[#614b3a]
//               bg-[#1c140f] shadow-md shadow-[#ff8f1f]/20
//               hover:scale-105 transition-all duration-300
//             "
//           >
//             {/* Auto-moving smooth animation */}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#ff8f1f]/10 to-transparent
//                 animate-move-slow pointer-events-none">
//             </div>

//             <div className="relative z-10 flex flex-col items-center">
//               {iconMap[item.iconType]}

//               <h2 className="text-4xl font-bold text-[#ffcc85] mt-4">
//                 {item.number}
//               </h2>

//               <p className="uppercase text-[#d1d5db] text-sm tracking-wider mt-2">
//                 {item.label}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatsSection;

import React, { useEffect, useState } from "react";
import { FaTruck, FaHeart, FaLeaf, FaClock } from "react-icons/fa";

const iconMap = {
  delivery: <FaTruck className="text-[#ff8f1f] text-5xl" />,
  heart: <FaHeart className="text-[#ff8f1f] text-5xl" />,
  leaf: <FaLeaf className="text-[#ff8f1f] text-5xl" />,
  clock: <FaClock className="text-[#ff8f1f] text-5xl" />,
};

const StatsSection = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="bg-[#2b1e15] py-16 px-6 overflow-hidden">
      <div className="flex flex-wrap justify-center gap-10">
        {stats.map((item, index) => (
          <div
            key={item._id}
            className="
              relative 
              w-72 
              rounded-2xl p-10 text-center border border-[#4b372a]
              bg-[#1c140f] shadow-md shadow-[#ff8f1f]/20
              transition-all duration-500

              hover:scale-105 
              hover:shadow-[#ff8f1f]/50 
              hover:shadow-2xl
              hover:border-[#ff8f1f]

              animate-floating
            "
            style={{ animationDelay: `${index * 0.4}s` }}   // ONE BY ONE FLOAT
          >
            <div className="flex flex-col items-center">
              {iconMap[item.iconType]}

              <h2 className="text-4xl font-bold text-[#ffcc85] mt-4">
                {item.number}
              </h2>

              <p className="uppercase text-[#d1d5db] text-md tracking-wider mt-2">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
