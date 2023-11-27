import { IUser, IVerify, SigninForm, UserState } from '../../interfaces/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { login, loginWithGoogle, verify } from '~/api/auth';
import { checkAdmin, checkAdminPitch } from '~/utils/auth';

const initialState: UserState = {
  loading: false,
  currentUser: {
    values: {} as IUser,
    accessToken: '',
  },
  isLogged: false,
  error: '',
  isAdmin: false,
  isAdminPitch: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyAsync: any = createAsyncThunk(
  'user/verify',
  async ({ email, otpCode }: IVerify, { rejectWithValue }) => {
    try {
      const res = await verify(email, otpCode);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAsync: any = createAsyncThunk(
  'user/login',
  async (values: SigninForm, { rejectWithValue }) => {
    try {
      const res = await login(values);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginWithGoogleAsync: any = createAsyncThunk(
  'user/loginWithGoogle',
  async (idToken: string, { rejectWithValue }) => {
    try {
      const res = await loginWithGoogle(idToken);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser.values = {} as IUser;
      state.currentUser.accessToken = '';
      localStorage.removeItem('accessToken');
      state.isLogged = false;
    },
    saveUserValues(state, action) {
      state.currentUser.values = action.payload?.values;
      state.currentUser.accessToken = action.payload?.accessToken;
      state.isLogged = true;
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
          state.isAdmin = false;
          state.isAdminPitch = false;
        } else {
          const { _doc }: any = jwtDecode(action.payload?.accessToken);
          state.currentUser.values = _doc;
          localStorage.setItem('accessToken', action.payload?.accessToken);
          state.currentUser.accessToken = action.payload?.accessToken;
          const checkAdminValue: any = checkAdmin();
          const checkAdminPitchValue: any = checkAdminPitch();
          state.isLogged = true;
          state.isAdmin = checkAdminValue;
          state.isAdminPitch = checkAdminPitchValue;
          state.error = '';
          state.loading = false;
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message;
        state.isLogged = false;
        state.isAdmin = false;
        state.isAdminPitch = false;
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
          state.isAdmin = false;
          state.isAdminPitch = false;
        } else {
          const { _doc }: any = jwtDecode(action.payload?.accessToken);
          state.currentUser.values = _doc;
          state.currentUser.accessToken = action.payload?.accessToken;
          state.isLogged = true;
          const checkAdminValue: any = checkAdmin();
          const checkAdminPitchValue: any = checkAdminPitch();
          state.isAdmin = checkAdminValue;
          state.isAdminPitch = checkAdminPitchValue;
          state.error = '';
          localStorage.setItem('accessToken', state.currentUser.accessToken);
          state.loading = false;
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginWithGoogleAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message;
        state.isAdmin = false;
        state.isAdminPitch = false;
      })

      .addCase(verifyAsync.pending, (state) => {
        state.loading = true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(verifyAsync.fulfilled, (state, action: any) => {
        if (action.payload?.error) {
          state.error = action.payload?.message;
        } else {
          state.isLogged = true;
          localStorage.setItem('accessToken', state.currentUser.accessToken);
          const checkAdminValue: any = checkAdmin();
          const checkAdminPitchValue: any = checkAdminPitch();
          state.isAdmin = checkAdminValue;
          state.isAdminPitch = checkAdminPitchValue;
          state.error = '';
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(verifyAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message;
        state.isAdmin = false;
        state.isAdminPitch = false;
      });
  },
});

export const { logout, saveUserValues } = userSlice.actions;
export default userSlice.reducer;
