import { getAllShift, getCreatShift, getDeleteShift, getUpdateShift} from '../../api/shift'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialState {
    shift: any;
    isLoading: boolean;
}

const initialState: initialState = {
    shift: [],
    isLoading: false,
};

export const fetchAllShift = createAsyncThunk(
    "shift/fetchAllShift",
    async (_, thunkAPI) => {
        try {
            const { data } = await getAllShift();
            
            console.log("ahaha",data);
            
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchCreatShift = createAsyncThunk(
    "Shift/fetchCreatShift",
    async (Shift: any, thunkAPI) => {
        try {
            const { data } = await getCreatShift(Shift);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchUpdateShift = createAsyncThunk(
    "shift/fetchUpdateShift",
    async ({ _id, shift }: { _id: any; shift: any }, thunkAPI) => {
        try {
            console.log(_id);
            
            const { data } = await getUpdateShift(_id, shift);
            console.log("ahaha",data);
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchDeleteShift = createAsyncThunk(
    "shift/fetchDeleteShift",
    async (idShift: string, thunkAPI) => {
        try {
            const { data } = await getDeleteShift(idShift);
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const ShiftPitchSlice = createSlice({
    name: "Shift",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllShift.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllShift.fulfilled, (state, action) => {
                state.shift = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllShift.rejected, (state) => {
                state.isLoading = false;
            });
        // Create pitchs
        builder
            .addCase(fetchCreatShift.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreatShift.fulfilled, (state, action) => {
                state.shift = [...state.shift, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchCreatShift.rejected, (state) => {
                state.isLoading = false;
            });
        // Update pitchs
        builder
            .addCase(fetchUpdateShift.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUpdateShift.fulfilled, (state, action) => {
                state.shift = state.shift?.map((Shift: any) =>
                Shift._id === action?.payload?._id ? action.payload : Shift
                );
                state.isLoading = false;
            })
            .addCase(fetchUpdateShift.rejected, (state) => {
                state.isLoading = false;
            });
        // Delete pitchs
        builder
            .addCase(fetchDeleteShift.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteShift.fulfilled, (state, action) => {
                state.shift = state.shift?.filter(
                    (location: any) => location._id !== action.payload._id
                );
                state.isLoading = false;
            })
            .addCase(fetchDeleteShift.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default ShiftPitchSlice.reducer;
