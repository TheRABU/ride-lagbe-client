import { baseApi } from "@/redux/baseApi";

// interface RideInfo {
//   pickupLatitude: number;
//   pickupLongitude: number;
//   destLatitude: number;
//   destLongitude: number;
// }

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        body: rideInfo,
      }),
      invalidatesTags: ["Rides"],
    }),
    getMyRide: builder.query({
      query: () => ({
        url: "/rides/me",
        method: "GET",
      }),
      providesTags: ["Rides"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useRequestRideMutation, useGetMyRideQuery } = rideApi;
