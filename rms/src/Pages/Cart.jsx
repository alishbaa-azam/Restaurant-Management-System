import React from "react";

export default function Cart({ cart, removeFromCart, addToCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-10 text-white bg-[#0f0b07] min-h-screen">
      <h1 className="text-4xl mb-10 text-[#ffb74a]">Your Cart</h1>

      {cart.length === 0 && <p className="text-gray-400">Your cart is empty.</p>}

      <div className="space-y-6">
        {cart.map(item => (
          <div key={item._id} className="flex justify-between items-center bg-[#1a1410] p-5 rounded-xl border border-[#4b372a]">
            <div className="flex items-center gap-5">
              <img src={item.image} className="w-20 h-20 object-contain" />
              <div>
                <h3 className="text-xl text-[#ffca6b]">{item.name}</h3>
                <p className="text-gray-300">Rs {item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => addToCart(item)} className="px-3 py-1 bg-[#ffb74a] text-black rounded hover:bg-[#ffca6b]">+</button>
                  <span className="text-white font-semibold">{item.qty}</span>
                  <button onClick={() => removeFromCart(item._id)} className="px-3 py-1 bg-[#4b372a] rounded hover:bg-[#6b4b3a]">-</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-gray-300">Subtotal: Rs {item.price * item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 flex justify-between items-center">
          <h2 className="text-2xl text-[#ffb74a] font-semibold">Total: Rs {total}</h2>
        </div>
      )}
    </div>
  );
}
