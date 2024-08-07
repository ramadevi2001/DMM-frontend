import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleUpdate } from '../../../app/http.request';



export const updateGoal = createAsyncThunk('update/goals', async (inputData) => {
    const response = await handleUpdate(`/api/goals/${inputData.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem("token")
        },
        body: JSON.stringify(inputData),
    });
    return response;
});



const updateGoalSlice = createSlice({
    name: 'updateGoal',
    initialState: { choice: {}, status: 'idle', error: null},
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.choice = action.payload;
                state.status = 'success';
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(updateGoal.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus, selectedChoice } = updateGoalSlice.actions;
export default updateGoalSlice.reducer;
