import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import replyService from './replyService';

const initialState = {
  replies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get comments replies
export const getReplies = createAsyncThunk(
  'replies/getAll',
  async (feedbackId, commentId, thunkAPI) => {
    try {
      return await replyService.getReplies(feedbackId, commentId);
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

// Create a comment reply
export const createReply = createAsyncThunk(
  'replies/create',
  async ({ feedbackId, ...replyData }, thunkAPI) => {
    try {
      return await replyService.createReply(feedbackId, replyData);
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

export const replySlice = createSlice({
  name: 'replies',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getReplies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReplies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getReplies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createReply.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.replies.push(action.payload);
      })
      .addCase(createReply.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = replySlice.actions;
export default replySlice.reducer;
