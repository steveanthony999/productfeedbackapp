const mongoose = require('mongoose');

const replySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Relates field to the user's object id
      required: true,
      ref: 'User',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Comment',
    },
    content: {
      type: String,
      required: [true, 'Please add some content'],
    },
    replyingTo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reply', replySchema);
