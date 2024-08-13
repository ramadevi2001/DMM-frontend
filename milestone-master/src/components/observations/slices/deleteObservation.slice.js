import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleDelete } from "../../../app/http.request";

// Async thunk for deleting an observation
export const deleteObservation = createAsyncThunk("delete/observation", async (observationId) => {
  const response = await handleDelete(`/api/observations/${observationId}/`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return { id: observationId, ...response };
});

const deleteObservationSlice = createSlice({
  name: "deleteObservation",
  initialState: { status: "idle", error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteObservation.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteObservation.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(deleteObservation.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const { resetStatus } = deleteObservationSlice.actions;
export default deleteObservationSlice.reducer;
