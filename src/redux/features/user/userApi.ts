import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUpdateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateProfile: builder.mutation({
      query: ({ email, ...data }) => ({
        url: `/users/profile/${email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    getMyProfile: builder.query({
      query: ({ email }) => ({
        url: `/users/profile/${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateProfileMutation,
  useGetMyProfileQuery,
} = userApi;
