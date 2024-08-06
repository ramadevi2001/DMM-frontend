import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleFetch } from '../../../app/http.request';

export const getGoals = createAsyncThunk('goals/get', async () => {
    const response = await handleFetch('/api/goals/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});


const goalsSlice = createSlice({
    name: 'goals',
    initialState: { goals: [], status: 'idle', error: null, selectedGoal: "" },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
        selectedGoal: (state, action) => {
            state.selectedGoal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGoals.fulfilled, (state, action) => {
                state.goals = action.payload;
                state.status = 'success';
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getGoals.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus, selectedGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
