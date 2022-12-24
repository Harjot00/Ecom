import React from "react";
import { useParams } from "react-router-dom";
import Container from "../Components/Container/Container";
import ProductCard from "../Components/Products/ProductCard";
import products from "../Reducers/products";
import { TbShirtOff } from "react-icons/tb";
import { IconContext } from "react-icons/lib";

function Shop() {
  const { category } = useParams();

  return (
    <Container>
      <div className="bg-white md:min-h-[470px]  lg:min-h-[570px]">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Products for{" "}
            {category[0].toUpperCase() + category.slice(1).toLowerCase()}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.length > 0 &&
            products.some((item) => item.category === category) ? (
              products.map((item, key) => {
                if (item.category === category) {
                  return <ProductCard {...item} key={key} />;
                }
                return null;
              })
            ) : (
              <p>No products are in stock.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
