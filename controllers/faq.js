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

exports.searchFaq = async (req, res, next) => {
    const search = req.body.search;
    console.log(search);
    db.query(`select * from faq where title like ?`,['%' + search + '%'], (error, results) => {
        if (!results) {
            return next();
        }
        req.faqs = results;
        return next();
    });
};
exports.faq = async (req, res, next) => {
    db.query('select * from faq', (error, results) => {
        if (!results) {
            return next();
        }
        req.faqs = results;
        return next();
    });

};