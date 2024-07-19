import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (obj) => ({
        url: `${CATEGORY_URL}/${obj.eventId}/create`,
        body: obj.formData,
        method: "POST",
      }),
    }),
    getAllCategories: builder.query({
      query: (eventId) => `${CATEGORY_URL}/${eventId}/getAll`,
    }),
    getAll: builder.query({
      query: () => `${CATEGORY_URL}`,
    }),
    getCategoryById: builder.query({
      query: (obj) => `${CATEGORY_URL}/${obj.eventId}/${obj.categoryId}`,
    }),
    deleteCategoryById: builder.mutation({
      query: (obj) => ({
        url: `${CATEGORY_URL}/${obj.eventId}/${obj.categoryId}`,
        method: "DELETE",
      }),
    }),
    updateCategoryById: builder.mutation({
      query: (obj) => ({
        url: `${CATEGORY_URL}/${obj.eventId}/${obj.categoryId}`,
        body: obj.formData,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetAllQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryByIdMutation,
  useUpdateCategoryByIdMutation,
} = categoryApiSlice;
