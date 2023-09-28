import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllComment,
  // createComment,
  // updateComment,
  deleteComment,
} from "../../api/comment";
import IComment from "../../interfaces/comment";

interface initialState {
  comments: IComment[];
  isLoading: boolean;
}

const initialState: initialState = {
  comments: [],
  isLoading: false,
};

export const getAllCommentMid = createAsyncThunk(
  "comment/getAllCommentMid",
  async () => {
    const { data } = await getAllComment();
    return data.data.data;
  }
);

export const deleteCommentMid = createAsyncThunk(
  "post/deleteCommentMid",
  async (idComment: string) => {
    const { data } = await deleteComment(idComment);

    return data.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCommentMid.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllCommentMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Delete Comment
    builder
      .addCase(deleteCommentMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCommentMid.fulfilled, (state, action) => {
        state.comments = state.comments?.filter(
          (comment: IComment) => comment._id !== action.payload._id
        );

        state.isLoading = false;
      })
      .addCase(deleteCommentMid.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commentSlice.reducer;
