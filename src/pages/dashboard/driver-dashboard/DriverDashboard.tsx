/* eslint-disable @typescript-eslint/no-explicit-any */
import ToggleSwitch from "@/components/ToggleSwitch";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import {
  useAcceptRideMutation,
  useGetActiveRidesQuery,
  useGetDriverEarningsQuery,
  useIsDriverQuery,
  useRejectRideMutation,
  useSetAvailabilityMutation,
} from "@/redux/features/driver/driver.api";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface ActiveRide {
  _id: string;
  pickup_location: {
    type: string;
    coordinates: [number, number];
  };
  destination: {
    type: string;
    coordinates: [number, number];
  };
  trip_fare: number;
  duration: number;
  status: string;
  user_id: string;
}

const DriverDashboard = () => {
  const { data: driverData, isLoading: isLoadingDriver } =
    useIsDriverQuery(undefined);
  const { data: driverEarning } = useGetDriverEarningsQuery(undefined);
  const [logout] = useLogoutMutation();
  const [setAvailability, { isLoading: isSettingAvailability }] =
    useSetAvailabilityMutation();
  const { data: activeRides, isLoading: isActiveRidesLoading } =
    useGetActiveRidesQuery(undefined);
  const [acceptRide, { isLoading: isAccepting }] = useAcceptRideMutation();
  const [rejectRide, { isLoading: isRejecting }] = useRejectRideMutation();

  const navigate = useNavigate();

  // Local state to track current status
  const [currentStatus, setCurrentStatus] = useState<string>("OFFLINE");
  const [processingRideId, setProcessingRideId] = useState<string | null>(null);

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
      setCurrentStatus(newStatus);
      toast.success(`Status changed to ${newStatus}`);
      console.log("Availability updated:", result);
    } catch (error: any) {
      console.error("Error setting availability:", error);
      toast.error(error?.data?.message || "Failed to update availability");
    }
  };

  const handleAcceptRide = async (rideId: string) => {
    setProcessingRideId(rideId);
    try {
      const result = await acceptRide(rideId).unwrap();
      toast.success("Ride accepted successfully!");
      console.log("Ride accepted:", result);
    } catch (error: any) {
      console.error("Error accepting ride:", error);
      toast.error(error?.data?.message || "Failed to accept ride");
    } finally {
      setProcessingRideId(null);
    }
  };

  const handleRejectRide = async (rideId: string) => {
    setProcessingRideId(rideId);
    try {
      const result = await rejectRide(rideId).unwrap();
      toast.info("Ride rejected");
      console.log("Ride rejected:", result);
    } catch (error: any) {
      console.error("Error rejecting ride:", error);
      toast.error(error?.data?.message || "Failed to reject ride");
    } finally {
      setProcessingRideId(null);
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

  // State to store location names
  const [locationNames, setLocationNames] = useState<{
    [key: string]: { pickup: string; destination: string };
  }>({});

  // Reverse geocoding to get location name from coordinates
  const getLocationName = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      return data.display_name || "Unknown location";
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return "Unknown location";
    }
  };

  // Fetch location names when activeRides changes
  useEffect(() => {
    const fetchLocationNames = async () => {
      if (!activeRides || activeRides.length === 0) return;

      const names: { [key: string]: { pickup: string; destination: string } } =
        {};

      for (const ride of activeRides) {
        const pickupCoords = ride.pickup_location.coordinates;
        const destCoords = ride.destination.coordinates;

        const pickupName = await getLocationName(
          pickupCoords[1],
          pickupCoords[0]
        );
        const destName = await getLocationName(destCoords[1], destCoords[0]);

        names[ride._id] = {
          pickup: pickupName,
          destination: destName,
        };
      }

      setLocationNames(names);
    };

    fetchLocationNames();
  }, [activeRides]);

  // Helper to get formatted location or fallback to coordinates
  //   const getLocationDisplay = (
  //     rideId: string,
  //     type: "pickup" | "destination",
  //     coords: [number, number]
  //   ) => {
  //     const name = locationNames[rideId]?.[type];
  //     if (name && name !== "Unknown location") {
  //       // Shorten long addresses
  //       const parts = name.split(",");
  //       return parts.slice(0, 3).join(",");
  //     }
  //     return `${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`;
  //   };

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
            <Link
              to="/"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>

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

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                  <p className="text-sm text-neutral-700">Name</p>
                  <p className="font-semibold">{driverData?.driver_name}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Email</p>
                  <p className="font-semibold text-sm break-all">
                    {driverData?.driver_email}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Vehicle</p>
                  <p className="font-semibold">
                    {driverData?.vehicle?.model} ({driverData?.vehicle?.color})
                  </p>
                  <p className="text-sm text-neutral-600">
                    {driverData?.vehicle?.licensePlate} •{" "}
                    {driverData?.vehicle?.year}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Active Rides Section */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-neutral-900">
                Available Rides
              </h2>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {activeRides?.length || 0} rides
              </span>
            </div>

            {isActiveRidesLoading ? (
              <div className="flex items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              </div>
            ) : activeRides && activeRides.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeRides.map((ride: ActiveRide) => (
                  <div
                    key={ride._id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300"
                  >
                    {/* Ride Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {ride.status}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ৳{ride.trip_fare}
                      </span>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-4 mb-6">
                      {/* Pickup Location */}
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium">
                            Pickup Location
                          </p>
                          <p className="text-sm text-gray-800 break-words">
                            {locationNames[ride._id]?.pickup || (
                              <span className="text-gray-400">
                                Loading address...
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>

                      {/* Destination */}
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium">
                            Destination
                          </p>
                          <p className="text-sm text-gray-800 break-words">
                            {locationNames[ride._id]?.destination || (
                              <span className="text-gray-400">
                                Loading address...
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Trip Duration */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">
                          Estimated Duration: {ride.duration} mins
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptRide(ride._id)}
                        disabled={
                          isAccepting ||
                          isRejecting ||
                          processingRideId === ride._id
                        }
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {processingRideId === ride._id && isAccepting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Accepting...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Accept
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleRejectRide(ride._id)}
                        disabled={
                          isAccepting ||
                          isRejecting ||
                          processingRideId === ride._id
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {processingRideId === ride._id && isRejecting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Rejecting...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Active Rides
                </h3>
                <p className="text-gray-500">
                  There are no ride requests available at the moment.
                  {currentStatus === "OFFLINE" && (
                    <span className="block mt-2 text-blue-600 font-semibold">
                      Set your status to ONLINE to receive ride requests!
                    </span>
                  )}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
