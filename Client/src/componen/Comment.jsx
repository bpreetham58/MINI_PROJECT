import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Comment = ({ comment }) => {
    // Safeguard: Validate the `comment` object
    if (!comment || typeof comment !== 'object') {
        console.error("Invalid comment object:", comment); // Debugging log
        return null; // Render nothing for invalid data
    }

    const username = comment?.author?.username || 'Unknown User'; // Fallback for username
    const text = comment?.text || ''; // Fallback for comment text
    const profilePicture = comment?.author?.profilePicture || null; // Fallback for profile picture

    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar>
                    <AvatarImage src={profilePicture} alt={`${username}'s profile`} />
                    <AvatarFallback>{username[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <h1 className='font-bold text-sm'>
                    {username} <span className='font-normal pl-1'>{text}</span>
                </h1>
            </div>
        </div>
    );
};

export default Comment;
