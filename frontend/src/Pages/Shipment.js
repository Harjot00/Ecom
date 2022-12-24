import React from "react";
import Container from "../Components/Container/Container";

function Shipment() {
  return (
    <Container>
      <div className="lg:min-h-[560px] md:min-h-[470px] w-full flex flex-col justify-center text-center mt-4 space-x-4">
        <p className="text-2xl font-semibold">Thank you for shoping with us</p>
        <p>Your order is on its way</p>
      </div>
    </Container>
  );
}

export default Shipment;
