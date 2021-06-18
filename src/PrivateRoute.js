import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => 
          localStorage.getItem("UsersLogin") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
