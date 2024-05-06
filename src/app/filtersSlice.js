import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appliedFilters: [], 
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter(state, action) {
      const filterToAdd = action.payload;
      // Se o filtro já estiver na lista, remove-o
      if (state.appliedFilters.includes(filterToAdd)) {
        state.appliedFilters = state.appliedFilters.filter(filter => filter !== filterToAdd);
      } else {
        // Se não, limpa a lista e adiciona o novo filtro
        state.appliedFilters = [filterToAdd];
      }
    },
    removeFilter(state, action) {
      const filterToRemove = action.payload;
      state.appliedFilters = state.appliedFilters.filter(filter => filter !== filterToRemove);
    },
    clearFilters(state) {
      state.appliedFilters = [];
    },
  },
});

export const { addFilter, removeFilter, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
