import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate, isEmployee } from "./fetchApi";

const EmployeeProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isEmployee() && isAuthenticate() ? (
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

export default EmployeeProtectedRoute;
