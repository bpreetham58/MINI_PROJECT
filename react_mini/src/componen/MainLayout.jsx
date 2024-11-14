import React from 'react'
// import { Outlet } from 'react-router-dom';
import Leftsidebar from './Leftsidebar';

const MainLayout = ({ children }) => {
  console.log('MainLayout rendered');
  return (
    <div className="main-layout">
      <Leftsidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout