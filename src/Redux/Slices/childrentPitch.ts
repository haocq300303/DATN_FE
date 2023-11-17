import { getAllChildrentPitch, getCreatChildrentPitch,getDeleteChildrentPitch,getUpdateChildrentPitch } from './../../api/childrentPitch';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialState {
    childrentpitchs: any;
    isLoading: boolean;
}

const initialState: initialState = {
    childrentpitchs: [],
    isLoading: false,
};

export const fetchAllChildrenPitch = createAsyncThunk(
    "childrentpitch/fetchAllChildrenPitch",
    async (_, thunkAPI) => {
        try {
            const { data } = await getAllChildrentPitch();
            
            console.log("ahaha",data);
            
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchCreatChildrentPitch = createAsyncThunk(
    "childrentpitch/fetchCreatChildrentPitch",
    async (childrentpitch: any, thunkAPI) => {
        try {
            const { data } = await getCreatChildrentPitch(childrentpitch);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchUpdateChildrentPitch = createAsyncThunk(
    "childrentpitch/fetchUpdateChildrentPitch",
    async ({ _id, childrentpitch }: { _id: any; childrentpitch: any }, thunkAPI) => {
        try {
            const { data } = await getUpdateChildrentPitch(_id, childrentpitch);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchDeleteChildrentPitch = createAsyncThunk(
    "pitch/fetchDeleteChildrentPitch",
    async (idChildrentPitch: string, thunkAPI) => {
        try {
            const { data } = await getDeleteChildrentPitch(idChildrentPitch);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const childrentPitchSlice = createSlice({
    name: "ChildrentPitch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllChildrenPitch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllChildrenPitch.fulfilled, (state, action) => {
                state.childrentpitchs = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllChildrenPitch.rejected, (state) => {
                state.isLoading = false;
            });
        // Create pitchs
        builder
            .addCase(fetchCreatChildrentPitch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreatChildrentPitch.fulfilled, (state, action) => {
                state.childrentpitchs = [...state.childrentpitchs, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchCreatChildrentPitch.rejected, (state) => {
                state.isLoading = false;
            });
        // Update pitchs
        builder
            .addCase(fetchUpdateChildrentPitch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUpdateChildrentPitch.fulfilled, (state, action) => {
                state.childrentpitchs = state.childrentpitchs?.map((ChildrentPitch: any) =>
                ChildrentPitch._id === action?.payload?._id ? action.payload : ChildrentPitch
                );
                state.isLoading = false;
            })
            .addCase(fetchUpdateChildrentPitch.rejected, (state) => {
                state.isLoading = false;
            });
        // Delete pitchs
        builder
            .addCase(fetchDeleteChildrentPitch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteChildrentPitch.fulfilled, (state, action) => {
                state.childrentpitchs = state.childrentpitchs?.filter(
                    (location: any) => location._id !== action.payload._id
                );
                state.isLoading = false;
            })
            .addCase(fetchDeleteChildrentPitch.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default childrentPitchSlice.reducer;