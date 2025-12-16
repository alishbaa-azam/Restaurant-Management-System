// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   FaTachometerAlt,
//   FaUtensils,
//   FaShoppingCart,
//   FaChartBar,
//   FaSignOutAlt,
//   FaUsers,
//   FaCog,
//   FaBell,
//   FaChevronLeft,
//   FaChevronRight,
//   FaHome,
//   FaBox,
//   FaTags,
//   FaWallet,
//   FaChartPie,
//   FaCrown
// } from 'react-icons/fa';
// import { GiChefToque } from 'react-icons/gi';

// import { useAuth } from '../../context/AuthContext';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(() => JSON.parse(localStorage.getItem('adminSidebarCollapsed') || 'false'));
//   const [activeSubMenu, setActiveSubMenu] = useState(null);

//   const menuItems = [
//     {
//       path: '/admin/dashboard',
//       icon: <FaTachometerAlt className="text-lg" />,
//       label: 'Dashboard',
//       badge: '3'
//     },
//     {
//       path: '/admin/menu',
//       icon: <FaUtensils className="text-lg" />,
//       label: 'Menu Management',
//       subItems: [
//         { path: '/admin/menu', label: 'All Items' },
//         { path: '/admin/menu/categories', label: 'Categories' },
//         { path: '/admin/menu/specials', label: 'Special Offers' }
//       ]
//     },
//     {
//       path: '/admin/orders',
//       icon: <FaShoppingCart className="text-lg" />,
//       label: 'Orders',
//       badge: '12',
//       subItems: [
//         { path: '/admin/orders', label: 'All Orders' },
//         { path: '/admin/orders/pending', label: 'Pending' },
//         { path: '/admin/orders/completed', label: 'Completed' },
//         { path: '/admin/orders/cancelled', label: 'Cancelled' }
//       ]
//     },
//     {
//       path: '/admin/customers',
//       icon: <FaUsers className="text-lg" />,
//       label: 'Customers',
//       subItems: [
//         { path: '/admin/customers', label: 'All Customers' },
//         { path: '/admin/customers/regular', label: 'Regular' },
//         { path: '/admin/customers/vip', label: 'VIP' }
//       ]
//     },
//     {
//       path: '/admin/analytics',
//       icon: <FaChartBar className="text-lg" />,
//       label: 'Analytics',
//       subItems: [
//         { path: '/admin/analytics', label: 'Overview' },
//         { path: '/admin/analytics/sales', label: 'Sales Report' },
//         { path: '/admin/analytics/customers', label: 'Customer Insights' }
//       ]
//     },
//     {
//       path: '/admin/inventory',
//       icon: <FaBox className="text-lg" />,
//       label: 'Inventory'
//     },
//     {
//       path: '/admin/promotions',
//       icon: <FaTags className="text-lg" />,
//       label: 'Promotions'
//     },
//     {
//       path: '/admin/finance',
//       icon: <FaWallet className="text-lg" />,
//       label: 'Finance'
//     }
//   ];

//   const { user: adminUserFromContext, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate('/admin/login');
//   };

//   const toggleSubMenu = (label) => {
//     if (activeSubMenu === label) {
//       setActiveSubMenu(null);
//     } else {
//       setActiveSubMenu(label);
//     }
//   };

//   const adminUser = adminUserFromContext || { name: 'Admin User', role: 'Administrator' };
//   const initial = (adminUser?.name?.trim?.()[0] || 'A').toUpperCase();

//   useEffect(() => {
//     // Auto-open submenu if current route is inside it
//     const parentWithActive = menuItems.find(mi => mi.subItems && mi.subItems.some(s => location.pathname.startsWith(s.path)));
//     if (parentWithActive) {
//       setActiveSubMenu(parentWithActive.label);
//     } else if (!location.pathname.startsWith('/admin')) {
//       setActiveSubMenu(null);
//     }
//   }, [location.pathname]);

//   return (
//     <div className={`h-screen bg-white ${collapsed ? 'w-20' : 'w-72'} transition-all duration-300 flex flex-col shadow-xl border-r border-[#ead7cd]`}>
//       {/* Logo and Toggle */}
//       <div className="p-5 border-b border-[#ead7cd] flex items-center justify-between">
//         {!collapsed ? (
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-r from-[#5a2812] to-[#6b3a25] rounded-xl shadow">
//               <GiChefToque className="text-2xl text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">Foodies</h1>
//               <p className="text-xs text-gray-500">Admin Panel</p>
//             </div>
//           </div>
//         ) : (
//           <div className="p-2 bg-gradient-to-r from-[#5a2812] to-[#6b3a25] rounded-xl shadow mx-auto">
//             <GiChefToque className="text-2xl text-white" />
//           </div>
//         )}
//         <button
//           onClick={() => { const next = !collapsed; setCollapsed(next); localStorage.setItem('adminSidebarCollapsed', JSON.stringify(next)); }}
//           className="p-2 hover:bg-[#f4ebe6] rounded-lg transition-all hover:scale-105 text-[#5a2812]"
//           title={collapsed ? 'Expand' : 'Collapse'}
//         >
//           {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
//         </button>
//       </div>

//       {/* Admin Profile */}
//       <div className={`p-4 border-b border-[#ead7cd] ${collapsed ? 'px-3' : 'px-6'}`}>
//         <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
//           <div className="relative">
//             <div className="w-12 h-12 bg-gradient-to-r from-[#5a2812] to-[#6b3a25] rounded-full flex items-center justify-center shadow">
//               <span className="text-lg font-bold text-white">{initial}</span>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           {!collapsed && (
//             <div className="flex-1 overflow-hidden">
//               <h3 className="font-semibold text-gray-800 truncate">{adminUser.name}</h3>
//               <div className="flex items-center gap-1">
//                 <FaCrown className="text-xs text-[#ffc22e]" />
//                 <p className="text-xs text-gray-500 truncate">{adminUser.role}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 p-4 overflow-y-auto bg-white">
//         <div className="space-y-1">
//           {menuItems.map((item) => (
//             <div key={item.label}>
//               <Link
//                 to={item.path}
//                 onClick={(e) => {
//                   if (item.subItems) {
//                     e.preventDefault();
//                     toggleSubMenu(item.label);
//                   }
//                 }}
//                 className={`flex items-center p-3 rounded-xl transition-all group ${
//                   location.pathname.startsWith(item.path)
//                     ? 'bg-[#f8f3f0] border-l-4 border-[#5a2812]'
//                     : 'hover:bg-[#faf6f3] hover:border-l-4 hover:border-[#ead7cd]'
//                 }`}
//                 title={collapsed ? item.label : ''}
//               >
//                 <div className={`relative ${collapsed ? 'mx-auto' : ''}`}>
//                   <span className={`text-lg ${location.pathname.startsWith(item.path) ? 'text-[#5a2812]' : 'text-gray-400 group-hover:text-gray-600'}`}>
//                     {item.icon}
//                   </span>
//                   {item.badge && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {item.badge}
//                     </span>
//                   )}
//                 </div>
                
//                 {!collapsed && (
//                   <>
//                     <span className="ml-3 flex-1 text-gray-800">{item.label}</span>
//                     {item.subItems && (
//                       <span className={`transform transition-transform ${activeSubMenu === item.label ? 'rotate-180' : ''}`}>
//                         <FaChevronRight className="text-xs text-gray-500" />
//                       </span>
//                     )}
//                   </>
//                 )}
//               </Link>

//               {/* Submenu */}
//               {!collapsed && item.subItems && activeSubMenu === item.label && (
//                 <div className="ml-10 mt-1 space-y-1">
//                   {item.subItems.map((subItem) => (
//                     <Link
//                       key={subItem.path}
//                       to={subItem.path}
//                       className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
//                         location.pathname === subItem.path
//                           ? 'bg-[#efe4dc] text-[#5a2812]'
//                           : 'text-gray-600 hover:text-gray-800 hover:bg-[#f8f3f0]'
//                       }`}
//                     >
//                       <div className="w-1.5 h-1.5 rounded-full bg-current mr-3"></div>
//                       {subItem.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Quick Stats */}
//         {!collapsed && (
//           <div className="mt-8 p-4 bg-[#f8f3f0] rounded-xl border border-[#ead7cd]">
//             <h4 className="text-xs uppercase text-[#5a2812] font-semibold mb-2">Today's Stats</h4>
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Orders</span>
//                 <span className="font-bold text-green-600">24</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Revenue</span>
//                 <span className="font-bold text-[#5a2812]">€1,245</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Customers</span>
//                 <span className="font-bold text-[#6b3a25]">156</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Bottom Section */}
//       <div className="p-4 border-t border-[#ead7cd] space-y-3 bg-white">
//         {/* Back to Home */}
//         <Link
//           to="/"
//           className={`flex items-center p-3 rounded-xl bg-[#f8f3f0] hover:bg-[#efe4dc] transition-colors ${collapsed ? 'justify-center' : ''}`}
//           title={collapsed ? 'Go to Site' : ''}
//         >
//           <FaHome className={location.pathname === '/' ? 'text-[#5a2812]' : 'text-gray-400'} />
//           {!collapsed && <span className="ml-3 text-gray-700">Go to Site</span>}
//         </Link>

//         {/* Notifications */}
//         <button className={`flex items-center p-3 rounded-xl hover:bg-[#faf6f3] transition-colors w-full ${collapsed ? 'justify-center' : ''}`}>
//           <div className="relative">
//             <FaBell className="text-gray-400" />
//             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//               3
//             </span>
//           </div>
//           {!collapsed && (
//             <>
//               <span className="ml-3 flex-1 text-left text-gray-700">Notifications</span>
//               <span className="text-xs text-gray-400">3 new</span>
//             </>
//           )}
//         </button>

//         {/* Settings */}
//         <Link
//           to="/admin/settings"
//           className={`flex items-center p-3 rounded-xl hover:bg-[#faf6f3] transition-colors ${collapsed ? 'justify-center' : ''}`}
//           title={collapsed ? 'Settings' : ''}
//         >
//           <FaCog className={location.pathname === '/admin/settings' ? 'text-[#5a2812]' : 'text-gray-400'} />
//           {!collapsed && <span className="ml-3 text-gray-700">Settings</span>}
//         </Link>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className={`flex items-center p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors w-full ${collapsed ? 'justify-center' : ''}`}
//           title={collapsed ? 'Logout' : ''}
//         >
//           <FaSignOutAlt className="text-red-500" />
//           {!collapsed && <span className="ml-3 text-red-600">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUtensils,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
  FaUsers,
  FaHistory,
  FaCog,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaBox,
  FaTags,
  FaWallet,
  FaCrown
} from 'react-icons/fa';
import { GiChefToque } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem('adminSidebarCollapsed') || 'false')
  );
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const { user: adminUserFromContext, logout } = useAuth();

  const adminUser = adminUserFromContext || {
    name: 'Admin User',
    role: 'Administrator'
  };

  const initial = (adminUser?.name?.trim?.()[0] || 'A').toUpperCase();
  const [counts, setCounts] = useState({ products: 0, specials: 0, orders: 0, users: 0, audits: 0, lowStock: 0, pending: 0, delivered: 0 });
  const badgeFor = (path) => {
    switch (path) {
      case '/admin/orders': return counts.orders || 0;
      case '/admin/menu': return counts.products || 0;
      case '/admin/customers': return counts.users || 0;
      case '/admin/audits': return counts.audits || 0;
      case '/admin/inventory': return counts.lowStock || 0;
      case '/admin/promotions': return counts.specials || 0;
      default: return null;
    }
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: <FaTachometerAlt />,
      label: 'Dashboard'
    },
    {
      path: '/admin/menu',
      icon: <FaUtensils />,
      label: 'Menu Management',
      subItems: [
        { path: '/admin/menu', label: 'All Items' },
        { path: '/admin/menu/categories', label: 'Categories' },
        { path: '/admin/menu/specials', label: 'Special Offers' }
      ]
    },
    {
      path: '/admin/orders',
      icon: <FaShoppingCart />,
      label: 'Orders',
      subItems: [
        { path: '/admin/orders', label: 'All Orders' },
        { path: '/admin/orders/pending', label: 'Pending' },
        { path: '/admin/orders/completed', label: 'Completed' }
      ]
    },
    {
      path: '/admin/customers',
      icon: <FaUsers />,
      label: 'Customers'
    },
    {
      path: '/admin/analytics',
      icon: <FaChartBar />,
      label: 'Analytics'
    },
    {
      path: '/admin/audits',
      icon: <FaHistory />,
      label: 'Audit Logs'
    },
    {
      path: '/admin/inventory',
      icon: <FaBox />,
      label: 'Inventory'
    },
    {
      path: '/admin/promotions',
      icon: <FaTags />,
      label: 'Promotions'
    },
    {
      path: '/admin/finance',
      icon: <FaWallet />,
      label: 'Finance'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSubMenu = (label) => {
    setActiveSubMenu(prev => (prev === label ? null : label));
  };

  // auto open submenu based on URL
  useEffect(() => {
    const parent = menuItems.find(
      m => m.subItems && m.subItems.some(s => location.pathname.startsWith(s.path))
    );
    if (parent) setActiveSubMenu(parent.label);
  }, [location.pathname]);

  useEffect(() => {
    let mounted = true;
    const loadCounts = async () => {
      try {
        const [products, orders, users, audits] = await Promise.all([
          api.admin.products.list(),
          api.admin.orders.list(),
          api.admin.users.list(),
          api.request('/admin/audits?page=1&limit=1')
        ]);
        if (!mounted) return;
        const prodArr = products || [];
        const ordersArr = orders || [];
        setCounts({
          products: prodArr.length || 0,
          specials: prodArr.filter(p => ((p.category || '').toString().toLowerCase() === 'specials') || p.special).length,
          orders: ordersArr.length || 0,
          users: (users || []).length || 0,
          audits: (audits && audits.total) || 0,
          lowStock: prodArr.filter(p => (p.stock || 0) <= 5).length,
          pending: ordersArr.filter(o => (o.status || '').toLowerCase() === 'pending').length,
          delivered: ordersArr.filter(o => {
            const s = (o.status || '').toLowerCase();
            return s === 'delivered' || s === 'completed';
          }).length
        });
      } catch (err) {
        // ignore
      }
    };
    loadCounts();
    const t = setInterval(loadCounts, 30000);
    return () => { mounted = false; clearInterval(t); };
  }, []);

  return (
    <div
      className={`h-screen bg-white ${
        collapsed ? 'w-20' : 'w-72'
      } transition-all duration-300 flex flex-col shadow-xl border-r`}
    >
      {/* LOGO */}
      <div className="p-5 border-b flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5a2812] rounded-xl">
              <GiChefToque className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Foodies</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        ) : (
          <GiChefToque className="text-2xl text-[#5a2812] mx-auto" />
        )}

        <button
          onClick={() => {
            const next = !collapsed;
            setCollapsed(next);
            localStorage.setItem('adminSidebarCollapsed', JSON.stringify(next));
          }}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* PROFILE */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#5a2812] flex items-center justify-center text-white font-bold">
          {initial}
        </div>
        {!collapsed && (
          <div>
            <h3 className="font-semibold">{adminUser.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaCrown className="text-yellow-500" />
              {adminUser.role}
            </div>
          </div>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map(item => (
          <div key={item.label}>
            {/* PARENT ITEM */}
            <button
              type="button"
              onClick={() =>
                item.subItems
                  ? toggleSubMenu(item.label)
                  : navigate(item.path)
              }
              className={`w-full flex items-center p-3 rounded-xl transition ${
                location.pathname.startsWith(item.path)
                  ? 'bg-[#f8f3f0] border-l-4 border-[#5a2812]'
                  : 'hover:bg-[#faf6f3]'
              }`}
            >
              <span className="text-gray-500">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">
                    {item.label}
                  </span>
                  {(() => {
                    const b = badgeFor(item.path);
                    return b ? <span className="ml-2 inline-flex items-center justify-center w-8 h-6 text-sm rounded-full bg-[#f3f4f6] text-gray-800">{b}</span> : null;
                  })()}
                  {item.subItems && (
                    <FaChevronRight
                      className={`text-xs transition-transform ${
                        activeSubMenu === item.label ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </>
              )}
            </button>

            {/* SUB MENU */}
            {!collapsed &&
              item.subItems &&
              activeSubMenu === item.label && (
                <div className="ml-10 mt-1 space-y-1">
                  {item.subItems.map(sub => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className={`block px-3 py-2 rounded-lg text-sm ${
                        location.pathname === sub.path
                          ? 'bg-[#efe4dc] text-[#5a2812]'
                          : 'text-gray-600 hover:bg-[#f8f3f0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                      <span>{sub.label}</span>
                      {(() => {
                        if (sub.path.includes('/pending')) return <span className="ml-2 inline-flex items-center justify-center w-8 h-6 text-sm rounded-full bg-[#f3f4f6] text-gray-800">{counts.pending}</span>;
                        if (sub.path.includes('/completed')) return <span className="ml-2 inline-flex items-center justify-center w-8 h-6 text-sm rounded-full bg-[#f3f4f6] text-gray-800">{counts.delivered}</span>;
                        return null;
                      })()}
                    </div>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>

      {/* BOTTOM */}
      <div className="p-4 border-t space-y-2">
        <Link
          to="/"
          className="flex items-center p-3 rounded-xl bg-[#f8f3f0]"
        >
          <FaHome />
          {!collapsed && <span className="ml-3">Go to Site</span>}
        </Link>

        <Link
          to="/admin/settings"
          className="flex items-center p-3 rounded-xl hover:bg-[#faf6f3]"
        >
          <FaCog />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-xl bg-red-50 text-red-600 w-full"
        >
          <FaSignOutAlt />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
