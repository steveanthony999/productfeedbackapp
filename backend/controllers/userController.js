const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

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
    image,
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
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    username: req.user.username,
    image: req.user.image,
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

  //   const feedback = await Feedback.find({ user: req.user.id });
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
// ======================================================================================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, getMe, getAll, getUser };
