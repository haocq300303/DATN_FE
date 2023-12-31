import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postSlice";
import commentReducer from "./Slices/commentSlide";
import bannerSlice from "./Slices/bannerSlice";
import serviceSlice from "./Slices/serviceSlice";
import navbar from "./Slices/navbarSlice";
import locationReducer from "./Slices/locationSlice";
import childrenPitchReducer from "./Slices/childrentPitch";
import pitchReducer from "./Slices/pitchSlice";
import paymentApi from "./payment/paymentApi";
import bookingApi from "./booking/bookingApi";
import shift from "./Slices/shift";

const store = configureStore({
  reducer: {
    [paymentApi.reducerPath]: paymentApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    navbar,
    banner: bannerSlice,
    service: serviceSlice,
    shift: shift, 
    post: postReducer,
    comment: commentReducer,
    location: locationReducer,
    pitch: pitchReducer,
    childrenPitch: childrenPitchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([paymentApi.middleware, bookingApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
