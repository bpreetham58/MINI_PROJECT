import React from 'react';

import RightSidebar from './RightSidebar';
import { Feed } from './feed';


const Home = () => {
  return (
    <div className="flex w-64 bg-gray-200min-h-screen">
      <div className='flex-1 my-60 overflow-auto'>
        <Feed/>
      </div>
      <RightSidebar/>
    </div>
  );
};

export default Home;
