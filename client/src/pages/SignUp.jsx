import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
        {/* Left Side Div */}
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Bunk's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            It's Bukn's Blogs. You can Sign up with your email and passowrd or
            Google Account.
          </p>
        </div>

        {/* Right side Div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="User Name"
                id="username"
              ></TextInput>
            </div>

            <div className="">
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
              ></TextInput>
            </div>

            <div className="">
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
              ></TextInput>
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="sign-in" className="text-blue-600">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
