const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const Comment = require('../models/commentModel');

// @desc    Get Comments for a Single Feedback
// @route   GET /api/feedback/:feedbackId/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }
  const feedback = await Feedback.findById(req.params.feedbackId);

  if (feedback.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('User not authorized');
  }

  const comments = await Comment.find({ feedback: req.params.feedbackId });

  res.status(200).json(comments);
});

// @desc    Create feedback comment
// @route   POST /api/feedback/:feedbackId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const feedback = await Feedback.findById(req.params.feedbackId);

  if (feedback.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('User not authorized');
  }

  const comment = await Comment.create({
    content: req.body.text,
    isStaff: false,
    feedback: req.params.feedbackId,
    user: req.user.id,
  });

  res.status(200).json(comment);
});

module.exports = {
  getComments,
  addComment,
};
