import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/cartContext";

const API_URL = "http://localhost:5000/api/menu";

const COLORS = {
  darkBrown1: "#0f0b07",
  darkBrown2: "#1a1410",
  darkBrown3: "#2a1a12",
  darkBrown4: "#4b372a",
  vibrantOrange: "#ff8f1f",
  pureWhite: "#ffffff",
  lightGray: "#d1d5db",
};

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setMenuItems(res.data))
      .catch(console.log);
  }, []);

  const cartList = menuItems.filter((item) => cartItems[item._id]);

  const totalAmount = cartList.reduce(
    (sum, item) => sum + item.price * cartItems[item._id],
    0
  );

  if (!cartList.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-xl"
        style={{ backgroundColor: COLORS.darkBrown1, color: COLORS.pureWhite }}
      >
        Your cart is empty
      </div>
    );
  }

  const handleCheckout = async () => {
    const items = cartList.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: cartItems[item._id],
    }));

    const res = await axios.post("http://localhost:5000/api/payment/checkout", {
      cartItems: items,
    });

    window.location.href = res.data.url;
  };

  return (
    <div
      className="min-h-screen pt-28 px-4"
      style={{ backgroundColor: COLORS.darkBrown1 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 pb-8 lg:grid-cols-3 gap-8">
        {/* LEFT: ITEMS */}
        <div className="lg:col-span-2 space-y-5">
          <h1 className="text-3xl font-bold text-white mb-4">Shopping Cart</h1>

          {cartList.map((item) => {
            const qty = cartItems[item._id];

            return (
              <div
                key={item._id}
                className="flex gap-4 p-4 rounded-2xl"
                style={{
                  backgroundColor: COLORS.darkBrown3,
                  border: `1px solid ${COLORS.darkBrown4}`,
                }}
              >
                {/* Image */}
                <div
                  className="w-28 h-28 flex items-center justify-center rounded-xl"
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

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: COLORS.lightGray }}
                  >
                    Rs {item.price} each
                  </p>

                  {/* Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{ borderColor: COLORS.darkBrown4 }}
                    >
                      <FaMinus className="text-white text-sm" />
                    </button>

                    <span className="text-white font-bold text-lg">{qty}</span>

                    <button
                      onClick={() => addToCart(item._id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: COLORS.vibrantOrange }}
                    >
                      <FaPlus className="text-white text-sm" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex flex-col items-end justify-between">
                  <span className="text-yellow-300 font-bold text-lg">
                    Rs {item.price * qty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* RIGHT: SUMMARY */}
        <div
          className="h-fit p-6 rounded-2xl sticky top-32 space-y-5"
          style={{
            backgroundColor: COLORS.darkBrown2,
            border: `1px solid ${COLORS.darkBrown4}`,
          }}
        >
          <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

          {/* Items Count */}
          <div
            className="flex justify-between text-sm"
            style={{ color: COLORS.lightGray }}
          >
            <span>Items</span>
            <span>{Object.values(cartItems).reduce((a, b) => a + b, 0)}</span>
          </div>

          {/* Subtotal */}
          <div
            className="flex justify-between text-sm"
            style={{ color: COLORS.lightGray }}
          >
            <span>Subtotal</span>
            <span>Rs {totalAmount}</span>
          </div>

          {/* Delivery */}
          <div
            className="flex justify-between text-sm"
            style={{ color: COLORS.lightGray }}
          >
            <span>Delivery</span>
            <span className="text-green-400">Free</span>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ backgroundColor: COLORS.darkBrown4 }}
          />

          {/* Grand Total */}
          <div className="flex justify-between text-xl font-bold text-yellow-300">
            <span>Total</span>
            <span>Rs {totalAmount}</span>
          </div>

          {/* Checkout */}

          <button
            onClick={handleCheckout}
            className="w-full py-4 rounded-xl font-bold text-lg"
            style={{
              backgroundColor: COLORS.vibrantOrange,
              color: COLORS.pureWhite,
            }}
          >
            Proceed to Checkout
          </button>

          <p
            className="text-xs text-center"
            style={{ color: COLORS.lightGray }}
          >
            Secure checkout · No extra charges
          </p>
        </div>
      </div>
    </div>
  );
}
