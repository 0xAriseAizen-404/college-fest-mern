import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logInAdmin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        body: data,
        method: "POST",
      }),
    }),
    logOutAdmin: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/create`,
        body: data,
        method: "POST",
      }),
    }),
    getAllAdmins: builder.query({
      query: () => `${AUTH_URL}/`,
    }),
    deleteAdminById: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getCurrAdmin: builder.query({
      query: () => `${AUTH_URL}/me`,
    }),
  }),
});

export const {
  useLogInAdminMutation,
  useLogOutAdminMutation,
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useDeleteAdminByIdMutation,
  useGetCurrAdminQuery,
} = adminApiSlice;
