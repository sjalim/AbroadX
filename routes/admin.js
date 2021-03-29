const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();
const uniAddController = require('../controllers/uniAdmissionAdminAdd');
const uniEditController = require('../controllers/uniAdmissionAdminEdit');

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

router.get("/uniAdmissionAdminEdit", uniEditController.getEditData, (req, res) => {

    // console.log("edit at admin");
    if (req.dataRecord) {
        res.render("uniAdmissionAdminEdit.hbs",{
            universityData :req.dataRecord
        });

    }
    else {
        res.redirect("/uniAdmissionAdminEdit");
    }

});
router.get("/otherAddition", (req, res) => {
    res.render("otherAddition.hbs");
});


module.exports = router;