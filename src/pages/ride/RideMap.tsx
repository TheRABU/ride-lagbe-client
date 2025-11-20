/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetMyRideQuery,
  useRequestRideMutation,
} from "@/redux/features/rides/ride.api";

// Fix Leaflet marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface Coordinates {
  lat: number;
  lng: number;
}

const RideMap: React.FC = () => {
  const [pickup, setPickup] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [pickupName, setPickupName] = useState<string>("");
  const [destinationName, setDestinationName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [requestRide] = useRequestRideMutation();
  const { data, isLoading: isLoadingRides } = useGetMyRideQuery(undefined);

  // Reverse geocoding to get location name from coordinates
  const getLocationName = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
        }
      );
      return res.data.display_name || "Unknown location";
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return "Unknown location";
    }
  };

  // Get user's current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPickup(coords);
        const name = await getLocationName(coords.lat, coords.lng);
        setPickupName(name);
      },
      (err) => {
        console.error("Error getting location:", err);
        toast.error(
          "Unable to get your location. Please enable location access."
        );
      }
    );
  }, []);

  // Handle map clicks to set destination
  const DestinationMarker: React.FC = () => {
    useMapEvents({
      async click(e) {
        const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
        setDestination(coords);
        const name = await getLocationName(coords.lat, coords.lng);
        setDestinationName(name);
      },
    });
    return null;
  };

  // Request ride handler with proper error handling
  const handleRequestRide = async () => {
    if (!pickup || !destination) {
      toast.error("Please select both pickup and destination points.");
      return;
    }

    setLoading(true);

    const rideInfo = {
      pickupLatitude: pickup.lat,
      pickupLongitude: pickup.lng,
      destLatitude: destination.lat,
      destLongitude: destination.lng,
    };

    const result = await requestRide(rideInfo);

    setLoading(false);

    if ("error" in result) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = result.error as any;

      console.error("Error requesting ride:", error);

      if (error.data?.message) {
        toast.error(error.data.message);
      } else if (error.status === "FETCH_ERROR") {
        toast.error("Network error. Please check your connection.");
      } else if (error.status === 401) {
        toast.error("Please login to request a ride.");
      } else {
        toast.error("Failed to request ride. Please try again.");
      }
    } else {
      // Success case
      console.log("Ride requested successfully:", result.data);
      toast.success("Ride requested successfully!");

      // Clear destination after successful request
      setDestination(null);
      setDestinationName("");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-auto md:h-screen w-full overflow-hidden relative">
        {/* LEFT SIDE: MAP (60%) */}
        <div className="w-full md:w-[60%] p-4 md:p-5 flex justify-center items-center">
          {pickup ? (
            <div className="w-full h-[350px] sm:h-[400px] md:h-[90vh] rounded-2xl overflow-hidden shadow-lg">
              <MapContainer
                center={pickup}
                zoom={13}
                scrollWheelZoom
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />

                {/* Pickup Marker */}
                <Marker position={pickup}>
                  <Popup>
                    <strong>Pickup Location</strong>
                    <br />
                    {pickupName || "Your location"}
                  </Popup>
                </Marker>

                {/* Destination Marker */}
                {destination && (
                  <Marker position={destination}>
                    <Popup>
                      <strong>Destination</strong>
                      <br />
                      {destinationName || "Selected destination"}
                    </Popup>
                  </Marker>
                )}

                <DestinationMarker />
              </MapContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[350px] sm:h-[400px] md:h-[90vh] text-gray-500">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p>Getting your location...</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: DETAILS (40%) */}
        <div className="w-full md:w-[40%] flex flex-col justify-start items-center p-4 md:p-8 overflow-y-auto">
          {/* Request Ride Card */}
          <div className="w-full bg-[#313647] rounded-lg p-5 md:p-7 space-y-4 shadow-lg mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-3">
              Request a Ride
            </h2>

            {/* Pickup Location */}
            <div className="bg-[#3d4354] rounded-lg p-3">
              {pickup ? (
                <div>
                  <p className="text-xs text-slate-400 mb-1">PICKUP LOCATION</p>
                  <p className="text-sm text-slate-50 break-words">
                    {pickupName ||
                      `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}`}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  Detecting pickup location...
                </p>
              )}
            </div>

            {/* Destination Location */}
            <div className="bg-[#3d4354] rounded-lg p-3">
              {destination ? (
                <div>
                  <p className="text-xs text-slate-400 mb-1">DESTINATION</p>
                  <p className="text-sm text-slate-50 break-words">
                    {destinationName ||
                      `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(
                        4
                      )}`}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-slate-400 mb-1">DESTINATION</p>
                  <p className="text-sm text-slate-400">
                    Click on the map to set destination
                  </p>
                </div>
              )}
            </div>

            {/* Request Button */}
            <button
              onClick={handleRequestRide}
              disabled={loading || !pickup || !destination}
              className="bg-[#435663] text-white font-medium w-full px-6 py-3 rounded-lg shadow-md hover:bg-[#A3B087] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Requesting...
                </span>
              ) : (
                "Request Ride"
              )}
            </button>
          </div>

          {/* My Rides Section */}
          {isLoadingRides ? (
            <div className="w-full bg-[#313647] rounded-lg p-5 text-center text-slate-400">
              Loading your rides...
            </div>
          ) : data && data.length > 0 ? (
            <div className="w-full bg-[#313647] rounded-lg p-5">
              <h3 className="text-lg font-semibold text-slate-50 mb-3">
                My Recent Rides
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {data.map((ride: any, index: number) => (
                  <div
                    key={ride._id || index}
                    className="bg-[#3d4354] rounded p-3 text-sm"
                  >
                    <p className="text-slate-50">
                      <strong>Status:</strong> {ride.status}
                    </p>
                    {ride.trip_fare && (
                      <p className="text-slate-50">
                        <strong>Fare:</strong> ${ride.trip_fare}
                      </p>
                    )}
                    {ride.duration && (
                      <p className="text-slate-400">
                        Duration: {ride.duration} mins
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RideMap;
