const mysql = require("mysql");
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
const path = require('path');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
/**-----------------Scholarship User End--------------------**/

exports.showScholarships =async (req, res, next) => {
    const searchTerm = req.body.search;
    /*Checking if User is logged in*/
    if (req.cookies.jwt) {
        try {
            //verify the cookies
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);
            db.query('select * from users where id = ?', [decoded.id], (error, result) => {
                if (!result) {
                    return next(); /*User doesn't exist, skip to next*/
                }
                /*User logged in, Continue*/
                req.user = result[0];
                if(searchTerm) {
                    db.query('SELECT * FROM scholarships WHERE country = ?',[searchTerm], async (err, selectedCountry) => {
                        if(!err) {
                            db.query('SELECT DISTINCT country FROM scholarships', async (err, countries) => {
                                if(!err) {
                                    res.render(`scholarship`, {
                                        listOfCountries: countries,
                                        listOfScholarships: selectedCountry,
                                        user: req.user
                                    })
                                } else {
                                    console.log(err)
                                }
                            });
                        } else {
                            console.log(err)
                        }
                    })
                } else {
                    /*Showing all blogs*/
                    db.query('SELECT * FROM scholarships', async (err, rows) => {
                        if(!err) {
                            db.query('SELECT DISTINCT country FROM scholarships', async (err, countries) => {
                                if(!err) {
                                    res.render(`scholarship`, {
                                        listOfCountries: countries,
                                        listOfScholarships: rows,
                                        user: req.user
                                    })
                                } else {
                                    console.log(err)
                                }
                            });
                        } else {
                            console.log(err)
                        }
                    });
                }
            });
            console.log(decoded);
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next(); /*User not logged in, skip to next*/
    }
}

//Show Scholarships Individually
exports.showScholarshipById = async (req, res, next) => {
    /*Checking if User is logged in*/
    if (req.cookies.jwt) {
        try {
            //verify the cookies
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);
            db.query('select * from users where id = ?', [decoded.id], (error, result) => {
                console.log(result);
                if (!result) {
                    return next(); /*User doesn't exist, skip to next*/
                }
                /*User logged in, Continue*/
                req.user = result[0];
                db.query('SELECT * FROM scholarships WHERE scholarshipId = ?', [req.params.id], async (err, rows) => {
                    if(!err) {
                        res.render(`scholarship_details`, {
                            scholarship: rows[0],
                            user: req.user,
                            checkAdmin: false
                        })
                    } else {
                        console.log(err)
                    }
                })
            });
            console.log(decoded);
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next(); /*User not logged in, skip to next*/
    }
}

/**-----------------Scholarship Admin End--------------------**/
// Show scholarship
exports.showScholarshipsOnAdmin = (req, res) => {
    db.query('SELECT * FROM scholarships', async (err, rows) => {
        if(!err) {
            res.render(`scholarship_admin`, {
                listOfScholarships: rows,
                message: req.flash('message')
            })
        } else {
            console.log(err)
        }
    })
}

//Show Scholarships Individually on Admin
exports.showScholarshipByIdAdmin = (req, res) => {
    db.query('SELECT * FROM scholarships WHERE scholarshipId = ?', [req.params.id], async (err, rows) => {
        if(!err) {
            res.render(`scholarship_details`, {
                scholarship: rows[0],
                user: req.user,
                checkAdmin: true
            })
        } else {
            console.log(err)
        }
    })
}

// Add scholarship
exports.addScholarships = (req, res) => {
    var labelMsg = '';

    if(req.method === "POST") {
        const scholarshipTitle = req.body.scholarshipTitle;
        const country = req.body.country;
        const university = req.body.university;
        const fundingType = req.body.fundingType;
        const programType = req.body.programType;
        const subject = req.body.subject;
        const eligibleList = req.body.eligibleList;
        const scholarshipBenefits = req.body.scholarshipBenefits;
        const scholarshipDescription = req.body.scholarshipDescription;
        const degreeLevel = req.body.degreeLevel;
        const availableSubjects = req.body.availableSubjects;
        const eligibleNationalities = req.body.eligibleNationalities;
        const eligibilityCriteria = req.body.eligibilityCriteria;
        const date = req.body.date;

        if(!scholarshipTitle || !country || !university || !fundingType || !programType
                || !subject || !eligibleList || !scholarshipBenefits || !scholarshipDescription
                || !degreeLevel || !availableSubjects || !eligibleNationalities || !eligibilityCriteria) {
            labelMsg = "Fill all the fields properly";
            res.render('add_scholarship.ejs',{
                labelWarning: labelMsg
            });
        } else {
            if (!req.files)
                return res.status(400).send('No images were uploaded.');

            const imageFile = req.files.uploaded_image;
            const img_name = imageFile.name;

            const ext = path.extname(img_name);
            const customImgName = _.kebabCase(scholarshipTitle) + ext;

            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'
                || ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                console.log(img_name)
                imageFile.mv('public/img/scholarships/'+ customImgName, function(err) {
                    if (err)
                        return res.status(500).send(err);
                    const sql = "INSERT INTO `scholarships`(`scholarshipTitle`,`country`,`university`," +
                            "`fundingType`,`programType`,`subject`,`eligibleList`,`scholarshipBenefits`,`scholarshipDescription`,`degreeLevel`," +
                            "`availableSubjects`,`eligibleNationalities`,`eligibilityCriteria`,`date`,`universityImage`) " +
                        "VALUES ('" + scholarshipTitle + "','" + country + "','" + university + "','"+fundingType+"'," +
                            "'"+programType+"','"+subject+"','"+eligibleList+"','"+scholarshipBenefits+"','"+scholarshipDescription+"'," +
                            "'"+degreeLevel+"','"+availableSubjects+"','"+eligibleNationalities+"','"+eligibilityCriteria+"','"+date+"','"+customImgName+ "')";

                    db.query(sql, function(err, result) {
                        req.flash('message', 'Added successfully');
                        res.redirect('/admin/scholarship_admin');
                    });
                });
            } else {
                labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                res.render('add_scholarship.ejs',{
                    labelWarning: labelMsg
                });
            }
        }
    } else {
        res.render('add_scholarship.ejs', {
            labelWarning: labelMsg
        });
    }
}

// Edit scholarship
exports.editScholarships = (req, res) => {
    var labelMsg = '';

    if(req.method === "POST") {
        const scholarshipTitle = req.body.scholarshipTitle;
        const country = req.body.country;
        const university = req.body.university;
        const fundingType = req.body.fundingType;
        const programType = req.body.programType;
        const subject = req.body.subject;
        const eligibleList = req.body.eligibleList;
        const scholarshipBenefits = req.body.scholarshipBenefits;
        const scholarshipDescription = req.body.scholarshipDescription;
        const degreeLevel = req.body.degreeLevel;
        const availableSubjects = req.body.availableSubjects;
        const eligibleNationalities = req.body.eligibleNationalities;
        const eligibilityCriteria = req.body.eligibilityCriteria;
        const date = req.body.date;

        if(!scholarshipTitle || !country || !university || !fundingType || !programType
            || !subject || !eligibleList || !scholarshipBenefits || !scholarshipDescription
            || !degreeLevel || !availableSubjects || !eligibleNationalities || !eligibilityCriteria) {
            labelMsg = "Fill all the fields properly";
            res.render('edit_scholarship.ejs',{
                labelWarning: labelMsg
            });
        } else {
            if(req.files) {
                const imageFile = req.files.uploaded_image;
                const img_name = imageFile.name;

                const ext = path.extname(img_name);
                const customImgName = _.kebabCase(scholarshipTitle) + ext;

                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'
                    || ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                    console.log(img_name)
                    imageFile.mv('public/img/scholarships/'+ customImgName, function(err) {
                        if (err)
                            return res.status(500).send(err);

                        db.query(`UPDATE scholarships SET scholarshipTitle=?,country=?, university=?, 
                            fundingType=?, programType=?, subject=?, eligibleList=?, 
                            scholarshipBenefits=?, scholarshipDescription=?, degreeLevel=?, availableSubjects=?, 
                            eligibleNationalities=?, eligibilityCriteria=?, date=?, universityImage=? WHERE scholarshipId=?`

                            , [ scholarshipTitle,country,university,fundingType,programType,subject,eligibleList,
                                scholarshipBenefits,scholarshipDescription,degreeLevel,availableSubjects,eligibleNationalities,
                                eligibilityCriteria,date,customImgName,req.params.id ], function(err, result) {
                                req.flash('message', 'Updated successfully');
                                res.redirect('/admin/scholarship_admin');
                            });
                    });
            } else {
                    labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                    res.render('edit_scholarship.ejs',{
                        labelWarning: labelMsg
                    });
            }

            } else {
                db.query(`UPDATE scholarships SET scholarshipTitle=?,country=?, university=?, 
                            fundingType=?, programType=?, subject=?, eligibleList=?, 
                            scholarshipBenefits=?, scholarshipDescription=?, degreeLevel=?, availableSubjects=?, 
                            eligibleNationalities=?, eligibilityCriteria=?, date=? WHERE scholarshipId=?`

                    , [ scholarshipTitle,country,university,fundingType,programType,subject,eligibleList,
                        scholarshipBenefits,scholarshipDescription,degreeLevel,availableSubjects,eligibleNationalities,
                        eligibilityCriteria,date,req.params.id ], function(err, result) {
                        req.flash('message', 'Updated successfully');
                        res.redirect('/admin/scholarship_admin');
                    });
            }
        }
    } else {
        db.query('SELECT * FROM scholarships WHERE scholarshipId = ?', [req.params.id],async (err, rows) => {
            if(!err) {
                res.render(`edit_scholarship`, {
                    scholarship: rows[0],
                    labelWarning: labelMsg
                })
            } else {
                console.log(err)
            }
        })
    }
}


// Delete scholarship
exports.deleteScholarships= async (req, res) => {
    db.query('DELETE FROM scholarships WHERE scholarshipId = ?', [req.params.id], async (err, rows) => {
        if(!err) {
            req.flash('message', 'Deleted successfully');
            res.redirect('/admin/scholarship_admin');
        } else {
            console.log(err)
        }
    })
}