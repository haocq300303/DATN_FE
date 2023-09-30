// src/redux/bannerSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBanner, createBanner, updateBanner, deleteBanner } from "../../api/banner";
import IBanner from "../../interfaces/Banner";

interface initState {
  banners: IBanner[];
  isLoading: boolean;
}

const initialState: initState = {
  banners: [],
  isLoading: false,
};

export const getAllBannerMid = createAsyncThunk(
  "banner/getAllBannerMid",
  async (_, thunkAPI) => {
    try {
      const { data: { data } } = await getAllBanner();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const createBannerMid = createAsyncThunk(
  "banner/createBannerMid",
  async (banner: IBanner, thunkAPI) => {
    try {
      const { data } = await createBanner(banner);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const updateBannerMid = createAsyncThunk(
  "banner/updateBannerMid",
  async ({ _id, banner }: { _id: string; banner: IBanner }, thunkAPI) => {
    try {
      const { data } = await updateBanner(_id, banner);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const deleteBannerMid = createAsyncThunk(
  "banner/deleteBannerMid",
  async (idBanner: string, thunkAPI) => {
    try {
      const { data } = await deleteBanner(idBanner);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBannerMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBannerMid.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllBannerMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Create banner
    builder
      .addCase(createBannerMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBannerMid.fulfilled, (state, action) => {
        state.banners = [...state.banners, action.payload];
        state.isLoading = false;
      })
      .addCase(createBannerMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Update banner
    builder
      .addCase(updateBannerMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBannerMid.fulfilled, (state, action) => {
        state.banners = state.banners?.map((banner: IBanner) =>
          banner._id === action?.payload?._id ? action.payload : banner
        );
        state.isLoading = false;
      })
      .addCase(updateBannerMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Delete banner
    builder
      .addCase(deleteBannerMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBannerMid.fulfilled, (state, action) => {
        state.banners = state.banners?.filter(
          (banner: IBanner) => banner._id !== action.payload._id
        );
        state.isLoading = false;
      })
      .addCase(deleteBannerMid.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default bannerSlice.reducer;
