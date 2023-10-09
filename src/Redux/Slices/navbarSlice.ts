import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  isFixed: boolean;
  isVisibleTitle: boolean;
}

const initialState: NavbarState = {
  isFixed: false,
  isVisibleTitle: false,
};

const navbar = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setFixed: (state, action: PayloadAction<boolean>) => {
      state.isFixed = action.payload;
    },
    setVisibleTitle: (state, action: PayloadAction<boolean>) => {
      state.isVisibleTitle = action.payload;
    },
  },
});

export const { setFixed, setVisibleTitle } = navbar.actions;
export const selectIsFixed = (state: { navbar: NavbarState }) => state.navbar.isFixed;
export const selectIsVisibleTitle = (state: { navbar: NavbarState }) => state.navbar.isVisibleTitle;
export default navbar.reducer;
