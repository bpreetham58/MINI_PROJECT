import React from 'react';
import LeftSidebar from './LeftSidebar'; // Sidebar on the left
import RightSidebar from './RightSidebar'; // Sidebar on the right
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 pl-4 bg-[#a5c9e9] text-[#112D4E]  p-2">
        <LeftSidebar />
      </div>

      {/* Main content area (Posts in the middle) */}
      <div className="flex-1 my-60 overflow-auto">
        <Outlet /> {/* This will render the current route content */}
      </div>
    </div>
  );
};

export default MainLayout;
