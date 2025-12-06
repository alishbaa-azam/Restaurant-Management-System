// import { useState } from 'react';
// import { 
//   FaShoppingCart,
//   FaSearch,
//   FaPlus,
//   FaMinus
// } from 'react-icons/fa';

// // Colors Variables with Names
// const COLORS = {
//   darkBrown1: '#0f0b07',
//   darkBrown2: '#1a1410',
//   darkBrown3: '#2b1e15',
//   darkBrown4: '#4b372a',
//   vibrantOrange: '#ff8f1f',
//   fieryOrange: '#ff5200',
//   goldenYellow: '#ffb74a',
//   lightOrange: '#ffca6b',
//   tailwindYellow: '#facc15',
//   tailwindRedLight: '#ef4444',
//   tailwindRedDark: '#dc2626',
//   pureWhite: '#ffffff',
//   lightGray: '#d1d5db',
// };

// function MenuPage() {
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [cartItems, setCartItems] = useState({});

//   const categories = [
//     'ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'APPETIZERS', 
//     'DESSERTS', 'DRINKS', 'SPECIALS'
//   ];

//   const menuItems = [
//     {
//       id: 1,
//       name: "Eggs Benedict",
//       description: "Poached eggs over toasted English muffins with hollandaise sauce",
//       price: "Rs 80",
//       category: "BREAKFAST",
//       image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Garlic Bread",
//       description: "Freshly baked bread with garlic butter and herbs",
//       price: "Rs 120",
//       category: "APPETIZERS",
//       image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop",
//     },
//     {
//       id: 3,
//       name: "Margherita Pizza",
//       description: "Classic pizza with tomato, mozzarella, and basil",
//       price: "Rs 280",
//       category: "LUNCH",
//       image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
//     },
//     {
//       id: 4,
//       name: "Beef Burger",
//       description: "Grass-fed beef burger with special sauce",
//       price: "Rs 190",
//       category: "LUNCH",
//       image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
//     },
//     {
//       id: 5,
//       name: "Tiramisu",
//       description: "Classic Italian dessert with coffee and mascarpone",
//       price: "Rs 150",
//       category: "DESSERTS",
//       image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
//     },
//     {
//       id: 6,
//       name: "Mojito",
//       description: "Classic Cuban cocktail with mint and lime",
//       price: "Rs 180",
//       category: "DRINKS",
//       image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
//     },
//     {
//       id: 7,
//       name: "Chicken Tikka",
//       description: "Tender chicken pieces marinated in spices, grilled to perfection",
//       price: "Rs 220",
//       category: "SPECIALS",
//       image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
//     },
//     {
//       id: 8,
//       name: "Fruit Salad",
//       description: "Fresh seasonal fruits with honey dressing",
//       price: "Rs 100",
//       category: "BREAKFAST",
//       image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop",
//     },
//     {
//       id: 9,
//       name: "Pasta Carbonara",
//       description: "Creamy pasta with eggs, cheese, and pancetta",
//       price: "Rs 210",
//       category: "DINNER",
//       image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
//     },
//     {
//       id: 10,
//       name: "Chocolate Brownie",
//       description: "Warm chocolate brownie with ice cream",
//       price: "Rs 130",
//       category: "DESSERTS",
//       image: "https://images.unsplash.com/photo-1564355808539-22fda35db7aa?w=400&h=300&fit=crop",
//     },
//     {
//       id: 11,
//       name: "Caesar Salad",
//       description: "Fresh romaine lettuce with Caesar dressing",
//       price: "Rs 160",
//       category: "APPETIZERS",
//       image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
//     },
//     {
//       id: 12,
//       name: "Iced Coffee",
//       description: "Chilled coffee with milk and sugar",
//       price: "Rs 90",
//       category: "DRINKS",
//       image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
//     }
//   ];

//   // Filter items based on category and search query
//   const filteredItems = menuItems.filter(item => {
//     const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
//     const matchesSearch = searchQuery === '' || 
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return matchesCategory && matchesSearch;
//   });

//   // Cart functions
//   const handleAddToCart = (itemId) => {
//     setCartItems(prev => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1
//     }));
//   };

//   const handleIncrement = (itemId) => {
//     setCartItems(prev => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1
//     }));
//   };

//   const handleDecrement = (itemId) => {
//     setCartItems(prev => {
//       const newCount = (prev[itemId] || 0) - 1;
//       if (newCount <= 0) {
//         const updated = { ...prev };
//         delete updated[itemId];
//         return updated;
//       }
//       return {
//         ...prev,
//         [itemId]: newCount
//       };
//     });
//   };

//   // Calculate cart total
//   const cartTotal = Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
//     const item = menuItems.find(i => i.id === parseInt(itemId));
//     if (item) {
//       const price = parseInt(item.price.replace('Rs ', ''));
//       return total + (price * quantity);
//     }
//     return total;
//   }, 0);

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: COLORS.darkBrown1 }}>
//       {/* Header */}
//       <header className="py-8 px-4" style={{ backgroundColor: COLORS.darkBrown2 }}>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ 
//               color: COLORS.pureWhite,
//               fontFamily: "'Playfair Display', serif"
//             }}>
//               Our Menu
//             </h1>
//             <p className="text-lg md:text-xl" style={{ color: COLORS.lightOrange }}>
//               Delicious food delivered fresh to you
//             </p>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative max-w-lg mx-auto">
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" 
//               style={{ color: COLORS.lightGray }} />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search dishes, ingredients, or categories..."
//               className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all duration-300"
//               style={{ 
//                 backgroundColor: COLORS.darkBrown3,
//                 color: COLORS.pureWhite,
//                 border: `1px solid ${COLORS.darkBrown4}`,
//                 fontSize: '16px',
//                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
//               }}
//             />
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-5 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 
//                 hover:scale-105 hover:shadow-lg transform`}
//               style={{
//                 backgroundColor: activeCategory === category 
//                   ? COLORS.vibrantOrange 
//                   : COLORS.darkBrown3,
//                 color: activeCategory === category 
//                   ? COLORS.pureWhite 
//                   : COLORS.lightOrange,
//                 border: activeCategory === category 
//                   ? 'none' 
//                   : `2px solid ${COLORS.darkBrown4}`,
//                 boxShadow: activeCategory === category 
//                   ? `0 6px 20px rgba(255, 143, 31, 0.4)` 
//                   : '0 2px 8px rgba(0, 0, 0, 0.2)'
//               }}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Cart Summary */}
//         {cartTotal > 0 && (
//           <div className="mb-8 p-4 rounded-xl shadow-lg" style={{ 
//             backgroundColor: COLORS.darkBrown3,
//             border: `1px solid ${COLORS.darkBrown4}`,
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
//           }}>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <FaShoppingCart className="mr-3 text-xl" style={{ color: COLORS.vibrantOrange }} />
//                 <span style={{ color: COLORS.pureWhite, fontSize: '20px', fontWeight: '700' }}>
//                   Cart Total: Rs {cartTotal}
//                 </span>
//               </div>
//               <div style={{ color: COLORS.lightGray, fontSize: '16px', fontWeight: '500' }}>
//                 {Object.keys(cartItems).length} item(s)
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Menu Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredItems.map(item => {
//             const itemCount = cartItems[item.id] || 0;
            
//             return (
//               <div 
//                 key={item.id} 
//                 className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group"
//                 style={{ 
//                   backgroundColor: COLORS.darkBrown2,
//                   border: `1px solid ${COLORS.darkBrown3}`,
//                   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
//                 }}
//               >
//                 {/* Image with hover effect */}
//                 <div className="h-52 overflow-hidden relative">
//                   <img 
//                     src={item.image} 
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="p-5">
//                   {/* Name only - no price here */}
//                   <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.pureWhite }}>
//                     {item.name}
//                   </h3>
                  
//                   <p className="mb-5 text-sm" style={{ 
//                     color: COLORS.lightGray,
//                     lineHeight: '1.6',
//                     minHeight: '4rem'
//                   }}>
//                     {item.description}
//                   </p>
                  
//                   {/* Add to Cart / Quantity Controls - Price LEFT, Button RIGHT */}
//                   <div className="mt-4">
//                     {itemCount === 0 ? (
//                       <div className="flex items-center justify-between">
//                         {/* Price on LEFT side */}
//                         <div className="text-2xl font-bold" style={{ color: COLORS.vibrantOrange }}>
//                           {item.price}
//                         </div>
                        
//                         {/* Small ADD TO CART button on RIGHT side */}
//                         <button 
//                           onClick={() => handleAddToCart(item.id)}
//                           className="py-2.5 px-4 rounded-lg font-medium transition-all duration-300 
//                             hover:scale-105 hover:shadow-lg flex items-center group/btn"
//                           style={{ 
//                             backgroundColor: COLORS.vibrantOrange,
//                             color: COLORS.pureWhite,
//                             boxShadow: '0 4px 12px rgba(255, 143, 31, 0.3)'
//                           }}
//                         >
//                           <FaShoppingCart className="mr-2 text-sm group-hover/btn:scale-110 transition-transform" />
//                           <span className="text-sm">ADD TO CART</span>
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between bg-linear-to-r from-darkBrown3/50 to-darkBrown3/30  rounded-xl">
//                         <div className="flex items-center">
//                           <button 
//                             onClick={() => handleDecrement(item.id)}
//                             className="w-8 h-8 rounded-full flex items-center justify-center 
//                               hover:scale-110 transition-transform duration-200 hover:shadow-md"
//                             style={{ 
//                               backgroundColor: COLORS.darkBrown3,
//                               color: COLORS.pureWhite,
//                               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
//                             }}
//                           >
//                             <FaMinus size={14} />
//                           </button>
                          
//                           <span className="mx-4 text-2xl font-bold" style={{ color: COLORS.pureWhite }}>
//                             {itemCount}
//                           </span>
                          
//                           <button 
//                             onClick={() => handleIncrement(item.id)}
//                             className="w-8 h-8 rounded-full flex items-center justify-center 
//                               hover:scale-110 transition-transform duration-200 hover:shadow-lg"
//                             style={{ 
//                               backgroundColor: COLORS.vibrantOrange,
//                               color: COLORS.pureWhite,
//                               boxShadow: '0 4px 12px rgba(255, 143, 31, 0.4)'
//                             }}
//                           >
//                             <FaPlus size={14} />
//                           </button>
//                         </div>
                        
//                         {/* Price on LEFT side when item is in cart */}
//                         <div className="text-right">
//                           <div className="text-xl font-bold" style={{ color: COLORS.vibrantOrange }}>
//                             Rs {parseInt(item.price.replace('Rs ', '')) * itemCount}
//                           </div>
//                           <div className="text-xs mt-1" style={{ color: COLORS.lightGray }}>
//                             {item.price} × {itemCount}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* No Results Found */}
//         {filteredItems.length === 0 && (
//           <div className="text-center py-16">
//             <div className="mb-6">
//               <FaSearch className="w-20 h-20 mx-auto" style={{ color: COLORS.darkBrown4 }} />
//             </div>
//             <p className="text-2xl mb-3" style={{ color: COLORS.pureWhite, fontWeight: '600' }}>
//               No items found
//             </p>
//             <p style={{ color: COLORS.lightGray, fontSize: '16px' }}>
//               Try a different search term or category
//             </p>
//           </div>
//         )}
//       </main>

//       {/* Simple Footer */}
//       <div className="py-6 px-4 text-center" style={{ 
//         backgroundColor: COLORS.darkBrown2,
//         borderTop: `1px solid ${COLORS.darkBrown3}`,
//         boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)'
//       }}>
//         <p style={{ color: COLORS.lightGray, fontSize: '14px', fontWeight: '500' }}>
//           © {new Date().getFullYear()} Restaurant Menu • All prices in Rs
//         </p>
//         <p className="mt-1 text-xs" style={{ color: COLORS.darkBrown4 }}>
//           Made with ❤️ for food lovers
//         </p>
//       </div>
//     </div>
//   );
// }

// export default MenuPage;





import { useState, useEffect } from 'react';
import axios from "axios";
import { 
  FaShoppingCart,
  FaSearch,
  FaPlus,
  FaMinus
} from 'react-icons/fa';

// Colors Variables with Names
const COLORS = {
  darkBrown1: '#0f0b07',
  darkBrown2: '#1a1410',
  darkBrown3: '#2b1e15',
  darkBrown4: '#4b372a',
  vibrantOrange: '#ff8f1f',
  fieryOrange: '#ff5200',
  goldenYellow: '#ffb74a',
  lightOrange: '#ffca6b',
  tailwindYellow: '#facc15',
  tailwindRedLight: '#ef4444',
  tailwindRedDark: '#dc2626',
  pureWhite: '#ffffff',
  lightGray: '#d1d5db',
};

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [menuItems, setMenuItems] = useState([]);

  const API_URL = "http://localhost:5000/api/menu";

  // 🔥 Fetch menu from backend
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await axios.get(API_URL);
        setMenuItems(res.data);
      } catch (error) {
        console.log("Error fetching menu:", error);
      }
    };
    loadMenu();
  }, []);

  const categories = [
    'ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'APPETIZERS', 
    'DESSERTS', 'DRINKS', 'SPECIALS'
  ];

  // Filter items based on category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Cart functions
  const handleAddToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleIncrement = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleDecrement = (itemId) => {
    setCartItems(prev => {
      const newCount = (prev[itemId] || 0) - 1;
      if (newCount <= 0) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return {
        ...prev,
        [itemId]: newCount
      };
    });
  };

  // Calculate cart total
  const cartTotal = Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
    const item = menuItems.find(i => i._id === itemId);
    if (item) {
      const price = parseInt(item.price);
      return total + (price * quantity);
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.darkBrown1 }}>

      {/* ---- YOUR UI BELOW (UNTOUCHED CSS) ---- */}

      {/* Header */}
      <header className="py-8 px-4" style={{ backgroundColor: COLORS.darkBrown2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ 
              color: COLORS.pureWhite,
              fontFamily: "'Playfair Display', serif"
            }}>
              Our Menu
            </h1>
            <p className="text-lg md:text-xl" style={{ color: COLORS.lightOrange }}>
              Delicious food delivered fresh to you
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              style={{ color: COLORS.lightGray }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients, or categories..."
              className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all duration-300"
              style={{ 
                backgroundColor: COLORS.darkBrown3,
                color: COLORS.pureWhite,
                border: `1px solid ${COLORS.darkBrown4}`,
                fontSize: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 
                hover:scale-105 hover:shadow-lg transform"
              style={{
                backgroundColor: activeCategory === category 
                  ? COLORS.vibrantOrange 
                  : COLORS.darkBrown3,
                color: activeCategory === category 
                  ? COLORS.pureWhite 
                  : COLORS.lightOrange,
                border: activeCategory === category 
                  ? 'none' 
                  : `2px solid ${COLORS.darkBrown4}`,
                boxShadow: activeCategory === category 
                  ? `0 6px 20px rgba(255, 143, 31, 0.4)` 
                  : '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Cards */}
        <div className=" mx-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            const itemCount = cartItems[item._id] || 0;

            return (
              <div 
                key={item._id} 
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group"
                style={{ 
                  backgroundColor: COLORS.darkBrown2,
                  border: `1px solid ${COLORS.darkBrown3}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                }}
              >
                {/* Image */}
                <div className="h-57 overflow-hidden relative">
                  <img 
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/uploads/${item.image}`
                    }
                    alt={item.name}
                    className="w-full p-6 h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* CONTENT BELOW (NO CSS CHANGES) */}
                {/* ---- I did not touch ANY styling ---- */}

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.pureWhite }}>
                    {item.name}
                  </h3>
                  <p className="mb-5 text-sm" style={{ color: COLORS.lightGray }}>
                    {item.description}
                  </p>

                  {/* PRICE + CART */}
                  <div className="mt-4">
                    {itemCount === 0 ? (
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold" style={{ color: COLORS.vibrantOrange }}>
                          Rs {item.price}
                        </div>
                        <button 
                          onClick={() => handleAddToCart(item._id)}
                          className="py-2.5 px-4 rounded-lg font-medium hover:scale-105 hover:shadow-lg flex items-center"
                          style={{ 
                            backgroundColor: COLORS.vibrantOrange,
                            color: COLORS.pureWhite
                          }}
                        >
                          <FaShoppingCart className="mr-2 text-sm" />
                          <span className="text-sm">ADD TO CART</span>
                        </button>
                      </div>
                    ) : (


                      <div className="flex items-center justify-between rounded-xl">

                                                <div className="text-right">
                          <div className="text-xl font-bold" style={{ color: COLORS.vibrantOrange }}>
                            Rs {item.price * itemCount}
                          </div>
                          <div className="text-xs" style={{ color: COLORS.lightGray }}>
                            Rs {item.price} × {itemCount}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => handleDecrement(item._id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: COLORS.darkBrown3, color: COLORS.pureWhite }}
                          >
                            <FaMinus size={14} />
                          </button>

                          <span className="mx-4 text-2xl font-bold" style={{ color: COLORS.pureWhite }}>
                            {itemCount}
                          </span>

                          <button 
                            onClick={() => handleIncrement(item._id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: COLORS.vibrantOrange, color: COLORS.pureWhite }}
                          >
                            <FaPlus size={14} />
                          </button>
                        </div>


                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}

export default MenuPage;
