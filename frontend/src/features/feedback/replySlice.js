import { createSlice } from '@reduxjs/toolkit';

const initialState = { replyId: '', isOpen: false };

export const replySlice = createSlice({
  name: 'replies',
  initialState,
  reducers: {
    toggleReplyBox(state, action) {
      state.replyId = action.payload._id;
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleReplyBox } = replySlice.actions;
export default replySlice.reducer;
