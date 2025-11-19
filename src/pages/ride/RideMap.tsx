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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRequestRideMutation } from "@/redux/features/rides/ride.api";
import { toast } from "react-toastify";

// Fix Leaflet marker icons
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

  // Reverse geocoding

  /*
    this is to get the location's latitude and longitude and get real time name of that place
  */
  const getLocationName = async (lat: number, lng: number) => {
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

  // Get user’s current location
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
        alert("Unable to get your location.");
      }
    );
  }, []);

  // Handle map clicks
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

  // Request ride handler
  const handleRequestRide = async () => {
    if (!pickup || !destination) {
      alert("Please select both pickup and destination points.");
      return;
    }

    setLoading(true);
    try {
      // const token = localStorage.getItem("accessToken");
      // const res = await axios.post(
      //   "http://localhost:5000/api/v1/rides/request",
      //   {
      //     pickupLatitude: pickup.lat,
      //     pickupLongitude: pickup.lng,
      //     destLatitude: destination.lat,
      //     destLongitude: destination.lng,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const rideInfo = {
        pickupLatitude: pickup.lat,
        pickupLongitude: pickup.lng,
        destLatitude: destination.lat,
        destLongitude: destination.lng,
      };
      const result = await requestRide(rideInfo).unwrap();

      console.log("result from ride made:", result.data);

      if (result?.data?.statusCode === 201) {
        alert("Ride requested successfully!");
      }
    } catch (error: any) {
      console.error(error);
      if (error.data) {
        // Backend sent a structured error response
        toast.error(error.data.message || "Failed to request ride");
      } else if (error.message) {
        // Network or other error
        toast.error(error.data.message);
      } else {
        toast.error("Failed to request ride");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-auto md:h-screen w-full overflow-hidden relative">
        {/* LEFT SIDE: MAP (60%) */}
        <div className="w-full md:w-[60%] p-4 md:p-5 flex justify-center items-center">
          {pickup ? (
            <div className="w-full h-[350px] sm:h-[400px] md:h-[90vh] rounded-2xl overflow-hidden">
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
                  <Popup>{pickupName || "Pickup location"}</Popup>
                </Marker>

                {/* Destination Marker */}
                {destination && (
                  <Marker position={destination}>
                    <Popup>{destinationName || "Destination"}</Popup>
                  </Marker>
                )}

                <DestinationMarker />
              </MapContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[350px] sm:h-[400px] md:h-[90vh] text-gray-500">
              Getting your location...
            </div>
          )}
        </div>

        {/* RIGHT SIDE: DETAILS (40%) */}
        <div className="w-full md:w-[40%] flex flex-col justify-start items-center p-4 md:p-8">
          <div className="w-full bg-[#313647] rounded-lg p-5 md:p-7 space-y-3 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-3">
              Request a Ride
            </h2>

            <div>
              {pickup ? (
                <p className="text-sm text-slate-50 mb-2 break-words">
                  <strong>Pickup:</strong> <br />
                  {pickupName ||
                    `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}`}
                </p>
              ) : (
                <p className="text-sm text-slate-50 mb-2">
                  Pickup not detected yet
                </p>
              )}
            </div>

            <div>
              {destination ? (
                <p className="text-sm text-slate-50 break-words">
                  <strong>Destination:</strong> <br />
                  {destinationName ||
                    `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(
                      4
                    )}`}
                </p>
              ) : (
                <p className="text-sm text-slate-50">
                  Click on the map to set destination
                </p>
              )}
            </div>

            <button
              onClick={handleRequestRide}
              disabled={loading}
              className="bg-[#435663] text-white font-medium w-full px-6 py-3 rounded-lg shadow-md hover:bg-[#A3B087] transition disabled:bg-gray-400"
            >
              {loading ? "Requesting..." : "Request Ride"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RideMap;
