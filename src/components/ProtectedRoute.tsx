/* eslint-disable @typescript-eslint/no-unused-vars */
import { logout, TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }: {children: ReactNode, role: string}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && typeof role === "string" && role !== user.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }


  if (role && Array.isArray(role) && !role.includes(user.role as string)) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
