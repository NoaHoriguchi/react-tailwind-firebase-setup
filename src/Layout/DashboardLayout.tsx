import React from "react";
import Navbar from "../Pages/components/navbar/Navbar";
import Menu from "../Pages/components/menu/Menu";
import Footer from "../Pages/components/footer/Footer";
import { Navigate, Outlet } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function DashboardLayout() {
  const token: any = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <>
          <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default DashboardLayout;
