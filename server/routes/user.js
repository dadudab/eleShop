const express = require('express');
const passport = require('passport');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/users');
const { giveUser } = require('../middlewares');

router.post('/user/register', registerUser);
router.post('/user/login', loginUser, giveUser);

module.exports = router;
