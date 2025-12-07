import React from 'react'
import { Link } from 'react-router-dom'


export default function ProductCard({ product, addToCart }){
return (
<div className="bg-[#2e1912] rounded-xl p-4 shadow-md">
<div className="h-40 bg-black/20 rounded-lg overflow-hidden flex items-center justify-center">
<img src={product.img} alt={product.title} className="w-full h-full object-cover" />
</div>
<div className="mt-3">
<div className="flex justify-between items-center">
<h3 className="text-yellow-200 font-semibold">{product.title}</h3>
<div className="text-sm text-gray-300">⭐ {product.rating} • ♥ {product.likes}</div>
</div>
<p className="text-gray-400 text-sm mt-2">Juicy grilled meat with authentic spices</p>
<div className="mt-4 flex items-center justify-between">
<div className="text-xl font-bold">₹{product.price}</div>
<div className="flex gap-2">
<button onClick={()=>addToCart(product)} className="bg-red-500 text-white px-3 py-1 rounded">+ Add</button>
<Link to={`/product/${product._id}`} className="border border-gray-600 px-3 py-1 rounded">View</Link>
</div>
</div>
</div>
</div>
)
}