import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full w-full bspace-y-6 bg-[#F9F7F7] rounded-lg shadow-md p-4 ">
      <p className="text-center justify-between mt-2">
        {
          [1, 2, 3, 4].map((item, index) => <Post key={index} />)
        }

      </p>
    </div>
  )
}

export default Posts
