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


exports.getEditData = async (req, res, next) => {


    db.query('select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from bachelor ' +
        'union ' +
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from master ' +
        'union ' +
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from phd ', async (error, results) => {

        if (error) {
            console.log(error);
        }
        console.log(results)

        if (!results) {

            return next();
        }
        req.dataRecord = results;
        return next();


    });


};
exports.retrieveRecordDataUpdateDelete = async (req, res, next) => {


    console.log("at uni update record :" + req.params.uni_subject_id + " " + req.params.level);
    let subject_id = req.params.uni_subject_id;
    let level = req.params.level;
    try {

        db.query('select * form ' + level + ' where subject_id = ? and level = ?', [subject_id, level], (error, results) => {

            if (!results) {
                return  next();
            }
            req.results = results;
            return next();
        });


    } catch (e) {
        console.log(e);
    }


};


exports.updateUniRecord = async (req, res, next) => {
    console.log("at uni update1 record :" + req.params.uni_subject_id + " " + req.params.level);
    return next();

};

exports.deleteUniRecord = async (req, res, next) => {

    console.log("at uni delete record :" + req.params.uni_subject_id + " " + req.params.level);

    return next();
};