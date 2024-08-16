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
        console.log("loging response: " + response.data)
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

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await handleFetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response;
});

const loginSlice = createSlice({
    name: 'login',
    initialState: { user: null, status: 'idle', error: null, isLoggedIn: false},
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
        loginStatus: (state) => {
            state.isLoggedIn = true;
        },
        logoutStatus: (state) => {
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'success';
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(login.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus, loginStatus, logoutStatus} = loginSlice.actions;
export default loginSlice.reducer;
