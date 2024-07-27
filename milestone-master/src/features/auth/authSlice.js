import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utility function to handle fetch requests
const handleFetch = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
};

export const signup = createAsyncThunk('auth/signup', async (userData) => {
    const response = await handleFetch('/api/signup', {
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
