import { baseApi } from "@/redux/baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDriverProfile: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/create",
        method: "POST",
        body: driverInfo,
      }),
      invalidatesTags: ["DRIVER"],
    }),
    setAvailability: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/availability",
        method: "PATCH",
        body: driverInfo,
      }),
      invalidatesTags: ["DRIVER"],
    }),
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/drivers/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    getAllDrivers: builder.query({
      query: () => ({
        url: "/drivers/all-drivers",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    isDriver: builder.query({
      query: () => ({
        url: "/drivers/is-driver",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getDriverEarnings: builder.query({
      query: () => ({
        url: "/drivers/earnings",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateDriverProfileMutation,
  useSetAvailabilityMutation,
  useAcceptRideMutation,
  useGetAllDriversQuery,
  useIsDriverQuery,
  useGetDriverEarningsQuery,
} = driverApi;
