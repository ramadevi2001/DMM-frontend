// slices/addHabit.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleCreate } from '../../../app/http.request';

// Async thunk to add a habit
export const addHabit = createAsyncThunk('add/habit', async (inputData) => {
    const response = await handleCreate('/api/habits/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(inputData),
    });
    return response;
});

const habitSlice = createSlice({
  name: 'addHabit',
  initialState: {
    habit: {},
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
      .addCase(addHabit.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.status = 'success';
        state.habit = action.payload;
      })
      .addCase(addHabit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { resetStatus } = habitSlice.actions;

export default habitSlice.reducer;
