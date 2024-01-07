import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const rootReducer = {
};

const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export { store };
