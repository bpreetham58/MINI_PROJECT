import React, { useState } from "react";
import { Input } from "./ui/input";
import Button from "./ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser } from "../redux/authSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Loader2 } from "lucide-react";

// const mockUsers = [
//   {
//     email: "sahana@gmail.com",
//     password: "password123",
//     name: "User One"
//   },
//   {
//     email: "preetham@gmail.com",
//     password: "password456",
//     name: "User Two"
//   }
// ];

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
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
      <form onSubmit={signupHandler} className="shadow -lg bg-[#CBDCEB] flex flex-col gap-5 p-8">
        <div className="my-4">
          <h1 className="text-center text-[#133E87] font-bold text-xl">
            GatherLink
          </h1>
          <p className="text -sm text-center text-[#264653]">Where Clubs Gather</p>
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
            <Button type="submit">Login</Button>
          )
        }
        <span className="text-center text-[#112D4E]">Already have an account?<Link to="/signup" className="text-[#3FA2F6]">Signup</Link></span>

      </form>
    </div>
  );
};


export default Login;
