import { apiSlice } from "./apiSlice";
import { TECHNICAL_CATEGORY_URL } from "../constants";

export const technicalCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTechnicalCategory: builder.mutation({
      query: (data) => ({
        url: `${TECHNICAL_CATEGORY_URL}/`,
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateTechnicalCategoryMutation } = technicalCategoryApiSlice;
