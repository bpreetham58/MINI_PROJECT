import { Avatar } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { FiBookmark, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend } from 'react-icons/fi'
import CommentDialog from './CommentDialog'

const Post = ({post}) => {
    const [text, setText] = useState("");
    const [open,setOpen] = useState(false);
    

    const changeEventHandler = (e) => {
        const inputText= e.target.value;
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText("")
        }
    }
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
                        <FiMoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col bg-[#F3F3E0] items-center text-sm text-center  '>
                        <button variant='ghost' className='cursor-pointer w-fit text-[#FAB12F] font-bold'>Unfollow</button>
                        <button variant='ghost' className='cursor-pointer w-fit text-[#CBDCEB] '>Add to favourites</button>
                        <button variant='ghost' className='cursor-pointer w-fit text-[#ED4956] font-bold'>Delete</button>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='rounded-sm my-2 w-full aspect-[3/2] object-cover'
                src='https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop&ixlib=-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='post_image' />

            <div className='flex item-center justify-between my-2'>
                <div className='flex item-center gap-3'>
                    <FiHeart size={'22px'} />
                    <FiMessageCircle size={'22px'} onClick={()=> setOpen(true)}className='cursor-pointer hover:text-gray-600' />
                    <FiSend size={'22px'} className='cursor-pointer hover:text-gray-600' />
                </div>
                <FiBookmark size={'22px'} className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className='text-start font-medium block mb-2'>52.2k likes</span>   
            <p className='text-start '><span className='font-medium mr-2'>Username</span>caption</p>
            <span onClick={()=> setOpen(true)} className='text-start cursor-pointer text-sm text-gray-400'>View all 10 comments</span>
            <CommentDialog open={open} setOpen={setOpen}/>
            <div className='flex item-center justify-center'>
                <input
                type="text"
                placeholder='Add a comment...'
                value={text}
                onChange={changeEventHandler}
                className='bg-[#F9F7F7] text-black outline-none text-sm w-full'
                />
                {
                    text && <span className='text-[#3F72AF]'>Post</span>
                }
            </div>
        </div>

    )
}

export default Post
