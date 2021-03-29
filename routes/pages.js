const express = require('express');
const _ = require("lodash");
const router = express.Router();

const indexController = require('../controllers/index');
const authController = require('../controllers/auth');
const contactUsController = require('../controllers/contact_us');
const blogController = require('../controllers/blog');
const scholarshipController = require('../controllers/scholarship');
const teamController = require('../controllers/team');
const aboutController = require('../controllers/about_us');


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