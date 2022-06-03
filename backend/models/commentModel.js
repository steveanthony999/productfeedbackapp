const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Relates field to the user's object id
      required: true,
      ref: 'User',
    },
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Feedback',
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    content: {
      type: String,
      required: [true, 'Please add some content'],
    },
    replyingTo: {
      type: String,
    },
    isReply: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
