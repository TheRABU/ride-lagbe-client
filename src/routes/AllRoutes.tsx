import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/homepage/Home";
import Root from "../layouts/Root";
import AuthLayout from "@/layouts/AuthLayout";
import SignUp from "@/pages/sign-up/SignUp";
import SignIn from "@/pages/sign-in/SignIn";
import DashboardLayout from "@/layouts/DashboardLayout";
import UserDashboard from "@/pages/dashboard/user-dashboard/UserDashboard";

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
  ]);

  return <RouterProvider router={routes} />;
};

export default AllRoutes;
