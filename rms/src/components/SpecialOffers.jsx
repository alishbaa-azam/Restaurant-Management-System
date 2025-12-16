import React from "react";

export default function SpecialOffers({ items }) {
  return (
    <section className="py-14 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
          🔥 Today’s Special Deals
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => {
            const discounted =
              item.price - (item.price * item.discount) / 100;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform relative"
              >
                {/* Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  🔥 {item.discount}% OFF
                </span>

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="line-through text-gray-400 text-sm">
                        €{item.price}
                      </span>
                      <span className="block text-orange-600 font-extrabold text-lg">
                        €{discounted.toFixed(2)}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      ⏰ Ends: {item.offerEnd}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!items.length && (
          <p className="text-gray-500 mt-6">No special deals today 😔</p>
        )}
      </div>
    </section>
  );
}
