import React from 'react';
import Posts from './Posts';

export const Feed = () => {
  return (
    <div className="flex flex-col items-center mt-1">
      <div className="w-3/4">
        <Posts />
      </div>
    </div>
  );
};