import { IUser, IVerify, SigninForm, UserState } from '../../interfaces/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { login, loginWithGoogle, verify } from '~/api/auth';

const initialState: UserState = {
  loading: false,
  currentUser: {
    values: null,
    accessToken: '',
  },
  isLogged: false,
  error: '',
  role_name: '',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyAsync: any = createAsyncThunk('user/verify', async ({ email, otpCode }: IVerify, { rejectWithValue }) => {
  try {
    const res = await verify(email, otpCode);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAsync: any = createAsyncThunk('user/login', async (values: SigninForm, { rejectWithValue }) => {
  try {
    const res = await login(values);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginWithGoogleAsync: any = createAsyncThunk('user/loginWithGoogle', async (idToken: string, { rejectWithValue }) => {
  try {
    const res = await loginWithGoogle(idToken);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser.values = {} as IUser;
      state.currentUser.accessToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('pitch');
      state.isLogged = false;
      state.role_name = '';
    },
    saveUserValues(state, action) {
      state.currentUser.values = action.payload?.values;
      state.currentUser.accessToken = action.payload?.accessToken;
      localStorage.setItem('accessToken', action.payload?.accessToken);
      state.isLogged = true;
      state.role_name = action.payload?.role_name;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginAsync.fulfilled, (state, action: any) => {
        if (action.payload?.error) {
          state.error = action.payload?.message;
          state.loading = false;
        } else {
          const decode: any = jwtDecode(action.payload?.accessToken);
          state.currentUser.values = decode;
          localStorage.setItem('accessToken', action.payload?.accessToken);
          state.currentUser.accessToken = action.payload?.accessToken;
          state.role_name = decode.role_name;
          state.error = '';
          state.loading = false;
          state.isLogged = true;
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message;
        state.isLogged = false;
        state.role_name = '';
      })

      // login with google
      .addCase(loginWithGoogleAsync.pending, (state) => {
        state.loading = true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginWithGoogleAsync.fulfilled, (state, action: any) => {
        if (action.payload?.error) {
          state.error = action.payload?.message;
          state.loading = false;
        } else {
          const decode: any = jwtDecode(action.payload?.accessToken, { header: true });
          state.currentUser.values = decode;
          state.currentUser.accessToken = action.payload?.accessToken;
          state.isLogged = true;
          state.role_name = decode.role_name;
          state.error = '';
          localStorage.setItem('accessToken', state.currentUser.accessToken);
          state.loading = false;
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginWithGoogleAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message;
        state.role_name = '';
      })

      .addCase(verifyAsync.pending, (state) => {
        state.loading = true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(verifyAsync.fulfilled, (state, action: any) => {
        if (action.payload?.error) {
          state.error = action.payload?.message;
        } else {
          const decode: any = jwtDecode(action.payload?.accessToken);
          state.currentUser.values = decode;
          state.currentUser.accessToken = action.payload?.accessToken;
          state.isLogged = true;
          state.role_name = decode.role_name;
          state.error = '';
          localStorage.setItem('accessToken', state.currentUser.accessToken);
          state.loading = false;
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(verifyAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message;
        state.role_name = '';
      });
  },
});

export const { logout, saveUserValues } = userSlice.actions;
export default userSlice.reducer;
