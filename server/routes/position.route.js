const express =  require('express');
const controller = require('../controllers/position.controller');
const router = express.Router();

router.get('/:caterogyId', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;

