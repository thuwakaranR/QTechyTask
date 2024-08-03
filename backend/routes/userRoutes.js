const express = require('express');
const { registerUser, loginUser, getUser, logoutUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// for user registration
router.post('/register', registerUser);

// for user login
router.post('/login', loginUser);

// for user logout
router.post('/logout', authMiddleware, logoutUser);

// to get user by ID
router.get('/:id', authMiddleware, getUser);

module.exports = router;
