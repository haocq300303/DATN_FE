// src/redux/bannerSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IService } from "../../interfaces/service";
import { createService, deleteService, getAllService, getServicePitch, updateService } from "../../api/service";

interface initState {
  services: IService[];
  isLoading: boolean;
}

const initialState: initState = {
  services: [],
  isLoading: false,
};

export const getAllServiceMid = createAsyncThunk(
  "service/getAllServiceMid",
  async (_, thunkAPI) => {
    try {
      const { data: { data } } = await getAllService();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const fetchServicePitch = createAsyncThunk(
  "service/fetchServicePitch",
  async (idPitch: any, thunkAPI) => {
    try {
      const { data } = await getServicePitch(idPitch);
      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const createServiceMid = createAsyncThunk(
  "service/createServiceMid",
  async (service: IService, thunkAPI) => {
    try {
      const { data: { data } } = await createService(service);
      console.log(data);
      
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const updateServiceMid = createAsyncThunk(
  "service/updateServiceMid",
  async ({ _id, service }: { _id: string; service: IService }, thunkAPI) => {
    try {
      const { data: { data } } = await updateService(_id, service);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const deleteServiceMid = createAsyncThunk(
  "service/deleteServiceMid",
  async (idService: string, thunkAPI) => {
    try {
      const { data: { data } } = await deleteService(idService);
      
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllServiceMid.fulfilled, (state, action) => {
        state.services = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllServiceMid.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchServicePitch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServicePitch.fulfilled, (state, action) => {
        state.services = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchServicePitch.rejected, (state) => {
        state.isLoading = false;
      });
    // Create service
    builder
      .addCase(createServiceMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createServiceMid.fulfilled, (state, action) => {
        state.services = [...state.services, action.payload];
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(createServiceMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Update banner
    builder
      .addCase(updateServiceMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateServiceMid.fulfilled, (state, action) => {
        state.services = state.services?.map((service: IService) =>
          service._id === action?.payload?._id ? action.payload : service
        );
        state.isLoading = false;
      })
      .addCase(updateServiceMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Delete banner
    builder
      .addCase(deleteServiceMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteServiceMid.fulfilled, (state, action) => {
        state.services = state.services?.filter(
          (service: IService) => service._id !== action.payload._id
        );
        state.isLoading = false;
      })
      .addCase(deleteServiceMid.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default serviceSlice.reducer;
