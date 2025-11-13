import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const RideLayout = () => {
  return (
    <div className="bg-[#F3F3E0]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RideLayout;
