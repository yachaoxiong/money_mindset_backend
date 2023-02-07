const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const passport = require('passport');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/getUser',  passport.authenticate("jwt", { session: false }), AuthController.getUser);

module.exports = router;