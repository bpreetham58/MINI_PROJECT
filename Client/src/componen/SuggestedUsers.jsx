import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);

      // Handle cases where suggestedUsers is undefined or not an array
  if (!Array.isArray(suggestedUsers)) {
    return (
      <div className="my-10">
        <h6 className="font-semibold text-gray-600">Suggested for you</h6>
        <p className="text-sm text-gray-500">No suggestions available.</p>
      </div>
    );
  }

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h6 className='font-semibold text-gray-600'>Suggested for you</h6>
                <span className='font-medium cursor-pointer'></span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex item-center justify-between my-5'>
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
                            <span className='text-[#3495d6] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers
