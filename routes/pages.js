const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {

    res.render("index");
});


router.get("/uniAdmission", (req, res) => {

    res.render("uniAdmission");
});


router.get("/register", (req, res) => {

    res.render("register");
});

module.exports = router;