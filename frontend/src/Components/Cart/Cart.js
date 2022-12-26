import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IconContext } from "react-icons/";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import Order from "./Order";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Cart = (props) => {
  const { cart } = useSelector((state) => state);

  return (
    <div className="absolute z-10 inset-0 h-[100%]  flex items-center justify-center ">
      <div className="absolute z-5 inset-0 bg-black opacity-40 "></div>
      <div className="absolute z-10 top-[100px] left-0 right-0 text-white w-10/12   m-auto bg-white rounded-2xl  ">
        <div className="absolute top-0 right-0 ">
          <button
            onClick={() => props.setIsOpen(false)}
            className="mx-2
          block
          text-gray-400
          ml-auto
          bg-white
          border-2
          shadow-md
          p-2
          rounded-full "
          >
            <IconContext.Provider
              value={{
                size: "1.5rem",
              }}
            >
              <RxCross1 />
            </IconContext.Provider>
          </button>
        </div>
        <div className="col-span-4 text-black flex justify-center mt-6">
          <p className="text-xl md:text-2xl font-semibold">Your Bag </p>
        </div>
        <div className="my-8 px-12 grid grid-cols-4 md:gap-x-8 ">
          {cart.length > 0 ? (
            <>
              <div className="col-span-4 md:col-span-2 max-h-[600px] overflow-y-scroll">
                {cart &&
                  cart.map((item, idx) => {
                    return <CartItem key={idx} {...item} />;
                  })}
              </div>
              <div className="col-span-4 md:col-span-2">
                <Order isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
              </div>
            </>
          ) : (
            <div className="col-span-4 text-center">
              <p className="text-gray-700 md:text-3xl font-semibold">
                Your bag is empty
              </p>
              <IconContext.Provider
                value={{
                  size: "12rem",
                  className: "text-gray-500 mx-auto my-4",
                }}
              >
                <HiOutlineShoppingBag />
              </IconContext.Provider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
