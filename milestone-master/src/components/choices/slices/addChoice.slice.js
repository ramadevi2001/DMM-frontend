import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleCreate } from '../../../app/http.request';
export const addChoice = createAsyncThunk('add/choice', async (inputData) => {
    const response = await handleCreate('/api/choices/', {
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

export const { resetStatus } = addChoiceSlice.actions;
export default addChoiceSlice.reducer;
