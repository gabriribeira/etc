import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemsData from '../data/items.json'; // Importing the items from the JSON file for fallback

// Async thunk to fetch items for a specific list
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (listId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/items?list_id=${listId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add item to server
export const addItem = createAsyncThunk(
  'items/addItem',
  async (newItem, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete item from server
export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: itemsData, // Initialize with the imported JSON data
    status: 'idle',
    error: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    // Fallback action to delete item from local state
    deleteItemLocally: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Fallback to delete item locally
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      });
  },
});

export const { setItems, deleteItemLocally } = itemsSlice.actions;

export default itemsSlice.reducer;
