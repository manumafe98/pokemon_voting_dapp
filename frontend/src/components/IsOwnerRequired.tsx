import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const IsOwnerRequired = () => {
  const { isOwner, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return <div className="bg-background h-screen">Loading...</div>;
  }

  return isOwner ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
