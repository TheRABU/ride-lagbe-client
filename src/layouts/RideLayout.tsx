import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const RideLayout = () => {
  return (
    <div className="bg-[#FAF7F0]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RideLayout;
