import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllPost, createPost, updatePost, deletePost } from '../../api/post';
import IPost from '../../interfaces/post';

interface initialState {
  posts: IPost[];
  isLoading: boolean;
}

const initialState: initialState = {
  posts: [],
  isLoading: false,
};

export const getAllPostMid = createAsyncThunk('post/getAllPostMid', async (_, thunkAPI) => {
  try {
    const { data } = await getAllPost();
    //console.log("dataPostRedux", data);
    return data.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const createPostMid = createAsyncThunk('post/createPostMid', async (post: IPost, thunkAPI) => {
  try {
    const { data } = await createPost(post);

    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const updatePostMid = createAsyncThunk('post/updatePostMid', async ({ _id, post }: { _id: string; post: IPost }, thunkAPI) => {
  try {
    const { data } = await updatePost(_id, post);

    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const deletePostMid = createAsyncThunk('post/deletePostMid', async (idPost: string, thunkAPI) => {
  try {
    const { data } = await deletePost(idPost);

    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setData(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPostMid.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllPostMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Create Post
    builder
      .addCase(createPostMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPostMid.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
        state.isLoading = false;
      })
      .addCase(createPostMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Update Post
    builder
      .addCase(updatePostMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePostMid.fulfilled, (state, action) => {
        state.posts = state.posts?.map((post: IPost) => (post._id === action?.payload?._id ? action.payload : post));
        state.isLoading = false;
      })
      .addCase(updatePostMid.rejected, (state) => {
        state.isLoading = false;
      });
    // Delete Post
    builder
      .addCase(deletePostMid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePostMid.fulfilled, (state, action) => {
        state.posts = state.posts?.filter((post: IPost) => post._id !== action.payload._id);
        state.isLoading = false;
      })
      .addCase(deletePostMid.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setData } = postSlice.actions;
export default postSlice.reducer;
