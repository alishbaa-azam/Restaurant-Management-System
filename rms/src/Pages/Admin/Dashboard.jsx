import React, { useState } from 'react';
import DashboardComponent from '../../components/admin/Dashboard';
import Sidebar from '../../components/admin/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-6">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <DashboardComponent />
      </div>
    </div>
  );
};

export default Dashboard;