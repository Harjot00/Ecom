import { useState } from "react";
import Container from "../Components/Container/Container";
import Order from "../Components/Cart/Order";
import CheckoutForm from "../Components/Checkout/checkoutForm";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../Components/Cart/cartItem";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../Reducers/cart";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((state) => {
    console.log(state);
    return state;
  });
  const [customerDetail, setcustomerDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });

  const calculateSubtotal = (cart) => {
    let SubTotal = 0;
    for (const cartItem of cart) {
      SubTotal += cartItem.price;
    }
    return SubTotal;
  };

  const subTotal = calculateSubtotal(cart);

  const orderDetail = {
    subTotal: subTotal,
    shipping: 20,
    orderTotal: subTotal + 20,
  };
  const order = {
    customerDetail: customerDetail,
    orderDetail: orderDetail,
    products: cart,
  };

  const orderFn = async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/placeorder`,
      data,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return response.data;
  };

  const mutation = useMutation(() => orderFn(order));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      mutation
        .mutateAsync(order)
        .then((data) => {
          console.log(data);
          dispatch(emptyCart());
          navigate("/shipment");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <div className="mt-4 md:mt-12 mb-8 md:px-4 py-8  bg-gray-100 rounded-md drop-shadow-lg">
        <CheckoutForm
          customerDetail={customerDetail}
          setcustomerDetail={setcustomerDetail}
        />
        <Order page={"shipment"} submitHandler={submitHandler} />
      </div>
    </Container>
  );
}

export default Checkout;
