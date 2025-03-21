import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/modals/auth/Login";
import SignUp from "./components/modals/auth/SignUp";
import { useSelector } from "react-redux";
import UpdatePassword from "./components/modals/auth/UpdatePassword";
import UpdateEmail from "./components/modals/auth/UpdateEmail";
import ScrollToTop from "./components/ScrollToTop";
import SideBar from "./components/SideBar";
import { useState } from "react";
const Layout = () => {
  const { isOpen, type } = useSelector((state) => state.authModal);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Navbar open={open} setOpen={setOpen} />
      {isOpen && type === "login" && <Login />}
      {isOpen && type === "signup" && <SignUp />}
      {isOpen && type === "password" && <UpdatePassword />}
      {isOpen && type === "email" && <UpdateEmail />}

      <main className="lg:pl-[235px] overflow-x-hidden">
        <SideBar isSidebarOpen={open} setSidebarOpen={setOpen} />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
