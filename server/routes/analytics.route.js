const express =  require('express');
const controller = require('../controllers/analytics.controller');
const router = express.Router();
const passport = require('passport');

router.get('/overview', passport.authenticate('jwt', {session: false}), controller.overview);
router.get('/analytics', passport.authenticate('jwt', {session: false}), controller.analytics);

module.exports = router;

