import React, { Fragment, useState, useContext } from "react";
import { UserAnalyticsContext } from "./index";
import { adminCreateEmployeeReq } from "../../shop/auth/fetchApi";
import { fetchUserAnalytics } from "./Action";
import { useSnackbar } from 'notistack';

const CreateEmployeeModal = () => {
  const { data, dispatch } = useContext(UserAnalyticsContext);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
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

  const createEmployeeModalClose = () => {
    dispatch({ type: "createEmployeeModal", payload: false });
    setFormData({
      name: "",
      email: "",
      password: "",
      cPassword: "",
      error: false,
      loading: false,
      success: false,
    });
  };

  const formSubmit = async () => {
    setFormData({ ...formData, loading: true });

    if (formData.cPassword !== formData.password) {
      return setFormData({
        ...formData,
        loading: false,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }

    try {
      let responseData = await adminCreateEmployeeReq({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cPassword: formData.cPassword,
      });

      if (responseData.error) {
        setFormData({
          ...formData,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
          success: responseData.success,
        });
        enqueueSnackbar('Employee Account Created Successfully by Admin!', { variant: 'success' });

        // Close modal after success
        setTimeout(() => {
          createEmployeeModalClose();
          // Refresh user analytics data
          fetchUserAnalytics(dispatch);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setFormData({
        ...formData,
        loading: false,
        error: { general: "Something went wrong. Please try again." },
      });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={createEmployeeModalClose}
        className={`${
          data.createEmployeeModal ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>

      {/* Modal */}
      <div
        className={`${
          data.createEmployeeModal ? "" : "hidden"
        } fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}
      >
        <div className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6 rounded-lg shadow-lg">
          {/* Close Button */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Create Employee Account</h2>
            <button
              onClick={createEmployeeModalClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value, error: false })
                }
                value={formData.name}
                type="text"
                id="name"
                placeholder="Enter employee's full name"
                className={`px-3 py-2 border ${
                  formData.error.name ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {formData.error.name && alert(formData.error.name, "red")}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value, error: false })
                }
                value={formData.email}
                type="email"
                id="email"
                placeholder="Enter employee's email address"
                className={`px-3 py-2 border ${
                  formData.error.email ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {formData.error.email && alert(formData.error.email, "red")}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value, error: false })
                }
                value={formData.password}
                type="password"
                id="password"
                placeholder="Enter password (minimum 8 characters)"
                className={`px-3 py-2 border ${
                  formData.error.password ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {formData.error.password && alert(formData.error.password, "red")}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <label htmlFor="cPassword" className="text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, cPassword: e.target.value, error: false })
                }
                value={formData.cPassword}
                type="password"
                id="cPassword"
                placeholder="Confirm password"
                className={`px-3 py-2 border ${
                  formData.error.cPassword ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {formData.error.cPassword && alert(formData.error.cPassword, "red")}
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={formSubmit}
                disabled={formData.loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {formData.loading ? "Creating..." : "Create Employee Account"}
              </button>
              <button
                type="button"
                onClick={createEmployeeModalClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Success Message */}
            {formData.success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {formData.success}
              </div>
            )}

            {/* General Error Message */}
            {formData.error.general && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {formData.error.general}
              </div>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateEmployeeModal;
