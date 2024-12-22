import React, { useState } from 'react';
import { FiGlobe, FiHeart, FiHome, FiLogOut, FiMessageCircle, FiPlusSquare } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { PiCertificateFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '../redux/postSlice';

const ForwardedAvatar = React.forwardRef(({ src, alt }, ref) => (
  <Avatar ref={ref} className="w-6 h-6">
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
));

const Leftsidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      if (res?.data?.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message || "Logged out successfully!");
      } else {
        throw new Error(res?.data?.message || "Logout failed");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred during logout";
      toast.error(errorMessage);
      console.error('Logout Error:', errorMessage);
    }
  };

  const sideHandler = (textType) => {
    const navigationMap = {
      Logout: logoutHandler,
      Create: () => setOpen(true),
      Certificate: () => navigate('/certificate'),
      Profile: () => navigate(`/profile/${user?._id}`),
      Home: () => navigate("/"),
      Messages: () => navigate('/chat'),
    };

    const handler = navigationMap[textType];
    if (handler) handler();
  };

  const sidebarItems = [
    { icon: <FiHome />, text: "Home" },
    { icon: <FiMessageCircle />, text: "Messages" },
    { icon: <FiPlusSquare />, text: "Create" },
    { icon: <PiCertificateFill />, text: "Certificate" },
    {
      icon: <ForwardedAvatar src={user?.profilePicture || 'path_to_default_image'} alt={user?.name || 'User'} />,
      text: "Profile"
    },
    { icon: <FiLogOut />, text: "Logout" },
  ];

  return (
    <div className='fixed top-0 z-10 left-0 px-8 border-r border-gray-100 w-[18%] h-screen'>
      <div className='flex flex-col'>
        <h1 className='my-1 pl-2 font-bold text-xl'>GatherLink</h1>
        <div>
          {sidebarItems.map((item, index) => (
            <div onClick={() => sideHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-300 cursor-pointer rounded-lg p-3 my-3'>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default Leftsidebar;
