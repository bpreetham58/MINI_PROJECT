import React from 'react';
import Leftsidebar from './Leftsidebar';// Sidebar on the left
import RightSidebar from './RightSidebar'; // Sidebar on the right
import { Outlet } from 'react-router-dom';



const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 pl-4 bg-[#a5c9e9] text-[#112D4E] p-2">
        <Leftsidebar />
      </div>

      {/* Main content area (Posts in the middle) */}
      <div className="flex-1 mx-4 my-6 overflow-auto">
        <Outlet /> {/* This will render the current route content (e.g., Posts) */}
      </div>

      {/* Right Sidebar */}
      {/* <div className="w-72 bg-white shadow-md rounded-lg p-4 hidden lg:block">
        <RightSidebar />
      </div> */}
    </div>
  );
};

export default MainLayout;
