import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { IconContext } from "react-icons/lib";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

function Header() {
  const [drawer, setOpenDrawer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    cart,
    auth: { isLoggedIn },
  } = useSelector((state) => state);
  const drawerData = { drawer: drawer, openDrawer: setOpenDrawer };

  return (
    <div className="bg-black py-4 md:py-0">
      <NavBar {...drawerData} />
      {drawer && (
        <div className="space-y-4 sm:block md:hidden lg:hidden">
          <div className="flex justify-center items-center">
            <SearchBar size={"medium"} />
          </div>
          <div className="flex justify-center items-center">
            <IconContext.Provider
              value={{
                size: "2.5rem",
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
          </div>
          <div className="flex justify-center items-center">
            <IconContext.Provider
              value={{
                size: "2.5rem",
                className: "text-gray-400 hover:text-white",
              }}
            >
              <button
                onClick={() => {
                  isLoggedIn === true
                    ? navigate("/profile")
                    : navigate("/login");
                }}
              >
                <CgProfile />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      )}
      {isOpen && <Cart isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Header;
