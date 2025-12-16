// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { sampleProducts } from '../data/sampleProducts'


// export default function Product({ addToCart }){
// const { id } = useParams()
// const product = sampleProducts.find(p=>p._id===id) || sampleProducts[0]


// return (
// <div className="py-12 px-8">
// <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
// <img src={product.img} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
// <div>
// <h2 className="text-3xl text-yellow-200 font-bold">{product.title}</h2>
// <p className="text-gray-300 mt-4">Delicious and made with love.</p>
// <div className="mt-6 text-2xl font-bold">₹{product.price}</div>
// <div className="mt-6">
// <button onClick={()=>addToCart(product)} className="bg-red-500 px-4 py-2 rounded-md text-white">Add to cart</button>
// </div>
// </div>
// </div>
// </div>
// )
// }