import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleUpdate } from '../../../app/http.request';

export const updateChoice = createAsyncThunk('update/choice', async (inputData) => {
    const response = await handleUpdate(`/api/choices/${inputData.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem("token")
        },
        body: JSON.stringify({become: inputData.become}),
    });
    return response;
});



const updateChoiceSlice = createSlice({
    name: 'updateChoice',
    initialState: { choice: {}, status: 'idle', error: null},
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateChoice.fulfilled, (state, action) => {
                state.choice = action.payload;
                state.status = 'success';
            })
            .addCase(updateChoice.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(updateChoice.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus, selectedChoice } = updateChoiceSlice.actions;
export default updateChoiceSlice.reducer;
