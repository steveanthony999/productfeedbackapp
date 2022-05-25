import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import commentService from './commentService';

// const initialState = {
//   comments: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// Get feedback comments
export const getComments = createAsyncThunk(
  'comments/getAll',
  async (feedbackId, thunkAPI) => {
    try {
      return await commentService.getComments(feedbackId);
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

// Create a feedback comment
export const createComment = createAsyncThunk(
  'comments/create',
  async ({ feedbackId, commentData }, thunkAPI) => {
    try {
      return await commentService.createComment(feedbackId, commentData);
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

export const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
});

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(
          action.payload.comments[action.payload.comments.length - 1]
        );
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const commentSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
);

// export const { selectById, selectEntities, selectTotal, selectAll, selectIds } =
//   commentSelectors;

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
