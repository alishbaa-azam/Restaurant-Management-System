// import React, { useEffect, useState } from "react";

// const ChefSection = () => {
//   const [chefs, setChefs] = useState([]);

//   useEffect(() => {
//     const fetchChefs = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/chefs");
//         const data = await res.json();
//         setChefs(data);
//       } catch (err) {
//         console.log("API Error:", err);
//       }
//     };

//     fetchChefs();
//   }, []);

//   return (
//     <div className="w-full bg-[#0f0b07] py-16 px-6 text-center text-white">
//       {/* TITLE */}
//       <h2 className="text-4xl sm:text-5xl font-bold mb-14">
//         Meet Our <span className="text-[#ff8f1f]">Culinary Artists</span>
//       </h2>

//       {/* GRID */}
//       <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center">
//         {chefs.map((chef, index) => (
//           <div
//             key={chef._id}
//             className="
//               chef-card 
//               w-[330px] 
//               bg-[#2b1e15] 
//               rounded-2xl 
//               overflow-hidden 
//               border border-[#4b372a]
//               shadow-[0_0_12px_rgba(255,143,31,0.15)]
//               transition-all duration-300 opacity-0 translate-y-10
//               animate-fadeBounce
//             "
//             style={{ animationDelay: `${index * 0.2}s` }}
//           >
//             {/* IMAGE */}
//             <div className="overflow-hidden">
//               <img
//                 src={chef.image}
//                 alt={chef.name}
//                 className="
//                   w-full h-[360px] object-cover 
//                   transition-transform duration-500
//                   hover:scale-110
//                 "
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-6">
//               <h3 className="text-[22px] font-bold">{chef.name}</h3>

//               <p className="text-[#ff8f1f] italic mt-1">{chef.role}</p>

//               <p className="text-gray-300 text-sm mt-2 leading-relaxed">
//                 {chef.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ANIMATIONS */}
//       <style>{`
//         .chef-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0px 0px 25px rgba(255, 143, 31, 0.45);
//           border-color: #ff8f1f;
//         }

//         @keyframes fadeBounce {
//           0% { opacity: 0; transform: translateY(40px); }
//           60% { opacity: 1; transform: translateY(-10px); }
//           100% { transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChefSection;
// import React, { useEffect, useState } from "react";

// const ChefSection = () => {
//   const [chefs, setChefs] = useState([]);

//   useEffect(() => {
//     const fetchChefs = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/chefs");
//         const data = await res.json();
//         setChefs(data);
//       } catch (err) {
//         console.log("API Error:", err);
//       }
//     };

//     fetchChefs();
//   }, []);

//   return (
//     <div className="w-full bg-[#0f0b07] py-16 px-6 text-center text-white">
//       {/* TITLE */}
//       <h2 className="text-4xl sm:text-5xl font-bold mb-14">
//         Meet Our <span className="text-[#ff8f1f]">Culinary Artists</span>
//       </h2>

//       {/* GRID */}
//       <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center">
//         {chefs.map((chef, index) => (
//           <div
//             key={chef._id}
//             className="
//               chef-card 
//               w-[380px]
//               bg-[#2b1e15] 
//               rounded-2xl 
//               overflow-hidden 
//               border border-[#4b372a]
//               shadow-[0_0_12px_rgba(255,143,31,0.15)]
            
              
//             "
//             style={{ animationDelay: `${index * 0.2}s` }}
//           >
//             {/* IMAGE */}
//             <div className="overflow-hidden">
//               <img
//                 src={
//                   chef.image
//                     ? `http://localhost:5000${chef.image}` // backend serves /uploads
//                     : "/default-chef.jpg" // fallback
//                 }
//                 alt={chef.name}
//                 className="
//                   w-full h-[360px] object-cover 
//                   transition-transform duration-500
//                   hover:scale-110
//                 "
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-6">
//               <h3 className="text-[32px] font-bold">{chef.name}</h3>

//               <p className="text-[#ff8f1f] italic mt-1">{chef.role}</p>

//               <p className="text-gray-300 text-sm mt-2 leading-relaxed">
//                 {chef.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

   
       
//     </div>
//   );
// };

// export default ChefSection;
import React, { useEffect, useState } from "react";

const ChefSection = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chefs");
        const data = await res.json();
        setChefs(data);
      } catch (err) {
        console.log("API Error:", err);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="w-full bg-[#0f0b07] py-16 px-6 text-center text-white">
      {/* TITLE */}
      <h2 className="text-6xl sm:text-6xl font-bold mb-23">
        Meet Our <span className="text-[#ff8f1f]">Culinary Artists</span>
      </h2>

      {/* GRID */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {chefs.map((chef) => (
          <div
            key={chef._id}
            className="
              chef-card
              w-[350px] sm:w-full
              bg-[#2b1e15]
              rounded-2xl
              overflow-hidden
              border border-[#a85d2a]
              shadow-[0_0_20px_rgba(255,143,31,0.1)]
              transition-all duration-500
              transform
              hover:shadow-[0_0_25px_rgba(255,143,31,0.6)]
              hover:-translate-y-3
            "
          >
            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={
                  chef.image
                    ? `http://localhost:5000${chef.image}`
                    : "/default-chef.jpg"
                }
                alt={chef.name}
                className="
                  w-full h-[360px] object-cover
                  transition-transform duration-500
                  hover:scale-105
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-2xl sm:text-[28px] md:text-3xl font-bold">
                {chef.name}
              </h3>
              <p className="text-[#ff8f1f] italic mt-1">{chef.role}</p>
              <p className="text-gray-300 text-sm sm:text-base mt-2 leading-relaxed">
                {chef.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefSection;
