// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //eslint-disable-next-line
    baseUrl: "http://localhost:3001/api",
    //baseUrl: "https://etc-app.com/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    checkAuth: builder.query({
      query: (credentials) => ({
        url: "/auth/checkAuth",
        method: "GET",
        body: credentials,
      }),
    }),
    googleAuth: builder.query({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
    googleAuthCallback: builder.mutation({
      query: (code) => ({
        url: `/auth/google/callback?code=${code}`,
        method: "GET",
      }),
    }),
    facebookAuth: builder.query({
      query: () => ({
        url: "/auth/facebook",
        method: "GET",
      }),
    }),
    facebookAuthCallback: builder.mutation({
      query: (code) => ({
        url: `/auth/facebook/callback?code=${code}`,
        method: "GET",
      }),
    }),
    getHouseholdLists: builder.query({
      query: () => "/lists/household",
    }),
    createList: builder.mutation({
      query: (listData) => ({
        url: "/lists",
        method: "POST",
        body: listData,
      }),
    }),
    getList: builder.query({
      query: (listId) => `/lists/${listId}`,
    }),
    getListItems: builder.query({
      query: (listId) => `/lists/${listId}/items`,
    }),
    lockList: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}/lock`,
        method: "PATCH",
      }),
    }),
    unlockList: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}/unlock`,
        method: "PATCH",
      }),
    }),
    estimateListValue: builder.mutation({
      query: (listId) => ({
        url: `/lists/${listId}/estimate-value`,
        method: 'POST',
      }),
    }),
    getItem: builder.query({
      query: (id) => `/items/${id}`,
    }),
    addItem: builder.mutation({
      query: (newItem) => ({
        url: `/items`,
        method: "POST",
        body: newItem,
      }),
    }),
    updateItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
    }),
    getHousehold: builder.query({
      query: () => "/households/auth/household",
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getUserHouseholds: builder.query({
      query: (userId) => `/users/households/${userId}`,
    }),
    switchHousehold: builder.mutation({
      query: (householdId) => ({
        url: `/households/switch`,
        method: "POST",
        body: { householdId },
      }),
    }),
    createListFromRecipe: builder.mutation({
      query: (listData) => ({
        url: "/lists/recipe",
        method: "POST",
        body: listData,
      }),
    }),
    createListFromEvent: builder.mutation({
      query: (listData) => ({
        url: "/lists/event",
        method: "POST",
        body: listData,
      }),
    }),
    createExpense: builder.mutation({
      query: (newExpense) => ({
        url: "/expenses",
        method: "POST",
        body: newExpense,
      }),
    }),
    getExpenses: builder.query({
      query: () => "/expenses",
    }),
    getExpense: builder.query({
      query: (id) => `/expenses/${id}`,
    }),
    searchProducts: builder.query({
      query: (name) => `/products/search?name=${name}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckAuthQuery,
  useGoogleAuthQuery,
  useGoogleAuthCallbackMutation,
  useFacebookAuthQuery,
  useFacebookAuthCallbackMutation,
  useGetHouseholdListsQuery,
  useCreateListMutation,
  useGetListQuery,
  useGetListItemsQuery,
  useLockListMutation,
  useUnlockListMutation,
  useEstimateListValueMutation,
  useGetItemQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetHouseholdQuery,
  useGetUserQuery,
  useGetUserHouseholdsQuery,
  useSwitchHouseholdMutation,
  useCreateListFromRecipeMutation,
  useCreateListFromEventMutation,
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useGetExpenseQuery,
  useSearchProductsQuery,
} = api;
export default api;
