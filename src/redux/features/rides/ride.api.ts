import { baseApi } from "@/redux/baseApi";

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        body: rideInfo,
      }),
    }),
  }),
});

export const { useRequestRideMutation } = rideApi;
