import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import AdminLogin from "../Auth/AdminLogin";
import Signup from "../Auth/Signup";
import AdminSignup from "../Auth/AdminSignup";
import ForgotPassword from "../Auth/ForgotPassword";
import MobileNumberLogin from "../Auth/MobileNumberLogin";
import DefaultLayout from "../Layout/DefaultLayout";
import Intro from "../Component/Pages/Intro/Intro";
import NotFound from "../Component/Pages/NotFound/NotFound";
import Upload from "../Component/Pages/Upload/Upload";
import Outro from "../Component/Pages/Outro/Outro";
import Input from "../Component/Pages/Input/Input";
import Trailer from "../Component/Pages/Trailer/Trailer";
import Rating from "../Component/Pages/Rating/Rating";
// import DashboardLayout from "../Layout/DashboardLayout";
// import Home from "../Pages/home/Home"
// import Users from "../Pages/users/Users"
// import User from "../Pages/user/User"
import "../Pages/styles/global.scss"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
  },
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "phone-login",
        element: <MobileNumberLogin />,
      },
      {
        path: "adminsignup",
        element: <AdminSignup />,
      },
      {
        path: "adminlogin",
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "Intro",
        element: <Intro />,
      },
      {
        path: "Upload",
        element: <Upload />,
      },
      {
        path: "Outro",
        element: <Outro />,
      },
      {
        path: "Rating",
        element: <Rating />,
      },
      {
        path: "Input",
        element: <Input />,
      },
      {
        path: "Trailer",
        element: <Trailer />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       path: "home",
  //         element: <Home />,
  //     },
  //     {
  //       path: "users",
  //       element: <Users />,
  //     },
  //     {
  //       path: "users/:id",
  //       element: <User />,
  //     },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);
export default routes;
