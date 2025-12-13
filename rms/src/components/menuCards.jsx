import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../Context/cartContext";

const COLORS = {
  darkBrown2: "#1a1410",
  darkBrown3: "#2a1a12",
  darkBrown4: "#4b372a",
  vibrantOrange: "#ff8f1f",
  lightGray: "#d1d5db",
  pureWhite: "#ffffff",
};

function MenuCard({ item }) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const count = cartItems[item._id] || 0;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: COLORS.darkBrown3,
        border: `1px solid ${COLORS.darkBrown4}`,
      }}
    >
      {/* IMAGE */}
      <div
        className="h-52 flex items-center justify-center"
        style={{ backgroundColor: COLORS.darkBrown2 }}
      >
        <img
          src={
            item.image.startsWith("http")
              ? item.image
              : `http://localhost:5000/uploads/${item.image}`
          }
          alt={item.name}
          className="h-full object-contain p-2"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>

        <p
          className="text-sm mb-4 line-clamp-3"
          style={{ color: COLORS.lightGray }}
        >
          {item.description}
        </p>

        <div className="mt-auto">
          {count === 0 ? (
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-yellow-300">
                Rs {item.price}
              </span>
              <button
                onClick={() => addToCart(item._id)}
                className="px-4 py-2 rounded-lg flex items-center"
                style={{
                  backgroundColor: COLORS.vibrantOrange,
                  color: COLORS.pureWhite,
                }}
              >
                <FaShoppingCart className="mr-2" /> Add
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-yellow-300 font-bold text-xl">
                Rs {item.price * count}
              </span>
              <div className="flex items-center gap-3 text-xl">
                <button onClick={() => removeFromCart(item._id)}>
                  <FaMinus className="text-white" />
                </button>
                <span className="text-white font-bold">{count}</span>
                <button onClick={() => addToCart(item._id)}>
                  <FaPlus className="text-yellow-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
