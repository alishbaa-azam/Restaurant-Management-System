// import { useEffect, useState } from "react";
// import axios from "axios";
// import MenuCard from "./menuCards"; // your separated card component
// // import { COLORS } from "./colors"; // you can export your colors separately or redefine here
// const COLORS = {
//   darkBrown1: "#0f0b07",
//   darkBrown2: "#1a1410",
//   darkBrown3: "#2a1a12",
//   darkBrown4: "#4b372a",
//   vibrantOrange: "#ff8f1f",
//   lightOrange: "#ffca6b",
//   pureWhite: "#ffffff",
// };
// export default function FeaturedMenu() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/menu")
//       .then((res) => setMenuItems(res.data.slice(0, 8))) // get only 8 items
//       .catch(console.log);
//   }, []);

//   const displayedItems = showAll ? menuItems : menuItems.slice(0, 4);

//   return (
//     <div
//       className="min-h-screen pt-20 px-4"
//       style={{ backgroundColor: COLORS.darkBrown2 }}
//     >
//       <h2
//         className="text-4xl font-bold text-center mb-10 text-white"
//         style={{ color: COLORS.vibrantOrange }}
//       >
//         Featured Dishes
//       </h2>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {displayedItems.map((item) => (
//           <MenuCard key={item._id} item={item} />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto flex justify-center mt-10">
//         {!showAll ? (
//           <button
//             onClick={() => setShowAll(true)}
//             className="px-6 py-3 rounded-lg font-semibold"
//             style={{ backgroundColor: COLORS.vibrantOrange, color: COLORS.pureWhite }}
//           >
//             Show More
//           </button>
//         ) : (
//           <a
//             href="/menu" // or use Link from react-router-dom if you use routing
//             className="px-6 py-3 rounded-lg font-semibold"
//             style={{ backgroundColor: COLORS.lightGray, color: COLORS.darkBrown2, textDecoration: 'none' }}
//           >
//             Go to Full Menu
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import MenuCard from "./menuCards";

const COLORS = {
  darkBrown1: "#0f0b07",
  darkBrown2: "#1a1410",
  darkBrown3: "#2a1a12",
  darkBrown4: "#4b372a",
  vibrantOrange: "#ff8f1f",
  lightOrange: "#ffca6b",
  pureWhite: "#ffffff",
  lightGray: "#d1d5db",
};

export default function FeaturedMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => setMenuItems(res.data.slice(0, 8))) // only 8 items
      .catch(console.log);
  }, []);

  const displayedItems = showAll ? menuItems : menuItems.slice(0, 4);

  return (
    <div
      className="min-h-screen pt-20 pb-10 px-4"
      style={{ backgroundColor: COLORS.darkBrown2 }}
    >
      {/* Decorative heading with lines */}
      <div className="max-w-3xl mx-auto mb-12 text-center relative">
        <div
          className="absolute left-0 top-1/2 w-20 border-t border-yellow-400"
          style={{ transform: "translateY(-50%)" }}
        />
        <h2
          className="inline-block text-4xl font-extrabold text-white px-6 bg-black relative z-10"
          style={{ color: COLORS.vibrantOrange }}
        >
          Featured Dishes
        </h2>
        <div
          className="absolute right-0 top-1/2 w-20 border-t border-yellow-400"
          style={{ transform: "translateY(-50%)" }}
        />
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>

      {/* Buttons */}
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 mt-10">
        {menuItems.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            style={{
              backgroundColor: COLORS.vibrantOrange,
              color: COLORS.pureWhite,
            }}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}

       
      </div>
    </div>
  );
}
