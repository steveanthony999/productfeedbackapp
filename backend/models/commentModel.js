const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Relates field to the user's object id
      required: true,
      ref: 'User',
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Feedback',
    },
    content: {
      type: String,
      required: [true, 'Please add some content'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
