import { EVENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/create`,
        body: data,
        method: "POST",
      }),
    }),
    getAllEvents: builder.query({
      query: () => `${EVENT_URL}/getAll`,
    }),
    getAllParticipants: builder.query({
      query: () => `${EVENT_URL}/getAll/participants`,
    }),
    getEventById: builder.query({
      query: (id) => `${EVENT_URL}/${id}`,
    }),
    deleteEventById: builder.mutation({
      query: (id) => ({
        url: `${EVENT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateEventById: builder.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/${data.eventId}`,
        body: data.parsedData,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetAllParticipantsQuery,
  useGetEventByIdQuery,
  useDeleteEventByIdMutation,
  useUpdateEventByIdMutation,
} = eventApiSlice;
