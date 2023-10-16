import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllComment,
  getCommentByPost,
  createComment,
  // createComment,
  // updateComment,
  deleteComment,
} from "~/api/comment";
import IComment from "~/interfaces/comment";

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

export const getCommentByPostMid = createAsyncThunk(
  "comment/getCommentByPostMid",
  async (idPost: string) => {
    const { data } = await getCommentByPost(idPost);
    return data.data;
  }
);

export const createCommentMid = createAsyncThunk(
  "post/createCommentMid",
  async (comment: IComment) => {
    const { data } = await createComment(comment);
    return data.data;
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
    // Get Comment By Post
    builder
      .addCase(getCommentByPostMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentByPostMid.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(getCommentByPostMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Create Comment
    builder
      .addCase(createCommentMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommentMid.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.isLoading = false;
      })
      .addCase(createCommentMid.rejected, (state) => {
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
