const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
  getUser,
  updateProfilePhoto,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getMe);

router.get('/getAll', protect, getAll);

router.get('/:id', protect, getUser);

router.patch('/:id', protect, updateProfilePhoto);

module.exports = router;
