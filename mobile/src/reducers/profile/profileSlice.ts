import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type ProfileState = {
    screen: {
        isBusy: boolean;
        error: string;
        success: string;
    };
    data: {
        user: any;
        profile: any;
    };
};

const initialState: ProfileState = {
    screen: {
        isBusy: false,
        error: '',
        success: '',
    },
    data: {
        user: [],
        profile: []

    },
};

const profileSlice = createSlice({
    name: 'profile',
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
        setUser: (state, action: PayloadAction<any>) => {
            state.data.user = action.payload;
        },
        setProfile: (state, action: PayloadAction<any>) => {
            state.data.profile = action.payload;
        }
    }
});

export const { setBusy, setError, setSuccess, setUser, setProfile } = profileSlice.actions;

export const fetchProfile = (usermobileNumber: string): AppThunk => async (dispatch) => {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));
    try {
        const response = await axios.get(`${API_BASE_URL}/user/getByNumber`, { params: { mobileNumber: usermobileNumber } });
        dispatch(setSuccess('Profile fetched successfully.'));
        dispatch(setBusy(false));
        dispatch(setUser(response.data.message));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.message || 'Fetching profile failed.'));
        dispatch(setBusy(false));
    }
};

export const updateProfile = (
    mobileNumber: number,
    fullName: string,
    image: string,
    email: string,
    dateOfBirth: string,
    gender: string,
    makeMobilePrivate: boolean,
):
    AppThunk => async (dispatch) => {
        dispatch(setBusy(true));
        dispatch(setError(''));
        dispatch(setSuccess(''));
        try {
            const response = await axios.put(`${API_BASE_URL}/user/update??mobileNumber=${mobileNumber}`, {
                params: {
                    fullName: fullName,
                    image: image,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    makeMobilePrivate: makeMobilePrivate,
                }
            });
            console.log('Profile updated:', response.data);
            dispatch(setSuccess('Profile updated successfully.'));
            dispatch(setBusy(false));
            dispatch(setProfile(response.data.message));
        } catch (error) {
            console.log("updateCatch:", error);
            dispatch(setError(error.response?.data?.message || error.message || 'Updating profile failed.'));
            dispatch(setBusy(false));
        }
    };


export default profileSlice.reducer;