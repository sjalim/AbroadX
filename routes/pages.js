const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.get("/", (req, res) => {

    res.render("index");
});


router.get("/uniAdmission", authController.isLoggedIn,(req, res) => {

    res.render("uniAdmission",{
        user : req.user
    });
});


router.get("/register", (req, res) => {

    res.render("register");
});
router.get("/login", (req, res) => {

    res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {

    if (req.user) {
        res.render("profile.hbs",{

            user : req.user

        });

    }
    else {
        res.redirect("/login");
    }


});


module.exports = router;