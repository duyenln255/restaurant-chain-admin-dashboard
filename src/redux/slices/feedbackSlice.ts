import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as feedbackAPI from "../../services/feedback.service";
import type { Feedback } from "../../services/feedback.service";

interface FeedbackState {
  items: Feedback[];
  selectedFeedback: Feedback | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  items: [],
  selectedFeedback: null,
  loading: false,
  error: null,
};

// GET all
export const fetchFeedbacks = createAsyncThunk("feedbacks/fetch", async () => {
  return await feedbackAPI.getAllFeedbacks();
});

// GET one
export const fetchFeedbackById = createAsyncThunk("feedbacks/fetchById", async (id: string) => {
  return await feedbackAPI.getFeedbackById(id);
});

// DELETE
export const deleteFeedback = createAsyncThunk("feedbacks/delete", async (id: string) => {
  await feedbackAPI.deleteFeedback(id);
  return id;
});

// UPDATE (solve)
export const updateFeedbackThunk = createAsyncThunk(
  "feedbacks/updateFeedback",
  async ({ id, staff_id }: { id: string; staff_id: string }) => {
    return await feedbackAPI.updateFeedback(id, { staff_id });
  }
);

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchFeedbackById.fulfilled, (state, action) => {
        state.selectedFeedback = action.payload;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateFeedbackThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(item => item.id === updated.id);
        if (index !== -1) state.items[index] = updated;
      });
  }
});

export default feedbackSlice.reducer;
