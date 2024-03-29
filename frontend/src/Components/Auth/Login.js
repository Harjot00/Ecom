import { useState } from "react";
import Container from "../Container/Container";
import { useNavigate, redirect } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Reducers/auth";

function Login() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state);
  const [wrongPassword, setwrongPassword] = useState(false);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const loginFn = async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/login`,
      data,
      {
        credentials: "include",
        contentType: "application/json",
        withCredentials: true,
      }
    );
    return await response.data;
  };
  const mutation = useMutation(() => loginFn(loginData), {
    retry: 3,
  });

  if (isLoggedIn) {
    redirect("/profile");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    mutation
      .mutateAsync(loginData)
      .then((data) => {
        console.log(data);
        dispatch(login());
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setwrongPassword(true);
        } else {
          // Handle other errors
          console.error("An error occurred:", err.message);
        }
      });
  };

  return (
    <Container>
      <div className="md:min-h-[460px] my-8 md:my-14">
        <form className="drop-shadow border bg-gray-300 w-full lg:max-w-lg h-3/5  flex flex-col justify-center items-center mx-auto px-12 py-8 rounded-md space-y-6">
          <div className="w-full ">
            <p className="mb-2 text-xl">Email address</p>
            <input
              type="string"
              onChange={(e) => changeHandler(e)}
              name="email"
              required
              className="w-full h-[40px] rounded-md focus:outline-gray-400 border"
            />
          </div>
          <div className="w-full">
            <p className="mb-2 text-xl">Password</p>
            <input
              type="string"
              name="password"
              required
              onChange={(e) => changeHandler(e)}
              className="w-full h-[40px] rounded-md focus:outline-gray-400 border"
            />
          </div>
          <div className="w-full">
            <button
              className="w-full py-3 bg-gray-700 hover:bg-black mt-3 rounded-md text-white text-lg font-semibold tracking-widest"
              type="submit"
              onClick={(e) => submitHandler(e)}
            >
              Login
            </button>
            <button
              className="w-full py-3 bg-gray-700 hover:bg-black mt-3 rounded-md text-white text-lg font-semibold tracking-widest"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
            {wrongPassword ? (
              <div className="mt-3"> wrong password or email</div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
