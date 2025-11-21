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
      transformResponse: (response) => response.data, // your backend returns { data: [...] }
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map((ride) => ({
      //           type: "Rides",
      //           id: ride._id,
      //         })),
      //         { type: "Rides", id: "LIST" },
      //       ]
      //     : [{ type: "Rides", id: "LIST" }],
    }),
    deleteRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "DELETE",
      }),
      // invalidatesTags: (result, error, rideId) => {
      //   const deleted = result?.data?._id || rideId;

      //   return [
      //     { type: "Rides", id: deleted },
      //     { type: "Rides", id: "LIST" },
      //   ];
      // },
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRideQuery,
  useDeleteRideMutation,
} = rideApi;
