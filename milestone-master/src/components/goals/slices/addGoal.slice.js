import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {handleCreate} from "../../../app/http.request"



export const addGoal = createAsyncThunk('add/goal', async (inputData) => {
    const response = await handleCreate('/api/goals/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem("token")
        },
        body: JSON.stringify(inputData),
    });
    return response;
});



const addGoalSlice = createSlice({
    name: 'addGoal',
    initialState: { goal: {}, status: 'idle', error: null},
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addGoal.fulfilled, (state, action) => {
                state.choice = action.payload;
                state.status = 'success';
            })
            .addCase(addGoal.rejected, (state, action) => {
                state.error = action.error;
                state.status = 'failed';
            })
            .addCase(addGoal.pending, (state) => {
                state.status = 'pending';
            });
    },
});

export const { resetStatus } = addGoalSlice.actions;
export default addGoalSlice.reducer;
