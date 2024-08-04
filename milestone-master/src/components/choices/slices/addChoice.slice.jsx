import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to handle fetch requests
const handleCreateChoice = async (url, options = {}) => {
    console.log('Fetching choies...');
    const completeUrl = `http://127.0.0.1:8000${url}`;
    try {
        const response = await axios({
            url: completeUrl,
            method: options.method || 'GET',
            headers: options.headers || {},
            data: options.body || {},
        });
        console.log("getChoicesg response: " + response.data)
        return response.data;
    } catch (error) {
        // Check if the error response exists
        if (error.response && error.response.data) {
          const errors = error.response.data;
      
          // Handle non-field errors
          if (errors.non_field_errors) {
            const nonFieldErrors = errors.non_field_errors.non_field_errors;
            if (nonFieldErrors && Array.isArray(nonFieldErrors)) {
              throw new Error(nonFieldErrors.join("\n"));
            }
          }
      
          // Handle other specific errors like authentication
          if (errors.detail) {
            throw new Error(errors.detail);
          }
      
          // Handle other field-specific errors
          const fieldErrors = Object.keys(errors)
            .filter(key => key !== "non_field_errors")
            .map(key => errors[key])
            .flat();
            
          if (fieldErrors.length > 0) {
            throw new Error(fieldErrors.join("\n"));
          }
      
          // General fallback for unexpected error structures
          throw new Error("An unexpected error occurred. Please try again.");
        } else {
          // Handle generic network or unexpected errors
          throw new Error("Network error or server did not respond.");
        }
      }
      
};

export const addChoice = createAsyncThunk('add/choice', async (inputData) => {
    const response = await handleCreateChoice('/api/choices/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem("token")
        },
        body: JSON.stringify(inputData),
    });
    return response;
});



const addChoiceSlice = createSlice({
    name: 'addChoice',
    initialState: { choice: {}, status: 'idle', error: null},
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addChoice.fulfilled, (state, action) => {
                state.choice = action.payload;
                state.status = 'success';
            })
            .addCase(addChoice.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(addChoice.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus, selectedChoice } = addChoiceSlice.actions;
export default addChoiceSlice.reducer;
