// Components
import Aside from "../components/Aside";
import ControlSidebar from "../components/ControlSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Css Module

// Config .
import { APIREST } from "../configs";

// React
import React, { useState, useEffect } from "react";

// React Router Dom
import { NavLink, Outlet, useNavigate } from "react-router-dom";

// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/authSlice";

// Toast
/* import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; */

const Layout = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.logged) {
      console.log("No estas logeado");
      navigate("/login");
    }
    return () => {};
  }, [auth]);

  const logoutSession = () => {
    dispatch(logout());
  };

  return (
    <div className="wrapper">
      {/* auth && auth.logged */}
      {auth && auth.logged ? (
        <>
          <Navbar logout={logoutSession} />
          <Aside />
          <div className="content-wrapper">
            <Outlet />
          </div>
          <ControlSidebar />
          <Footer />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Layout;
