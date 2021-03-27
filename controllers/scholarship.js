const mysql = require("mysql");
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

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
                            user: req.user
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
