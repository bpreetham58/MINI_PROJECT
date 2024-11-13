import React from 'react'
import { FiGlobe, FiHeart, FiHome, FiLogOut, FiMessageCircle, FiPlusSquare, FiSearch, FiVideo } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Await, useNavigate } from 'react-router-dom';

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
      <Avatar w-6 h-6>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ), text: "Profile"
  },
  { icon: <FiLogOut />, text: "Logout" },
]

const Leftsidebar = () => {
  // const navigate=useNavigate();

  // const logoutHandler= asynch () => {
  //   try {
  //     const res= await axios.get("https");
  //     if(res.data.success){
  //       navigate("/login");
  //       toast.success(res.data.message);

  //     }
  //   } catch (error) {
  //      Toast.error(error.response.data.message);
  //   }

  // }
  const sideHandler=(textType)=>{
    alert(textType);
  }
  return (
    <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-100 w-[16%] h-screen'>
      <div className='flex flex-col'>
        <h1>LOGO</h1>
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
