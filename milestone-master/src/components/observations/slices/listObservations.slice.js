import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleFetch } from "../../../app/http.request";

// Async thunks for fetching monthly goals
export const getObservations = createAsyncThunk(
  "getObservations/get",
  async () => {
    const response = await handleFetch("/api/observations/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response;
  }
);

// Slice for managing state
const observationsSlice = createSlice({
  name: "observations",
  initialState: { observations: [], status: "idle", error: null },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getObservations.fulfilled, (state, action) => {
        state.observations = action.payload;
        state.status = "success";
      })
      .addCase(getObservations.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(getObservations.pending, (state) => {
        state.status = "pending";
      });
  },
});

// Export actions and reducer
export const { resetStatus } = observationsSlice.actions;
export default observationsSlice.reducer;
