// deleteChoice.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleDelete } from "../../../app/http.request";

export const deleteChoice = createAsyncThunk(
  "delete/choice",
  async (choiceId) => {
    const response = await handleDelete(`/api/choices/${choiceId}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return { id: choiceId, ...response };
  }
);

const deleteChoiceSlice = createSlice({
  name: "deleteChoice",
  initialState: { status: "idle", error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChoice.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteChoice.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(deleteChoice.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const { resetStatus } = deleteChoiceSlice.actions;
export default deleteChoiceSlice.reducer;
