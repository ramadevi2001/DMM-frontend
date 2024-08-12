// slices/addObservation.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleCreate } from '../../../app/http.request';

// Async thunk to add an observation
export const addObservation = createAsyncThunk('add/observation', async (inputData) => {
    const response = await handleCreate('/api/observations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(inputData),
    });
    return response;
});

const observationSlice = createSlice({
  name: 'addObservation',
  initialState: {
    observation: {},
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
      .addCase(addObservation.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addObservation.fulfilled, (state, action) => {
        state.status = 'success';
        state.observation = action.payload;
      })
      .addCase(addObservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { resetStatus } = observationSlice.actions;

export default observationSlice.reducer;
