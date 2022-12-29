import { useState, useEffect } from "react";
import { removeFromCart } from "../../Reducers/cart";
import { useDispatch, useSelector } from "react-redux";

function CartItems(props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
        <p className=" text-md font-medium text-black mb-2">{props.name}</p>
        <div className="flex md:block lg:flex justify-between">
          <p className=" text-black">Quantity</p>
          <div>
            <p className="text-black">{props.quantity}</p>
          </div>
        </div>
        <div className="text-md text-gray-600">
          <div className="flex md:block lg:flex justify-between">
            <p className=" text-black">Color</p>
            <div>
              <p className="text-black">{props.color}</p>
            </div>
          </div>
          <div className="flex md:block lg:flex justify-between">
            <p className=" text-black">Price</p>
            <div>
              <p className="text-black">${props.price}</p>
            </div>
          </div>
        </div>
        <button
          className="w-full font-semibold text-md py-3 bg-red-600 hover:bg-red-900  rounded-md text-white mt-4"
          onClick={() => {
            dispatch(removeFromCart(props));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItems;
