import { baseApi } from "@/redux/baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDriverProfile: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/create",
        method: "POST",
        body: driverInfo,
      }),
      invalidatesTags: ["Driver"],
    }),
    setAvailability: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/availability",
        method: "PATCH",
        body: driverInfo,
      }),
      invalidatesTags: ["Driver"],
    }),
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/drivers/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const {
  useCreateDriverProfileMutation,
  useSetAvailabilityMutation,
  useAcceptRideMutation,
} = driverApi;
