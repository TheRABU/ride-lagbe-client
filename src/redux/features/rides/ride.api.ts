import { baseApi } from "@/redux/baseApi";

interface RideInfo {
  pickupLatitude: number;
  pickupLongitude: number;
  destLatitude: number;
  destLongitude: number;
  _id?: string;
}

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        body: rideInfo,
      }),
      invalidatesTags: ["RIDES"],
    }),
    getMyRide: builder.query({
      query: () => ({
        url: "/rides/me",
        method: "GET",
      }),
      transformResponse: (response) => response.data, // backend returns { data: [...] }
      providesTags: (result) =>
        result
          ? [
              ...result.map((ride: RideInfo) => ({
                type: "RIDES",
                id: ride._id,
              })),
              { type: "RIDES", id: "LIST" },
            ]
          : [{ type: "RIDES", id: "LIST" }],
    }),
    deleteRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RIDES"],
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
