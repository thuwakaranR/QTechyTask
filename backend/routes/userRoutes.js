const express = require('express');
const { registerUser, loginUser, getUser, logoutUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser); // Add logout route with authMiddleware
router.get('/:id', authMiddleware, getUser);

module.exports = router;
