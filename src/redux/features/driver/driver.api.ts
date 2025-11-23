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
      invalidatesTags: ["DRIVER", "RIDES"],
    }),
    rejectRide: builder.mutation({
      query: (rideId) => ({
        url: `/drivers/reject/${rideId}`,
        method: "POST",
      }),
      invalidatesTags: ["DRIVER", "RIDES"],
    }),
    getAllDrivers: builder.query({
      query: () => ({
        url: "/drivers/all-drivers",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DRIVER"],
    }),
    isDriver: builder.query({
      query: () => ({
        url: "/drivers/is-driver",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DRIVER"],
    }),
    getDriverEarnings: builder.query({
      query: () => ({
        url: "/drivers/earnings",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DRIVER"],
    }),
    getActiveRides: builder.query({
      query: () => ({
        url: "/rides/active-rides",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DRIVER", "RIDES"],
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
  useGetActiveRidesQuery,
  useRejectRideMutation,
} = driverApi;
