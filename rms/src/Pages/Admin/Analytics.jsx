import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import DashboardComponent from '../../components/admin/Dashboard';

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <DashboardComponent />
      </div>
    </div>
  );
};

export default Analytics;