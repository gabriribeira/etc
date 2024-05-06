import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import filterReducer from './filtersSlice';

const initialState = {
  appliedFilters: [], 
};

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filters: filterReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  preloadedState: initialState, 
});

export { store };
