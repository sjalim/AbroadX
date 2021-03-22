const express = require('express');

const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');


const router = express.Router();


router.post('/register',authController.register);

router.post('/login',authController.login);

router.post('/profile',profileController.profile);

router.get('/logout',authController.logout);



module.exports = router;