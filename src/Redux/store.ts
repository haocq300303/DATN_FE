import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postSlice";
import commentReducer from "./Slices/commentSlide";
import locationReducer from "./Slices/locationSlice";
import pitchReducer from "./Slices/pitchSlice";
import paymentApi from "./payment/paymentApi";
import bookingApi from "./booking/bookingApi";

const store = configureStore({
  reducer: {
    [paymentApi.reducerPath]: paymentApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    post: postReducer,
    comment: commentReducer,
    location: locationReducer,
    pitch: pitchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([paymentApi.middleware, bookingApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
