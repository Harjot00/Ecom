import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const Categories = [
    {
      category: "Men",
      bg: "https://images.unsplash.com/photo-1619208382871-96f4d45bc840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVuJTIwY2xvdGhlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      imgAlt: "Mens Clothing",
    },
    {
      category: "Women",
      bg: "https://images.unsplash.com/photo-1616313253719-c46514cddee1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBjbG90aGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      imgAlt: "Womens Clothing",
    },
    {
      category: "Children",
      bg: "https://images.unsplash.com/photo-1502451885777-16c98b07834a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2hpbGRyZW4lMjBjbG90aGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      imgAlt: "Childrens Clothing",
    },
  ];
  return (
    <div className=" w-full  justify-center my-8">
      <p className="text-xl font-semibold text-center mb-4">
        Available Categories
      </p>
      <div className="grid grid-cols-9 w-full md:space-x-6 space-y-6  md:space-y-0 ">
        {Categories.map((item, idx) => {
          return (
            <Link
              key={idx}
              to={`shop/${item.category.toLowerCase()}`}
              className="col-span-9  md:col-span-3 space-y-4 border rounded shadow-md p-4 hover:scale-105 cursor-pointer"
            >
              <img
                className="h-[350px] w-full object-fit md:object-cover "
                src={item.bg}
                alt={item.imgAlt}
              />
              <p className="text-xl font-semibold text-center ">
                {item.category}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
