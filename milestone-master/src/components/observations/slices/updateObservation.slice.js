import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleUpdate } from '../../../app/http.request';

// Async thunk for updating an observation
export const updateObservation = createAsyncThunk('update/observations', async (inputData) => {
    const response = await handleUpdate(`/api/observations/${inputData.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(inputData),
    });
    return response;
});

const updateObservationSlice = createSlice({
    name: 'updateObservation',
    initialState: { observation: {}, status: 'idle', error: null },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateObservation.fulfilled, (state, action) => {
                state.observation = action.payload;
                state.status = 'success';
            })
            .addCase(updateObservation.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(updateObservation.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus } = updateObservationSlice.actions;
export default updateObservationSlice.reducer;
