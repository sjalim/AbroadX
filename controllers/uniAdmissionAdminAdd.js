const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


exports.admissionRecordStore = async (req, res) => {

    try {


    } catch (e) {
        console.log(e);
    }

};

exports.getUniList = async (req, res, next) => {


    db.query('select id, name from university_list', async (error, results) => {

        console.log(results);
        if (!results) {
            return next();
        }

        req.results = results;
        return next();
    });


};

