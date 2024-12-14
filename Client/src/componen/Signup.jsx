import React, { useState } from "react";
import { Input } from "./ui/input";
import Button from "./ui/button";
import { Link } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';


const Signup = () => {
    const [input,setInput]=useState({
    username:"",
    email:"",
    password:""
  });
  const [loading,setLoading]=useState(false);
  const changeEventHandler =(e) =>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const signupHandler = async (e) =>{
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
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
          loading ? (
            <Button>
              <FaSpinner className="mr-2 h-4 2-4 animate-spin"/>
              Please wait
            </Button>
          ): (
            <Button type="submit" >Signup</Button>
          )
        }
        <span className="text-center text-[#112D4E]">Already have an account?<Link to="/login"className="text-[#3FA2F6]">Login</Link></span>


      </form>
    </div>
  );
};

export default Signup;
