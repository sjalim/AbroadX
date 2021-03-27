const express = require('express');

const authController = require('../controllers/auth');
const uniAddController = require('../controllers/uniAdmissionAdminAdd');
const otherAdditionController = require('../controllers/otherAddition');

const router = express.Router();


router.post('/uni_name_add',otherAdditionController.uniListAppend);

router.post('/area_add',otherAdditionController.areaAppend);



module.exports = router;