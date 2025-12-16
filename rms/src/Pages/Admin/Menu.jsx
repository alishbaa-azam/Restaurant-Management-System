
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Sidebar from '../../components/admin/Sidebar';
// import AddMenuItem from '../../components/admin/AddMenuItem';
// import MenuItemList from '../../components/admin/MenuItemList';
// import adminApi from '../../services/adminApi';

// const Menu = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);

//   const location = useLocation();
//   const section = location.pathname.includes('/categories')
//     ? 'categories'
//     : location.pathname.includes('/specials')
//     ? 'specials'
//     : 'all';

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await adminApi.getProducts();
//         const items = (res.data || []).map(p => ({
//           id: p._id,
//           name: p.name,
//           description: p.description,
//           category: p.category,
//           price: Number(p.price) || 0,
//           rating: p.rating || 4,
//           popularity: p.popularity || 1,
//           image: p.image || '',
//           isAvailable: p.isAvailable === undefined ? true : p.isAvailable,
//           special: p.special || false,
//           createdAt: p.createdAt || ''
//         }));
//         setMenuItems(items);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // ===== Handlers =====
//   const handleAddItem = async (newItem) => {
//     try {
//       const payload = {
//         name: newItem.name,
//         description: newItem.description,
//         price: Number(newItem.price) || 0,
//         category: newItem.category,
//         image: newItem.image || '',
//         special: !!newItem.special,
//         isAvailable: newItem.isAvailable === undefined ? true : !!newItem.isAvailable,
//         rating: newItem.rating || 0,
//         popularity: newItem.popularity || 1,
//         stock: newItem.stock || 0
//       };
//       const res = await adminApi.createProduct(payload);
//       const created = res.data;
//       setMenuItems(prev => [
//         ...prev,
//         {
//           id: created._id || Date.now(),
//           name: created.name,
//           description: created.description,
//           category: created.category,
//           price: created.price,
//           rating: created.rating || 4,
//           popularity: created.popularity || 1,
//           image: created.image || newItem.image || '',
//           isAvailable: created.isAvailable === undefined ? true : created.isAvailable,
//           special: created.special || false,
//           createdAt: created.createdAt || new Date().toISOString().split('T')[0]
//         }
//       ]);
//     } catch (err) {
//       setError(err.message || 'Failed to create product');
//     }
//   };

//   const handleUpdateItem = async (updatedItem) => {
//     try {
//       await adminApi.updateProduct(updatedItem.id, updatedItem);
//       setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item));
//     } catch {
//       setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item));
//     } finally {
//       setEditingItem(null);
//     }
//   };

//   const handleDeleteItem = async (id) => {
//     try {
//       await adminApi.deleteProduct(id);
//       setMenuItems(prev => prev.filter(item => item.id !== id));
//     } catch {
//       setMenuItems(prev => prev.filter(item => item.id !== id));
//     }
//   };

//   const handleEditItem = (item) => setEditingItem(item);
//   const handleCancelEdit = () => setEditingItem(null);
//   const handleToggleAvailability = async (id) => {
//     const item = menuItems.find(i => i.id === id);
//     if (!item) return;
//     const updated = { ...item, isAvailable: !item.isAvailable };
//     try {
//       await adminApi.updateProduct(id, { isAvailable: updated.isAvailable });
//       setMenuItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: updated.isAvailable } : i));
//     } catch (err) {
//       setError(err.message || 'Failed to update availability');
//     }
//   };

//   // Derived data
//   const categories = Array.from(new Set(menuItems.map(i => i.category).filter(Boolean)));
//   const categorySummary = categories.map(cat => {
//     const items = menuItems.filter(i => i.category === cat);
//     return { name: cat, count: items.length, total: items.reduce((s, i) => s + (Number(i.price) || 0), 0) };
//   });
//   const specialsItems = menuItems.filter(i => (i.category === 'Specials') || i.special);

//   // ===== JSX =====
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 p-6 overflow-x-hidden">
//         <div className="max-w-7xl mx-auto">

//           {/* Header */}
//           <div className="mb-8 flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl font-extrabold text-gray-900">Menu Management</h1>
//               <p className="text-gray-500 mt-1">Manage your restaurant's menu items, categories & pricing</p>
//             </div>
//             <button
//               onClick={() => setEditingItem({})}
//               className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
//             >
//               + Add New Item
//             </button>
//           </div>

//           {/* Section Content */}
//           {section === 'all' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//               {/* Add/Edit + Stats */}
//               <div className="lg:col-span-1 space-y-6">
//                 <AddMenuItem
//                   onAddItem={handleAddItem}
//                   editingItem={editingItem}
//                   onUpdateItem={handleUpdateItem}
//                   onCancelEdit={handleCancelEdit}
//                 />

//                 <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#f3e8e1] hover:shadow-2xl transition-shadow">
//                   <h3 className="font-semibold text-gray-800 mb-4 text-lg">Menu Overview</h3>
//                   <div className="space-y-3">
//                     {['Main Course','Appetizers','Desserts','Beverages','Specials'].map(cat => {
//                       const count = menuItems.filter(item => item.category === cat).length;
//                       return (
//                         <div key={cat} className="flex justify-between items-center">
//                           <span className="text-gray-700">{cat}</span>
//                           <span className="font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 text-white px-3 py-1 rounded-full shadow-sm">{count} items</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="pt-3 border-t mt-3 flex justify-between font-bold text-gray-900 text-lg">
//                     <span>Total Items</span>
//                     <span>{menuItems.length}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Menu Items List */}
//               <div className="lg:col-span-2">
//                 {loading ? (
//                   <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#f3e8e1]">Loading products...</div>
//                 ) : error ? (
//                   <div className="bg-white rounded-2xl shadow-xl p-6 text-red-600 border border-[#f3e8e1]">{error}</div>
//                 ) : (
//                   <MenuItemList
//                     items={menuItems}
//                     onEdit={handleEditItem}
//                     onDelete={handleDeleteItem}
//                     onToggleAvailability={handleToggleAvailability}
//                   />
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Categories Section */}
//           {section === 'categories' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {categorySummary.length ? categorySummary.map(cat => (
//                 <div key={cat.name} className="bg-white rounded-2xl shadow-sm p-5 border border-[#f3e8e1] hover:shadow-lg transition-shadow">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
//                     <span className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">{cat.count} items</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Total Price: RS{cat.total.toFixed(2)}</p>
//                 </div>
//               )) : (
//                 <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-600 border border-[#f3e8e1]">No categories found.</div>
//               )}
//             </div>
//           )}

//           {/* Specials Section */}
//           {section === 'specials' && (
//             <div>
//               {loading ? (
//                 <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#f3e8e1]">Loading specials...</div>
//               ) : error ? (
//                 <div className="bg-white rounded-2xl shadow-xl p-6 text-red-600 border border-[#f3e8e1]">{error}</div>
//               ) : (
//                 <MenuItemList
//                   items={specialsItems}
//                   onEdit={handleEditItem}
//                   onDelete={handleDeleteItem}
//                   onToggleAvailability={handleToggleAvailability}
//                 />
//               )}
//               {!loading && !error && specialsItems.length === 0 && (
//                 <div className="bg-white rounded-2xl shadow-sm p-6 mt-4 text-gray-600 border border-[#f3e8e1]">No special offers found.</div>
//               )}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import AddMenuItem from '../../components/admin/AddMenuItem';
import MenuItemList from '../../components/admin/MenuItemList';
import adminApi from '../../services/adminApi';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const location = useLocation();
  const section = location.pathname.includes('/categories')
    ? 'categories'
    : location.pathname.includes('/specials')
    ? 'specials'
    : 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getProducts();
        const items = (res.data || []).map(p => ({
          id: p._id,
          name: p.name,
          description: p.description,
          category: p.category,
          price: Number(p.price) || 0,
          rating: p.rating || 4,
          popularity: p.popularity || 1,
          image: p.image || '',
          isAvailable: p.isAvailable === undefined ? true : p.isAvailable,
          special: p.special || false,
          createdAt: p.createdAt || ''
        }));
        setMenuItems(items);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handlers
  const handleAddItem = async (newItem) => {
    try {
      const res = await adminApi.createProduct(newItem);
      const created = res.data;
      setMenuItems(prev => [
        ...prev,
        {
          id: created._id || Date.now(),
          ...created
        }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to create product');
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      const res = await adminApi.updateProduct(updatedItem.id, updatedItem);
      const updated = res.data;
      setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? { ...item, ...updated } : item));
    } catch {
      setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item));
    } finally {
      setEditingItem(null);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await adminApi.deleteProduct(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEditItem = (item) => setEditingItem(item);
  const handleCancelEdit = () => setEditingItem(null);

  const handleToggleAvailability = async (id) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    const updated = { ...item, isAvailable: !item.isAvailable };
    try {
      await adminApi.updateProduct(id, { isAvailable: updated.isAvailable });
      setMenuItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: updated.isAvailable } : i));
    } catch (err) {
      setError(err.message || 'Failed to update availability');
    }
  };

  // Derived data
  const categories = Array.from(new Set(menuItems.map(i => i.category).filter(Boolean)));
  const categorySummary = categories.map(cat => {
    const items = menuItems.filter(i => i.category === cat);
    return { name: cat, count: items.length, total: items.reduce((s, i) => s + (Number(i.price) || 0), 0) };
  });
  const specialsItems = menuItems.filter(i => (i.category === 'Specials') || i.special);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">Menu Management</h1>
              <p className="text-gray-500 mt-1">Manage your restaurant's menu items, categories & pricing</p>
            </div>
            <button
              onClick={() => setEditingItem({})}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              + Add New Item
            </button>
          </div>

          {/* Section Content */}
          {section === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <AddMenuItem
                  onAddItem={handleAddItem}
                  editingItem={editingItem}
                  onUpdateItem={handleUpdateItem}
                  onCancelEdit={handleCancelEdit}
                />

                <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#f3e8e1] hover:shadow-2xl transition-shadow">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">Menu Overview</h3>
                  <div className="space-y-3">
                    {['Main Course','Appetizers','Desserts','Beverages','Specials'].map(cat => {
                      const count = menuItems.filter(item => item.category === cat).length;
                      return (
                        <div key={cat} className="flex justify-between items-center">
                          <span className="text-gray-700">{cat}</span>
                          <span className="font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 text-white px-3 py-1 rounded-full shadow-sm">{count} items</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-3 border-t mt-3 flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total Items</span>
                    <span>{menuItems.length}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                {loading ? (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#f3e8e1]">Loading products...</div>
                ) : error ? (
                  <div className="bg-white rounded-2xl shadow-xl p-6 text-red-600 border border-[#f3e8e1]">{error}</div>
                ) : (
                  <MenuItemList
                    items={menuItems}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    onToggleAvailability={handleToggleAvailability}
                  />
                )}
              </div>
            </div>
          )}

          {section === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySummary.length ? categorySummary.map(cat => (
                <div key={cat.name} className="bg-white rounded-2xl shadow-sm p-5 border border-[#f3e8e1] hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
                    <span className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">{cat.count} items</span>
                  </div>
                  <p className="text-sm text-gray-500">Total Price: RS{cat.total.toFixed(2)}</p>
                </div>
              )) : (
                <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-600 border border-[#f3e8e1]">No categories found.</div>
              )}
            </div>
          )}

          {section === 'specials' && (
            <div>
              {loading ? (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#f3e8e1]">Loading specials...</div>
              ) : error ? (
                <div className="bg-white rounded-2xl shadow-xl p-6 text-red-600 border border-[#f3e8e1]">{error}</div>
              ) : (
                <MenuItemList
                  items={specialsItems}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onToggleAvailability={handleToggleAvailability}
                />
              )}
              {!loading && !error && specialsItems.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6 mt-4 text-gray-600 border border-[#f3e8e1]">No special offers found.</div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Menu;
