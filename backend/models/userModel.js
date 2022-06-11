const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    upvoteId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Upvote' },
    ],
    feedbackId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Feedback' },
    ],
    commentId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
