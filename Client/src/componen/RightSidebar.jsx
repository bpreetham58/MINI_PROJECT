
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  if (!user) {
    return (
      <div className="w-fit my-10 pr-30">
        <p className="text-gray-500 text-sm">Please log in to access your profile and suggestions.</p>
        <SuggestedUsers />
      </div>
    );
  }

  return (
    <div className='w-fit my-10 pr-30'>
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?.id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="Profile" />
            <AvatarFallback>{user.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </Link>
        <div className='flex item-center gap-3'>
          <h6 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username || 'Unknown User'}</Link></h6>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here..'}</span>
        </div>
      </div>
      <SuggestedUsers/>
    </div>
  )
}

export default RightSidebar
