import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  //로그인 상태가 아닐 경우 로그인 페이지로 이동
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
