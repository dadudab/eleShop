const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isUserAuth, isUserAdmin } = require('../middlewares');
const { registerUser, loginUser, countUsers } = require('../controllers/users');

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/count', isUserAuth, isUserAdmin, countUsers);

module.exports = router;
