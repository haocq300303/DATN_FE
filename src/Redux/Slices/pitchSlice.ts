/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllPitch,
  getCreatPitch,
  getDeletePitch,
  getUpdatePitch,
} from "../../api/pitch";

interface initialState {
  pitchs: any;
  isLoading: boolean;
}

const initialState: initialState = {
  pitchs: [],
  isLoading: false,
};

export const fetchAllPitch = createAsyncThunk(
  "pitch/fetchAllPitch",
  async (query: string, thunkAPI) => {
    try {
      const { data } = await getAllPitch(query);

      return data.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchCreatPitch = createAsyncThunk(
  "pitch/fetchCreatPitch",
  async (pitch: any, thunkAPI) => {
    try {
      const { data } = await getCreatPitch(pitch);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchUpdatePitch = createAsyncThunk(
  "pitch/fetchUpdatePitch",
  async ({ _id, pitch }: { _id: any; pitch: any }, thunkAPI) => {
    try {
      const { data } = await getUpdatePitch(_id, pitch);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchDeletePitch = createAsyncThunk(
  "pitch/fetchDeletePitch",
  async (idPitch: string, thunkAPI) => {
    try {
      const { data } = await getDeletePitch(idPitch);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const pitchSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPitch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPitch.fulfilled, (state, action) => {
        state.pitchs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllPitch.rejected, (state) => {
        state.isLoading = false;
      });
    // Create pitchs
    builder
      .addCase(fetchCreatPitch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreatPitch.fulfilled, (state, action) => {
        state.pitchs = [...state.pitchs, action.payload];
        state.isLoading = false;
      })
      .addCase(fetchCreatPitch.rejected, (state) => {
        state.isLoading = false;
      });
    // Update pitchs
    builder
      .addCase(fetchUpdatePitch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdatePitch.fulfilled, (state, action) => {
        state.pitchs = state.pitchs?.map((location: any) =>
          location._id === action?.payload?._id ? action.payload : location
        );
        state.isLoading = false;
      })
      .addCase(fetchUpdatePitch.rejected, (state) => {
        state.isLoading = false;
      });
    // Delete pitchs
    builder
      .addCase(fetchDeletePitch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletePitch.fulfilled, (state, action) => {
        state.pitchs = state.pitchs?.filter(
          (location: any) => location._id !== action.payload._id
        );
        state.isLoading = false;
      })
      .addCase(fetchDeletePitch.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default pitchSlice.reducer;
