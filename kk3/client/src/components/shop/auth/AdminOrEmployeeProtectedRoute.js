import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate, isAdminOrEmployee } from "./fetchApi";

const AdminOrEmployeeProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdminOrEmployee() && isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminOrEmployeeProtectedRoute;
