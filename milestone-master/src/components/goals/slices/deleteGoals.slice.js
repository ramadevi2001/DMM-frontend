// deleteChoice.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleDelete } from "../../../app/http.request";

export const deleteGoal = createAsyncThunk("delete/goal", async (goalId) => {
  const response = await handleDelete(`/api/goals/${goalId}/`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return { id: goalId, ...response };
});

const deleteGoalSlice = createSlice({
  name: "deleteGoal",
  initialState: { status: "idle", error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGoal.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(deleteGoal.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const { resetStatus } = deleteGoalSlice.actions;
export default deleteGoalSlice.reducer;
