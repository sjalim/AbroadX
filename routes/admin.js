const express = require('express');
const flash = require('connect-flash');

const authController = require('../controllers/auth');
const router = express.Router();
const uniAddController = require('../controllers/uniAdmissionAdminAdd');
const blogController = require('../controllers/blog');
const scholarshipController = require('../controllers/scholarship');
const teamController = require('../controllers/team');
const aboutController = require('../controllers/about_us');
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

/**--------------------------Blog Admin----------------------------**/
// Show all blogs
router.get("/blog_admin", blogController.showBlogsOnAdmin,
    (req, res) => {
    res.render("blog_admin.ejs", {
        listOfBlogs: rows,
        message: req.flash('message')
    });
});

// View blogs
router.get("/blog_admin/blog_details/:id", authController.isLoggedIn, blogController.showBlogByIdAdmin,
    (req, res) => {
        res.render("blog_details.ejs",{
            blog: rows[0],
            user : req.user,
            checkAdmin: true
        });
})

// Add blogs
router.get("/blog_admin/add_blog", blogController.addBlogs,
    (req, res) => {
        res.render("add_blog.ejs", {
            labelWarning: labelMsg
        })
})
router.post('/blog_admin/add_blog',blogController.addBlogs);

// Edit blogs
router.get("/blog_admin/edit_blog/:id", blogController.editBlogs,
    (req, res) => {
        res.render("edit_blog.ejs",{
            blog: rows[0],
            labelWarning: labelMsg
        });
    })
router.post('/blog_admin/edit_blog/:id',blogController.editBlogs);

// Delete blogs
router.get("/blog_admin/:id", blogController.deleteBlogs,
    (req, res) => {
        res.render("blog_admin.ejs", {
            listOfBlogs: rows,
            message: req.flash('message')
        });
    });
router.post('/blog_admin/:id',blogController.deleteBlogs);

/**--------------------------Scholarship Admin----------------------------**/
// Show all scholarships
router.get("/scholarship_admin", scholarshipController.showScholarshipsOnAdmin,
    (req, res) => {
        res.render("scholarship_admin.ejs", {
            listOfScholarships: rows,
            message: req.flash('message')
        });
    });

// View scholarships
router.get("/scholarship_admin/scholarship_details/:id", authController.isLoggedIn,
    scholarshipController.showScholarshipByIdAdmin, (req, res) => {
        res.render("scholarship_details.ejs",{
            scholarship: rows[0],
            user : req.user,
            checkAdmin: true
        });
    })

// Add Scholarships
router.get("/scholarship_admin/add_scholarship", scholarshipController.addScholarships,
    (req, res) => {
        res.render("add_scholarship.ejs", {
            labelWarning: labelMsg
        })
    })
router.post('/scholarship_admin/add_scholarship',scholarshipController.addScholarships);

// Edit Scholarships
router.get("/scholarship_admin/edit_scholarship/:id", scholarshipController.editScholarships,
    (req, res) => {
        res.render("edit_blog.ejs",{
            scholarship: rows[0],
            labelWarning: labelMsg
        });
    })
router.post('/scholarship_admin/edit_scholarship/:id',scholarshipController.editScholarships);


// Delete Scholarships
router.get("/scholarship_admin/:id", scholarshipController.deleteScholarships,
    (req, res) => {
        res.render("scholarship_admin.ejs", {
            listOfBlogs: rows,
            message: req.flash('message')
        });
    });
router.post('/scholarship_admin/:id',scholarshipController.deleteScholarships);

/**--------------------------Team Admin----------------------------**/
// Show all members
router.get("/team_admin", teamController.showMembers,
    (req, res) => {
        res.render("team_admin.ejs", {
            listOfMembers: rows,
            message: req.flash('message')
        });
    });

// Add members
router.get("/team_admin/add_team", teamController.addMembers,
    (req, res) => {
        res.render("add_team.ejs", {
            labelWarning: labelMsg
        })
    })
router.post('/team_admin/add_team',teamController.addMembers);

// Edit members
router.get("/team_admin/edit_team/:id", teamController.editMembers,
    (req, res) => {
        res.render("edit_team.ejs",{
            member: rows[0],
            labelWarning: labelMsg
        });
    })
router.post('/team_admin/edit_team/:id',teamController.editMembers);

// Delete members
router.get("/team_admin/:id", teamController.deleteMembers,
    (req, res) => {
        res.render("team_admin.ejs", {
            listOfMembers: rows,
            message: req.flash('message')
        });
    });
router.post('/team_admin/:id',teamController.deleteMembers);

/**--------------------------About us Admin----------------------------**/
router.get("/edit_aboutUs", aboutController.editAboutUs,
    (req, res) => {
        res.render("edit_team.ejs",{
            aboutUs: rows[0],
            labelWarning: labelMsg,
            message: req.flash('message')
        });
    })
router.post('/edit_aboutUs',aboutController.editAboutUs);

module.exports = router;