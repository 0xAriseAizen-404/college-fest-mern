import { apiSlice } from "./apiSlice";
import { NON_TECHNICAL_CATEGORY_URL } from "../constants";

export const nonTechnicalCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNonTechnicalCategory: builder.mutation({
      query: (data) => ({
        url: `${NON_TECHNICAL_CATEGORY_URL}/`,
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateNonTechnicalCategoryMutation } =
  nonTechnicalCategoryApiSlice;
