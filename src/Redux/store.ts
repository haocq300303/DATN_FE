import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postSlice";
import commentReducer from "./Slices/commentSlide";
import locationReducer from "./Slices/locationSlice";
import pitchReducer from "./Slices/pitchSlice";


const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
    location: locationReducer,
    pitch: pitchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
