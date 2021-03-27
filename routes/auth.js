const express = require('express');

const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');


const router = express.Router();



// console.log("at route/auth");
router.post('/register',authController.register);

router.post('/login',authController.login);

router.post('/profile',profileController.profileUpdate);

router.get('/logout',authController.logout);

// router.post();




module.exports = router;