import React from "react";
import {
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
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders, Services as AdminServices, Insurances as AdminInsurances, UserAnalytics, Blogs as AdminBlogs } from "./admin";
import InsuranceClients from "./admin/insuranceClients";
import { UserProfile, UserOrders, SettingUser, UserSuperCoins } from "./shop/dashboardUser";
import RewardSection from "./admin/rewards/RewardSection";
import BlogDetail from "./shop/blogs/BlogDetail";
import EmployeeQueries from "./admin/productQueries/EmployeeQueries";
import AdminQueries from "./admin/productQueries/AdminQueries";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/insurances" component={Insurances} />
        <Route exact path="/contact-us" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/blog" component={Blogs} />
        <Route exact path="/blog/:id" component={BlogDetail} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route
          exact
          path="/products/category/:catId"
          component={ProductByCategory}
        />
        <CartProtectedRoute
          exact={true}
          path="/checkout"
          component={CheckoutPage}
        />
        {/* Shop & Public Routes End */}

        {/* Admin Routes - Now accessible by both Admin and Employee */}
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard/categories"
          component={Categories}
        />
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard/products"
          component={Products}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/orders"
          component={Orders}
        />
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard/services"
          component={AdminServices}
        />
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard/insurances"
          component={AdminInsurances}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/insurance-clients"
          component={InsuranceClients}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/rewards"
          component={RewardSection}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/user-analytics"
          component={UserAnalytics}
        />
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard/blogs"
          component={AdminBlogs}
        />
        <AdminOrEmployeeProtectedRoute
          exact={true}
          path="/admin/dashboard/employee-queries"
          component={EmployeeQueries}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/product-queries"
          component={AdminQueries}
        />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
        <ProtectedRoute
          exact={true}
          path="/user/orders"
          component={UserOrders}
        />
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />
        <ProtectedRoute
          exact={true}
          path="/user/super-coins"
          component={UserSuperCoins}
        />
        {/* User Dashboard End */}

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
