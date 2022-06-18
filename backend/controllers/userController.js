const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const Upvote = require('../models/upvoteModel');
const Comment = require('../models/commentModel');

// ======================================================================================
// @desc    Register a user
// @route   /api/users
// @access  Public
// ======================================================================================
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, image, email, password } = req.body;

  //   Validation
  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //   Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create user
  const user = await User.create({
    name,
    username,
    image:
      'https://res.cloudinary.com/dknh8hdvp/image/upload/v1655404591/profilepics/guest-user_griyvw.jpg',
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      image: user.image,
      email: user.email,
      upvoteId: user.upvoteId,
      feedbackId: user.feedbackId,
      commentId: user.commentId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// ======================================================================================
// @desc    Login a user
// @route   /api/users/login
// @access  Public
// ======================================================================================
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      image: user.image,
      email: user.email,
      upvoteId: user.upvoteId,
      feedbackId: user.feedbackId,
      commentId: user.commentId,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid credentials');
  }
});

// ======================================================================================
// @desc    Get Current User
// @route   /api/users/me
// @access  Private
// ======================================================================================
const getMe = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    username: req.user.username,
    image: req.user.image,
    upvoteId: req.user.upvoteId,
    feedbackId: req.user.feedbackId,
    commentId: req.user.commentId,
  };

  res.status(200).json(user);
});

// ======================================================================================
// @desc    Get all users
// @route   /api/users/getAll
// @access  Private
// ======================================================================================
const getAll = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const users = await User.find();

  res.status(200).json(users);
});

// ======================================================================================
// @desc    Get Single User
// @route   GET /api/users/:id
// @access  Private
// ======================================================================================
const getUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const singleUser = await User.findById(req.params.id);

  if (!singleUser) {
    res.status(404);

    throw new Error('User not found');
  }

  res.status(200).json(singleUser);
});

// ======================================================================================
// @desc    Update User Profile Photo
// @route   PATCH /api/users/:id
// @access  Private
// ======================================================================================
const updateProfilePhoto = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { image: req.body.imageUrl },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

// ======================================================================================
// @desc    Update Profile Info
// @route   PUT /api/users/:id
// @access  Private
// ======================================================================================
const updateProfileInfo = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const updatedProfile = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });

  res.status(200).json(updatedProfile);
});

// ======================================================================================
// @desc    Delete All User Stats
// @route   PATCH /api/users/:id
// @access  Private
// ======================================================================================
const deleteStats = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      feedbackId: req.body.clearStats.feedbackId,
      upvoteId: req.body.clearStats.upvoteId,
      commentId: req.body.clearStats.commentId,
    },
    {
      new: true,
    }
  );

  // *** Decrements the upvoteCount on all feedbacks the user upvoted on
  const upvoteData = await Upvote.find({ userId: user._id });

  for (let i = 0; i < upvoteData.length; i++) {
    await Feedback.findOneAndUpdate(
      { _id: upvoteData[i].feedbackId },
      { $inc: { upvoteCount: -1 } }
    );
  }

  // *** Delete commentId from Feedback
  const commentData = await Comment.find({ userId: user._id });

  await Feedback.updateMany({
    $pullAll: {
      commentId: commentData.map((x) => x._id),
    },
  });

  //   *** Deletes the comments created by the user
  await Comment.deleteMany({
    userId: { $eq: user._id },
  });

  //   *** Deletes the upvotes created by the user
  await Upvote.deleteMany({
    createdByUserId: { $eq: user._id },
  });

  //   *** Deletes the feedback associated with the user
  await Feedback.deleteMany({
    userId: { $eq: user._id },
  });

  // *** Decrements the upvotes on all feedbacks the user upvoted on
  await Upvote.updateMany({ userId: user._id }, { $inc: { upvotes: -1 } });

  // *** Delete the upvotes by the user on other user's feedback
  await Upvote.updateMany({
    $pullAll: {
      userId: [user._id],
    },
  });

  // *** Delete the comments by user on all feedbacks the user commented on
  await Comment.deleteMany({ userId: { $eq: user._id } });

  res.status(200).json(updatedUser);
});

// ======================================================================================
// ======================================================================================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  getUser,
  updateProfilePhoto,
  updateProfileInfo,
  deleteStats,
};
