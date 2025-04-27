import { getSigner } from "@/hooks/getSigner";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const IsOwnerRequired = () => {
  const { isOwner } = getSigner();
  const location = useLocation();

  return isOwner ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
