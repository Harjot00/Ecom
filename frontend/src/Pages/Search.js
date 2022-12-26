import React from "react";
import Container from "../Components/Container/Container";
import productsArr from "../Reducers/products";
import ProductCard from "../Components/Products/ProductCard";
import { useParams } from "react-router-dom";
import CartItems from "../Components/Cart/cartItem";

function Search() {
  const { query } = useParams();

  const availableProducts = productsArr.filter((item) => {
    if (item.name.includes(query)) {
      return item;
    }
  });

  return (
    <Container>
      <div className="bg-white md:min-h-[470px]  lg:min-h-[570px]">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Here are the products that match your search results.
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {availableProducts.length > 0 ? (
              availableProducts.map((item, idx) => {
                return <ProductCard key={idx} {...item} route={"search"} />;
              })
            ) : (
              <p>No products are in match your search.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Search;
