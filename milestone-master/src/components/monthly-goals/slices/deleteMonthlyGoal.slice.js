// deleteMonthlyGoal.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleDelete } from "../../../app/http.request";

// Thunk for deleting a monthly goal
export const deleteMonthlyGoal = createAsyncThunk(
  "delete/monthlyGoal",
  async (monthlyGoalId) => {
    const response = await handleDelete(`/api/monthly_goals/${monthlyGoalId}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return { id: monthlyGoalId, ...response };
  }
);

// Slice for handling the deletion of a monthly goal
const deleteMonthlyGoalSlice = createSlice({
  name: "deleteMonthlyGoal",
  initialState: { status: "idle", error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteMonthlyGoal.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteMonthlyGoal.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(deleteMonthlyGoal.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const { resetStatus } = deleteMonthlyGoalSlice.actions;
export default deleteMonthlyGoalSlice.reducer;
