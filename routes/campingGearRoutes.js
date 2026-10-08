const express = require('express');

const router = express.Router();

const campingGearController = require('../controllers/campingGearController');

const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', campingGearController.getAll);

router.get('/:id', campingGearController.getById);

router.post('/', cekApiKey, campingGearController.create);

router.put('/:id', cekApiKey, campingGearController.update);

router.delete('/:id', cekApiKey, campingGearController.remove);

module.exports = router;