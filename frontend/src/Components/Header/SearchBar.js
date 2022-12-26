import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { BiSearchAlt2 } from "react-icons/bi";

function SearchBar(props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const keyPressHandler = (event) => {
    if (query.length > 0 && event.key === "Enter") {
      if (query) {
        navigate(`/search/${query.trim()}`);
      }
    } else {
      return;
    }
  };
  return (
    <div
      className={
        props.size === "medium"
          ? "w-10/12  flex  rounded bg-white items-center"
          : "w-full hidden  md:max-w-md lg:max-w-2xl md:flex  rounded bg-white items-center "
      }
    >
      <input
        type="text"
        name="search"
        className="w-full h-[35px] ml-4 rounded  border-none text-black  sm:text-sm focus:outline-none"
        placeholder="  Search products"
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
      />
      <IconContext.Provider
        value={{ size: "1.5rem", className: "mx-2 text-gray-400" }}
      >
        <button
          onClick={() => {
            if (query.length > 0) {
              if (query.trim()) {
                navigate(`/search/${query}`);
              }
            } else {
              return;
            }
          }}
        >
          <BiSearchAlt2 />
        </button>
      </IconContext.Provider>
    </div>
  );
}

export default SearchBar;
