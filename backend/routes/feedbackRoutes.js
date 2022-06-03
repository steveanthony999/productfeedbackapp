const express = require('express');
const router = express.Router();
const {
  getFeedback,
  createFeedback,
  getSingleFeedback,
  deleteFeedback,
  updateFeedback,
} = require('../controllers/feedbackController');

const { protect } = require('../middleware/authMiddleware');

// Reroute into comment router
const commentRouter = require('./commentRoutes');
router.use('/comments', commentRouter);

router.route('/').get(protect, getFeedback).post(protect, createFeedback);

router
  .route('/:id')
  .get(protect, getSingleFeedback)
  .delete(protect, deleteFeedback)
  .put(protect, updateFeedback);

module.exports = router;
