const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const Upvote = require('../models/upvoteModel');

// @desc    Get User Feedback
// @route   GET /api/feedback
// @access  Private
const getFeedback = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  //   const feedback = await Feedback.find({ user: req.user.id });
  const feedback = await Feedback.find();

  res.status(200).json(feedback);
});

// @desc    Get User Single Feedback
// @route   GET /api/feedback/:id
// @access  Private
const getSingleFeedback = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const feedback = await Feedback.findById(req.params.id); // Gets single feedback from url

  if (!feedback) {
    res.status(404);

    throw new Error('Feedback not found');
  }

  if (feedback.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('Not Authorized');
  }

  res.status(200).json(feedback);
});

// ======================================================================================
// @desc    Create New Feedback
// @route   POST /api/feedback
// @access  Private
// ======================================================================================
const createFeedback = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    res.status(400);

    throw new Error('Please add a title, category, and description');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const feedback = await Feedback.create({
    title,
    category,
    description,
    userId: req.user.id, // The user who created the feedback
    status: 'Suggestion',
  });

  //   Create the upvotes for this feedback
  const upvote = await Upvote.create({
    feedbackId: feedback._id,
    upvotes: 1,
    userId: [user._id],
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { upvoteId: [upvote._id] } },
    { new: true, upsert: true }
  );

  updatedUser.save();

  res.status(201).json(feedback);
});

// @desc    Delete Feedback
// @route   DELETE /api/feedback/:id
// @access  Private
const deleteFeedback = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const feedback = await Feedback.findById(req.params.id); // Gets feedback from url

  if (!feedback) {
    res.status(404);

    throw new Error('Feedback not found');
  }

  if (feedback.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('Not Authorized');
  }

  await feedback.remove();

  res.status(200).json({ success: true });
});

// @desc    Update Feedback
// @route   PUT /api/feedback/:id
// @access  Private
const updateFeedback = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const feedback = await Feedback.findById(req.params.id); // Gets feedback from url

  if (!feedback) {
    res.status(404);

    throw new Error('Feedback not found');
  }

  //   if (feedback.user.toString() !== req.user.id) {
  //     res.status(401);

  //     throw new Error('Not Authorized');
  //   }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedFeedback);
});

module.exports = {
  getFeedback,
  createFeedback,
  getSingleFeedback,
  deleteFeedback,
  updateFeedback,
};
