import { Button } from "flowbite-react";
import React from "react";

function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">Want to learn more about Node js ?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 90 Node js Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          Learn more
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://externlabs.com/blogs/wp-content/uploads/2021/12/2400%D1%851260-rw-blog-node-js.png" />
      </div>
    </div>
  );
}

export default CallToAction;
