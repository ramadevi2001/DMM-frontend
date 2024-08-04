// deleteChoice.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to handle delete requests
const handleDeleteChoice = async (url, options = {}) => {
  console.log('Deleting choice...');
  const completeUrl = `http://127.0.0.1:8000${url}`;
  try {
    const response = await axios({
      url: completeUrl,
      method: options.method || 'DELETE',
      headers: options.headers || {},
    });
    return response.data;
  } catch (error) {
    // Check if the error response exists
    if (error.response && error.response.data) {
      const errors = error.response.data;

      // Handle specific errors like authentication
      if (errors.detail) {
        throw new Error(errors.detail);
      }

      // General fallback for unexpected error structures
      throw new Error("An unexpected error occurred. Please try again.");
    } else {
      // Handle generic network or unexpected errors
      throw new Error("Network error or server did not respond.");
    }
  }
};

export const deleteChoice = createAsyncThunk('delete/choice', async (choiceId) => {
  const response = await handleDeleteChoice(`/api/choices/${choiceId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  });
  return { id: choiceId, ...response };
});

const deleteChoiceSlice = createSlice({
  name: 'deleteChoice',
  initialState: { status: 'idle', error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChoice.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(deleteChoice.rejected, (state, action) => {
        state.error = action.error;
        state.status = 'failed';
      })
      .addCase(deleteChoice.pending, (state) => {
        state.status = 'pending';
      });
  },
});

export const { resetStatus } = deleteChoiceSlice.actions;
export default deleteChoiceSlice.reducer;
