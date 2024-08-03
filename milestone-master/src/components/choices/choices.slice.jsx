import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to handle fetch requests
const handleFetch = async (url, options = {}) => {
    console.log('Fetching choies...');
    const completeUrl = `http://127.0.0.1:8000${url}`;
    try {
        const response = await axios({
            url: completeUrl,
            method: options.method || 'GET',
            headers: options.headers || {},
        });
        console.log("getChoicesg response: " + response.data)
        return response.data;
    } catch (error) {
        // Extract the error message from the response if available
        const errors = error.response.data;
        const keys = Object.values(errors);
        let finalErrors = keys.flat();
        const errorMessage = finalErrors.join("\n");
        throw new Error(errorMessage);
    }
};

export const getChoices = createAsyncThunk('choices/get', async () => {
    console.log("called getChoices")
    const response = await handleFetch('/api/choices/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return response;
});



const choicesSlice = createSlice({
    name: 'choices',
    initialState: { choices: [], status: 'idle', error: null, selectedChoice: "" },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
        selectedChoice: (state, action) => {
            state.selectedChoice = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChoices.fulfilled, (state, action) => {
                state.choices = action.payload;
                state.status = 'success';
            })
            .addCase(getChoices.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(getChoices.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus, selectedChoice } = choicesSlice.actions;
export default choicesSlice.reducer;
