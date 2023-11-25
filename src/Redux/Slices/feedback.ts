/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { creatFeedback, deleteFeedback, getAllFeedback, updateFeedback } from "~/api/feedback";

interface initialState {
    feedbacks: any;
    isLoading: boolean;
}

const initialState: initialState = {
    feedbacks: [],
    isLoading: false,
};

export const fetchAllFeedback = createAsyncThunk(
    "feedback/fetchAllFeedback",
    async (_, thunkAPI) => {
        try {
            const { data } = await getAllFeedback();
            // console.log("dataFeedBackRedux:", data);

            return data.data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchCreatFeedback = createAsyncThunk(
    "feedback/fetchCreatFeedback",
    async (feedback: any, thunkAPI) => {
        try {
            const { data } = await creatFeedback(feedback);
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            message.warning(error?.response?.data?.message)
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);


export const fetchUpdateFeedback = createAsyncThunk(
    "feedback/fetchUpdateFeedback",
    async ({ feedback }: { feedback: any }, thunkAPI) => {
        try {
            const { data } = await updateFeedback(feedback);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchDeleteFeedback = createAsyncThunk(
    "feedback/fetchDeleteFeedback",
    async (idFeedback: string, thunkAPI) => {
        try {
            const { data } = await deleteFeedback(idFeedback);

            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        feedbackReducer(state, action) {
            state.feedbacks = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFeedback.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllFeedback.rejected, (state) => {
                state.isLoading = false;
            });
        // Create feedback
        builder
            .addCase(fetchCreatFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreatFeedback.fulfilled, (state, action) => {
                state.feedbacks = [...state.feedbacks, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchCreatFeedback.rejected, (state) => {
                state.isLoading = false;
            });
        // Update feedback
        builder
            .addCase(fetchUpdateFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUpdateFeedback.fulfilled, (state, action) => {
                state.feedbacks = state.feedbacks?.map((feedback: any) =>
                    feedback._id === action?.payload?._id ? action.payload : feedback
                );
                state.isLoading = false;
            })
            .addCase(fetchUpdateFeedback.rejected, (state) => {
                state.isLoading = false;
            });
        // Delete feedback
        builder
            .addCase(fetchDeleteFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteFeedback.fulfilled, (state, action) => {
                state.feedbacks = state.feedbacks?.filter(
                    (feedback: any) => feedback._id !== action.payload._id
                );
                state.isLoading = false;
            })
            .addCase(fetchDeleteFeedback.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { feedbackReducer } = feedbackSlice.actions
export default feedbackSlice.reducer;
