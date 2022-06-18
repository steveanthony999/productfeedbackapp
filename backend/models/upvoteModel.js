const mongoose = require('mongoose');

const upvoteSchema = mongoose.Schema(
  {
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Feedback',
    },
    upvotes: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Upvote', upvoteSchema);
