import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import upvoteService from './upvoteService';

const initialState = {
  upvotes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// ======================================================================================
// Get All Upvotes
// ======================================================================================
export const getUpvotes = createAsyncThunk(
  'upvotes/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await upvoteService.getUpvotes(token);
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

// ======================================================================================
// Add Upvote
// ======================================================================================
export const addUpvote = createAsyncThunk(
  'upvotes/add',
  async ({ upvoteId, upvoteData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await upvoteService.addUpvote(upvoteId, upvoteData, token);
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

// Remove Upvote
export const downvote = createAsyncThunk(
  'upvotes/downvote',
  async ({ upvoteId, downvoteData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await upvoteService.downvote(upvoteId, downvoteData, token);
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

// ======================================================================================
// Upvote Slice
// ======================================================================================
export const upvoteSlice = createSlice({
  name: 'upvotes',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getUpvotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUpvotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.upvotes = action.payload;
      })
      .addCase(getUpvotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addUpvote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUpvote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.upvotes.push(action.payload);
      })
      .addCase(addUpvote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(downvote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downvote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.upvotes.push(action.payload);
      })
      .addCase(downvote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = upvoteSlice.actions;
export default upvoteSlice.reducer;
