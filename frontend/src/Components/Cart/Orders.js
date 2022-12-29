import { useState } from "react";

function Orders(props) {
  return (
    <div className="w-full border-t-2  border-gray-600 py-6 space-y-4 md:space-y-0 md:flex px-4 md:px-0 md:space-x-4  ">
      <div className="md:h-[150px]  h-[200px] aspect-square mx-auto">
        <img
          src={props.imageSrc}
          className="w-full h-full object-cover"
          alt={props.imageAlt}
        />
      </div>
      <div className="w-full">
        <div className="flex md:block lg:flex justify-between">
          <p className=" text-md font-medium text-black">{props.name}</p>
        </div>
        <div className="text-md text-gray-600">
          <p>{props.color}</p>
          <p>${props.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Orders;
