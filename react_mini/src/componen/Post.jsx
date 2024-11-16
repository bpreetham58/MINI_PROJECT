import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import { FiMoreHorizontal } from 'react-icons/fi'

const Post = () => {
    return (
        <div className='my-2 w-full h-full max-w-small mx-auto'>
            <div className='flex item-center justify-center'>
                <div className='flex item-center gap-2'>
                    <Avatar>
                        <AvatarImage src="" alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h6>Username</h6>
                </div>
                <Dialog >
                    <DialogTrigger asChild>
                        <FiMoreHorizontal className='cursor-pointer'/>
                    </DialogTrigger>
                    <DialogContent className='flex flex-col bg-[#F3F3E0] items-center text-sm text-center  '>
                        <button variant='ghost'className='cursor-pointer w-fit text-[#FAB12F] font-bold'>Unfollow</button>
                        <button variant='ghost'className='cursor-pointer w-fit text-[#CBDCEB] '>Add to favourites</button>
                        <button variant='ghost'className='cursor-pointer w-fit text-[#ED4956] font-bold'>Delete</button>
                    </DialogContent>
                </Dialog>
            </div>
            <img 
            className='rounded-sm my-2 w-full aspect-square object-cover'
            src='https://images.unsplash.com/photo-1580130544401-347c796dceec?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='post_image'/>
        </div>
    )
}

export default Post
