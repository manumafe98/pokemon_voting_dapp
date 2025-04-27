import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const IsOwnerRequired = () => {
  const { isOwner } = useAuth();
  const location = useLocation();

  return isOwner ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
