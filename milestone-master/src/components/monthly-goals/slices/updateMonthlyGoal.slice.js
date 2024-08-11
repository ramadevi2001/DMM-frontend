import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleUpdate } from '../../../app/http.request';

// Async thunk for updating a monthly goal
export const updateMonthlyGoal = createAsyncThunk('update/monthlyGoals', async (inputData) => {
    const response = await handleUpdate(`/api/monthly_goals/${inputData.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify(inputData),
    });
    return response;
});

// Slice for handling the update of a monthly goal
const updateMonthlyGoalSlice = createSlice({
    name: 'updateMonthlyGoal',
    initialState: { monthlyGoal: {}, status: 'idle', error: null },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateMonthlyGoal.fulfilled, (state, action) => {
                state.monthlyGoal = action.payload;
                state.status = 'success';
            })
            .addCase(updateMonthlyGoal.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(updateMonthlyGoal.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus } = updateMonthlyGoalSlice.actions;
export default updateMonthlyGoalSlice.reducer;
