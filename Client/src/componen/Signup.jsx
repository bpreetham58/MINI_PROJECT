import React, { useState } from "react";
import axios from 'axios';
import { Input } from "./ui/input";
import Button from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";


const Signup = () => {
    const [input,setInput]=useState({
    username:"",
    email:"",
    password:""
  });
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const changeEventHandler =(e) =>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        navigate("/login");
        toast.success(response.data.message);
        setInput({
          username:"",
          email:"",
          password:""
        })
      }
    } catch (error) {
      console.log(error);
        toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={signupHandler}className="shadow -lg bg-[#CBDCEB] flex flex-col gap-5 p-8"> 
        <div className="my-4">
          <h1 className="text-center w-60 text-[#133E87] font-bold text-xl">
            GatherLink
          </h1>
          <p className="text -sm text-center text-[#264653]">Where Clubs Gather</p>
        </div>
        <div>
          <span className="font-medium text-[#112D4E]">Username</span>
          <Input
          type="text"
          name="username"
          value={input.username}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium text-[#112D4E]">Email</span>
          <Input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium text-[#112D4E]">Password</span>
          <Input
          type="password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        {
          loading?(
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please Wait
            </Button>
          ):(
            <Button type="submit">Signup</Button>
          )
        }
        <span className="text-center text-[#112D4E]">Already have an account?<Link to="/login"className="text-[#3FA2F6]">Login</Link></span>


      </form>
    </div>
  );
};

export default Signup;
