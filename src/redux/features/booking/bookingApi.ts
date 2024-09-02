import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    getUpdateBookings: builder.mutation({
      query: ({ bookingId, ...data }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    getMyBooking: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    updateMyBooking: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    deleteMyBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings"],
    }),
    getAdminDashboardCount: builder.query({
      query: () => ({
        url: "/bookings/dashboard",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUpdateBookingsMutation,
  useGetMyBookingQuery,
  useUpdateMyBookingMutation,
  useDeleteMyBookingMutation,
  useGetAdminDashboardCountQuery,
} = bookingApi;
