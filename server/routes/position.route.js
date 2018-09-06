const express =  require('express');
const controller = require('../controllers/position.controller');
const router = express.Router();
const passport = require('passport');

router.get('/:caterogyId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);

module.exports = router;

