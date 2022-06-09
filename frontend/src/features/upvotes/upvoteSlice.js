import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import upvoteService from './upvoteService';

const initialState = {
  upvotes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get Upvotes
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

// Create Upvote
export const createUpvote = createAsyncThunk(
  'upvotes/create',
  async ({ upvoteData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await upvoteService.createUpvote(upvoteData, token);
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

// Add Upvote
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
      .addCase(createUpvote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUpvote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.upvotes.push(action.payload);
      })
      .addCase(createUpvote.rejected, (state, action) => {
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
      });
  },
});

export const { reset } = upvoteSlice.actions;
export default upvoteSlice.reducer;
