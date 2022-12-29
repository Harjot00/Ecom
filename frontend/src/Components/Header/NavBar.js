import { useState } from "react";
import SearchBar from "./SearchBar";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

function NavBar({ drawer, openDrawer }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    cart,
    auth: { isLoggedIn },
  } = useSelector((state) => state);

  const navigate = useNavigate();
  return (
    <div className="w-full h-10  flex py-9 px-2 md:px-10 lg:px-20  items-center justify-between text-white text-gray-200">
      <div>
        <Link to="/">
          <p className="text-3xl font-semibold mx-4 hover:opacity-75">Ecom</p>
        </Link>
      </div>
      <SearchBar />
      <div className="space-x-4 lg:space-x-8 hidden md:block">
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
          <button
            onClick={() => {
              isLoggedIn === true ? navigate("/profile") : navigate("/login");
            }}
          >
            <CgProfile />
          </button>
        </IconContext.Provider>
      </div>
      <div
        className=" md:hidden sm:block lg:hidden"
        onClick={() => {
          openDrawer(!drawer);
        }}
      >
        <IconContext.Provider
          value={{
            size: "2rem",
            className: "text-gray-400 hover:text-white ",
          }}
        >
          <CgMenu />
        </IconContext.Provider>
      </div>

      {isOpen && <Cart isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default NavBar;
