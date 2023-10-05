import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postSlice";
import commentReducer from "./Slices/commentSlide";
import paymentApi from "./payment/paymentApi";
import bookingApi from "./booking/bookingApi";

const store = configureStore({
    reducer: {
        [paymentApi.reducerPath]: paymentApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        post: postReducer,
        comment: commentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([paymentApi.middleware, bookingApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
