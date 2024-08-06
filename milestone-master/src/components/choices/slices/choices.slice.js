import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleFetch } from '../../../app/http.request';
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
