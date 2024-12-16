import React from 'react';

import RightSidebar from './RightSidebar';
import { Feed } from './feed';
import { Outlet } from 'react-router-dom';
import useGetAllPost from '../hooks/useGetAllPost';




const Home = () => {
  useGetAllPost();
  return (
    <div className="flex w-full bg-gray-10min-h-screen">
      <div className='flex-1 my-60 overflow-auto'>
        <Feed/>
        <Outlet/>
      </div>
      <RightSidebar/>
    </div>
  );
};

export default Home;
