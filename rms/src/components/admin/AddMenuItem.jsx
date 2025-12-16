
import React, { useState, useMemo, useEffect } from "react";
import { FaStar, FaFire, FaTimes, FaCheck } from "react-icons/fa";

const DEFAULT_FORM = {
  name: "",
  description: "",
  category: "",
  price: "",
  image: null,
  rating: 0,
  popularity: 1,
  isAvailable: true,
  special: false,
};

const CATEGORIES = [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "APPETIZERS",
  "DESSERTS",
  "DRINKS",
  "SPECIALS",
];

const AddMenuItem = ({ onAddItem, editingItem, onUpdateItem, onCancelEdit }) => {
  const availableImages = useMemo(() => {
    const images = [
      "AvocadoToast.png","BagelSmash.png","Baklava.png","Cappuccino.png",
      "Cheesecake.png","ChickenTikka.png","ChocolateCake.png","Churros.png",
      "EggsBenedict.png","Espresso.png","FrenchToast.png","Gelato.png",
      "GrilledSalmonBowl.png","GulabJamun.png","IcedLatte.png","Lasagna.png",
      "MargheritaPizza.png","MasalaDosa.png","Nachos.png","PancakeswithMapleSyrup.png",
      "PastaPrimavera.png","Risotto.png","SpaghettiCarbonara.png"
    ];
    return images.map(img => ({
      name: img,
      path: `/src/assets/${img}`
    }));
  }, []);

  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [showImageGrid, setShowImageGrid] = useState(false);

  useEffect(() => {
    setFormData(editingItem || DEFAULT_FORM);
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      id: editingItem?.id || Date.now(),
    };

    editingItem ? onUpdateItem(payload) : onAddItem(payload);
    if (!editingItem) setFormData(DEFAULT_FORM);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">
          {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>
        {editingItem && (
          <button onClick={onCancelEdit} className="text-gray-400 hover:text-red-500">
            <FaTimes size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* IMAGE PICKER */}
        <div>
          <h3 className="text-lg font-semibold mb-3">🍽️ Product Image</h3>

          <div className="border-2 border-dashed rounded-2xl p-6 bg-gray-50 text-center">
            {formData.image ? (
              <>
                <img
                  src={formData.image}
                  alt="preview"
                  className="w-36 h-36 object-cover rounded-xl mx-auto shadow-lg"
                />
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {formData.image.split("/").pop()}
                </p>
              </>
            ) : (
              <div className="text-gray-400 text-4xl">🍔</div>
            )}

            <button
              type="button"
              onClick={() => setShowImageGrid(!showImageGrid)}
              className="mt-3 text-blue-600 font-semibold"
            >
              {showImageGrid ? "Hide Images" : "Choose Image"}
            </button>
          </div>

          {showImageGrid && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-72 overflow-y-auto">
              {availableImages.map(img => (
                <button
                  key={img.name}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, image: img.path });
                    setShowImageGrid(false);
                  }}
                  className={`relative rounded-xl overflow-hidden border transition
                    ${formData.image === img.path
                      ? "border-blue-500 ring-2 ring-blue-400"
                      : "border-gray-200 hover:border-blue-400"}
                  `}
                >
                  <img src={img.path} className="h-20 w-full object-cover" />
                  {formData.image === img.path && (
                    <div className="absolute inset-0 bg-blue-500/40 flex items-center justify-center">
                      <FaCheck className="text-white text-xl" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            className="input"
            placeholder="Product Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <select
            className="input"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <input
            type="number"
            className="input"
            placeholder="Price (€)"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={formData.isAvailable}
                onChange={() => setFormData({ ...formData, isAvailable: true })}
              />
              Available
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!formData.isAvailable}
                onChange={() => setFormData({ ...formData, isAvailable: false })}
              />
              Unavailable
            </label>
          </div>
        </div>

        <textarea
          className="input h-28 resize-none"
          placeholder="Product Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />

        {/* SPECIAL OFFER */}
        <div className={`p-4 rounded-2xl border ${
          formData.special
            ? "bg-orange-50 border-orange-400"
            : "bg-gray-50 border-gray-200"
        }`}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.special}
              onChange={e => setFormData({ ...formData, special: e.target.checked })}
              className="h-5 w-5 accent-orange-500"
            />
            <FaStar className="text-orange-500" />
            <span className="font-semibold">Special Offer</span>
            {formData.special && (
              <span className="ml-auto px-3 py-1 text-xs bg-red-500 text-white rounded-full animate-pulse">
                🔥 LIVE
              </span>
            )}
          </label>
        </div>

        {/* RATING & POPULARITY */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold mb-2">Rating</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(s => (
                <FaStar
                  key={s}
                  onClick={() => setFormData({ ...formData, rating: s })}
                  className={`cursor-pointer text-2xl ${
                    s <= formData.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Popularity</p>
            <div className="flex gap-2">
              {[1,2,3].map(p => (
                <FaFire
                  key={p}
                  onClick={() => setFormData({ ...formData, popularity: p })}
                  className={`cursor-pointer text-2xl ${
                    p <= formData.popularity ? "text-red-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-white font-bold
          bg-gradient-to-r from-orange-500 to-red-500
          hover:from-orange-600 hover:to-red-600
          shadow-xl hover:shadow-2xl transition"
        >
          {editingItem ? "Update Item" : "Add to Menu"}
        </button>

      </form>
    </div>
  );
};

export default AddMenuItem;
