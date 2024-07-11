const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const passport = require('passport');
require('../../passport')(passport);

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/check', passport.authenticate("jwt", { session: false }), controller.checkToken);

module.exports = router;
