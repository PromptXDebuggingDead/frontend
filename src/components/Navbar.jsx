import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { openAuthModal } from "../redux/features/modalSlice";
import { logoutUser } from "../redux/actions/userActions";
import profileImg from "../assets/Images/avatar.svg";
import { TfiAngleDown } from "react-icons/tfi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import Logo from "../assets/Images/logo.png";
import DummySearch from "./DummySearch";

const MainHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="flex w-full bg-white justify-between items-center md:px-12 px-4 h-14 md:h-16">
      {/* Logo */}
      <Link to="/" className="w-full">
        <h1 className="text-2xl font-bold">VerveSpace</h1>
      </Link>

      <DummySearch />
      {/* Menu */}
      <div className="flex  justify-end w-full gap-3 md:gap-5 items-center">
        {isAuthenticated ? (
          <div className="relative hidden sm:flex items-center">
            <p className="text-sm">{user ? user?.name?.split(" ")[0] : ""}</p>
            <div
              onClick={() => setDropdown(!dropdown)}
              className="flex gap-1 items-center justify-center max-w-56 min-w-20"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <img
                className="rounded-full border border-gray-500 w-10 h-10"
                src={user ? user.avatar : profileImg}
                alt=""
              />
              <TfiAngleDown className="text-sm" />
            </div>
          </div>
        ) : (
          <>
            <p
              onClick={() => dispatch(openAuthModal("login"))}
              className="text-gray-600 cursor-pointer hidden md:block font-medium"
            >
              Login
            </p>

            <p
              onClick={() => dispatch(openAuthModal("signup"))}
              className="text-white md:w-32 text-center cursor-pointer block font-medium px-4 py-2 bg-gray-700 text-xs md:text-base rounded-2xl"
            >
              Sign Up
            </p>
          </>
        )}
        {/* Drop down */}
        {dropdown && (
          <div
            className="absolute right-0 top-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="" role="none">
              <NavLink
                to="/my/dashboard"
                className={({ isActive }) =>
                  `text-gray-700 ${
                    isActive && "bg-gray-100"
                  } cursor-pointer block hover:bg-gray-100 px-4 py-3 text-sm`
                }
                onClick={() => setDropdown(false)}
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                My Account
                <p className="text-green-900 text-[0.67rem]">{user?.name}</p>
              </NavLink>

              <p
                onClick={() => {
                  dispatch(logoutUser());
                  setDropdown(false);
                }}
                className="text-gray-700 block cursor-pointer hover:bg-gray-100 w-full px-4 py-3 text-left text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
              >
                Sign out
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ open, setOpen }) => {
  const customClass = ({ isActive }) =>
    `text-[1.1rem]  duration-200 ${
      isActive ? "font-semibold text-emerald-600" : "text-gray-800"
    } hover:border-b-2 hover:border-green-500 inline-block border-gray-100 hover:bg-gray-100 backdrop-blur-sm whitespace-nowrap hover:text-emerald-600  lg:p-0`;

  document.onclick = (e) => {
    if (e.target.id !== "sidebar" && e.target.id !== "bars") {
      setOpen(false);
    }
  };

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className=" bg-white sticky top-0 z-20 border-b border-gray-400">
      {/* Main(Common) Header */}
      <MainHeader setOpen={setOpen} />
      {/* Menu Header */}
    </div>
  );
};

export default Navbar;
