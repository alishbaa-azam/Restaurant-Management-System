// import React, { useState } from "react";
// import { FaTruck, FaLeaf, FaHandHoldingHeart } from "react-icons/fa";

// import rms1 from "../assets/rms1.png";
// import rms2 from "../assets/rms2.png";
// import rms3 from "../assets/rms3.png";

// // DATA ARRAY
// const culinaryData = [
//   {
//     id: 1,
//     img: rms1,
//     title: "Instant Delivery",
//     desc: "30-minute delivery guarantee in metro areas",
//     icon: <FaTruck className="text-[#ff8f1f] text-5xl transition-transform duration-200" />,
//   },
//   {
//     id: 2,
//     img: rms2,
//     title: "Master Chefs",
//     desc: "Michelin-star trained culinary experts",
//     icon: <FaHandHoldingHeart className="text-[#ff8f1f] text-5xl transition-transform duration-200" />,
//   },
//   {
//     id: 3,
//     img: rms3,
//     title: "Premium Quality",
//     desc: "Locally sourced organic ingredients",
//     icon: <FaLeaf className="text-[#ff8f1f] text-5xl transition-transform duration-200" />,
//   },
// ];

// const CulinaryExpress = () => {
//   const [cards] = useState(culinaryData);

//   return (
//     <div className="bg-[#0f0b07] text-white py-16 px-6 text-center">
//       <h1 className="text-7xl font-bold text-[#ff8f1f]">Culinary Express</h1>

//       <p className="text-[#d1d5db] mt-6 text-md mb-20">
//         Crafting unforgettable dining experiences delivered to your doorstep.
//       </p>

//       <div className="mt-12 flex flex-wrap justify-center gap-8">
//         {cards.map((item) => (
//           <div
//             key={item.id}
//            className="
//   group 
//   w-100
//   h-110
//   bg-[#2b1e15] 
//   rounded-2xl 
//   overflow-hidden 
//   border 
//   border-[#4b372a]
//   transition-all 
//   duration-300 

//   shadow-md shadow-[#ff8f1f]  

//   hover:shadow-[#ff8f1f]/40 
//   hover:shadow-2xl 
//   hover:scale-105
//   hover:border-[#ff8f1f]
// "

//           >
//             {/* IMAGE */}
//             <img
//               src={item.img}
//               alt={item.title}
//               className="w-full h-65 object-cover"
//             />

//             {/* CONTENT */}
//             <div className="p-5 text-left">
//               {/* ICON ROTATE + SCALE ON HOVER */}
//               <div className="group-hover:rotate-32 group-hover:scale-125 transition-transform duration-300 inline-block ">
//                 {item.icon}
//               </div>

//               <h3 className="text-2xl font-bold text-white mt-5">
//                 {item.title}
//               </h3>

//               <p className="text-[#d1d5db] text-md mt-3">{item.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CulinaryExpress;
import React, { useState, useEffect } from "react";
import { FaTruck, FaLeaf, FaHandHoldingHeart } from "react-icons/fa";

// Icon mapper (backend → frontend icon)
const iconMap = {
  truck: <FaTruck className="text-[#ff8f1f] text-5xl transition-transform duration-200" />,
  chef: <FaHandHoldingHeart className="text-[#ff8f1f] text-5xl transition-transform duration-200" />,
  leaf: <FaLeaf className="text-[#ff8f1f] text-5xl transition-transform duration-200" />,
};

const CulinaryExpress = () => {
  const [cards, setCards] = useState([]);

  // ---- FETCH DATA FROM BACKEND ----
  useEffect(() => {
    fetch("http://localhost:5000/api/culinary")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#0f0b07] text-white py-16 px-6 text-center">
      <h1 className="text-7xl font-bold text-[#ff8f1f]">Culinary Express</h1>

      <p className="text-[#d1d5db] mt-6 text-md mb-20">
        Crafting unforgettable dining experiences delivered to your doorstep.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {cards.map((item) => (
          <div
            key={item._id}
            className="
              group 
              w-100
              h-110
              bg-[#2b1e15] 
              rounded-2xl 
              overflow-hidden 
              border 
              border-[#4b372a]
              transition-all 
              duration-300 
              shadow-md shadow-[#ff8f1f]  
              hover:shadow-[#ff8f1f]/40 
              hover:shadow-2xl 
              hover:scale-105
              hover:border-[#ff8f1f]
            "
          >
            {/* IMAGE */}
            <img
              src={`http://localhost:5000${item.img}`}
              alt={item.title}
              className="w-full h-65 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5 text-left">
              {/* ICON ROTATE + SCALE ON HOVER */}
              <div className="group-hover:rotate-32 group-hover:scale-125 transition-transform duration-300 inline-block">
                {iconMap[item.iconType]}
              </div>

              <h3 className="text-2xl font-bold text-white mt-5">
                {item.title}
              </h3>

              <p className="text-[#d1d5db] text-md mt-3">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulinaryExpress;
