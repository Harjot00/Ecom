import Container from "../Components/Container/Container";

function Shipment() {
  return (
    <Container>
      <div className="h-[400px] md:min-h-[560px] lg:min-h-[773px] w-full flex flex-col justify-center text-center py-8 my-4 space-x-4">
        <p className="text-2xl font-semibold">Thank you for shoping with us</p>
        <p>Your order is on its way</p>
      </div>
    </Container>
  );
}

export default Shipment;
