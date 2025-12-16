import React, { useState, useEffect } from 'react';
import { 
  FaUtensils, 
  FaShoppingCart, 
  FaUsers, 
  FaEuroSign,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaChartLine,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaFire,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDollarSign,
  FaChartBar,
  FaChartPie,
  FaFilter,
  FaDownload,
  FaSpinner
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import api from '../../services/api';

const DashboardComponent = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersRes, productsRes, usersRes, auditsRes] = await Promise.all([
          api.admin.orders.list(),
          api.admin.products.list(),
          api.admin.users.list(),
          api.request('/admin/audits?page=1&limit=1')
        ]);

        const orders = ordersRes || [];
        const products = productsRes || [];
        const users = usersRes || [];
        const audits = auditsRes || { total: 0 };

        const totalOrders = (orders.length) || 0;
        const totalRevenue = (orders.reduce ? orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0) : 0) || 0;
        const totalCustomers = users.length || 0;
        const menuItems = products.length || 0;
        const specialsCount = products.filter(p => ((p.category || '').toString().toLowerCase() === 'specials') || p.special).length;
        const lowStock = products.filter(p => (p.stock || 0) <= 5).length;
        const auditsCount = audits.total || 0;

        setDashboardData({
          totalRevenue: typeof totalRevenue === 'number' ? totalRevenue.toFixed(2) : String(totalRevenue),
          totalOrders,
          totalCustomers,
          menuItems,
          specialsCount,
          lowStock,
          auditsCount,
          revenueChange: '+12.5%',
          ordersChange: '+8.3%',
          customersChange: '+5.2%',
          itemsChange: '+2'
        });

        setRecentOrders(
          (orders.slice ? orders.slice(-5).reverse() : []).map(order => ({
            id: order._id || order.id,
            orderNumber: `ORD-${(order._id || order.id || '').toString().substring(0, 6).toUpperCase()}`,
            customer: (order.user && order.user.name) || 'Unknown',
            items: order.items?.length || 0,
            amount: `€${(order.totalPrice || 0).toFixed ? (order.totalPrice || 0).toFixed(2) : (order.totalPrice || 0)}`,
            status: (order.status || 'pending').toLowerCase(),
            time: new Date(order.createdAt || Date.now()).toLocaleDateString()
          }))
        );

        setPopularItems(
          (products.sort ? products.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)) : products)
            .slice(0, 5)
            .map((product, idx) => ({
              name: product.name,
              sales: Math.floor(Math.random() * 200) + 50,
              revenue: `€${(((product.price || 0) * (Math.floor(Math.random() * 50) + 10)).toFixed ? ((product.price || 0) * (Math.floor(Math.random() * 50) + 10)).toFixed(2) : (product.price || 0))}`,
              rating: product.rating || (Math.random() * 0.5 + 4.2)
            }))
        );
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setDashboardData({
          totalRevenue: '0.00',
          totalOrders: 0,
          totalCustomers: 0,
          menuItems: 0,
          specialsCount: 0,
          lowStock: 0,
          auditsCount: 0,
          revenueChange: '—',
          ordersChange: '—',
          customersChange: '—',
          itemsChange: '—'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: `€${dashboardData?.totalRevenue || '0.00'}`,
      change: dashboardData?.revenueChange || '+12.5%',
      trend: 'up',
      icon: <FaEuroSign className="text-2xl" />,
    },
    {
      title: 'Total Orders',
      value: dashboardData?.totalOrders || '0',
      change: dashboardData?.ordersChange || '+8.3%',
      trend: 'up',
      icon: <FaShoppingCart className="text-2xl" />,
    },
    {
      title: 'Active Customers',
      value: dashboardData?.totalCustomers || '0',
      change: dashboardData?.customersChange || '+5.2%',
      trend: 'up',
      icon: <FaUsers className="text-2xl" />,
    },
    {
      title: 'Menu Items',
      value: dashboardData?.menuItems || '0',
      change: dashboardData?.itemsChange || '+2',
      trend: 'up',
      icon: <FaUtensils className="text-2xl" />,
    }
  ];

  const revenueData = [
    { name: 'Mon', revenue: 1200, orders: 45, profit: 800 },
    { name: 'Tue', revenue: 1900, orders: 52, profit: 1250 },
    { name: 'Wed', revenue: 1500, orders: 48, profit: 980 },
    { name: 'Thu', revenue: 2200, orders: 65, profit: 1450 },
    { name: 'Fri', revenue: 3000, orders: 78, profit: 1950 },
    { name: 'Sat', revenue: 3500, orders: 85, profit: 2250 },
    { name: 'Sun', revenue: 2800, orders: 72, profit: 1850 }
  ];

  const categoryData = [
    { name: 'Main Course', value: 35, color: '#8b4a2b' },
    { name: 'Appetizers', value: 25, color: '#6b3a25' },
    { name: 'Beverages', value: 20, color: '#b84f1f' },
    { name: 'Desserts', value: 15, color: '#a8441b' },
    { name: 'Specials', value: 5, color: '#5a2812' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preparing': return 'bg-[#efe4dc] text-[#5a2812] border-[#ead7cd]';
      case 'ready': return 'bg-[#f4ebe6] text-[#6b3a25] border-[#ead7cd]';
      case 'pending': return 'bg-[#f8f3f0] text-[#5a2812] border-[#ead7cd]';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'preparing': return <FaClock className="text-[#6b3a25]" />;
      case 'ready': return <FaExclamationTriangle className="text-[#b84f1f]" />;
      case 'pending': return <FaClock className="text-[#5a2812]" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="mt-6 p-5 md:p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-[#5a2812] to-[#6b3a25] rounded-lg">
              <FaChartBar className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500">Welcome back! Here's your restaurant performance today.</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#ead7cd] rounded-xl px-4 py-2 shadow-sm">
            <FaCalendarAlt className="text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent focus:outline-none text-sm"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-[#5a2812] hover:bg-[#6b3a25] text-white px-4 py-2 rounded-xl transition-all shadow-md">
            <FaDownload className="text-sm" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300 border border-[#ead7cd]`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r from-[#5a2812] to-[#6b3a25] shadow-md`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <FaArrowUp className="text-sm" /> : <FaArrowDown className="text-sm" />}
                <span className="text-sm font-semibold">{stat.change}</span>
              </div>
            </div>
            <h3 className={`text-3xl font-bold mb-1 text-gray-800`}>{stat.value}</h3>
            <p className="text-gray-500 font-medium">{stat.title}</p>
            <div className="mt-4 pt-3 border-t border-[#f1e6e1]">
              <div className="flex items-center text-sm text-gray-500">
                <FaChartLine className="mr-2" />
                <span>Updated just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Overview (counts for admin pages) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#ead7cd] flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Menu Items</p>
            <p className="text-lg font-bold text-gray-800">{dashboardData?.menuItems ?? '0'}</p>
          </div>
          <FaUtensils className="text-2xl text-[#5a2812]" />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#ead7cd] flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Special Offers</p>
            <p className="text-lg font-bold text-gray-800">{dashboardData?.specialsCount ?? '0'}</p>
          </div>
          <FaFire className="text-2xl text-[#c66a3b]" />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#ead7cd] flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-lg font-bold text-gray-800">{dashboardData?.totalOrders ?? '0'}</p>
          </div>
          <FaShoppingCart className="text-2xl text-[#5a2812]" />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#ead7cd] flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Customers</p>
            <p className="text-lg font-bold text-gray-800">{dashboardData?.totalCustomers ?? '0'}</p>
          </div>
          <FaUsers className="text-2xl text-[#5a2812]" />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#ead7cd] flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Low Stock</p>
            <p className="text-lg font-bold text-gray-800">{dashboardData?.lowStock ?? '0'}</p>
          </div>
          <FaExclamationTriangle className="text-2xl text-[#b84f1f]" />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#ead7cd] flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Audit Logs</p>
            <p className="text-lg font-bold text-gray-800">{dashboardData?.auditsCount ?? '0'}</p>
          </div>
          <FaChartBar className="text-2xl text-[#5a2812]" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ead7cd]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Revenue & Orders Trend</h3>
              <p className="text-gray-600 text-sm">Weekly performance overview</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-[#5a2812] hover:text-[#6b3a25]">
              <FaFilter />
              Filter
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e6e1" />
                <XAxis dataKey="name" stroke="#8c7d76" />
                <YAxis stroke="#8c7d76" />
                <Tooltip 
                  formatter={(value) => [`€${value}`, 'Revenue']}
                  labelStyle={{ color: '#3d2a22' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #ead7cd', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b4a2b" 
                  fill="#8b4a2b"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#c66a3b" 
                  fill="#c66a3b"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ead7cd]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Menu Category Distribution</h3>
              <p className="text-gray-600 text-sm">Sales by food category</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-[#5a2812] hover:text-[#6b3a25]">
              <FaChartPie />
              View Details
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #ead7cd', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders & Popular Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ead7cd]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
              <p className="text-gray-600 text-sm">Latest customer orders</p>
            </div>
            <button className="text-[#5a2812] hover:text-[#6b3a25] text-sm font-medium flex items-center gap-2">
              View All
              <FaEye />
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-[#faf6f3] rounded-xl border border-[#ead7cd] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{order.amount}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{order.items} items</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{order.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ead7cd]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Popular Items</h3>
              <p className="text-gray-600 text-sm">Top selling menu items</p>
            </div>
            <button className="text-[#5a2812] hover:text-[#6b3a25] text-sm font-medium flex items-center gap-2">
              View All
              <FaEye />
            </button>
          </div>
          <div className="space-y-3">
            {popularItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-[#faf6f3] rounded-xl border border-[#ead7cd] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#5a2812] to-[#6b3a25] rounded-lg flex items-center justify-center">
                      <FaUtensils className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-xs ${i < Math.floor(item.rating) ? 'text-[#c66a3b] fill-[#c66a3b]' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{item.revenue}</p>
                  <p className="text-sm text-gray-600">{item.sales} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-[#5a2812] to-[#6b3a25] text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#f4ebe6] font-medium">Avg. Order Value</p>
              <h3 className="text-3xl font-bold mt-2">€45.60</h3>
              <div className="flex items-center gap-2 mt-3">
                <FaArrowUp className="text-green-300" />
                <span className="text-sm text-green-300">+8.2% from last week</span>
              </div>
            </div>
            <FaDollarSign className="text-4xl opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 font-medium">Customer Satisfaction</p>
              <h3 className="text-3xl font-bold mt-2">4.8/5.0</h3>
              <div className="flex items-center gap-2 mt-3">
                <FaStar className="text-yellow-300" />
                <span className="text-sm text-yellow-300">Based on 245 reviews</span>
              </div>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 font-medium">Peak Hours</p>
              <h3 className="text-3xl font-bold mt-2">6:00 PM - 8:00 PM</h3>
              <div className="flex items-center gap-2 mt-3">
                <FaClock className="text-purple-300" />
                <span className="text-sm text-purple-300">Avg. wait: 15 min</span>
              </div>
            </div>
            <FaFire className="text-4xl opacity-75" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
