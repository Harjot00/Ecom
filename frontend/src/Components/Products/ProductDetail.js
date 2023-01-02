import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Reducers/cart";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

function ProductDetail() {
  const { cart } = useSelector((state) => state);

  const fetchproduct = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/getproduct/${productid}`
    );
    return response.data;
  };
  const { category, productid } = useParams();
  const {
    isLoading,
    isSuccess,
    isError,
    data: product,
    error,
  } = useQuery("product", fetchproduct, {
    retry: 3,
  });

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const sizeHandler = (e) => {
    product.size = e;
  };

  const colorHandler = (e) => {
    product.color = e;
  };

  window.scroll(0, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (isSuccess) {
    return (
      <div className="my-8 py-8 grid grid-cols-2 gap-x-4 ">
        <div className="col-span-2 mb-10">
          <p className=" space-x-2 md:text-lg font-semibold">
            <span className=" px-1 md:px-4">Shop</span>
            <span className="border-l-2 px-2 md:px-4 border-gray-400">
              {product.category[0].toUpperCase() +
                product.category.slice(1).toLowerCase()}
            </span>
            <span className="border-l-2 px-2 md:px-4 border-gray-400 text-gray-400 font-normal">
              {product.name}
            </span>
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 ">
          <img
            className="w-full h-[850px] rounded-md object-cover"
            src={product.imageSrc}
            alt={product.imageAlt}
          />
        </div>
        <div className="px-3 mt-6 md:mt-0 col-span-2 md:col-span-1">
          <div className="text-2xl font-semibold flex justify-between">
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
          <div>
            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup className="mt-4" onChange={(e) => colorHandler(e)}>
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        name="color"
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color,
                            active && checked ? "ring-2 ring-black" : "",
                            !active && checked ? "ring-2 ring-black" : "",
                            "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only" />

                        <span
                          aria-hidden="true"
                          className={
                            color === "black"
                              ? "h-8 w-8 border border-black border-opacity-10 rounded-full bg-black "
                              : `h-8 w-8 border border-black border-opacity-10 rounded-full bg-${color}-600 `
                          }
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between mt-10">
                <p>Quantity</p>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="w-[25px]  p-4 flex justify-center items-center rounded-md text-4xl"
                    onClick={() => {
                      if (quantity <= 4) {
                        setQuantity(quantity + 1);
                        product.quantity = quantity;
                      }
                    }}
                  >
                    +
                  </button>

                  <div className="w-[25px] border-2 border-gray-500 p-4 flex justify-center items-center rounded-md">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="w-[25px] p-4 flex justify-center items-center rounded-md text-4xl"
                    onClick={() => {
                      if (quantity >= 2) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <p className="text-sm font-medium text-gray-400 ">
                    Size guide
                  </p>
                </div>

                <RadioGroup className="mt-4" onChange={(e) => sizeHandler(e)}>
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a size{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size[0].name}
                        value={size[0].name}
                        name="size"
                        disabled={!size[0].inStock}
                        className={({ active, checked }) =>
                          classNames(
                            size[0].inStock
                              ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                              : "bg-gray-50 text-gray-200 cursor-not-allowed",
                            checked ? "border-2 border-black " : "",
                            "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size[0].name}
                            </RadioGroup.Label>
                            {size[0].inStock ? (
                              <span
                                className={classNames(
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  dispatch(addToCart(product));

                  setAdded(true);
                }}
                className={
                  added
                    ? "mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-base font-medium text-white "
                    : "mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-700 py-3 px-8 text-base font-medium text-white hover:bg-black "
                }
              >
                {added ? "Item added to bag" : "Add to bag"}
              </button>
            </form>
          </div>
          <div className="mt-8 space-y-4">
            <p className="text-lg font-semibold">Description</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
