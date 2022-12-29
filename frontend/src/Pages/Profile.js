import { useState } from "react";
import Container from "../Components/Container/Container";
import { useQuery } from "react-query";
import axios from "axios";
import Orders from "../Components/Cart/Orders";
import { Link } from "react-router-dom";

function Profile() {
  const fetchProfileData = async () => {
    const response = await axios.get(`http://localhost:3000/api/allOrders`, {
      credentials: "include",
      withCredentials: true,
    });
    return response.data;
  };
  window.scroll(0, 0);
  const { data: orders, isSuccess } = useQuery("profile", fetchProfileData);
  const [showOrder, setShowOrder] = useState(false);

  return (
    <Container>
      <div className=" my-8 px-12">
        <div className="space-y-4">
          {isSuccess && orders.length > 0 ? (
            orders.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full border-2 border-gray-600 rounded-lg shadow-md min-h-[45px] cursor-pointer p-4"
                >
                  <div className="flex justify-between mb-4">
                    <p className="font-semibold text-lg md:text-xl ">
                      Order id
                    </p>
                    <p className="font-medium">{item.id}</p>
                  </div>
                  <div className="grid grid-cols-9 my-2 md:space-x-4 ">
                    {item.products.map((item, index) => {
                      return (
                        <div key={index} className="col-span-8 md:col-span-2  ">
                          <div className="w-full shadow-md border-2 py-6 space-y-4 md:space-y-0 md:flex  px-4 md:px-0 md:space-x-4  rounded-md ">
                            <div className="md:h-[150px]  h-[200px] aspect-square mx-auto">
                              <img
                                src={item.imageSrc}
                                className="w-full h-full object-cover rounded-md"
                                alt={item.imageAlt}
                              />
                            </div>
                            <div className="w-full">
                              <div className="flex md:block lg:flex justify-between">
                                <p className=" text-md font-medium text-black">
                                  {item.name}
                                </p>
                              </div>
                              <div className="text-md text-gray-600">
                                <p>{item.color}</p>
                                <p>${item.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="w-full font-semibold text-md py-3 bg-red-600 hover:bg-red-900  rounded-md text-white mt-4">
                    Cancel Order
                  </button>
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
