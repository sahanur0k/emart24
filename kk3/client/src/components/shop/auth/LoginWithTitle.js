import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { useSnackbar } from 'notistack';

const LoginWithTitle = ({ title = "Login" }) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        
        // Show success message with role-specific text
        const userRole = responseData.user.role;
        let successMessage = 'Login Completed Successfully..!';
        if (userRole === 1) {
          successMessage = 'Admin Login Successful! Redirecting to Dashboard...';
        } else if (userRole === 2) {
          successMessage = 'Employee Login Successful! Redirecting to Dashboard...';
        }
        
        enqueueSnackbar(successMessage, { variant: 'success' });
        
        // Redirect based on user role
        if (userRole === 1 || userRole === 2) {
          // Admin (role 1) or Employee (role 2) - redirect to dashboard
          window.location.href = "/admin/dashboard";
        } else {
          // Customer (role 0) - redirect to home
          window.location.href = "/";
        }
      }    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">{title}</div>
      {layoutData.loginSignupError ? (
        <div className="bg-red-200 py-2 px-4 rounded">
          You need to login for checkout. Haven't account? Create new one.
        </div>
      ) : (
        ""
      )}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="text"
            id="name"
            className={`px-3 py-2 border ${
              data.error ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-yellow-500`}
          />
          {data.error && alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`px-3 py-2 border ${
              data.error ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-yellow-500`}
          />
          {data.error && alert(data.error)}
        </div>
        <div
          onClick={(e) => formSubmit()}
          className="w-full text-center cursor-pointer px-3 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded font-medium"
        >
          {data.loading ? "..." : "Login"}
        </div>
      </form>
    </Fragment>
  );
};

export default LoginWithTitle;
