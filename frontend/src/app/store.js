import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../features/feedback/feedbackSlice';
import commentReducer from '../features/feedback/commentSlice';
import replyReducer from '../features/feedback/replySlice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    comments: commentReducer,
    replies: replyReducer,
  },
});
