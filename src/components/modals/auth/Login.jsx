import React, { useEffect, useState } from "react";
import { LiaTimesSolid, LiaMailBulkSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAuthModal,
  openAuthModal,
} from "../../../redux/features/modalSlice";
import { toast } from "react-toastify";
import { userLogin, userLoginPhone } from "../../../redux/actions/userActions";
import { clearErrors } from "../../../redux/features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Animation from "../../../assets/animations/hi.json";
import Lottie from "lottie-react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
const Login = () => {
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Stop Background Activity
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated && !error) {
      dispatch(closeAuthModal());
    }
  }, [dispatch, error, isAuthenticated]);

  // Disable Enter key : [TODO: Will fix this later]
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const signInHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
          <div className="w-screen md:w-[25rem]  h-auto flex flex-col items-center justify-center rounded-lg pt-1">
            <form className="flex relative flex-col overflow-x-hidden border border-gray-400 w-full p-6 bg-white rounded-lg overflow-y-auto h-full">
              <div className="flex justify-center items-center mb-3 text-3xl font-semibold text-center text-gray-900">
                <h1>Welcome, back </h1>
                <div className="w-14 mb-0">
                  <Lottie animationData={Animation} loop={true} />
                </div>
              </div>
              <p
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => {
                  dispatch(closeAuthModal());
                }}
              >
                <LiaTimesSolid className="text-2xl" />
              </p>

              <label htmlFor="email" className="text-sm text-gray-900">
                Email
              </label>
              <input
                required
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@google.com"
                className="flex items-center w-full px-3 py-3 mt-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
              />
              <div className="relative">
                <label htmlFor="password" className="text-sm text-gray-900">
                  Password
                </label>
                <input
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="flex items-center w-full px-3 py-3 mt-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                />

                <div
                  className="absolute cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-100 ease-in-out p-1 rounded-full right-5 top-[50%]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsEyeSlash className="text-xl" />
                  ) : (
                    <BsEye className="text-xl" />
                  )}
                </div>
              </div>
              <div className="flex items-center my-4 justify-center">
                <button
                  onClick={signInHandler}
                  className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 bg-slate-700"
                >
                  Sign In
                </button>
              </div>
              <p className="text-sm leading-relaxed mt-4 text-center text-slate-500">
                Not registered yet?{" "}
                <span
                  onClick={() => dispatch(openAuthModal("signup"))}
                  className="font-semibold text-base cursor-pointer text-emerald-700"
                >
                  Create an Account
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
