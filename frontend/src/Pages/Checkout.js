import React from "react";
import Container from "../Components/Container/Container";
import Order from "../Components/Cart/Order";
import CheckoutForm from "../Components/Checkout/checkoutForm";
import { useSelector } from "react-redux";
import CartItem from "../Components/Cart/cartItem";

function Checkout() {
  const { cart } = useSelector((state) => state);
  console.log(cart);

  return (
    <Container>
      <div className="mt-4 md:mt-12 mb-8 md:px-4 py-8 grid grid-cols-4 md:gap-x-4 bg-gray-100 rounded-md drop-shadow-lg">
        <div className="col-span-4 md:col-span-2">
          <CheckoutForm />
        </div>
        <div className="col-span-4 md:col-span-2 max-h-[800px] overflow-y-scroll  lg:p-8">
          {cart.length > 0 &&
            cart.map((item, idx) => {
              return <CartItem key={idx} {...item} />;
            })}
          <Order page={"shipment"} />
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
