const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getUpvotes,
  addUpvote,
  downvote,
} = require('../controllers/upvoteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUpvotes);

router.route('/:id').put(protect, downvote).post(protect, addUpvote);

module.exports = router;
