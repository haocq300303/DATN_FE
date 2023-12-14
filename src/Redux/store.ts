import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postSlice";
import commentReducer from "./Slices/commentSlide";
import bannerSlice from "./Slices/bannerSlice";
import serviceReducer from "./Slices/serviceSlice";
import navbar from "./Slices/navbarSlice";
import locationReducer from "./Slices/locationSlice";
import childrenPitchReducer from "./Slices/childrentPitch";
import pitchReducer from "./Slices/pitchSlice";
import paymentApi from "./payment/paymentApi";
import bookingApi from "./booking/bookingApi";
import shiftReducer from "./Slices/shiftSlice";
import shiftApi from "./shift/shift.api";
import pitchApi from "./pitch/pitch.api";
import feedbackReducer from "./Slices/feedbackSlice";
import serviceApi from "./service/service.api";
import userReducer from './Slices/userSlice';
const store = configureStore({
    reducer: {
        [paymentApi.reducerPath]: paymentApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [shiftApi.reducerPath]: shiftApi.reducer,
        [pitchApi.reducerPath]: pitchApi.reducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
        navbar,
        banner: bannerSlice,
        service: serviceReducer,
        user: userReducer,
        post: postReducer,
        comment: commentReducer,
        location: locationReducer,
        pitch: pitchReducer,
        childrenPitch: childrenPitchReducer,
        shift: shiftReducer,
        feedback: feedbackReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([paymentApi.middleware, bookingApi.middleware, shiftApi.middleware, pitchApi.middleware, serviceApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
