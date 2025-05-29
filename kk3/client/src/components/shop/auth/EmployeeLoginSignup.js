import React, { Fragment, useState, useContext } from "react";
import Login from "./Login";
import EmployeeSignup from "./EmployeeSignup";
import { LayoutContext } from "../index";

const EmployeeLoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [login, setLogin] = useState(true);
  const [loginValue, setLoginValue] = useState("Create Employee Account");

  const employeeLoginSignupModalToggle = () =>
    data.employeeLoginSignupModal
      ? dispatch({ type: "employeeLoginSignupModalToggle", payload: false })
      : dispatch({ type: "employeeLoginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
      setLoginValue("Employee Login");
    } else {
      setLogin(true);
      setLoginValue("Create Employee Account");
    }
  };

  return (
    <Fragment>
      {/* Black Overlay  */}
      <div
        onClick={(e) => employeeLoginSignupModalToggle()}
        className={` ${
          data.employeeLoginSignupModal ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>
      {/* Employee Signup Login Component Render */}
      <section
        className={` ${
          data.employeeLoginSignupModal ? "" : "hidden"
        } fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}
      >
        <div className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6">
          {login ? <Login /> : <EmployeeSignup />}
          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-500 w-full" />
            <span className="font-medium">or</span>
            <span className="border-b border-gray-500 w-full" />
          </div>
          <div
            onClick={(e) => changeLoginSignup()}
            className="w-full text-center cursor-pointer px-3 py-2 text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white rounded font-medium"
          >
            {loginValue}
          </div>
          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-500 w-full" />
            <span className="font-medium">Employee Portal</span>
            <span className="border-b border-gray-500 w-full" />
          </div>
          {/* Close Modal */}
          <div
            onClick={(e) => employeeLoginSignupModalToggle()}
            className="absolute top-6 right-6 w-8 h-8 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-300"
          >
            ×
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default EmployeeLoginSignup;
