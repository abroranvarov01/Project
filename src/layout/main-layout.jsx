import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loadState } from "../config/storage";

const ProtectedRoute = () => {
  const user = loadState("user");
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
