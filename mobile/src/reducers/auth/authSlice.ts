import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type AuthState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  data: {
    mobileNumber: string;
    authToken: string;
  };
};

const initialState: AuthState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  data: {
    mobileNumber: '',
    authToken: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBusy: (state, action: PayloadAction<boolean>) => {
      state.screen.isBusy = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.screen.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.screen.success = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.data.authToken = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.data.mobileNumber = action.payload;
    },
  },
});

export const { setBusy, setError, setSuccess, setAuthToken, setMobileNumber } = authSlice.actions;

const handleError = (error: any, dispatch: any) => {
  if (axios.isAxiosError(error)) {
      console.error(error)
      if (error.response) {
          console.log(error);
          // Server responded with a status code outside of 2xx
          const errorMessage = error.response.data?.response.Message || 'An error occurred';
          dispatch(setError(errorMessage));
      } else {
          // Request was made but no response received
          dispatch(setError('Network Error: Please check your internet connection'));
      }
  }
};

export const signIn = (mobileNumber: string, password: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, { mobileNumber, password });
    if (response.status === 200) {
      dispatch(setAuthToken(response.data.token));
      dispatch(setMobileNumber(mobileNumber));
      dispatch(setSuccess('User logged in successfully.'));
      return true; // Login was successful
    } else {
      dispatch(setError('Login failed'));
      return false;
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Sign in failed'));
    return false;
  } finally {
    dispatch(setBusy(false));
  }
};


export const register = (
  fullName: string,
  email: string,
  mobileNumber: string,
  dateOfBirth: string,
  gender: string,
  lookingForRoom: boolean,
  lookingForRoommate: boolean,
  preferences: {
    clean: boolean;
    pets: boolean;
    smoking: boolean;
    drinking: boolean;
  },
  makeMobilePrivate: boolean,
  password: string,
  confirmPassword: string
): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      lookingForRoom,
      lookingForRoommate,
      preferences,
      makeMobilePrivate,
      password,
      confirmPassword
    });
    console.log(response);
    dispatch(setSuccess('User registered successfully.'));
    dispatch(signIn(mobileNumber, password)); // Automatically sign in the user after registration
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Registration failed'));
    console.log(error)
  } finally {
    dispatch(setBusy(false));
  }
};

export default authSlice.reducer;
