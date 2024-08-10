// slices/monthlyGoal.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {handleCreate} from '../../../app/http.request'

// Async thunk to add a monthly goal
export const addMonthlyGoal = createAsyncThunk('add/monthly-goal', async (inputData) => {
    const response = await handleCreate('/api/monthly_goals/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem("token")
        },
        body: JSON.stringify(inputData),
    });
    return response;
});


const monthlyGoalSlice = createSlice({
  name: 'addMonthlyGoal',
  initialState: {
    monthlyGoal: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMonthlyGoal.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addMonthlyGoal.fulfilled, (state, action) => {
        state.status = 'success';
        state.monthlyGoal =  action.payload
      })
      .addCase(addMonthlyGoal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
  },
});

export const { resetStatus } = monthlyGoalSlice.actions;

export default monthlyGoalSlice.reducer;
