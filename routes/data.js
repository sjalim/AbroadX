const express = require('express');

const authController = require('../controllers/auth');
const uniAddController = require('../controllers/uniAdmissionAdminAdd');
const otherAdditionController = require('../controllers/otherAddition');
const uniEditController = require('../controllers/uniAdmissionAdminEdit');
const router = express.Router();


router.post('/uni_name_add',otherAdditionController.uniListAppend);

router.post('/area_add',otherAdditionController.areaAppend);

router.post('/add_new_varsity_record',uniAddController.admissionRecordStore);

router.post('/update_varsity_record',uniEditController.updateUniRecord);

router.post('/delete_varsity_record',uniEditController.deleteUniRecord);


module.exports = router;