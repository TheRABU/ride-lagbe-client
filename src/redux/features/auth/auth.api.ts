import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Reset the auth state
          dispatch(baseApi.util.resetApiState());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    // userInfo: builder.query({
    //   query: () => ({
    //     url: "/user/me",
    //   }),
    // }),
    isUserLoggedIn: builder.query({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["USER"],
      // Don't refetch on mount/focus if we know user is logged out
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useIsUserLoggedInQuery,
} = authApi;
