import React, { Fragment } from "react";

import { useLocation, useHistory } from "react-router-dom";
import { isAdmin } from "../../shop/auth/fetchApi";


const AdminSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fragment>
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa" }}
        id="sidebar"
        className="hidden md:block sticky top-0 left-0 h-full md:w-3/12 lg:w-2/12 sidebarShadow bg-white text-gray-600"
      >
        <div
          onClick={(e) => history.push("/admin/dashboard")}
          className={`${
            location.pathname === "/admin/dashboard"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Dashboard</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Categories</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Product</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/services")}
          className={`${
            location.pathname === "/admin/dashboard/services"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Services</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/insurances")}
          className={`${
            location.pathname === "/admin/dashboard/insurances"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Insurances</span>
        </div>
        {/* Insurance Clients - Admin Only */}
        {isAdmin() && (
          <Fragment>
            <hr className="border-b border-gray-200" />
            <div
              onClick={(e) => history.push("/admin/dashboard/insurance-clients")}
              className={`${
                location.pathname === "/admin/dashboard/insurance-clients"
                  ? "border-r-4 border-gray-800 bg-gray-100"
                  : ""
              } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
            >
              <span>
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="hover:text-gray-800 text-center">Insurance Clients</span>
            </div>
          </Fragment>
        )}
        {/* Orders - Admin Only */}
        {isAdmin() && (
          <Fragment>
            <hr className="border-b border-gray-200" />
            <div
              onClick={(e) => history.push("/admin/dashboard/orders")}
              className={`${
                location.pathname === "/admin/dashboard/orders"
                  ? "border-r-4 border-gray-800 bg-gray-100"
                  : ""
              } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
            >
              <span>
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </span>
              <span className="hover:text-gray-800">Order</span>
            </div>
          </Fragment>
        )}
        {/* Rewards - Admin Only */}
        {isAdmin() && (
          <Fragment>
            <hr className="border-b border-gray-200" />
            <div
              onClick={(e) => history.push("/admin/dashboard/rewards")}
              className={`${
                location.pathname === "/admin/dashboard/rewards"
                  ? "border-r-4 border-gray-800 bg-gray-100"
                  : ""
              } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
            >
              <span>
                <svg
                  className="w-8 h-8 text-yellow-500 hover:text-yellow-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z"
                  />
                </svg>
              </span>
              <span className="hover:text-yellow-700">Reward</span>
            </div>
          </Fragment>
        )}
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/blogs")}
          className={`${
            location.pathname === "/admin/dashboard/blogs"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-green-600 hover:text-green-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </span>
          <span className="hover:text-green-800">Blogs</span>
        </div>
        {/* User Analytics - Admin Only */}
        {isAdmin() && (
          <Fragment>
            <hr className="border-b border-gray-200" />
            <div
              onClick={(e) => history.push("/admin/dashboard/user-analytics")}
              className={`${
                location.pathname === "/admin/dashboard/user-analytics"
                  ? "border-r-4 border-gray-800 bg-gray-100"
                  : ""
              } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
            >
              <span>
                <svg
                  className="w-8 h-8 text-indigo-600 hover:text-indigo-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </span>
              <span className="hover:text-indigo-800">User Analytics</span>
            </div>
            <hr className="border-b border-gray-200" />
          </Fragment>
        )}

        {/* Product Queries - Employee and Admin */}
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push(isAdmin() ? "/admin/dashboard/product-queries" : "/admin/dashboard/employee-queries")}
          className={`${
            location.pathname === "/admin/dashboard/product-queries" || location.pathname === "/admin/dashboard/employee-queries"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              className="w-8 h-8 text-green-600 hover:text-green-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="hover:text-green-800 text-center">Product Queries</span>
        </div>
      </div>
    </Fragment>

  );
};

export default AdminSidebar;
