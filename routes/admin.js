const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();
const uniAddController = require('../controllers/uniAdmissionAdminAdd');

router.get("/", (req, res) => {

    res.render("admin.hbs");
});

router.get("/uniAdmissionAdminAdd", uniAddController.getUniList, uniAddController.getAreaList, (req, res) => {

    console.log("admin");


    if (req.results && req.areaResults) {

        // req.session.valid = null;
        res.render("uniAdmissionAdminAdd.hbs", {
            results: req.results,
            areaResults: req.areaResults
        });


        // let message = req.session.valid;
        // if (message) {
        //
        //     res.render("uniAdmissionAdminAdd.hbs", {
        //         results: req.results,
        //         areaResults: req.areaResults,
        //         message: message
        //     });
        // } else {
        //     req.session.valid = null;
        //     res.render("uniAdmissionAdminAdd.hbs", {
        //         results: req.results,
        //         areaResults: req.areaResults
        //     });
        // }

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