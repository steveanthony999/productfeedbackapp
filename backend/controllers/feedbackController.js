const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const Upvote = require('../models/upvoteModel');
const Comment = require('../models/commentModel');

// ======================================================================================
// @desc    Get All Feedback
// @route   GET /api/feedback
// @access  Private
// ======================================================================================
const getFeedback = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const feedback = await Feedback.find();

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

  await User.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { upvoteId: [upvote._id], feedbackId: [feedback._id] } },
    { new: true, upsert: true }
  );

  res.status(201).json(feedback);
});

// ======================================================================================
// @desc    Delete Feedback
// @route   DELETE /api/feedback/:id
// @access  Private
// ======================================================================================
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

  //   *** Deletes the feedback, upvotes, and comments IDs from all users
  const upvote = await Upvote.findOne({
    feedbackId: { $eq: feedback._id },
  });

  const comment = await Comment.find({
    feedbackId: feedback._id,
  });

  await User.updateMany({
    $pullAll: {
      feedbackId: [feedback._id],
      upvoteId: [upvote._id],
      commentId: comment.map((x) => x._id),
    },
  });

  //   *** Deletes the upvotes document associated with the feedback
  await Upvote.findOneAndDelete({
    feedbackId: { $eq: feedback._id },
  });

  //   *** Deletes the comments documents associated with the feedback
  await Comment.deleteMany({
    feedbackId: { $eq: feedback._id },
  });

  await feedback.remove();

  res.status(200).json({ success: true });
});

// ======================================================================================
// @desc    Update Feedback
// @route   PUT /api/feedback/:id
// @access  Private
// ======================================================================================
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

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedFeedback);
});

// ======================================================================================
// ======================================================================================

module.exports = {
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
};
