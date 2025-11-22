/* eslint-disable @typescript-eslint/no-explicit-any */
import ToggleSwitch from "@/components/ToggleSwitch";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import {
  useGetDriverEarningsQuery,
  useIsDriverQuery,
  useSetAvailabilityMutation,
} from "@/redux/features/driver/driver.api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const DriverDashboard = () => {
  const { data: driverData, isLoading: isLoadingDriver } =
    useIsDriverQuery(undefined);
  const { data: driverEarning } = useGetDriverEarningsQuery(undefined);
  const [logout] = useLogoutMutation();
  const [setAvailability, { isLoading: isSettingAvailability }] =
    useSetAvailabilityMutation();
  const navigate = useNavigate();

  // Local state to track current status
  const [currentStatus, setCurrentStatus] = useState<string>("OFFLINE");

  // Update local status when driver data loads
  useEffect(() => {
    if (driverData?.status) {
      setCurrentStatus(driverData.status);
    }
  }, [driverData]);

  const handleToggle = async (isActive: boolean) => {
    const newStatus = isActive ? "ONLINE" : "OFFLINE";

    try {
      const result = await setAvailability({ status: newStatus }).unwrap();

      // Update local state
      setCurrentStatus(newStatus);

      toast.success(`Status changed to ${newStatus}`);
      console.log("Availability updated:", result);
    } catch (error: any) {
      console.error("Error setting availability:", error);
      toast.error(error?.data?.message || "Failed to update availability");
    }
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Error at driver logout", error);
      toast.error(error?.data?.message || "Failed to logout");
    }
  };

  if (isLoadingDriver) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <input type="checkbox" id="menu-toggle" className="hidden peer" />

      {/* Sidebar */}
      <div className="hidden peer-checked:flex md:flex flex-col w-64 bg-gray-800 transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
          <span className="text-white font-bold uppercase">Sidebar</span>
          <label htmlFor="menu-toggle" className="text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Dashboard
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <label
              htmlFor="menu-toggle"
              className="md:hidden mr-4 bg-gray-800 text-white p-2 rounded focus:outline-none cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <h2 className="text-xl font-semibold">Driver Dashboard</h2>
          </div>
        </div>

        <div className="p-4 bg-[#F9F8F6]">
          <h1 className="text-2xl font-bold mb-6">
            Welcome to your dashboard,{" "}
            <span className="text-neutral-800 font-semibold">
              {driverData?.driver_name || "Driver"}
            </span>
          </h1>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto">
            {/* Earnings & Availability Card */}
            <div className="min-h-[350px] rounded-2xl bg-gradient-to-br from-green-300 to-green-400 border border-green-950 p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-neutral-900 font-semibold text-xl mb-2">
                  Earnings up until now
                </h2>
                <span className="text-3xl font-bold text-neutral-800">
                  ৳ {driverEarning || 0}
                </span>
              </div>

              <div className="border-t border-green-950/20 pt-4">
                <h3 className="text-neutral-900 font-semibold text-lg mb-4">
                  Availability Status
                </h3>

                <div className="flex items-center justify-between bg-white/50 rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-700 mb-1">
                      Current Status
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        currentStatus === "ONLINE"
                          ? "text-green-700"
                          : "text-gray-600"
                      }`}
                    >
                      {currentStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <ToggleSwitch
                      onToggle={handleToggle}
                      defaultChecked={currentStatus === "ONLINE"}
                      disabled={isSettingAvailability}
                    />
                    {isSettingAvailability && (
                      <div className="animate-spin h-5 w-5 border-2 border-green-700 border-t-transparent rounded-full" />
                    )}
                  </div>
                </div>

                <p className="text-sm text-neutral-700 mt-3">
                  Toggle to change your availability status
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="min-h-[350px] rounded-2xl bg-gradient-to-br from-blue-300 to-blue-400 p-6 shadow-xl">
              <h2 className="text-neutral-900 font-semibold text-xl mb-4">
                Driver Statistics
              </h2>
              <div className="space-y-3">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Email</p>
                  <p className="font-semibold">{driverData?.driver_email}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">NID</p>
                  <p className="font-semibold">{driverData?.driver_nid}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Vehicle</p>
                  <p className="font-semibold">
                    {driverData?.vehicle?.model} ({driverData?.vehicle?.color})
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Cards */}
            <div className="min-h-[350px] rounded-2xl bg-gradient-to-br from-pink-300 to-pink-400 p-6 shadow-xl">
              <h2 className="text-neutral-900 font-semibold text-xl">
                Recent Rides
              </h2>
              <p className="text-neutral-700 mt-2">Coming soon...</p>
            </div>

            <div className="min-h-[350px] rounded-2xl bg-gradient-to-br from-orange-300 to-orange-400 p-6 shadow-xl">
              <h2 className="text-neutral-900 font-semibold text-xl">
                Ratings & Reviews
              </h2>
              <p className="text-neutral-700 mt-2">Coming soon...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
