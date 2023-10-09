import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLocation, getCreatLocation, getDeleteLocation, getUpdateLocation } from "../../api/location";

interface initialState {
    locations: any;
    isLoading: boolean;
}

const initialState: initialState = {
    locations: [],
    isLoading: false,
};

export const getAllLocationMid = createAsyncThunk(
    "location/getAllLocationMid",
    async (_, thunkAPI) => {
        try {
            const { data } = await getAllLocation();
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const createLocationMid = createAsyncThunk(
    "location/createLocationMid",
    async (location: any, thunkAPI) => {
        try {
            const { data } = await getCreatLocation(location);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const updateLocationMid = createAsyncThunk(
    "location/updateLocationMid",
    async ({ _id, location }: { _id: any; location: any }, thunkAPI) => {
        try {
            const { data } = await getUpdateLocation(_id, location);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const deleteLocationMid = createAsyncThunk(
    "location/deleteLocationMid",
    async (idLocation: string, thunkAPI) => {
        try {
            const { data } = await getDeleteLocation(idLocation);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLocationMid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllLocationMid.fulfilled, (state, action) => {
                state.locations = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllLocationMid.rejected, (state) => {
                state.isLoading = false;
            });
        // Create Location
        builder
            .addCase(createLocationMid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLocationMid.fulfilled, (state, action) => {
                state.locations = [...state.locations, action.payload];
                state.isLoading = false;
            })
            .addCase(createLocationMid.rejected, (state) => {
                state.isLoading = false;
            });
        // Update Location
        builder
            .addCase(updateLocationMid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLocationMid.fulfilled, (state, action) => {
                state.locations = state.locations?.map((location: any) =>
                    location._id === action?.payload?._id ? action.payload : location
                );
                state.isLoading = false;
            })
            .addCase(updateLocationMid.rejected, (state) => {
                state.isLoading = false;
            });
        // Delete Location
        builder
            .addCase(deleteLocationMid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteLocationMid.fulfilled, (state, action) => {
                state.locations = state.locations?.filter(
                    (location: any) => location._id !== action.payload._id
                );
                state.isLoading = false;
            })
            .addCase(deleteLocationMid.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default locationSlice.reducer;
