// src/redux/bannerSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IBanner from "../../interfaces/Banner";

interface initState {
  banners: IBanner[];
  loading: boolean;
  error: string | undefined;
}

const initialState: initState = {
  banners: [],
  loading: false,
  error: "",
};

export const getAllBanner = createAsyncThunk("/banner/getBanner", async () => {
  const {
    data: { data },
  } = await axios.get(`http://localhost:8080/api/banners`);
  return data;
});

export const handleCreateBanner = createAsyncThunk(
  "/banner/createBanner",
  async (banner: IBanner) => {
    const {
      data: { data },
    } = await axios.post(`http://localhost:8080/api/banners`, banner);
    return data;
  }
);

export const handleUpdateBanner = createAsyncThunk(
  "/banner/updateBanner",
  async (banner: IBanner) => {
    const {
      data: { data },
    } = await axios.patch(
      `http://localhost:8080/api/banners/${banner._id}`,
      banner
    );
    return data;
  }
);

export const handleRemoveBanner = createAsyncThunk(
  "/banner/removeBanner",
  async (id: string) => {
    await axios.delete(`http://localhost:8080/api/banners/${id}`);
    return id;
  }
);

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBanner.fulfilled, (state, action) => {
        state.banners = action.payload;

        state.loading = false;
      })
      .addCase(getAllBanner.rejected, (state) => {
        state.loading = false;
      })

      //Create Banner
      .addCase(handleCreateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleCreateBanner.fulfilled, (state, action) => {
        state.banners = action.payload;

        state.loading = false;
      })
      .addCase(handleCreateBanner.rejected, (state) => {
        state.loading = false;
      })

      // Update banner
      .addCase(handleUpdateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleUpdateBanner.fulfilled, (state, action) => {
        state.banners = action.payload;

        state.loading = false;
      })
      .addCase(handleUpdateBanner.rejected, (state) => {
        state.loading = false;
      })

      // Remove Banner
      .addCase(handleRemoveBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleRemoveBanner.fulfilled, (state, action) => {
        state.banners = state.banners?.filter(
          (banner: IBanner) => banner._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(handleRemoveBanner.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { getBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
