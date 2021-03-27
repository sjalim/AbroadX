const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.get("/", authController.isLoggedIn, (req, res) => {

    res.render("index.ejs",{
        user : req.user
    });
});

router.get("/contact_us", authController.isLoggedIn, (req, res) => {

    res.render("contact_us.ejs",{
        user : req.user
    });
});

router.get("/about_us", authController.isLoggedIn, (req, res) => {

    res.render("about_us.ejs",{
        user : req.user
    });
});



router.get("/", authController.isLoggedIn, (req, res) => {

    res.render("index.ejs",{
        user : req.user
    });
});


router.get("/uniAdmission", authController.isLoggedIn,(req, res) => {

    res.render("uniAdmission.hbs",{
        user : req.user
    });
});


router.get("/register", (req, res) => {

    res.render("register.hbs");
});
router.get("/login", (req, res) => {

    res.render("login.hbs");
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