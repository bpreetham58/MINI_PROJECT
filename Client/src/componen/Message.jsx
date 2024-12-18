
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Button from './ui/button'
import { Link } from 'react-router-dom'

const Message = ({selectedUser}) => {
    
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-1 p-4">
        <div className='flex justify-start'>
            <div className='flex flex-col items-center justify-start'>
            <Avatar className='h-20 w-20'>
                <AvatarImage src={selectedUser?.profilePicture} alt='profile'/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{selectedUser?.username}</span>
            <Link to={`/profile/${selectedUser?._id}`}><Button className='bg-[#DBE2EF] text-[#112D4E] rounded-xl hover:bg-[#F9F7F7]'>View Profile</Button></Link>
            </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {
            [1,2,3,4].map((msg)=>{
                return(
                    <div className={`flex`}>
                        <div>
                            {msg}
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Message
