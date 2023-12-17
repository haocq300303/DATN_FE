/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filterFeedbackPitch, getAllPitch, getCreatPitch, getDeletePitch, getUpdatePitch } from '../../api/pitch';
import IPitch from '~/interfaces/pitch';

interface initialState {
  pitchs: any;
  isLoading: boolean;
  listData: IPitch[];
  filterPrice: {
    minPrice: number;
    maxPrice: number;
  } | null; // filterPrice là một đối tượng chứa minPrice và maxPrice, hoặc null nếu không có giá trị
}

const initialState: initialState = {
  pitchs: [],
  isLoading: false,
  listData: [],
  filterPrice: null, // Khởi tạo filterPrice ban đầu là null
};

export const fetchAllPitch = createAsyncThunk('pitch/fetchAllPitch', async (query: string, thunkAPI) => {
  try {
    const { data } = await getAllPitch(query);
    //console.log("dataPitchRedux", data);
    return data.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const fetchAllPitchStart = createAsyncThunk(
  'pitch/fetchAllPitchStart',
  async ({ min, max }: { min: number; max: number }, thunkAPI) => {
    try {
      const { data } = await filterFeedbackPitch(min, max);
      //console.log("dataPitchStartRedux", data);
      return data.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchCreatPitch = createAsyncThunk('pitch/fetchCreatPitch', async (pitch: any, thunkAPI) => {
  try {
    const { data } = await getCreatPitch(pitch);

    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const fetchUpdatePitch = createAsyncThunk('pitch/fetchUpdatePitch', async ({ _id, pitch }: { _id: any; pitch: any }, thunkAPI) => {
  try {
    const { data } = await getUpdatePitch(_id, pitch);

    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const fetchDeletePitch = createAsyncThunk('pitch/fetchDeletePitch', async (idPitch: string, thunkAPI) => {
  try {
    const { data } = await getDeletePitch(idPitch);

    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

const pitchSlice = createSlice({
  name: 'pitch',
  initialState,
  reducers: {
    search(state, action) {
      state.pitchs = action.payload;
    },
    filter(state, action) {
      const filteredPitch = state.listData.filter((pitch) => pitch.name.toLowerCase().includes(action.payload.toLowerCase()));
      state.pitchs = filteredPitch;
    },
    filterPrice(state, action) {
      const { minPrice, maxPrice } = action.payload;

      const filteredByPrice = state.listData.filter((pitch) => pitch.deposit_price >= minPrice && pitch.deposit_price <= maxPrice);

      return {
        ...state,
        pitchs: filteredByPrice,
        filterPrice: {
          minPrice,
          maxPrice,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPitch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPitch.fulfilled, (state, action) => {
        state.pitchs = action.payload;
        state.listData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllPitch.rejected, (state) => {
        state.isLoading = false;
      });
    // all pitch start
    builder
      .addCase(fetchAllPitchStart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPitchStart.fulfilled, (state, action) => {
        state.pitchs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllPitchStart.rejected, (state) => {
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
        state.pitchs = state.pitchs?.map((location: any) => (location._id === action?.payload?._id ? action.payload : location));
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
        state.pitchs = state.pitchs?.filter((location: any) => location._id !== action.payload._id);
        state.isLoading = false;
      })
      .addCase(fetchDeletePitch.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { filter, filterPrice, search } = pitchSlice.actions;
export default pitchSlice.reducer;
