import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/button';
import { Select, SelectValue } from '@radix-ui/react-select';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from './ui/select';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { setAuthUser } from '../redux/authSlice';
import { toast } from 'react-toastify';


const EditProfile = () => {
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    }

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }
    const EditProfileHandler = async () => {
        console.log(input);
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updateUserData = {
                    ...user,
                    bio:res.data.user?.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user.gender
                };
                dispatch(setAuthUser(updateUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex max-w-2xl mx-auto pl-10">
            <section className="flex flex-col gap-6 w-screen bg-gray-100 min-h-screen p-10 my-1">
                <h1 className="font-bold text-2xl mb-4">Edit Profile</h1>
                <div className="flex items-center justify-between bg-gray-200 rounded-xl p-4 gap-4 shadow-sm">
                    <div className='flex items-center gap-3'>
                        <Link to={`/profile/${user?.id}`}>
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={user?.profilePicture} alt="Profile" />
                                <AvatarFallback className="text-xl">
                                    {user?.username?.[0]?.toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <div className="flex flex-col">
                            <h6 className="font-bold text-lg text-gray-800 leading-tight">
                                <Link to={`/profile/${user?._id}`}>
                                    {user?.username || 'Unknown User'}
                                </Link>
                            </h6>
                            <span className="text-gray-600 text-sm mt-1">
                                {user?.bio || 'Bio here..'}
                            </span>
                        </div>
                    </div>
                    <input ref={imageRef} onChange={fileChangeHandler}type='file' className='hidden' />
                    {/*<Button onClick={() => imageRef?.current.click()} className='h-10 rounded-lg hover:bg-[#112D4E] focus:outline-none'>Change photo</Button>*/}
                </div>
                <div>
                    <h6 className='font-bold text-md mb-2'>Bio</h6>
                    <textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' className='w-full bg-[#DBE2EF] text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#608BC1]' />
                </div>
                <div>
                    <h6 className='fnt-bold mb-2'>Gender</h6>
                    <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex justify-end'>
                    {
                        loading ? (
                            <Button className='w-fit  hover:bg-[#112D4E]'>
                                <Loader className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button onClick={EditProfileHandler} className='w-fit  hover:bg-[#112D4E]'>Submit</Button>
                        )
                    }

                </div>
            </section>
        </div>
    );
};

export default EditProfile;
