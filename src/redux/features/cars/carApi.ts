import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    getAllCars: builder.query({
      query: ({ search, carType, location, pricePerHour, sort }) => {
        let queryString = `/cars?`;
        if (search) queryString += `searchTerm=${search}&`;
        if (carType) queryString += `carType=${carType}&`;
        if (location) queryString += `location=${location}&`;
        if (pricePerHour) queryString += `pricePerHour=${pricePerHour}&`;
        if (sort) queryString += `sort=${sort}`;
        return {
          method: "GET",
          url: queryString,
        };
      },
      providesTags: ["cars"],
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    updateCar: builder.mutation({
      query: ({ data, id }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    deletecar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
    returnCar: builder.mutation({
      query: (data) => ({
        url: "/cars/return",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useDeletecarMutation,
  useReturnCarMutation,
} = carApi;
