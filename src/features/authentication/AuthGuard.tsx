import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const authToken = Cookies.get("jwt");

  console.log(authToken);

  if (!authToken) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>; // Render children if authenticated
};

export default AuthGuard;
