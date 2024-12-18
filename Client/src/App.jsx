// Suppress specific React Router future flag warnings in the console
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && !args[0].includes("React Router Future Flag Warning")) {
    originalWarn(...args);
  }
};

import React from "react";
import './index.css';
import Signup from './componen/Signup';
import {createBrowserRouter,RouterProvider}from 'react-router-dom';
import Login from "./componen/Login";
import MainLayout from "./componen/MainLayout";
import Home from "./componen/Home";
import Profile from "./componen/Profile";
import CertificateGenerator from './componen/CertificateGenerator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import EditProfile from "./componen/EditProfile";
import ChatPage from "./componen/ChatPage";

const browserRouter=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
      path:"/",
      element:<Home/>
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      },
      {
        path: "/certificate",
        element: <CertificateGenerator />, 
      },
      {
        path: "/account/edit",
        element: <EditProfile />, 
      },
      {
        path:'/chat',
        element:<ChatPage/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
],
{
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
}
);


function App() {
  return (
    <div>
       <ToastContainer /> 
      <RouterProvider router={browserRouter}/>
    </div>
    
    
  );
}

export default App;