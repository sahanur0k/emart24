import React, { Fragment, useState } from "react";
import { employeeSignupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';

const EmployeeSignup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );
  const { enqueueSnackbar } = useSnackbar();
  
  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await employeeSignupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
          success: responseData.success,
        });
        enqueueSnackbar('Employee Account Created Successfully..!', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Employee Signup</div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Name <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
                success: false,
                error: false,
              })
            }
            value={data.name}
            type="text"
            id="name"
            className={`px-3 py-2 border ${
              data.error.name ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-yellow-500`}
          />
          {data.error.name && alert(data.error.name, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            Email <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
                success: false,
                error: false,
              })
            }
            value={data.email}
            type="email"
            id="email"
            className={`px-3 py-2 border ${
              data.error.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-yellow-500`}
          />
          {data.error.email && alert(data.error.email, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
                success: false,
                error: false,
              })
            }
            value={data.password}
            type="password"
            id="password"
            className={`px-3 py-2 border ${
              data.error.password ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-yellow-500`}
          />
          {data.error.password && alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm Password <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                cPassword: e.target.value,
                success: false,
                error: false,
              })
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            className={`px-3 py-2 border ${
              data.error.cPassword ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-yellow-500`}
          />
          {data.error.cPassword && alert(data.error.cPassword, "red")}
        </div>
        <div
          onClick={(e) => formSubmit()}
          className="w-full text-center cursor-pointer px-3 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded font-medium"
        >
          {data.loading ? "..." : "Create Employee Account"}
        </div>
        {data.success && (
          <div className="bg-green-200 px-3 py-2 rounded">
            {data.success}
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default EmployeeSignup;
