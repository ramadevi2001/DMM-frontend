import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleUpdate } from '../../../app/http.request';

export const updateHabit = createAsyncThunk('update/habit', async (inputData) => {
    const response = await handleUpdate(`/api/habits/${inputData.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({
            monthly_goal: inputData.monthly_goal,
            title: inputData.title,
            description: inputData.description,
            planned_period_minutes: inputData.planned_period_minutes,
            location: inputData.location,
            start_time: inputData.start_time,
            end_time: inputData.end_time,
            is_done: inputData.is_done,
        }),
    });
    return response;
});

const updateHabitSlice = createSlice({
    name: 'updateHabit',
    initialState: { habit: {}, status: 'idle', error: null },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateHabit.fulfilled, (state, action) => {
                state.habit = action.payload;
                state.status = 'success';
            })
            .addCase(updateHabit.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(updateHabit.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus } = updateHabitSlice.actions;
export default updateHabitSlice.reducer;
