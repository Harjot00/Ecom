import { useState } from "react";

function CheckoutForm(props) {
  const changeHandler = (event) => {
    props.setcustomerDetail({
      ...props.customerDetail,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="w-full px-4">
      <div className="w-full my-2 space-y-4">
        <p className="text-xl md:text-2xl font-semibold">Shipping Address</p>
        <div className="flex space-x-4">
          <div className="w-full space-y-2">
            <p>First Name</p>
            <input
              onChange={(e) => changeHandler(e)}
              type="text"
              name="firstName"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
          <div className="w-full space-y-2 ml-auto">
            <p>Last Name</p>
            <input
              onChange={(e) => changeHandler(e)}
              type="text"
              name="lastName"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
        </div>
        <div className="w-full space-y-2">
          <p>Address</p>
          <input
            onChange={(e) => changeHandler(e)}
            type="text"
            name="streetAddress"
            className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
          />
        </div>
        <div className="w-full space-y-2">
          <p>Apartment,suite,etc.</p>
          <input
            name="apartment"
            onChange={(e) => changeHandler(e)}
            type="text"
            className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-full space-y-2">
            <p>City</p>
            <input
              type="text"
              onChange={(e) => changeHandler(e)}
              name="city"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
          <div className="w-full ml-auto space-y-2">
            <p>Country</p>
            <select
              name="country"
              onChange={(e) => changeHandler(e)}
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 ">
          <div className="w-full space-y-2 mb-4">
            <p>State/Province</p>
            <input
              type="text"
              name="state"
              onChange={(e) => changeHandler(e)}
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>

          <div className="w-full space-y-2 ml-auto">
            <p>Phone number</p>
            <input
              type="phone"
              onChange={(e) => changeHandler(e)}
              name="phoneNumber"
              className="w-full h-[35px] drop-shadow rounded-md focus:outline-gray-400"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
