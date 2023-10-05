// redux/slices/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isSubMenuOpen: false,
  },
  reducers: {
    toggleSubMenu: (state) => {
      state.isSubMenuOpen = !state.isSubMenuOpen;
    },
  },
});

export const { toggleSubMenu } = menuSlice.actions;
export default menuSlice.reducer;
