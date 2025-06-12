import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main style={{ padding: "2rem" }}>
      <Outlet />
    </main>
  );
}
