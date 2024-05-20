import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//api
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.save-cook.com/crawler/promoFeed.php?",
  }),
  endpoints: (builder) => ({
    getFeed: builder.query({
      query: () => ({
        url: "auchan=1&continente=1&intermarche=1&minipreco=1&pingodoce=1",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFeedQuery } = api;
