import React from 'react';

import RightSidebar from './RightSidebar';
import { Feed } from './feed';


const Home = () => {
  return (
    <div className="flex">
      <div className='flex-group'>
        <Feed/>
      </div>
      <RightSidebar/>
    </div>
  );
};

export default Home;
