const express = require('express');
const router = express.Router({ mergeParams: true });
const { getComments, addComment } = require('../controllers/commentController');

const { protect } = require('../middleware/authMiddleware');

// Reroute into reply router
const replyRouter = require('./replyRoutes');
router.use('/:feedbackId/comments/:commentId/replies', replyRouter);

router.route('/').get(protect, getComments).post(protect, addComment);

module.exports = router;
