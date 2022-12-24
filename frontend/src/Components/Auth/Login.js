import React from "react";

function Login() {
  return (
    <div className="my-12">
      <form className="drop-shadow border w-full lg:max-w-lg h-3/5  flex flex-col justify-center items-center mx-auto px-12 py-8 rounded-md space-y-6">
        <div className="w-full ">
          <p className="mb-2 text-xl">Email address</p>
          <input
            type="string"
            className="w-full h-[40px] rounded-md focus:outline-none border"
          />
        </div>
        <div className="w-full">
          <p className="mb-2 text-xl">Password</p>
          <input
            type="string"
            className="w-full h-[40px] rounded-md focus:outline-none border"
          />
        </div>
        <div className="w-full">
          <button className="w-full py-3 bg-gray-700 hover:bg-black mt-3 rounded-md text-white text-lg font-semibold tracking-widest">
            Login
          </button>
          <button className="w-full py-3 bg-gray-700 hover:bg-black mt-3 rounded-md text-white text-lg font-semibold tracking-widest">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
