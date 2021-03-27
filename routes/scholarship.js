const express = require(`express`);
const router = express.Router();

const scholarshipController = require('../controllers/scholarship');

router.post('/scholarship',scholarshipController.showScholarships);  //PATH SHOULD BE SAME AS Form Action Path

module.exports = router;