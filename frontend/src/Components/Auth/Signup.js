import { useState } from "react";
import Container from "../Container/Container";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Reducers/auth";

function Signup() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    country: "United States",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };
  const signUpFn = async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/signup`,
      data,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return response.data;
  };

  const mutation = useMutation((data) => signUpFn(data), {
    retry: 3,
  });

  const authFn = () => {
    mutation.mutate(signUpData, {
      onSuccess: (data) => {
        console.log(data);
        dispatch(login(data));
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      },
    });
  };

  return (
    <Container>
      <div className="">
        <div className="md:my-9 mt-0 ">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="overflow-hidden bg-gray-400 shadow sm:rounded-md">
                  <div className="bg-gray-200 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          onChange={(e) => changeHandler(e)}
                          required
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          onChange={(e) => changeHandler(e)}
                          autoComplete="family-name"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email"
                          required
                          onChange={(e) => changeHandler(e)}
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          required
                          onChange={(e) => changeHandler(e)}
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="cpassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          name="cpassword"
                          required
                          onChange={(e) => changeHandler(e)}
                          autoComplete="family-name"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          required
                          onChange={(e) => changeHandler(e)}
                          autoComplete="country-name"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="streetAddress"
                          required
                          onChange={(e) => changeHandler(e)}
                          id="streetAddress"
                          autoComplete="street-address"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          onChange={(e) => changeHandler(e)}
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          required
                          onChange={(e) => changeHandler(e)}
                          id="region"
                          autoComplete="address-level1"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          required
                          onChange={(e) => changeHandler(e)}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 block w-full h-[35px] rounded-md shadow-sm focus:outline-black sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black "
                      onClick={(e) => {
                        e.preventDefault();
                        authFn();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
