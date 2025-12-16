import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import OrdersManagement from '../../components/admin/OrdersManagement';

const Orders = ({ initialFilterStatus = 'all' }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <OrdersManagement initialFilterStatus={initialFilterStatus} />
        </div>
      </div>
    </div>
  );
};

export default Orders;