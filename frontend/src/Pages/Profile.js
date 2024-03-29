import { useReducer, useEffect, useState } from "react";
import Container from "../Components/Container/Container";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logout } from "../Reducers/auth";
import { useDispatch } from "react-redux";

function Profile() {
  const fetchProfileData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}api/allOrders`,
      {
        credentials: "include",
        withCredentials: true,
      }
    );

    return response.data;
  };

  const { data, isSuccess, isLoading, isError } = useQuery(
    "orders",
    fetchProfileData
  );

  const [order, setOrder] = useState([]);

  const cancelOrder = async (orderId, idx) => {
    mutation.mutateAsync(orderId).then((res) => {
      setOrder((state) => {
        return state.filter((order, id) => id !== idx);
      });
    });
  };

  useEffect(() => {
    setOrder(data);
  }, [isSuccess]);

  const apiRequest = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/cancelOrder/${id}`,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await response.data;
  };

  const mutation = useMutation((data) => apiRequest(data), {
    retry: 3,
  });
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFn = () => {
    reduxDispatch(logout());
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <Container>
      <div className=" my-8 md:px-12 min-h-[400px] md:min-h-[560px] lg:min-h-[773px]">
        <div className="space-y-4">
          <div className=" w-full my-2">
            <button
              className="w-full font-semibold text-md py-3 bg-red-600 hover:bg-red-900  rounded-md text-white mt-4"
              onClick={() => {
                logoutFn();
              }}
            >
              Logout
            </button>
          </div>

          {order && order.length > 0 ? (
            order.map((order, index) => {
              return (
                <div
                  key={index}
                  className="w-full border-2 border-gray-600 rounded-lg shadow-md p-4 grid grid-cols-4  my-2 gap-x-4"
                >
                  <div className=" justify-between mb-2 col-span-4 flex">
                    <p className="font-semibold text-lg md:text-xl ">
                      Order id
                    </p>
                    <p className="font text-gray-600">{order.id}</p>
                  </div>

                  <div className="col-span-4 mb-2">
                    <p className="font-semibold text-lg md:text-xl">
                      Order Details
                    </p>
                    <div className="flex justify-between w-full">
                      <p className="font text-lg  ">Subtotal</p>
                      <p className="text-gray-600">${order.details.subTotal}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="font text-lg  ">Shipping</p>
                      <p className="font text-gray-600">
                        ${order.details.shipping}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="font text-lg  ">Total</p>
                      <p className="font text-gray-600">
                        ${order.details.orderTotal}
                      </p>
                    </div>
                  </div>

                  {order.products.map((product, idx) => {
                    return (
                      <div
                        key={idx}
                        className="w-full col-span-4 md:col-span-2 border-2 py-6 space-y-4 md:space-y-0 sm:my-2  lg:flex   px-4 lg:space-x-4  rounded-md "
                      >
                        <div className="md:h-[150px]  h-[200px] aspect-square mx-auto">
                          <img
                            src={product.imageSrc}
                            className="w-full h-full object-cover rounded-md"
                            alt={product.imageAlt}
                          />
                        </div>
                        <div className="w-full text-xs ">
                          <div className="flex justify-between w-full">
                            <p className="font ">Product Name</p>
                            <p className="font text-gray-600">{product.name}</p>
                          </div>
                          <div className="flex justify-between w-full">
                            <p className="font  ">Color</p>
                            <p className="font text-gray-600 ">
                              {product.color}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="col-span-4">
                    <button
                      className="w-full font-semibold text-md py-3 bg-red-600 hover:bg-red-900  rounded-md text-white mt-4"
                      onClick={() => cancelOrder(order.id, index)}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xl md:text-2xl font-semibold">
              You do not have any orders
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Profile;
