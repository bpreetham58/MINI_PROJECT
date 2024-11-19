import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import Button from './ui/button';
import { readFileAsDataURL } from '../lib/util';



const CreatePost = ({ open, setOpen }) => {
    const imageRef=useRef();
    const [file, setFile]=useState("");
    const [caption, setCaption]=useState("");
    const [imagePreview, setImagePreview]=useState("");

    const fileChangeHandler=async(e)=>{
        const file=e.target.files?.[0];
        if(file){
            setFile(file);
            const dataUrl=await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }

    }

    const CreatePostHandler = async (e) => {
        e.preventDefault();
        try {

        }
        catch (error) {

        }
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className='bg-white'>
                <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
                <div className='flex gap-3 item-center'>
                    <Avatar>
                        <AvatarImage src="" alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>Username</h1>
                        <span className='text-gray-600 font-semibold text-xs'>Bio here...</span>
                    </div>
                </div>
                <textarea className='focus-visible:ring-transparent border-none bg-white'placeholder='Write a caption...'/>
                {
                    imagePreview &&(
                        <div className='w-full h-64 flex item-center justfy-center'>
                            <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md'/>
                        </div>
                    )
                }
                <input ref={imageRef}type='file' className='hidden' onChange={fileChangeHandler}/>
                <Button onClick={()=>imageRef.current.click()}className='w-fit mx-auto bg-[#144BB8] hover:bg-[#DBE2EF]'>Select from Device</Button>
            </DialogContent>

        </Dialog>
    )
}

export default CreatePost
