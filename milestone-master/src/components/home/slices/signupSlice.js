import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to handle fetch requests
const handleFetch = async (url, options = {}) => {
    const completeUrl = `http://127.0.0.1:8000${url}`;
    try {
        const response = await axios({
            url: completeUrl,
            method: options.method || 'GET',
            headers: options.headers || {},
            data: options.body || {},
        });
        return response.data;
    } catch (error) {
        // Extract the error message from the response if available
        const errors = error.response.data;
        const keys = Object.values(errors);
        let finalErrors = keys.flat();
        const errorMessage = finalErrors.join("\n");
        throw new Error(errorMessage);
    }
};

export const signup = createAsyncThunk('auth/signup', async (userData) => {
    const response = await handleFetch('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response;
});

const signupSlice = createSlice({
    name: 'signup',
    initialState: { user: null, status: 'idle', error: null },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'success';
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(signup.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus } = signupSlice.actions;
export default signupSlice.reducer;
