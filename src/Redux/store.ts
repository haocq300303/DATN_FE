import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postSlice";
import commentReducer from "./Slices/commentSlide";
import bannerSlice from './Slices/bannerSlice';
import serviceSlice from "./Slices/serviceSlice";
import navbar from "./Slices/navbarSlice";
import menuReducer from "./Slices/menuSlice";

const store = configureStore({
  reducer: {
    navbar,
    menu: menuReducer,
    banner: bannerSlice,
    service: serviceSlice,
    post: postReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
