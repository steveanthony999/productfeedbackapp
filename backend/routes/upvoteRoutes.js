const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getUpvotes,
  createUpvote,
  addUpvote,
  removeUpvote,
} = require('../controllers/upvoteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUpvotes).post(protect, createUpvote);

router.route('/:id').delete(protect, removeUpvote).put(protect, addUpvote);

module.exports = router;
