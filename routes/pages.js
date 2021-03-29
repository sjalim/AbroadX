const express = require('express');
const _ = require("lodash");
const router = express.Router();

const authController = require('../controllers/auth');
const contactUsController = require('../controllers/contact_us');
const blogController = require('../controllers/blog');
const scholarshipController = require('../controllers/scholarship');
const uniEditController = require('../controllers/uniAdmissionAdminEdit');
const uniAddController = require('../controllers/uniAdmissionAdminAdd');


router.get("/", authController.isLoggedIn, (req, res) => {

    res.render("index.ejs", {
        user: req.user
    });
});

router.get("/contact_us", authController.isLoggedIn, contactUsController.contactForm, (req, res) => {
    res.render("contact_us.ejs", {
        user: req.user,
        message: req.message
    });
});

router.get("/about_us", authController.isLoggedIn, (req, res) => {

    res.render("about_us.ejs", {
        user: req.user
    });
});

router.get("/", authController.isLoggedIn, (req, res) => {

    res.render("index.ejs", {
        user: req.user
    });
});


router.get("/uniAdmission", authController.isLoggedIn, (req, res) => {

    res.render("uniAdmission.hbs", {
        user: req.user
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
        res.render("profile.hbs", {

            user: req.user

        });

    } else {
        res.redirect("/login");
    }
});

router.post("/update_subject/:subject_id/:level", uniEditController.updateUniRecord, (req, res) => {

    res.redirect('/admin/uniAdmissionAdminEdit');

});

router.get("/delete_subject/:subject_id/:level", uniEditController.deleteUniRecord, (req, res) => {
    res.redirect('/admin/uniAdmissionAdminEdit');
});


//go to update university details
router.get("/uni_update_details/:uni_subject_id/:level", uniEditController.retrieveRecordDataUpdateDelete, uniAddController.getAreaList, uniAddController.getUniList, (req, res) => {

    console.log("at page");
    // console.log(req.results.level);
    // console.log(req.results);

    if (req.uniRecord && req.results && req.areaResults) {
        res.render("editUpdateUni.ejs", {

            result: req.uniRecord,
            uniList: req.results,
            areaList: req.areaResults
        });

    } else {
        res.redirect("/admin/uniAdmissionAdminEdit");
    }


});

//go to delete university details
router.get("/uni_delete_details/:uni_subject_id/:level", uniEditController.retrieveRecordDataUpdateDelete, (req, res) => {

    if (req.uniRecord) {
        res.render("editDeleteUni.ejs",{
        uniRecord: req.uniRecord
        });
    }


});


/*----------Blogs-----------*/
router.get("/blog", authController.isLoggedIn, blogController.showBlogs,
    (req, res) => {
        res.render("blog.ejs", {
            listOfBlogs: rows,
            user: req.user,
            notFound: message
        });
    });

// Show blog by id
router.get("/blog/blog_details/:id", authController.isLoggedIn, blogController.showBlogById,
    (req, res) => {
        res.render("blog_details.ejs", {
            blog: rows[0],
            user: req.user
        });
    });
// Delete blog
// router.get("/blog/:id", authController.isLoggedIn,blogController.deleteBlogById, (req, res) => {
//
//     res.render("blog.ejs",{
//         user : req.user
//     });
// });

/*--------Scholarship---------*/
router.get("/scholarship", scholarshipController.showScholarships,
    (req, res) => {
        if (req.user) {
            res.render("scholarship.ejs", {
                listOfCountries: countries,
                listOfScholarships: rows,
                user: req.user
            });
        } else {
            res.redirect("/login");
        }
    });

// Show Scholarship by id
router.get("/scholarship/scholarship_details/:id", scholarshipController.showScholarshipById,
    (req, res) => {
        if (req.user) {
            res.render("scholarship_details.ejs", {
                scholarship_details: rows[0],
                user: req.user
            });
        } else {
            res.redirect("/login");
        }
    });


module.exports = router;