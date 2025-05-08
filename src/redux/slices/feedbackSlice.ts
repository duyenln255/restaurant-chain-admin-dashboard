import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllFeedbacks } from "../../services/feedback.service";
import type { Feedback } from "../../services/feedback.service";

interface FeedbackState {
  items: Feedback[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/fetchFeedbacks",
  async () => {
    const response = await getAllFeedbacks();
    return response;
  }
);

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedbacks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch feedbacks";
      });
  },
});

export default feedbackSlice.reducer;
