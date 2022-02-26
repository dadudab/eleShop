const express = require('express');
const passport = require('passport');
const router = express.Router();

// const { registerUser, loginUser } = require('../controllers/users');
// const { validateUser, getCurrentUser } = require('../middlewares');

const { registerUser, loginUser } = require('../controllers/users');

// router.post('/user/register', validateUser, registerUser);
// router.post('/user/login', loginUser);
// router.get('/user', getCurrentUser);

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

module.exports = router;
