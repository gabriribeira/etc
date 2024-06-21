// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
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
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: formData,
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

    deleteList: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}`,
        method: "DELETE",
      }),
    }),

    estimateListValue: builder.mutation({
      query: (listId) => ({
        url: `/lists/${listId}/estimate-value`,
        method: "POST",
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
    createHousehold: builder.mutation({
      query: (formData) => ({
        url: "/households",
        method: "POST",
        body: formData,
      }),
    }),
    addMembers: builder.mutation({
      query: ({ householdId, userIds }) => ({
        url: "/households/addMembers",
        method: "POST",
        body: { householdId, userIds },
      }),
    }),
    createRequest: builder.mutation({
      query: (request) => ({
        url: "/households/createRequest",
        method: "POST",
        body: request,
      }),
    }),
    updateRequestStatus: builder.mutation({
      query: (requestStatus) => ({
        url: "/households/updateRequestStatus",
        method: "POST",
        body: requestStatus,
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
    searchUsers: builder.query({
      query: (query) => `/users/search?query=${query}`,
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

    getTags: builder.query({
      query: () => `/tags`,
    }),

    addHouseholdTags: builder.mutation({
      query: ({ householdId, tags }) => ({
        url: `/households/${householdId}/tags`,
        method: "POST",
        body: { tags },
      }),
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    getProductsByCategory: builder.query({
      query: (categoryId) => `/products/category/${categoryId}`,
    }),

    searchHouseholds: builder.query({
      query: (query) => `/households/search?query=${query}`,
    }),
    createJoinRequest: builder.mutation({
      query: (request) => ({
        url: "/households/join",
        method: "POST",
        body: request,
      }),
    }),
    addUserSpecifications: builder.mutation({
      query: ({ userId, specifications }) => ({
        url: `/users/${userId}/specifications`,
        method: "POST",
        body: { specifications },
      }),
    }),
    getSpecifications: builder.query({
      query: () => `/specifications`,
    }),
    getUserSpecifications: builder.query({
      query: (userId) => `/users/${userId}/specifications`,
    }),
    updateHousehold: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/households/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getHouseholdTags: builder.query({
      query: (householdId) => `/households/${householdId}/tags`,
    }),
    getHouseholdUsers: builder.query({
      query: (householdId) => `/households/${householdId}/users`,
    }),
    updateHouseholdTags: builder.mutation({
      query: ({ householdId, tags }) => ({
        url: `/households/${householdId}/tags`,
        method: "PUT",
        body: { tags },
      }),
    }),
    assignGoalsToHousehold: builder.mutation({
      query: (assignment) => ({
        url: '/goals/assign',
        method: 'POST',
        body: assignment,
      }),
    }),
    getGoalsByTags: builder.query({
      query: (tagIds) => ({
        url: '/goals/by-tags',
        method: 'POST',
        body: { tagIds },
      }),
    }),
    getHouseholdGoals: builder.query({
      query: (householdId) => `/goals/household/${householdId}`,
    }),
    incrementGoal: builder.mutation({
      query: ({ householdGoalId, userId }) => ({
        url: `goals/increment`,
        method: 'POST',
        body: { householdGoalId, userId },
      }),
    }),
    getCompletedHouseholdGoals: builder.query({
      query: (householdId) => `/goals/${householdId}/completed-goals`,
    }),
    getHouseholdGoalProgress: builder.query({
      query: (householdGoalId) => `/goals/${householdGoalId}/progress`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
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
  useDeleteListMutation,
  useEstimateListValueMutation,
  useGetItemQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useCreateHouseholdMutation,
  useAddMembersMutation,
  useCreateRequestMutation,
  useUpdateRequestStatusMutation,
  useGetHouseholdQuery,
  useGetUserQuery,
  useGetUserHouseholdsQuery,
  useSearchUsersQuery,
  useSwitchHouseholdMutation,
  useCreateListFromRecipeMutation,
  useCreateListFromEventMutation,
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useGetExpenseQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetTagsQuery,
  useAddHouseholdTagsMutation,
  useSearchHouseholdsQuery,
  useCreateJoinRequestMutation,
  useAddUserSpecificationsMutation,
  useGetSpecificationsQuery,
  useGetUserSpecificationsQuery,
  useUpdateHouseholdMutation,
  useGetHouseholdTagsQuery,
  useGetHouseholdUsersQuery,
  useUpdateHouseholdTagsMutation,
  useAssignGoalsToHouseholdMutation,
  useGetGoalsByTagsQuery,
  useGetHouseholdGoalsQuery,
  useIncrementGoalMutation,
  useGetCompletedHouseholdGoalsQuery,
  useLazyGetHouseholdGoalProgressQuery,
} = api;
export default api;
