import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
