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
      <form onSubmit={signupHandler}className="shadow -lg flex flex-col gap-5 p-8"> 
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">
            LOGO
          </h1>
          <p className="text -sm text-center">Signup to see photos and videos</p>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
          type="text"
          name="username"
          value={input.username}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
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
            <Button type="submit">Signup</Button>
          )
        }
        <span className="text-center">Already have an account?<Link to="/login"className="text-blue-600">Login</Link></span>


      </form>
    </div>
  );
};

export default Signup;
