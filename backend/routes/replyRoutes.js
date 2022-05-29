const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReplies, addReply } = require('../controllers/replyController');

const { protect } = require('../middleware/authMiddleware');

// Reroute into reply router
// const replyRouter = require('./replyRoutes');
// router.use('/:feedbackId/comments/:commentId/replies', replyRouter);

router.route('/').get(protect, getReplies).post(protect, addReply);

module.exports = router;
