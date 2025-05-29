import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin, isEmployee } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);
  const [cartCount, setCartCount] = useState(0);

  // Safe cart count calculation
  const getCartCount = () => {
    try {
      // First check localStorage for immediate updates
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        return Array.isArray(cartItems) ? cartItems.length : 0;
      }

      // Fallback to context state
      if (data.cartProduct && Array.isArray(data.cartProduct)) {
        return data.cartProduct.length;
      }

      return 0;
    } catch (error) {
      console.error("Error getting cart count:", error);
      return 0;
    }
  };

  // Update cart count when component mounts and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      const count = getCartCount();
      setCartCount(count);
    };

    // Initial count
    updateCartCount();

    // Listen for storage changes (when cart is updated in other tabs/components)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    // Listen for custom cart update events (when cart is updated in same tab)
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Update cart count when context data changes
  useEffect(() => {
    const count = getCartCount();
    setCartCount(count);
  }, [data.cartProduct, data.inCart]);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });



  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 w-full">

            {/* Left Side - EMART24 Logo */}
            <div
              onClick={(e) => history.push("/")}
              className="flex items-center cursor-pointer"
            >
              <img
                src="/uploads/logo/emart24-logo.png"
                alt="EMART24 Logo"
                className="h-6 lg:h-8 w-auto mr-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span
                style={{ letterSpacing: "0.1rem" }}
                className="font-bold uppercase text-gray-800 text-lg lg:text-xl"
              >
                EMART24
              </span>
            </div>

            {/* Center Navigation - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-6">
              <span
                className={`font-bold text-sm cursor-pointer transition-all duration-200 ${
                  location.pathname === "/"
                    ? "text-gray-800"
                    : "hover:text-gray-800 text-gray-600"
                }`}
                onClick={(e) => history.push("/")}
              >
                Shop
              </span>
              <span
                className={`font-bold text-sm cursor-pointer transition-all duration-200 ${
                  location.pathname === "/services"
                    ? "text-gray-800"
                    : "hover:text-gray-800 text-gray-600"
                }`}
                onClick={(e) => history.push("/services")}
              >
                Services
              </span>
              <span
                className={`font-bold text-sm cursor-pointer transition-all duration-200 ${
                  location.pathname === "/insurances"
                    ? "text-gray-800"
                    : "hover:text-gray-800 text-gray-600"
                }`}
                onClick={(e) => history.push("/insurances")}
              >
                Insurances
              </span>
              <span
                className={`font-bold text-sm cursor-pointer transition-all duration-200 ${
                  location.pathname === "/blog"
                    ? "text-gray-800"
                    : "hover:text-gray-800 text-gray-600"
                }`}
                onClick={(e) => history.push("/blog")}
              >
                Blog
              </span>
              <span
                className={`font-bold text-sm cursor-pointer transition-all duration-200 ${
                  location.pathname === "/about"
                    ? "text-gray-800"
                    : "hover:text-gray-800 text-gray-600"
                }`}
                onClick={(e) => history.push("/about")}
              >
                About
              </span>
              <span
                className={`font-bold text-sm cursor-pointer transition-all duration-200 ${
                  location.pathname === "/contact-us"
                    ? "text-gray-800"
                    : "hover:text-gray-800 text-gray-600"
                }`}
                onClick={(e) => history.push("/contact-us")}
              >
                Contact Us
              </span>
            </div>

            {/* Right Side - User Actions */}
            <div className="flex items-center space-x-3">
              {/* User Action Icons */}
              <div className="flex items-center space-x-3">
                {/*  WishList Page Button */}
                <div
                  onClick={(e) => history.push("/wish-list")}
                  className="hover:bg-gray-200 rounded-lg p-2 cursor-pointer transition-colors duration-200"
                  title="Wishlist"
                >
                  <svg
                    className={`${
                      location.pathname === "/wish-list"
                        ? "fill-current text-gray-800"
                        : ""
                    } w-6 h-6 text-gray-600 cursor-pointer`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>

                {localStorage.getItem("jwt") ? (
                  <div
                    className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
                    title="User Menu"
                  >
                    <svg
                      className="cursor-pointer w-6 h-6 text-gray-600 hover:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
                      {!isAdmin() ? (
                        <Fragment>
                          <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                            <span
                              onClick={(e) => history.push("/user/orders")}
                              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </span>
                              <span>My Orders</span>
                            </span>
                            <span
                              onClick={(e) => history.push("/user/profile")}
                              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </span>
                              <span>My Account</span>
                            </span>
                            <span
                              onClick={(e) => history.push("/wish-list")}
                              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                              </span>
                              <span>My Wishlist</span>
                            </span>
                            <span
                              onClick={(e) => history.push("/user/setting")}
                              className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </span>
                              <span>Setting</span>
                            </span>
                            <span
                              onClick={(e) => logout()}
                              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                              </span>
                              <span>Logout</span>
                            </span>
                          </li>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                            <span
                              onClick={(e) => history.push("/admin/dashboard")}
                              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </span>
                              <span>{isAdmin() ? "Admin Panel" : "Employee Dashboard"}</span>
                            </span>
                            <span
                              onClick={(e) => logout()}
                              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                            >
                              <span>
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                              </span>
                              <span>Logout</span>
                            </span>
                          </li>
                        </Fragment>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Login Modal Button */
                  <div
                    onClick={(e) => loginModalOpen()}
                    className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg"
                    title="Login"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 hover:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                )}

              </div>

              {/* Cart Modal Button - Visible on all screens */}
              <div
                onClick={(e) => cartModalOpen()}
                className="hover:bg-gray-200 p-2 rounded-lg relative cursor-pointer transition-colors duration-200"
                title="Cart"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13"
                  />
                  <circle cx="9" cy="20" r="1"/>
                  <circle cx="20" cy="20" r="1"/>
                </svg>
                {cartCount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[16px] shadow-lg border border-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden">
              <svg
                onClick={(e) => navberToggleOpen()}
                className="w-8 h-8 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>

        {/* Mobile Navigation Menu */}
        <div
          className={
            data.navberHamburger && data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">
            <span
              className={`font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-gray-800 text-white"
                  : "hover:text-gray-800 hover:bg-gray-200"
              }`}
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            <span
              className={`font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/services"
                  ? "bg-gray-800 text-white"
                  : "hover:text-gray-800 hover:bg-gray-200"
              }`}
              onClick={(e) => history.push("/services")}
            >
              Services
            </span>
            <span
              className={`font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/insurances"
                  ? "bg-gray-800 text-white"
                  : "hover:text-gray-800 hover:bg-gray-200"
              }`}
              onClick={(e) => history.push("/insurances")}
            >
              Insurances
            </span>
            <span
              className={`font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/blog"
                  ? "bg-gray-800 text-white"
                  : "hover:text-gray-800 hover:bg-gray-200"
              }`}
              onClick={(e) => history.push("/blog")}
            >
              Blog
            </span>
            <span
              className={`font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/about"
                  ? "bg-gray-800 text-white"
                  : "hover:text-gray-800 hover:bg-gray-200"
              }`}
              onClick={(e) => history.push("/about")}
            >
              About
            </span>
            <span
              className={`font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/contact-us"
                  ? "bg-gray-800 text-white"
                  : "hover:text-gray-800 hover:bg-gray-200"
              }`}
              onClick={(e) => history.push("/contact-us")}
            >
              Contact us
            </span>

            {/* Mobile-specific Call Now button */}
            <a
              href="tel:+12345678900"
              className="font-semibold text-lg tracking-widest px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:text-gray-800 hover:bg-gray-200 flex items-center space-x-2 bg-green-100 text-green-800 border border-green-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now</span>
            </a>
          </div>
        </div>
        </div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;
