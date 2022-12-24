import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useSelector((state) => state);

  return (
    <div className="w-full h-10 bg-black flex py-9 md:px-10 lg:px-20  items-center justify-between text-white text-gray-200">
      <div>
        <Link to="/">
          <p className="text-3xl font-semibold mx-4 hover:opacity-75">Ecom</p>
        </Link>
      </div>
      <div className="w-full hidden md:max-w-md lg:max-w-2xl md:flex  rounded bg-white items-center ">
        <input
          type="text"
          name="search"
          className="w-full h-[35px] ml-4 rounded  border-none text-black  sm:text-sm focus:outline-none"
          placeholder="  Search products"
        />
        <IconContext.Provider
          value={{ size: "1.5rem", className: "mx-2 text-gray-400" }}
        >
          <button>
            <BiSearchAlt2 />
          </button>
        </IconContext.Provider>
      </div>
      <div className="space-x-4 lg:space-x-8">
        <IconContext.Provider
          value={{
            size: "2rem",
            className: " text-gray-400 hover:text-white",
          }}
        >
          <button className="relative " onClick={() => setIsOpen(!isOpen)}>
            <div
              className={
                cart.length <= 0
                  ? ""
                  : "absolute top-[-4px] right-[-2px] p-1 bg-orange-400 text-black text-xs"
              }
            >
              {cart.length !== 0 ? cart.length : ""}
            </div>
            <HiOutlineShoppingBag />
          </button>
        </IconContext.Provider>
        <IconContext.Provider
          value={{
            size: "2rem",
            className: "text-gray-400 hover:text-white",
          }}
        >
          <button>
            <CgProfile />
          </button>
        </IconContext.Provider>
      </div>
      {isOpen && <Cart isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default NavBar;
