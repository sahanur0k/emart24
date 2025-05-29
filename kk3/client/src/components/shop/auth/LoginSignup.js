import React, { Fragment, useState, useContext } from "react";
import LoginWithTitle from "./LoginWithTitle";
import Signup from "./Signup";
import EmployeeSignup from "./EmployeeSignup";
import AdminSignup from "./AdminSignup";
import { LayoutContext } from "../index";

const LoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [login, setLogin] = useState(true);
  const [signupType, setSignupType] = useState("customer"); // "customer", "employee", or "admin"
  const [loginValue, setLoginValue] = useState("Create an account");
  const [userRole, setUserRole] = useState(null); // Track user role after login

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
      setSignupType("customer");
      setLoginValue("Login");
    } else {
      setLogin(true);
      setLoginValue("Create an account");
    }
  };

  const toggleSignupType = () => {
    if (signupType === "customer") {
      setSignupType("employee");
    } else if (signupType === "employee") {
      setSignupType("admin");
    } else {
      setSignupType("customer");
    }
  };

  return (
    <Fragment>
      {/* Black Overlay  */}
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={` ${
          data.loginSignupModal ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>
      {/* Signup Login Component Render */}
      <section
        className={` ${
          data.loginSignupModal ? "" : "hidden"
        } fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}
      >
        <div className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6">
          {login ? (
            <LoginWithTitle title="Login" />
          ) : signupType === "customer" ? (
            <Signup />
          ) : signupType === "employee" ? (
            <EmployeeSignup />
          ) : (
            <AdminSignup />
          )}

          {!login && (
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">
                Currently creating: <span className="font-semibold capitalize text-gray-800">
                  {signupType === "customer" ? "User Account" : signupType === "employee" ? "Employee Account" : "Admin Account"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="border-b border-gray-500 w-full" />
                <span className="font-medium">or</span>
                <span className="border-b border-gray-500 w-full" />
              </div>
            </div>
          )}

          {!login && (
            <div
              onClick={(e) => toggleSignupType()}
              className="w-full text-center cursor-pointer px-3 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded font-medium"
            >
              {signupType === "customer"
                ? "Create Employee Account"
                : signupType === "employee"
                ? "Create Admin Account"
                : "Create Customer Account"}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-500 w-full" />
            <span className="font-medium">or</span>
            <span className="border-b border-gray-500 w-full" />
          </div>
          <div
            onClick={(e) => changeLoginSignup()}
            style={{ color: "#303031", border: "1px solid #303031" }}
            className="px-4 py-2 font-medium text-center cursor-pointer"
          >
            {loginValue}
          </div>
          {/*  Modal Close Button */}
          <div className="absolute top-0 right-0 mx-4">
            <svg
              onClick={(e) => {
                loginSignupModalToggle();
                dispatch({ type: "loginSignupError", payload: false });
              }}
              className="w-6 h-6 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;
