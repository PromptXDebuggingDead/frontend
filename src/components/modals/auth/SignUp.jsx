import React, { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAuthModal,
  openAuthModal,
} from "../../../redux/features/modalSlice";
import { userSignup } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../../redux/features/userSlice";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import Animation from "../../../assets/animations/hi.json";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const SignUp = () => {
  const { loading, user, token, error } = useSelector((state) => state.user);
  // Logical States
  const [showOtp, setShowOtp] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  const [showCaptcha, setShowCaptcha] = useState(true);

  // Data States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState();
  const [imgUrl, setImgUrl] = useState(
    "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
  );

  const navigate = useNavigate();

  const fileUploadHandle = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUrl(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // Stop Background Activity
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Register the user
  const signUpHandler = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Please enter your name");
      return;
    }

    dispatch(userSignup({ name, email, password, avatar, username }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (token) {
      dispatch(closeAuthModal());
      navigate("/my/profile");
    }
  }, [dispatch, error, token, navigate]);

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

  return (
    <>
      <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
        <div className="w-screen md:w-[27rem] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
          <form className="flex relative flex-col w-full p-6 border border-gray-400  bg-white rounded-lg overflow-y-auto h-full ">
            <div className="flex justify-center items-center mb-3 text-3xl font-semibold text-center text-gray-900">
              <h1>Get Started</h1>
              <div className="w-14 mb-0">
                <Lottie animationData={Animation} loop={true} />
              </div>
            </div>
            <p
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => dispatch(closeAuthModal())}
            >
              <LiaTimesSolid className="text-2xl" />
            </p>

            {/* Login With Email */}
            <div className="login-with-email text-left">
              <div>
                <label htmlFor="email" className="text-sm text-gray-900">
                  Full Name*
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="flex items-center w-full px-3 py-3 mt-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                />
                <label htmlFor="username" className="text-sm text-gray-900">
                  Username*
                </label>
                <input
                  required
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johnsmith123"
                  className="flex items-center w-full px-3 py-3 mt-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                />
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

                {/* Image Upload */}

                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    <img
                      id="preview_img"
                      className="h-16 w-16 object-cover rounded-full"
                      src={imgUrl}
                      alt="Current profile photo"
                    />
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/"
                      onChange={fileUploadHandle}
                      className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                          "
                    />
                  </label>
                </div>

                <div className="flex items-center my-4 justify-center">
                  <button
                    onClick={signUpHandler}
                    className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 bg-slate-700"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <p
              onClick={() => dispatch(openAuthModal("login"))}
              className=" text-sm leading-relaxed text-center mt-2 text-gray-600"
            >
              Already a member?{" "}
              <span className="cursor-pointer text-base text-emerald-700 font-bold">
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
