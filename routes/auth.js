const express = require('express');

const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');
const contactUsController = require('../controllers/contact_us');

const router = express.Router();

router.post('/register',authController.register);

router.post('/login',authController.login);

router.post('/profile',profileController.profileUpdate);

router.get('/logout',authController.logout);

router.post('/contact_us',contactUsController.contactForm);

module.exports = router;