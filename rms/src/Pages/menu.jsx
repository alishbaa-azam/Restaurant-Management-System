import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import MenuCard from "../components/menuCards";

const COLORS = {
  darkBrown1: "#0f0b07",
  darkBrown2: "#1a1410",
  darkBrown3: "#2a1a12",
  darkBrown4: "#4b372a",
  vibrantOrange: "#ff8f1f",
  lightOrange: "#ffca6b",
  pureWhite: "#ffffff",
};

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const API_URL = "http://localhost:5000/api/menu";

  useEffect(() => {
    axios.get(API_URL).then(res => setMenuItems(res.data));
  }, []);

  const categories = [
    "ALL","BREAKFAST","LUNCH","DINNER",
    "APPETIZERS","DESSERTS","DRINKS","SPECIALS"
  ];

  const filteredItems = menuItems.filter(item => {
    const cat = activeCategory === "ALL" || item.category === activeCategory;
    const search =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return cat && search;
  });

  return (
    <div className="min-h-screen mt-20" style={{ backgroundColor: COLORS.darkBrown1 }}>
      {/* HEADER */}
      <header className="py-8 px-4" style={{ backgroundColor: COLORS.darkBrown2 }}>
        <h1 className="text-center text-5xl font-bold text-white">
          Our Menu
        </h1>
        <p className="text-center pt-3 text-xl" style={{ color: COLORS.lightOrange }}>
          Delicious food delivered fresh to you
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* SEARCH */}
        <div className="mb-8 max-w-lg mx-auto relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search food..."
            className="w-full pl-12 pr-4 py-3 rounded-xl outline-none"
            style={{
              backgroundColor: COLORS.darkBrown3,
              color: COLORS.pureWhite,
              border: `2px solid ${COLORS.darkBrown4}`,
            }}
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full font-semibold"
              style={{
                backgroundColor:
                  activeCategory === cat ? COLORS.vibrantOrange : COLORS.darkBrown3,
                color:
                  activeCategory === cat ? COLORS.pureWhite : COLORS.lightOrange,
                border: `1px solid ${COLORS.darkBrown4}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default MenuPage;
