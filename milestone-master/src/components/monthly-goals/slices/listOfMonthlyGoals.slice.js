import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleFetch } from '../../../app/http.request';

// Async thunks for fetching monthly goals
export const getMonthlyGoals = createAsyncThunk('monthlyGoals/get', async () => {
    const response = await handleFetch('/api/monthly_goals/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});

export const getMonthlyGoalsByGoal = createAsyncThunk('monthlyGoals/get/goal', async (goalId) => {
    const response = await handleFetch(`/api/monthly_goals/goal/${goalId}/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});

// Slice for managing state
const monthlyGoalsSlice = createSlice({
    name: 'monthlyGoals',
    initialState: { monthlyGoals: [], status: 'idle', error: null, selectedMonthlyGoal: "" },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
        selectedMonthlyGoal: (state, action) => {
            state.selectedMonthlyGoal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMonthlyGoals.fulfilled, (state, action) => {
                state.monthlyGoals = action.payload;
                state.status = 'success';
            })
            .addCase(getMonthlyGoals.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getMonthlyGoals.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getMonthlyGoalsByGoal.fulfilled, (state, action) => {
                state.monthlyGoals = action.payload;
                state.status = 'success';
            })
            .addCase(getMonthlyGoalsByGoal.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getMonthlyGoalsByGoal.pending, (state) => {
                state.status = 'pending';
            });
    },
});

// Export actions and reducer
export const { resetStatus, selectedMonthlyGoal } = monthlyGoalsSlice.actions;
export default monthlyGoalsSlice.reducer;
