import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleFetch } from '../../../app/http.request';

// Async thunks for fetching habits
export const getHabits = createAsyncThunk('habits/get', async () => {
    const response = await handleFetch('/api/habits/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});

export const getHabitsByMonthlyGoal = createAsyncThunk('habits/get/monthlyGoal', async (monthlyGoalId) => {
    const response = await handleFetch(`/api/habits/monthly_goal/${monthlyGoalId}/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});


export const getHabitsByDate = createAsyncThunk('habits/get/byDate', async (date) => {
    const response = await handleFetch(`/api/habits/date/${date}/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});
// Slice for managing state
const habitsSlice = createSlice({
    name: 'habits',
    initialState: { habits: [], status: 'idle', error: null },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHabits.fulfilled, (state, action) => {
                state.habits = action.payload;
                state.status = 'success';
            })
            .addCase(getHabits.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getHabits.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getHabitsByMonthlyGoal.fulfilled, (state, action) => {
                state.habits = action.payload;
                state.status = 'success';
            })
            .addCase(getHabitsByMonthlyGoal.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getHabitsByMonthlyGoal.pending, (state) => {
                state.status = 'pending';
            })  
            .addCase(getHabitsByDate.fulfilled, (state, action) => {
                state.habits = action.payload;
                state.status = 'success';
            })
            .addCase(getHabitsByDate.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getHabitsByDate.pending, (state) => {
                state.status = 'pending';
            })
    },
});

// Export actions and reducer
export const { resetStatus } = habitsSlice.actions;
export default habitsSlice.reducer;
