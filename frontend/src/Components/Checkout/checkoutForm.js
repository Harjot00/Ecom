import React from "react";

function checkoutForm() {
  return (
    <form className="w-full px-4">
      <p className="text-xl md:text-2xl font-semibold">Contact Information</p>
      <div className="my-4 space-y-2 pb-10 border-b-2 border-gray-400">
        <p>Email address</p>
        <input
          type="text"
          className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
        />
      </div>
      <div className="w-full my-2 space-y-4">
        <p className="text-xl md:text-2xl font-semibold">Shipping Address</p>
        <div className="flex space-x-4">
          <div className="w-full space-y-2">
            <p>First Name</p>
            <input
              type="text"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
          <div className="w-full space-y-2 ml-auto">
            <p>Last Name</p>
            <input
              type="text"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
        </div>
        <div className="w-full space-y-2">
          <p>Address</p>
          <input
            type="text"
            className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
          />
        </div>
        <div className="w-full space-y-2">
          <p>Apartment,suite,etc.</p>
          <input
            type="text"
            className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-full space-y-2">
            <p>City</p>
            <input
              type="text"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
          <div className="w-full ml-auto space-y-2">
            <p>Country</p>
            <select
              name="cars"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            >
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-full space-y-2">
            <p>State</p>
            <input
              type="text"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
          <div className="w-full space-y-2 ml-auto">
            <p>Province</p>
            <input
              type="text"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
        </div>
        <div className="w-full space-y-2 ml-auto">
          <p>Phone number</p>
          <input
            type="phone"
            className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
          />
        </div>
      </div>
    </form>
  );
}

export default checkoutForm;
