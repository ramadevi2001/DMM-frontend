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
        console.log("error",error.response?.data)
        const errors = error.response.data
        const keys = Object.values(errors)
        console.log("keys", keys)
        let finalErrors = keys.flat()
       console.log("finalErrors", finalErrors)

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

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await handleFetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await handleFetch('/api/logout', {
        method: 'POST',
    });
});

const authSlice = createSlice({
    name: 'auth',
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
                state.status = "success";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.error;
                state.status = "failed";
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state, action) => {
                state.status = "pending";
            });
    },
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;
