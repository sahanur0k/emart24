import Home from "./home";
import WishList from "./wishlist";
import Services from "./services";
import Insurances from "./insurances";
import Contact from "./contact";
import About from "./about";
import Blogs from "./blogs";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import EmployeeProtectedRoute from "./auth/EmployeeProtectedRoute";
import AdminOrEmployeeProtectedRoute from "./auth/AdminOrEmployeeProtectedRoute";
import CartProtectedRoute from "./auth/CartProtectedRoute";
import { LayoutContext } from "./layout";
import { layoutState, layoutReducer } from "./layout/layoutContext";
import { isAdmin, isAuthenticate } from "./auth/fetchApi";
import PageNotFound from "./layout/PageNotFound";
import ProductDetails from "./productDetails";
import ProductByCategory from "./home/ProductByCategory";
import CheckoutPage from "./order/CheckoutPage";

export {
  Home,
  WishList,
  Services,
  Insurances,
  Contact,
  About,
  Blogs,
  ProtectedRoute,
  AdminProtectedRoute,
  EmployeeProtectedRoute,
  AdminOrEmployeeProtectedRoute,
  CartProtectedRoute,
  LayoutContext,
  layoutState,
  layoutReducer,
  isAdmin,
  isAuthenticate,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
};
