import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/homepage/Home";
import Root from "../layouts/Root";
import AuthLayout from "@/layouts/AuthLayout";
import SignUp from "@/pages/sign-up/SignUp";
import SignIn from "@/pages/sign-in/SignIn";
import DashboardLayout from "@/layouts/DashboardLayout";
import UserDashboard from "@/pages/dashboard/user-dashboard/UserDashboard";
import RideLayout from "@/layouts/RideLayout";
import RideMap from "@/pages/ride/RideMap";
import CreateProfile from "@/pages/driver/CreateProfile";

const AllRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/driver/create",
          element: <CreateProfile />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/sign-up",
          element: <SignUp />,
        },
        {
          path: "/auth/login",
          element: <SignIn />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard/user",
          element: <UserDashboard />,
        },
      ],
    },
    {
      path: "ride",
      element: <RideLayout />,
      children: [
        {
          path: "/ride/request",
          element: <RideMap />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AllRoutes;
