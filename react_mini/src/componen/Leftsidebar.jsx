import React from 'react'
import { FiGlobe, FiHeart, FiHome, FiLogOut, FiMessageCircle, FiPlusSquare, FiSearch, FiVideo } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Await, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const sidebarItems = [
  { icon: <FiHome />, text: "Home" },
  { icon: <FiSearch />, text: "Search" },
  { icon: <FiGlobe />, text: "Explore" },
  { icon: <FiMessageCircle />, text: "Messages" },
  { icon: <FiVideo />, text: "Reels" },
  { icon: <FiHeart />, text: "Notifications" },
  { icon: <FiPlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className= "w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ), text: "Profile"
  },
  { icon: <FiLogOut />, text: "Logout" },
]

const Leftsidebar = () => {
  const navigate=useNavigate();

  const logoutHandler = () => {
    try {
      // Clear user data or token from localStorage or sessionStorage
      localStorage.removeItem('authToken');  // Example: Remove token
      localStorage.removeItem('user');       // Remove user data if any
  
      // Navigate to login or home page
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("An error occurred during logout.");
      console.error("Logout error:", error);
    }
  };
  const sideHandler=(textType)=>{
    if(textType=='Logout') logoutHandler();
  }
  return (
    <div className='fixed top-0 z-10 left-0 px-8 border-r border-gray-100 w-[18%] h-screen'>
      <div className='flex flex-col'>
        <h1 className='my-8 pl-3 font-bold text-xl'>GatherLink</h1>
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

    </div>

  )
}

export default Leftsidebar
