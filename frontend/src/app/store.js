import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../features/feedback/feedbackSlice';
import commentReducer from '../features/feedback/commentSlice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    comments: commentReducer,
  },
});
