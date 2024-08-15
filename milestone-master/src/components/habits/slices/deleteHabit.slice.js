// deleteHabit.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleDelete } from "../../../app/http.request";

export const deleteHabit = createAsyncThunk(
  "delete/habit",
  async (habitId) => {
    const response = await handleDelete(`/api/habits/${habitId}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return { id: habitId, ...response };
  }
);

const deleteHabitSlice = createSlice({
  name: "deleteHabit",
  initialState: { status: "idle", error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteHabit.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(deleteHabit.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const { resetStatus } = deleteHabitSlice.actions;
export default deleteHabitSlice.reducer;
