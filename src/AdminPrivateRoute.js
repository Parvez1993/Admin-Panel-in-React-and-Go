import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "./contextapi";

function AdminPrivateRoute({ children, ...rest }) {
  const { user } = useUserContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminPrivateRoute;
