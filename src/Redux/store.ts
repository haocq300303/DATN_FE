import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from './Reducer/bannerSlice';
const store = configureStore({
  reducer: {
    banner: bannerSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
