import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Signin() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData.email || !formData.email) {
        toast.error("Please fill out all fields..!!");
      }
      const Res = await fetch("/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await Res.json();
      if (data.success == true) {
        toast.success(data.msg);
        setLoading(false);
        navigate("/");
      } else {
        toast.error(data.msg);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);
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
            It's Bukn's Blogs. You can Sign In with your email and passowrd or
            Google Account.
          </p>
        </div>

        {/* Right side Div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                onChange={handleChange}
                placeholder="Email"
                id="email"
              ></TextInput>
            </div>

            <div className="">
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                onChange={handleChange}
                placeholder="Password"
                id="password"
              ></TextInput>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an Account?</span>
            <Link to="/sign-up" className="text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
