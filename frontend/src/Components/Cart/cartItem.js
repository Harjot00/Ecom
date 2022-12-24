import { useState, useRef } from "react";
import { removeFromCart } from "../../Reducers/cart";
import { useDispatch, useSelector } from "react-redux";

function CartItems(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const dispatch = useDispatch();

  return (
    <div className="w-full border-t-2  border-gray-600 py-6 space-y-4 md:space-y-0 md:flex px-4 md:px-0 md:space-x-4  ">
      <div className="md:h-[150px]  h-[200px] aspect-square mx-auto">
        <img
          src={props.imageSrc}
          className="w-full h-full object-cover"
          alt={props.imageAlt}
        />
      </div>
      <div className="w-full">
        <div className="flex md:block lg:flex justify-between">
          <p className=" text-md font-medium text-black">{props.name}</p>
          <div>
            <input
              type="number"
              name="quantity"
              value={quantity}
              min="0"
              max="5"
              onChange={(event) => setQuantity(event.target.value)}
              className="bg-gray-400 block w-[40px] md:my-2  ml-auto md:ml-0"
            />
          </div>
        </div>
        <div className="text-md text-gray-600">
          <p>{props.color}</p>
          <p>${props.price}</p>
        </div>
        <button
          className="w-full font-semibold text-md py-3 bg-red-600 hover:bg-red-900  rounded-md text-white mt-4"
          onClick={() => {
            dispatch(removeFromCart(props));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItems;
