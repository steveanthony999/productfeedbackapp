const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const Upvote = require('../models/upvoteModel');

// @desc    Get Upvotes for Feedback
// @route   GET /api/feedback/upvotes
// @access  Private
const getUpvotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const upvotes = await Upvote.find();

  res.status(200).json(upvotes);
});

// @desc    Add feedback Upvote
// @route   POST /api/feedback/upvotes
// @access  Private
const createUpvote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  // const upvote = await Upvote.findById(req.params.id);

  const upvote = await Upvote.create({
    feedbackId: req.body.feedbackId,
    upvotes: req.body.upvotes,
  });

  res.status(200).json(upvote);
});

// @desc    Add feedback Upvote
// @route   POST /api/feedback/upvotes
// @access  Private
const addUpvote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const upvote = await Upvote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(upvote);
});

// @desc    Remove Feedback Upvote
// @route   DELETE /api/feedback/:feedbackId/upvotes/:id
// @access  Private
const removeUpvote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const upvote = await Upvote.findById(req.params.id); // Gets upvote from url

  if (!upvote) {
    res.status(404);

    throw new Error('Upvote not found');
  }

  await upvote.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getUpvotes,
  createUpvote,
  addUpvote,
  removeUpvote,
};
