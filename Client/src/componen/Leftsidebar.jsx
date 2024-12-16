import React, { useState } from 'react'
import { FiGlobe, FiHeart, FiHome, FiLogOut, FiMessageCircle, FiPlusSquare, FiSearch, FiVideo } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { PiCertificateFill } from "react-icons/pi";
import { Await, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { setAuthUser } from '../redux/authSlice';
import CreatePost from './CreatePost';
import { Icon, icons } from 'lucide-react';

const ForwardedAvatar = React.forwardRef(({ src, alt }, ref) => (
  <Avatar ref={ref} className="w-6 h-6">
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
));

const Leftsidebar = () => {
  const navigate=useNavigate();
  const {user}= useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials:true})
      if(res.data.success){
        dispatch(setAuthUser(null))
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createPostHandler=()=>{
    setOpen(true);
  }
  const sideHandler=(textType)=>{
    if(textType==='Logout') {logoutHandler();
    }
    else if(textType ===  "Create"){
      setOpen(true);
    }else if (textType === "Certificate") {
      navigate('/certificate'); 
    }

  }


  const sidebarItems = [
    { icon: <FiHome />, text: "Home" },
    { icon: <FiSearch />, text: "Search" },
    { icon: <FiGlobe />, text: "Explore" },
    { icon: <FiMessageCircle />, text: "Messages" },
    { icon: <FiVideo />, text: "Reels" },
    { icon: <FiHeart />, text: "Notifications" },
    { icon: <FiPlusSquare />, text: "Create" },
    {icon:<PiCertificateFill/>,text:"Certificate"},
    {
      icon: <ForwardedAvatar src={user?.ProfilePicture || 'path_to_default_image'} alt={user?.name || 'User'} />,
      text: "Profile"
    },
    { icon: <FiLogOut />, text: "Logout" },
  ]
  return (
    <div className='fixed top-0 z-10 left-0 px-8 border-r border-gray-100 w-[18%] h-screen'>
      <div className='flex flex-col'>
        <h1 className='my-1 pl-2 font-bold text-xl'>GatherLink</h1>
        <div>
          {
            sidebarItems.map((item, index) => {
              return (
                <div onClick={()=>sideHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-300 cursor-pointer rounded-lg p-3 my-3'>
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              );
            })
          }
        </div>
      </div>
          <CreatePost open={open} setOpen={setOpen}/>
    </div>

  )
}

export default Leftsidebar
