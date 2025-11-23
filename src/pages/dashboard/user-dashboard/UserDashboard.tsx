import { useIsUserLoggedInQuery } from "@/redux/features/auth/auth.api";
import {
  useDeleteRideMutation,
  useGetMyRideQuery,
} from "@/redux/features/rides/ride.api";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

interface MyRide {
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
  email: string;
  user_id: string;
  createdAt?: string;
}

const UserDashboard = () => {
  const {
    data: myRides,
    isLoading: isLoadingRides,
    isFetching,
  } = useGetMyRideQuery(undefined);
  const { data: isUserLoggedIn } = useIsUserLoggedInQuery(undefined);
  const [deleteRide, { isLoading: isDeleting }] = useDeleteRideMutation();

  const [locationNames, setLocationNames] = useState<{
    [key: string]: { pickup: string; destination: string };
  }>({});
  const [deletingRideId, setDeletingRideId] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchLocationNames = async () => {
      if (!myRides || myRides.length === 0) return;

      const names: { [key: string]: { pickup: string; destination: string } } =
        {};

      for (const ride of myRides) {
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
  }, [myRides]);

  const handleDeleteRide = async (rideId: string) => {
    if (!window.confirm("Are you sure you want to cancel this ride?")) return;

    setDeletingRideId(rideId);
    try {
      await deleteRide(rideId).unwrap();
      toast.success("Ride cancelled successfully!");
    } catch (error: any) {
      console.error("Error cancelling ride:", error);
      toast.error(error?.data?.message || "Failed to cancel ride");
    } finally {
      setDeletingRideId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "REQUESTED":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const shortenAddress = (address: string) => {
    if (!address || address === "Unknown location") return address;
    const parts = address.split(",");
    return parts.slice(0, 3).join(",");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800 rounded-2xl">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-2xl">
            <div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
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
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <Link
                to={"/"}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mr-2"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6l2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Home
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <h2 className="text-xl font-semibold">User Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4 mr-4">
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mr-1"
              >
                <path
                  fill="currentColor"
                  d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4"
                />
              </svg>
              <span className="font-bold">Logout</span>
            </a>
          </div>
        </div>

        <div className="p-4 h-auto">
          <h1 className="text-2xl font-bold mb-6">
            Welcome, {isUserLoggedIn?.data?.name || "User"}!
          </h1>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* User Statistics Card */}
            <div className="min-h-[350px] rounded-2xl bg-gradient-to-br from-blue-300 to-blue-400 p-6 shadow-xl">
              <h2 className="text-neutral-900 font-semibold text-xl mb-4">
                User Statistics
              </h2>
              <div className="space-y-3">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Name</p>
                  <p className="font-semibold">{isUserLoggedIn?.data?.name}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Email</p>
                  <p className="font-semibold text-sm break-all">
                    {isUserLoggedIn?.data?.email}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Account Status</p>
                  <p className="font-semibold">
                    {isUserLoggedIn?.data?.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Account Created</p>
                  <p className="text-sm font-semibold">
                    {isUserLoggedIn?.data?.createdAt &&
                      new Date(isUserLoggedIn.data.createdAt).toLocaleString(
                        "en-BD",
                        {
                          timeZone: "Asia/Dhaka",
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>

            {/* Ride Statistics Card */}
            <div className="min-h-[350px] rounded-2xl bg-gradient-to-br from-orange-300 to-orange-400 p-6 shadow-xl">
              <h2 className="text-neutral-900 font-semibold text-xl mb-4">
                Ride Statistics
              </h2>
              <div className="space-y-3">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Total Rides</p>
                  <p className="text-3xl font-bold">{myRides?.length || 0}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Requested</p>
                  <p className="text-2xl font-semibold">
                    {myRides?.filter((r) => r.status === "REQUESTED").length ||
                      0}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Completed</p>
                  <p className="text-2xl font-semibold">
                    {myRides?.filter((r) => r.status === "COMPLETED").length ||
                      0}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-neutral-700">Total Spent</p>
                  <p className="text-2xl font-semibold">
                    ৳
                    {myRides
                      ?.filter((r) => r.status === "COMPLETED")
                      .reduce((sum, r) => sum + r.trip_fare, 0) || 0}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* My Rides Section */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-neutral-900">My Rides</h2>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {myRides?.length || 0} rides
              </span>
            </div>

            {isLoadingRides || isFetching ? (
              <div className="flex items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              </div>
            ) : myRides && myRides.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {myRides.map((ride: MyRide) => (
                  <div
                    key={ride._id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300"
                  >
                    {/* Ride Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          ride.status
                        )}`}
                      >
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
                            {locationNames[ride._id]?.pickup ? (
                              shortenAddress(locationNames[ride._id].pickup)
                            ) : (
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
                            {locationNames[ride._id]?.destination ? (
                              shortenAddress(
                                locationNames[ride._id].destination
                              )
                            ) : (
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
                          Duration: {ride.duration} mins
                        </span>
                      </div>

                      {/* Created At */}
                      {ride.createdAt && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Requested:{" "}
                          {new Date(ride.createdAt).toLocaleString("en-BD", {
                            timeZone: "Asia/Dhaka",
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      )}
                    </div>

                    {/* Action Button - Only show for REQUESTED rides */}
                    {ride.status === "REQUESTED" && (
                      <button
                        onClick={() => handleDeleteRide(ride._id)}
                        disabled={isDeleting || deletingRideId === ride._id}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {deletingRideId === ride._id ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Cancelling...
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
                            Cancel Ride
                          </>
                        )}
                      </button>
                    )}
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
                  No Rides Yet
                </h3>
                <p className="text-gray-500 mb-4">
                  You haven't requested any rides yet. Start your journey now!
                </p>
                <Link
                  to="/"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Request a Ride
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
