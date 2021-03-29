const express = require('express');
const _ = require("lodash");
const router = express.Router();

const indexController = require('../controllers/index');
const authController = require('../controllers/auth');
const contactUsController = require('../controllers/contact_us');
const blogController = require('../controllers/blog');
const scholarshipController = require('../controllers/scholarship');
const uniEditController = require('../controllers/uniAdmissionAdminEdit');
const uniAddController = require('../controllers/uniAdmissionAdminAdd');
const uniAdmissionController = require('../controllers/uniAdmission');
const faqController = require('../controllers/faq');
const profileController = require('../controllers/profile');
const aboutController = require('../controllers/about_us');
const teamController = require('../controllers/team');



router.get("/", authController.isLoggedIn, indexController.counter, (req, res) => {
    res.render("index.ejs",{
        user : req.user,
        countUniversities: totalUniversities,
        countScholarships: totalScholarships,
        countTopics: totalTopics
    });
});

router.get("/contact_us",authController.isLoggedIn, contactUsController.contactForm, (req, res) => {
    res.render("contact_us.ejs",{
        user : req.user,
        message: message
    });
});

router.get("/about_us", authController.isLoggedIn, aboutController.showAboutUs,(req, res) => {
    res.render("about_us.ejs",{
        aboutUs: rows[0],
        user : req.user
    });
});

router.get("/team", authController.isLoggedIn, teamController.showTeamMembers, (req, res) => {
    res.render("team.ejs",{
        listOfMembers: rows,
        user : req.user
    });
});

router.get("/", authController.isLoggedIn, (req, res) => {

    res.render("index.ejs",{
        user : req.user
    });
});


router.get("/uniAdmission", authController.isLoggedIn, uniEditController.getEditData, uniAddController.getAreaList, (req, res) => {

    // console.log(req.dataRecord);

    if (req.user && req.dataRecord) {
        res.render("uniAdmission.ejs", {
            user: req.user,
            dataRecord: req.dataRecord,
            areaList: req.areaResults,
            selectedArea: null,
            selectedLevel: null

        });
    } else {
        res.redirect("/login");
    }
});

router.get("/uniAdmission/uni_update_details/:level/:id", authController.isLoggedIn, uniAdmissionController.selectedContent, (req, res) => {

    if (req.user && req.dataRecord && req.selectedUni) {
        res.render("uniAdmissionDetails.ejs", {

            user: req.user,
            selectedData: req.dataRecord,
            selectedUni: req.selectedUni
        });
    }
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

//update confirm
router.post("/update_subject/:subject_id/:level", uniEditController.updateUniRecord, (req, res) => {

    res.redirect('/admin/uniAdmissionAdminEdit');

});

//delete confirm
router.get("/delete_subject/:subject_id/:level", uniEditController.deleteUniRecord, (req, res) => {
    res.redirect('/admin/uniAdmissionAdminEdit');
});


router.post("/search", uniAdmissionController.searchContent, authController.isLoggedIn, uniAddController.getAreaList, (req, res) => {

    res.render("uniAdmission.ejs", {
        user: req.user,
        dataRecord: req.dataRecord,
        areaList: req.areaResults,
        selectedLevel: req.level,
        selectedArea: req.area

    });


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
        res.render("editDeleteUni.ejs", {
            uniRecord: req.uniRecord
        });
    }
});


router.get("/faq", authController.isLoggedIn,faqController.faq, (req, res) => {


        res.render("faq.ejs",{
            user: req.user,
            faqs: req.faqs
        });

});

router.post("/faq/search",authController.isLoggedIn,faqController.searchFaq,(req,res)=>{


    console.log('at page');
        res.render("faq.ejs",{
            user: req.user,
            faqs: req.faqs
        });
});

router.post("/profile/change_pic/:id",authController.isLoggedIn,profileController.uploadProfilePic,(req,res)=>{

    if (req.user) {
        res.render("profile.hbs", {
            user: req.user
        });
    } else {
        res.redirect("/login");
    }
});

/**-----------------Blogs-----------------**/
router.get("/blog", authController.isLoggedIn,blogController.showBlogs,
    (req, res) => {
    res.render("blog.ejs",{
        listOfBlogs: rows,
        user : req.user,
        notFound: message
    });
});

// Show blog by id
router.get("/blog/blog_details/:id", authController.isLoggedIn,blogController.showBlogById,
    (req, res) => {
    res.render("blog_details.ejs",{
        blog: rows[0],
        user : req.user,
        checkAdmin: false
    });
});
// Delete blog
// router.get("/blog/:id", authController.isLoggedIn,blogController.deleteBlogById, (req, res) => {
//
//     res.render("blog.ejs",{
//         user : req.user
//     });
// });

/**--------------Scholarship--------------**/
router.get("/scholarship", scholarshipController.showScholarships,
    (req, res) => {
    if (req.user) {
        res.render("scholarship.ejs",{
            listOfCountries: countries,
            listOfScholarships: rows,
            user : req.user
        });
    }
    else {
        res.redirect("/login");
    }
});

// Show Scholarship by id
router.get("/scholarship/scholarship_details/:id", scholarshipController.showScholarshipById,
    (req, res) => {
        if (req.user) {
            res.render("scholarship_details.ejs",{
                scholarship_details: rows[0],
                user : req.user,
                checkAdmin: false
            });
        }
        else {
            res.redirect("/login");
        }
});


module.exports = router;