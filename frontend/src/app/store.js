import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../features/feedback/feedbackSlice';
import commentReducer from '../features/feedback/commentSlice';
import replyReducer from '../features/feedback/replySlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    comments: commentReducer,
    replies: replyReducer,
    auth: authReducer,
    users: userReducer,
  },
});
