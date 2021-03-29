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
        // console.log(results)
        if (!results) {
            return next();
        }
        req.dataRecord = results;
        return next();
    });
};
exports.retrieveRecordDataUpdateDelete = async (req, res, next) => {
    // console.log("at uni update record :" + req.params.uni_subject_id + " " + req.params.level);
    let subject_id = req.params.uni_subject_id;
    let level = req.params.level;
    try {

        db.query('select * from ' + level + ' where subject_id = ? and level = ?', [subject_id, level], (error, results) => {
            if (!results) {
                return next();
            }
            req.uniRecord = results[0];
            return next();
        });
    } catch (e) {
        console.log(e);
    }
};
exports.updateUniRecord = async (req, res, next) => {
    try {
        const {
             level, subject, area, university, post, date, formal_prereq, tuition_fee, degree_level
            , city, credit, language} = req.body;

        let subject_id = req.params.subject_id;
        // console.log(subject_id);

        // console.log( level, subject, area, university, post, date, formal_prereq, tuition_fee, degree_level
        //     , city, credit, language);


        if (level !== null && subject !== null && area !== null && university !== null && post !== null &&
        date !== null && formal_prereq !== null && tuition_fee !== null && degree_level !== null
        && city !== null && credit !== null, language !== null) {

            if (level === '0') {
                var sql = 'update bachelor set ' +
                    'subject = ?, ' +
                    'area = ?,' +
                    'university = ?,' +
                    'post = ?, ' +
                    'application_deadline = ?,' +
                    'formal_prereq = ?, ' +
                    'tuition_fee = ?, ' +
                    'degree_level = ?, ' +
                    'city = ?, ' +
                    'credit = ?, ' +
                    'language = ? ' +
                    'where subject_id = '+ subject_id.toString();

                db.query(sql,[
                    subject,
                    area,
                    university,
                    post,
                    date,
                    formal_prereq,
                    tuition_fee,
                    degree_level,
                    city,
                    credit,
                    language], function (error, result) {
                    if (error) throw error;
                    console.log("subject bachelor updated!");
                   return  next();
                });

            } else if (level === "1") {
                var sql = 'update master set ' +
                    'subject = ?, ' +
                    'area = ?,' +
                    'university = ?,' +
                    'post = ?, ' +
                    'application_deadline = ?,' +
                    'formal_prereq = ?, ' +
                    'tuition_fee = ?, ' +
                    'degree_level = ?, ' +
                    'city = ?, ' +
                    'credit = ?, ' +
                    'language = ? ' +
                    'where subject_id = '+subject_id.toString();

                db.query(sql,[
                    subject,
                    area,
                    university,
                    post,
                    date,
                    formal_prereq,
                    tuition_fee,
                    degree_level,
                    city,
                    credit,
                    language], function (error, result) {
                    if (error) throw error;
                    console.log("subject master updated!");
                    return  next();
                });
            } else if (level === "2") {
                var sql = 'update phd set ' +
                    'subject = ?, ' +
                    'area = ?,' +
                    'university = ?,' +
                    'post = ?, ' +
                    'application_deadline = ?,' +
                    'formal_prereq = ?, ' +
                    'tuition_fee = ?, ' +
                    'degree_level = ?, ' +
                    'city = ?, ' +
                    'credit = ?, ' +
                    'language = ? ' +
                    'where subject_id = '+subject_id.toString();

                db.query(sql,[
                    subject,
                    area,
                    university,
                    post,
                    date,
                    formal_prereq,
                    tuition_fee,
                    degree_level,
                    city,
                    credit,
                    language], function (error, result) {
                    if (error) throw error;
                    console.log("subject phd updated!");
                    return  next();
                });
            } else {
                return res.render('uniAdmissionAdminEdit.hbs', {
                    message: 'error occurred!'
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
    return next();
};
exports.deleteUniRecord = async (req, res, next) => {
    console.log("at uni delete record :" + req.params.subject_id + " " + req.params.level);

    let level = req.params.level;
    let subject_id = req.params.subject_id;


    level = level.trim();





    if(level=== "Bachelor")
    {
        console.log("check");

        var sql = 'delete from bachelor where subject_id = '+subject_id.toString();

        db.query(sql,function (error,results)
        {
            if (error) throw error;
            console.log("deleted from bachelor!");
            return  next();
        });



    }else if(level.normalize() === "Master")
    {
        var sql = 'delete from master where subject_id = '+subject_id.toString();

        db.query(sql,function (error,results)
        {
            if (error) throw error;
            console.log("deleted from master!");
            return  next();
        });


    }else if(level.normalize() === "PhD")
    {
        var sql = 'delete from phd where subject_id = '+subject_id.toString();

        db.query(sql,function (error,results)
        {
            if (error) throw error;
            console.log("deleted from phd!");
            return  next();
        });


    }else {

    }


    return next();
};