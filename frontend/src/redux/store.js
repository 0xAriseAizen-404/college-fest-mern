import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
// import adminReducer from "./features/admin/adminSlice";
// import eventReducer from "./features/event/eventSlice";
// import categoryReducer from "./features/category/categorySlice";
import participantReducer from "./features/participant/participantSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // admin: adminReducer,
    // events: eventReducer,
    // categories: categoryReducer,
    participants: participantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
