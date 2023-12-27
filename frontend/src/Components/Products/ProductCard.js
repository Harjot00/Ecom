import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Reducers/cart";

function ProductCard(props) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  return (
    <div key={props._id} className="">
      <Link to={`${props._id}`}>
        <div className="h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 ">
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{props.name}</h3>
          </div>
          <p className="text-sm font-medium text-gray-900">${props.price}</p>
        </div>
      </Link>

      <button
        className={
          added
            ? "w-full text-md font-bold py-3 bg-green-600  mt-3 rounded-md text-white "
            : "w-full text-md font-bold py-3 bg-gray-700 hover:bg-black mt-3 rounded-md text-white"
        }
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(addToCart(props));

          setAdded(true);
        }}
      >
        {added ? "Item added to bag" : "add to bag"}
      </button>
    </div>
  );
}

export default ProductCard;
