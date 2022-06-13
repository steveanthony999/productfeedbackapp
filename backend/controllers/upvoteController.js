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

// ======================================================================================
// @desc    Add feedback Upvote
// @route   POST /api/feedback/upvotes/:id
// @access  Private
// ======================================================================================
const addUpvote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const upvote = await Upvote.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      feedbackId: req.body.feedbackId,
      upvotes: req.body.upvotes,
      $addToSet: { userId: [user._id] },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { upvoteId: [upvote._id] } },
    { new: true, upsert: true }
  );

  updatedUser.save();

  const updatedFeedback = await Feedback.findOneAndUpdate(
    { _id: req.body.feedbackId },
    { $addToSet: { upvoteId: [upvote._id] } },
    { new: true, upsert: true }
  );

  updatedFeedback.save();

  res.status(200).json(upvote);
});

// ======================================================================================
// @desc    Downvote
// @route   POST /api/feedback/:feedbackId/upvotes/:id
// @access  Private
// ======================================================================================
const downvote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const downUpvote = await Upvote.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      feedbackId: req.body.feedbackId,
      upvotes: req.body.upvotes,
      $pull: { userId: user._id },
    },
    {
      new: true,
      upsert: true,
    }
  );

  downUpvote.save();

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { upvoteId: downUpvote._id } },
    { new: true, upsert: true }
  );

  updatedUser.save();

  const updatedFeedback = await Feedback.findOneAndUpdate(
    { _id: req.body.feedbackId },
    { $pull: { upvoteId: downUpvote._id } },
    { new: true, upsert: true }
  );

  updatedFeedback.save();

  res.status(200).json(downUpvote);
});

module.exports = {
  getUpvotes,
  addUpvote,
  downvote,
};
