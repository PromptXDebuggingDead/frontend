import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { LiaTimesSolid } from "react-icons/lia";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineQuiz, MdOutlineSettings } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { PiExam } from "react-icons/pi";
import { FiBookOpen } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { logoutUser } from "../redux/actions/userActions";
import { IoMdTrendingUp } from "react-icons/io";

const SideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <span
        className={`fixed z-[100000] lg:hidden text-4xl md:text-5xl top-16 ${
          isSidebarOpen ? "left-[220px] " : " left-4 "
        }cursor-pointer `}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <LiaTimesSolid className="font-thin px-2 text-primary rounded-md" />
        ) : (
          <HiMiniBars3BottomLeft className="px-2  z-[9999] text-black bg-primary rounded-md" />
        )}
      </span>
      <div
        className={`sidebar transition-all duration-300 ease-in-out fixed bottom-0 lg:left-0 px-2 w-[300px] lg:w-[230px] top-12 md:top-16 overflow-y-auto text-center bg-white z-40 ${
          !isSidebarOpen ? "-left-[300px]" : "left-0"
        }`}
      >
        <NavLink
          onClick={toggleSidebar}
          to={"/my/profile"}
          className={({ isActive }) =>
            `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 ${
              isActive && "bg-emerald-100 text-primary"
            }`
          }
        >
          <BsHouseDoor className="text-xl" />
          <span className="text-[15px] ml-4 font-semibold">Home</span>
        </NavLink>
        <NavLink
          onClick={toggleSidebar}
          to={"/popular"}
          className={({ isActive }) =>
            `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 ${
              isActive && "bg-emerald-100 text-primary"
            }`
          }
        >
          <BsHouseDoor className="text-xl" />
          <span className="text-[15px] ml-4 font-semibold">Popular</span>
        </NavLink>

        <NavLink
          onClick={toggleSidebar}
          to={"/trending"}
          className={({ isActive }) =>
            `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 ${
              isActive && "bg-emerald-100 text-primary"
            }`
          }
        >
          <IoMdTrendingUp className="text-xl" />
          <span className="text-[15px] ml-4 font-semibold">Trending</span>
        </NavLink>

        <div className="w-full h-[0.9px] bg-gradient-to-l from-gray-50 via-gray-700 to-gray-50 " />
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 hover:text-primary"
          onClick={() => toggleDropdown("courses")}
        >
          <FiBookOpen className="text-lg" />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 font-semibold">Technology</span>
            <span
              className={`text-lg transition-transform duration-300 ${
                openDropdown === "courses" ? "rotate-180" : ""
              }`}
            >
              <BiChevronDown />
            </span>
          </div>
        </div>
        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
            openDropdown === "courses" ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="text-left text-sm mt-2 w-4/5 mx-auto font-semibold">
            <NavLink
              onClick={toggleSidebar}
              to={"/product/all"}
              className={({ isActive }) =>
                `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 hover:text-primary ${
                  isActive && "bg-emerald-100 text-primary"
                }`
              }
            >
              Some Subcategory
            </NavLink>
            <NavLink
              onClick={toggleSidebar}
              to={"/product/create"}
              className={({ isActive }) =>
                `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 hover:text-primary ${
                  isActive && "bg-emerald-100 text-primary"
                }`
              }
            >
              Create Product
            </NavLink>
            <NavLink
              onClick={toggleSidebar}
              to={"/courses"}
              className={({ isActive }) =>
                `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 hover:text-primary ${
                  isActive && "bg-emerald-100 text-primary"
                }`
              }
            >
              Explore Courses
            </NavLink>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => logout()}
          className="p-2.5 w-full mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-emerald-100 text-gray-700 hover:text-primary"
        >
          <LuLogOut />
          <span className="text-[15px] ml-4 font-semibold">Logout</span>
        </button>
      </div>
    </>
  );
};

export default SideBar;
