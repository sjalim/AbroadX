const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();
const uniAddController = require('../controllers/uniAdmissionAdminAdd');

router.get("/", (req, res) => {

    res.render("admin.hbs");
});

router.get("/uniAdmissionAdminAdd", uniAddController.getUniList, (req, res) => {

    console.log("admin");
    if (req.results) {
        res.render("uniAdmissionAdminAdd.hbs", {
            results: req.results
        });

    } else {
        res.redirect("/uniAdmissionAdminAdd");
    }

});

router.get("/uniAdmissionAdminEdit", (req, res) => {

    res.render("uniAdmissionAdminEdit.hbs");
});
router.get("/otherAddition", (req, res) => {
    res.render("otherAddition.hbs");
});


module.exports = router;