import { Avatar } from '@radix-ui/react-avatar';
import React, { useState, forwardRef } from 'react';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";
import { FiBookmark, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend } from 'react-icons/fi';
import CommentDialog from './CommentDialog';

// Wrapper for icons to forward refs
const ForwardRefIcon = forwardRef(({ Icon, ...props }, ref) => (
    <span ref={ref} {...props}>
        <Icon />
    </span>
));

const Post = () => {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim() ? inputText : '');
    };

    return (
        <div className='my-2 w-full h-full max-w-small mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="" alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h6>Username</h6>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col bg-[#F3F3E0] items-center text-sm text-center'>
                        <button className='cursor-pointer w-fit text-[#FAB12F] font-bold'>Unfollow</button>
                        <button className='cursor-pointer w-fit text-[#CBDCEB]'>Add to favourites</button>
                        <button className='cursor-pointer w-fit text-[#ED4956] font-bold'>Delete</button>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Post Image */}
            <img
                className='rounded-sm my-2 w-full aspect-[3/2] object-cover'
                src='https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop&ixlib=-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='post_image'
            />

            {/* Post Actions */}
            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-3'>
                    <FiHeart size={'22px'} />
                    <FiMessageCircle size={'22px'} onClick={() => setOpen(true)} className='cursor-pointer hover:text-gray-600' />
                    <FiSend size={'22px'} className='cursor-pointer hover:text-gray-600' />
                </div>
                <FiBookmark size={'22px'} className='cursor-pointer hover:text-gray-600' />
            </div>

            {/* Post Info */}
            <span className='text-start font-medium block mb-2'>52.2k likes</span>
            <p className='text-start'>
                <span className='font-medium mr-2'>Username</span>
                caption
            </p>
            <span onClick={() => setOpen(true)} className='text-start cursor-pointer text-sm text-gray-400'>View all 10 comments</span>

            {/* Comment Dialog */}
            <CommentDialog open={open} setOpen={setOpen} />

            {/* Add Comment */}
            <div className='flex items-center justify-between mt-2'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                    className='bg-[#F9F7F7] text-black outline-none text-sm w-full'
                />
                {text && <span className='text-[#3F72AF] cursor-pointer'>Post</span>}
            </div>
        </div>
    );
};

export default Post;
