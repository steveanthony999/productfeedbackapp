import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedbackService from './feedbackService';

const initialState = {
  feedback: [],
  singleFeedback: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create New Feedback
export const createFeedback = createAsyncThunk(
  'feedback/create',
  async (feedbackData, thunkAPI) => {
    try {
      return await feedbackService.createFeedback(feedbackData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Feedback
export const getFeedback = createAsyncThunk(
  'feedback/getAll',
  async (filteredItem, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await feedbackService.getFeedback(filteredItem, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Single Feedback
export const getSingleFeedback = createAsyncThunk(
  'singlefeedback/get',
  async (feedbackId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await feedbackService.getSingleFeedback(feedbackId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Feedback
export const deleteFeedback = createAsyncThunk(
  'feedback/delete',
  async (feedbackId, thunkAPI) => {
    try {
      return await feedbackService.deleteFeedback(feedbackId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Feedback
export const updateFeedback = createAsyncThunk(
  'feedback/update',
  async ({ feedbackId, ...feedbackData }, thunkAPI) => {
    try {
      return await feedbackService.updateFeedback(feedbackId, feedbackData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFeedback.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.feedback = action.payload;
      })
      .addCase(getFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.feedback = action.payload;
        // state.singleFeedback = action.payload;
      })
      .addCase(getSingleFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedback.map((feedback) =>
          feedback._id === action.payload._id
            ? (feedback.status = 'closed')
            : feedback
        );
      })
      .addCase(updateFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFeedback.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = feedbackSlice.actions;
export default feedbackSlice.reducer;
