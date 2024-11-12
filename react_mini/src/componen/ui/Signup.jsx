import React from "react";
import { cn } from "../../lib/util"; // Ensure the path is correct for your `cn` utility
import { Input } from "./input";
import Button from "./button";

const Signup = ({ isActive }) => {
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form action="" className="shadow -lg flex flex-col gap-5 p-8"> 
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">
            LOGO
          </h1>
          <p>Signup to see photos and videos</p>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
          type="text"
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
          type="email"
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
          type="password"
          className="focus-visible:ring-transparent my-2"
          />
        </div>
        <Button>Signup</Button>


      </form>
    </div>
  );
};

export default Signup;
