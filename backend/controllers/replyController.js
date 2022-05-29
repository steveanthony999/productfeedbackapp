const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const Comment = require('../models/commentModel');
const Reply = require('../models/replyModel');

// @desc    Get Replies for a Comment
// @route   GET /api/feedback/:feedbackId/comments/:commentId/replies
// @access  Private
const getReplies = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }
  const comment = await Comment.findById(req.params.commentId);

  if (comment.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('User not authorized');
  }

  const replies = await Reply.find({ comment: req.params.commentId });

  res.status(200).json(replies);
});

// @desc    Create Comment Reply
// @route   POST /api/feedback/:feedbackId/comments/:commentId
// @access  Private
const addReply = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const comment = await Comment.findById(req.params.commentId);

  if (comment.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('User not authorized');
  }

  const reply = await Reply.create({
    content: req.body.text,
    isStaff: false,
    comment: req.params.commentId,
    user: req.user.id,
    replyingTo: req.body.replyingTo,
  });

  res.status(200).json(reply);
});

module.exports = {
  getReplies,
  addReply,
};
