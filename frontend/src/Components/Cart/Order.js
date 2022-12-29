import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Order(props) {
  const { cart } = useSelector((state) => state);
  const calculateSubtotal = (cart) => {
    let SubTotal = 0;
    for (const cartItem of cart) {
      SubTotal += cartItem.price;
    }
    return SubTotal;
  };

  const subTotal = calculateSubtotal(cart);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <div className="bg-gray-100 rounded-xl p-4 drop-shadow">
      <p className="text-xl font-semibold text-black ">Order Summary</p>
      <div className="py-2 border-b-2 border-gray-600 flex">
        <p className="text-lg text-gray-600 font-semibold">Subtotal</p>
        <p className="text-black text-lg font-semibold ml-auto">${subTotal}</p>
      </div>
      <div className="py-2 border-b-2 border-gray-600 flex">
        <p className="text-lg text-gray-600 font-semibold">Shipping Estimate</p>
        <p className="text-black text-lg font-semibold ml-auto">$20</p>
      </div>
      <div className="py-2 border-b-2 border-gray-600 flex">
        <p className="text-lg text-gray-600 font-semibold">Order Total</p>
        <p className="text-black text-lg font-semibold ml-auto">
          ${subTotal + 20}
        </p>
      </div>
      <button
        className="w-full font-bold text-xl py-3 bg-gray-700 hover:bg-black  rounded-md text-white mt-8"
        onClick={(e) => {
          if (props.page === "shipment") {
            props.submitHandler(e);
          } else {
            navigate("/checkout");
            props.setIsOpen(false);
          }
        }}
      >
        {props === null ? "Place Order" : "Checkout"}
      </button>
    </div>
  );
}

export default Order;
