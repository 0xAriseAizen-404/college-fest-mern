import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/create`,
        body: data,
        method: "POST",
      }),
    }),
    getAllCategories: builder.query({
      query: () => `${CATEGORY_URL}/getAll`,
    }),
    getCategoryById: builder.query({
      query: (id) => `${CATEGORY_URL}/${id}`,
    }),
    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategoryById: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        body: data,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryByIdMutation,
  useUpdateCategoryByIdMutation,
} = categoryApiSlice;
