const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {

    res.render("index.ejs");
});


router.get("/uniAdmission", (req, res) => {

    res.render("uniAdmission.hbs");
});


router.get("/register", (req, res) => {

    res.render("register.hbs");
});
router.get("/login", (req, res) => {

    res.render("login.hbs");
});

router.get("/contact_us", (req, res) => {

    res.render("contact_us.ejs");
});

router.get("/about_us", (req, res) => {

    res.render("about_us.ejs");
});

router.get("/edit_profile", (req, res) => {

    res.render("edit_profile.ejs");
});

module.exports = router;